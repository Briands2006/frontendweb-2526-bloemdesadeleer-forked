import React from "react";
import { useNavigate } from "react-router-dom";

const TeamCard = ({ team }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/teams/${team.slug}`);
  };

  return (
    <div
      onClick={handleCardClick}
      style={{ borderLeftColor: team.primaryColor }}
      className={`bg-gray-900 border-l-8 cursor-pointer rounded-xl shadow-lg 
                  p-6 transition-all duration-300 hover:shadow-red-600/30 hover:scale-[1.02]
                  flex items-center space-x-6 text-white`}
    >
      <img
        src={team.logo}
        alt={`${team.name} Logo`}
        className="w-16 h-16 object-contain"
      />
      <div>
        <h3 className="text-xl font-bold mb-1 text-white">{team.name}</h3>
        <p className="text-sm text-gray-400">Hoofdkantoor: {team.base}</p>
        <p className="text-xs text-gray-500 mt-1">
          Wereldtitels: {team.championships}
        </p>
      </div>
    </div>
  );
};

export default TeamCard;
