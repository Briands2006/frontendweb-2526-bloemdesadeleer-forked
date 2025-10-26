import React from "react";

export default function DriverCard({
  name,
  team,
  number,
  photo,
  country,
  onClick, // custom onClick handler moet doorgegeven worden
}) {
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
      ].join(" ")}
    >
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
        <p className="text-sm text-right pr-3 col-span-1">{country}</p>
      </div>
    </div>
  );
}
