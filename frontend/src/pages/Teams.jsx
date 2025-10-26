import React from "react";
import TeamCard from "../components/teams/TeamCard.jsx";
import { TEAMS } from "../api/mock-data.js";

export const Teams = () => {
  return (
    <main className="min-h-screen bg-transparent text-white py-12 px-8 md:px-16">
      <h1 className="text-5xl font-extrabold pb-4">
        F1 Teams 2025
      </h1>
      <p className="mb-8">The F1 teams for the 2025 season</p>

      <div
        className="grid gap-6"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        }}
      >
        {TEAMS.map((team) => (
          <TeamCard key={team.id} team={team} />
        ))}
      </div>
    </main>
  );
};
