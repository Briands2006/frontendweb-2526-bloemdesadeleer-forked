import { Link, useParams } from "react-router-dom";
import useSWR from "swr";
import { getById, getBySlug } from "../../api";
import AsyncData from "../../components/AsyncData.jsx";
import { useAuth } from "../../context/auth.js";
import { FaStar } from "react-icons/fa6";
import { useFavorites } from "../../hooks/useFavorites.js";
import { getAssetUrl } from "../utils/getImage.js";

const DriverDetails = () => {
  const { driverName } = useParams();
  const {  isAuthed, loading } = useAuth();
  const { isDriverFavorite, toggleFavoriteDriver } = useFavorites();

  const driverKey = driverName ? ["/drivers", driverName] : null;
  const {
    data: driver,
    isDriverLoading,
    driverError,
  } = useSWR(driverKey, () => getBySlug("drivers", driverName));

  const teamKey = driver ? ["/teams", driver.teamId] : null;
  const {
    data: teamResponse,
    isLoading: isTeamLoading,
    error: teamError,
  } = useSWR(teamKey, () => getById("teams", driver.teamId));

  const team = Array.isArray(teamResponse?.teams)
    ? teamResponse.teams.find((t) => t.id === driver.teamId)
    : teamResponse;

  if (isDriverLoading || !driver) {
    return (
      <AsyncData
        loading={isDriverLoading || isTeamLoading}
        error={driverError || teamError}
      />
    );
  }

  if (isTeamLoading || !team) {
    return (
      <AsyncData
        loading={isDriverLoading || isTeamLoading}
        error={driverError || teamError}
      />
    );
  }

  const isFavorite = isDriverFavorite(driver.id);

  const handleToggleFavorite = async () => {
  
    if (!isAuthed || loading) return; // Preventie

    try {
      await toggleFavoriteDriver(driver.id); 
      
    } catch (e) {
      console.error("Fout bij het togglen van favoriet:", e);
    }
  };

  console.log(team);
  console.log(team.name);

  return (
    <main className="driver-details-page" style={{ padding: 24 }}>
      <Link
        to="/drivers"
        className="py-2 px-2.5 rounded-md text-red-600 mb-20 left-0"
      >
        Terug
      </Link>
      <div className="max-w-4xl mx-auto">
        <div
          className={[
            "bg-gray-90oshadow-2xl",
            "rounded-2xl",
            "grid",
            "grid-cols-2",
            "overflow-hidden",
            "transition-transform",
          ].join(" ")}
        >
          <img
            className="h-full w-full object-cover rounded-2xl mt-3"
            src={getAssetUrl("driverHeadshots", driver.photo)}
            alt={driver.name}
          />

          <div className="grid grid-cols-2 gap-y-2 text-white p-8 self-center">
            <div className="flex justify-between items-center col-span-2 mb-2">
              <p className="text-5xl font-bold col-span-2 leading-tight mb-2">
                {driver.name}
              </p>
              {isAuthed && (
                <button onClick={handleToggleFavorite} disabled={loading}>
                  <FaStar 
                    className={`w-8 h-8 transition-colors ${
                      isFavorite ? "text-yellow-400" : "text-gray-500 hover:text-yellow-200"
                    }`}
                  />
                </button>
              )}
            </div>

            <p className="text-base font-semibold col-span-1 text-gray-400">
              Team
            </p>
            <p className="text-xl text-right pr-3 col-span-1">{team.name}</p>

            <p className="text-base font-semibold col-span-1 text-gray-400">
              Car #
            </p>
            <p className="text-xl text-right pr-3 col-span-1">
              {driver.number}
            </p>

            <p className="text-base font-semibold col-span-1 text-gray-400">
              Country
            </p>
            <p className="text-xl text-right pr-3 col-span-1">
              {driver.country}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto mt-8 p-6">
        <h2 className="text-2xl font-bold text-gray-400">Bibliografie</h2>
        <p className="mt-2 text-white">
          {driver.bibliography}
        </p>
      </div>
    </main>
  );
};

export default DriverDetails;
