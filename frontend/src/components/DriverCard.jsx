import React from "react";
import ButtonWithArrow from "./ui/ButtonWithArrow"; // Assuming this path is correct

export default function DriverCard({ name, team, number, photo, bio }) {
  return (
    <div className="bg-gray-900 h-auto rounded-2xl grid grid-cols-2 auto-cols-max">
      <img className="h-auto w-auto rounded-2xl" src={photo} alt={name} />

      <div className="grid grid-cols-2 gap-y-1 text-white p-4">
        {" "}
        <p className="text-5xl font-bold col-span-2">{name}</p>
        <p className="text-lg font-black col-span-1">Team</p>
        <p className="text-lg text-right pr-5 col-span-1">{team}</p>
        <p className="text-lg font-black col-span-1">Car Number</p>
        <p className="text-lg text-right pr-5 col-span-1">{number}</p>
        <p className="text-lg font-black col-span-1">Bio</p>
        <p className="text-sm text-right pr-5 col-span-1 truncate" title={bio}>
          {bio}
        </p>
        <p className="text-lg font-black col-span-1">Country</p>
        <p className="text-lg text-right pr-5 col-span-1">N/A</p>
        <p className="text-lg font-black col-span-1">DOB</p>
        <p className="text-lg text-right pr-5 col-span-1">N/A</p>
        <div className="col-span-2 mt-2">
          <ButtonWithArrow />
        </div>
      </div>
    </div>
  );
}
