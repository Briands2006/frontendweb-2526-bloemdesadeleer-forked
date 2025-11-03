import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import {
  getTeamBySlug,
  getDriversByTeamName,
  slug,
} from "../../api/mock-data.js";

export const TeamDetail = () => {
  const { teamSlug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const team = getTeamBySlug(teamSlug); // get team data from "mock" api

  const drivers = team ? getDriversByTeamName(team.name) : [];
  // get alle drivers voor dat team en steek ze in een array

  const handleDriverClick = (driverName) => {
    const driverSlug = slug(driverName);
    navigate(`/drivers/${driverSlug}`);
  };

  if (!team) {
    return (
      <div className="min-h-screen bg-transparent text-white p-20">
        <h1 className="text-4xl text-red-600">Fout: Team niet gevonden</h1>
        <p className="text-gray-400 mt-4">
          Het team met de slug '{teamSlug}' bestaat niet.
        </p>
        <button
          onClick={() => navigate("/teams")}
          className="mt-6 text-red-500 hover:underline flex items-center"
        >
          <ChevronLeft className="w-4 h-4 mr-1" /> Terug naar Teams
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent text-white py-12 px-8 md:px-16">
      {/* Terugknop */}
      <button
        onClick={() => navigate("/teams")}
        className="text-red-500 hover:text-red-400 flex items-center mb-8 transition-colors cursor-pointer"
      >
        <ChevronLeft className="w-5 h-5 mr-2 cursor-pointer" /> Terug naar Teams
        Overzicht
      </button>

      <header
        className="mb-10 p-6 rounded-xl relative overflow-hidden border-2 border-solid"
        style={{
          backgroundColor: team.primaryColor + "10",
          borderColor: team.primaryColor,
        }}
      >
        <div className="flex items-center justify-between">
          <h1
            className="text-5xl font-extrabold"
            style={{ color: team.primaryColor }}
          >
            {team.name}
          </h1>
          <img
            src={team.logo}
            alt={`${team.name} Logo`}
            className="w-20 h-20 object-contain"
          />
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
            <h2 className="text-3xl font-bold mb-4 border-b border-gray-800 pb-2">
              Team Informatie
            </h2>

            <div className="text-lg text-gray-300 mb-6">{team.info}</div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <p className="font-semibold text-gray-500">Basis</p>
              <p className="text-right text-white">{team.base}</p>

              <p className="font-semibold text-gray-500">Teamleider</p>
              <p className="text-right text-white">{team.chief}</p>

              <p className="font-semibold text-gray-500">
                Constructeurskampioenschappen
              </p>
              <p className="text-right text-white">{team.championships}</p>
            </div>
          </div>

          <div className="bg-gray-900 p-4 rounded-xl border border-gray-800">
            <h2 className="text-3xl font-bold mb-4 border-b border-gray-800 pb-2">
              Huidige Chassis
            </h2>
            <img
              src={team.car}
              alt={`${team.name} F1 Car`}
              className="w-full h-auto object-cover rounded-lg shadow-xl"
            />
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
            <h2 className="text-3xl font-bold mb-6 border-b border-gray-800 pb-2">
              Huidige Coureurs
            </h2>

            {drivers.map((driver) => (
              <div
                key={driver.id}
                onClick={() => handleDriverClick(driver.name)}
                className="flex items-center justify-between p-3 mb-3 bg-gray-800 rounded-lg
                 hover:bg-gray-700 transition-colors cursor-pointer"
              >
                <div className="flex items-center">
                  <img
                    src={driver.photo}
                    alt={driver.name}
                    className="w-10 h-10 rounded-full object-cover mr-3"
                  />
                  <div>
                    <p className="font-semibold text-white">{driver.name}</p>
                    <p className="text-xs text-gray-400">{driver.country}</p>
                  </div>
                </div>
                <span
                  className="text-3xl font-extrabold"
                  style={{ color: team.primaryColor }}
                >
                  {driver.number}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
