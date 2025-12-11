import React from "react";
import Flags from "country-flag-icons/react/3x2";
import { FaStar } from "react-icons/fa6";

export default function DriverCard({
  name,
  team,
  number,
  photo,
  country,
  onClick,
  isFavorite,
  onToggleFavorite, // custom onClick handler moet doorgegeven worden
}) {
  const Flag = Flags[country];

  const handleStarClick = (event) => {
    event.stopPropagation(); // BELANGRIJK: Voorkomt dat de klik op de ster de kaart klik activeert
    onToggleFavorite();
  };

  return (
    <div
      onClick={onClick}
      className={[
        "bg-gray-900",
        "rounded-2xl",
        "grid",
        "grid-cols-2",
        "cursor-pointer",
        "hover:scale-[1.02]",
        "hover:shadow-xl",
        "transition-transform",
        "duration-300",
        "overflow-hidden",
        "relative",
      ].join(" ")}
    >
      {onToggleFavorite && (
        <div
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-gray-900/70 hover:bg-gray-800/90 transition-colors"
          onClick={handleStarClick} // Gebruik de handler die stopPropagation doet
          title={isFavorite ? "Verwijder van favorieten" : "Voeg toe aan favorieten"}
        >
          <FaStar
            className={`w-6 h-6 transition-colors ${
              isFavorite ? "text-yellow-400" : "text-gray-400 hover:text-yellow-300"
            }`}
          />
        </div>
      )}
      <img
        className="h-full w-auto object-cover rounded-l-2xl"
        src={photo}
        alt={name}
      />

      <div className="grid grid-cols-2 gap-y-1 text-white p-4">
        <p className="text-3xl font-bold col-span-2 leading-tight">{name}</p>

        <p className="text-sm font-semibold col-span-1 text-gray-400">Team</p>
        <p className="text-sm text-right pr-3 col-span-1">{team}</p>

        <p className="text-sm font-semibold col-span-1 text-gray-400">Car #</p>
        <p className="text-sm text-right pr-3 col-span-1">{number}</p>

        <p className="text-sm font-semibold col-span-1 text-gray-400">
          Country
        </p>
        <p className="text-sm text-right pr-3 col-span-1"><Flag className="w-10 ml-auto rounded"/></p>
      </div>
    </div>
  );
}
