import React from "react";
import { useAuth } from "../../hooks/useAuth.js";
import { useNavigate } from "react-router";

export const AdminDashboard = () => {
  const { user: currentUser } = useAuth();
  const navigate = useNavigate();

  const handleClick = (name) => {
    navigate(`/admin-dashboard/${name}`);
  };

  return (
    <div className="min-h-screen p-10 bg-gray-900 rounded-xl border border-gray-800 text-white">
      <h1 className="text-3xl font-black uppercase tracking-tighter">
        Admin <span className="text-red-600">Dashboard</span>
      </h1>
      <p className="text-lg text-gray-400">Welkom, {currentUser?.name || "Beheerder"}!</p>
      <p className="text-sm text-gray-400">
        Deze pagina is alleen zichtbaar voor gebruikers met admin rights.
      </p>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          className="p-4 bg-gray-800 rounded-xl border border-gray-600 shadow hover:scale-[1.02]
         transition-transform duration-300 cursor-pointer"
          onClick={() => {
            handleClick("news");
          }}
        >
          <h2 className="text-xl font-semibold mb-2">Nieuwsbeheer (CRUD)</h2>
          <p>
            Voer hier CRUD operaties op het nieuws uit.
          </p>
        </div>
        <div
          className="p-4 bg-gray-800 rounded-xl border border-gray-600 shadow hover:scale-[1.02]
         transition-transform duration-300 cursor-pointer"
          onClick={() => {
            handleClick("users");
          }}
        >
          <h2 className="text-xl font-semibold mb-2">Gebruikersbeheer</h2>
          <p>Overzicht en beheer van alle geregistreerde gebruikers.</p>
        </div>
        <div
          className="p-4 bg-gray-800 rounded-xl border border-gray-600 shadow hover:scale-[1.02]
         transition-transform duration-300 cursor-pointer"
          onClick={() => {
            handleClick("stats");
          }}
        >
          <h2 className="text-xl font-semibold mb-2">Statistieken</h2>
          <p>Toon statistieken van de servers en dergelijke.</p>
        </div>
      </div>
    </div>
  );
};
