import { Link, useParams } from "react-router-dom";
import useSWR from "swr";
import { getById, getBySlug } from "../../api";
import AsyncData from "../../components/AsyncData.jsx";
import { useAuth } from "../../context/auth.js";
import { FaStar } from "react-icons/fa6";
import { useFavorites } from "../../hooks/useFavorites.js";
import { getAssetUrl } from "../utils/getImage.js";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DriverDetails = () => {
  const { driverName } = useParams();
  const { isAuthed, loading } = useAuth();
  const navigate = useNavigate();
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
      <button
        onClick={() => navigate("/drivers")}
        className="text-red-500 hover:text-red-400 flex items-center
                mb-8 transition-colors cursor-pointer font-semibold"
      >
        <ChevronLeft className="w-5 h-5 mr-2 cursor-pointer" data-cy='bt_drivers' /> Terug naar
        Drivers Overzicht
      </button>
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-900 shadow-2xl rounded-2xl
         grid grid-cols-1 md:grid-cols-2 overflow-hidden border border-gray-800">
          {/* Afbeelding zonder margin-top en met object-center */}
          <img
            className="h-64 md:h-full w-full object-cover object-top"
            src={getAssetUrl("driverHeadshots", driver.photo)}
            alt={driver.name}
          />

          {/* Tekst sectie */}
          <div className="flex flex-col justify-center text-white p-8">
            <div className="flex justify-between items-start mb-6">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                {driver.name}
              </h1>
              {isAuthed && (
                <button
                  onClick={handleToggleFavorite}
                  disabled={loading}
                  className="p-2 hover:bg-gray-800 rounded-full transition-colors"
                >
                  <FaStar
                    className={`w-8 h-8 transition-colors
                       ${isFavorite ? "text-yellow-400" : "text-gray-600 hover:text-yellow-200"
                }`}
                  />
                </button>
              )}
            </div>

            {/* Gebruik een simpelere flex-row voor de stats voor betere uitlijning */}
            <div className="space-y-4">
              <div className="flex justify-between border-b border-gray-800 pb-2">
                <span className="text-gray-400 font-semibold">Team</span>
                <span className="text-xl">{team.name}</span>
              </div>
              <div className="flex justify-between border-b border-gray-800 pb-2">
                <span className="text-gray-400 font-semibold">Car #</span>
                <span className="text-xl">{driver.number}</span>
              </div>
              <div className="flex justify-between border-b border-gray-800 pb-2">
                <span className="text-gray-400 font-semibold">Country</span>
                <span className="text-xl">{driver.country}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto mt-8 p-6">
        <h2 className="text-2xl font-bold text-gray-400">Bibliografie</h2>
        <p className="mt-2 text-white">
          {driver.bibliography}
        </p>
      </div>
    </main >
  );
};

export default DriverDetails;
