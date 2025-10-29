import React from "react";
import { useAuth } from "../hooks/useAuth.js";
import { User, Mail, Calendar, LogOut, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
  const { currentUser, logout, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-[500px] flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-red-600" />
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="text-center p-10 text-white">U bent niet ingelogd.</div>
    );
  }

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (e) {
      console.error("Uitloggen mislukt:", e);
    }
  };

  const formattedDate = currentUser.dateJoined
    ? new Date(currentUser.dateJoined).toLocaleDateString("nl-BE", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
    : "Onbekend";

  return (
    <div className="min-h-screen pt-20 pb-10 bg-transparent text-white flex justify-center px-4">
      <div className="w-full max-w-lg p-8 bg-gray-900 rounded-xl border border-gray-800 shadow-xl">
        <div className="text-center mb-8">
          <div className="mx-auto w-24 h-24 bg-red-600 rounded-full flex items-center
           justify-center mb-4 border-4 border-red-800">
            <User className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-1">
            Welkom,{" "}
            <span className="text-red-600">
              {currentUser.name || currentUser.email.split("@")[0]}
            </span>
            !
          </h1>
          <p className="text-gray-400">Uw F1 Tracker Profiel</p>
        </div>

        <div className="space-y-4">
          {/* E-mail Adres */}
          <div className="flex items-center p-4 bg-gray-800 rounded-lg border border-gray-700">
            <Mail className="w-5 h-5 text-red-500 mr-4" />
            <div>
              <p className="text-sm font-semibold text-gray-400">E-mail</p>
              <p className="text-lg">{currentUser.email}</p>
            </div>
          </div>

          {currentUser.name && (
            <div className="flex items-center p-4 bg-gray-800 rounded-lg border border-gray-700">
              <User className="w-5 h-5 text-red-500 mr-4" />
              <div>
                <p className="text-sm font-semibold text-gray-400">
                  Gebruikersnaam
                </p>
                <p className="text-lg">{currentUser.name}</p>
              </div>
            </div>
          )}

          <div className="flex items-center p-4 bg-gray-800 rounded-lg border border-gray-700">
            <Calendar className="w-5 h-5 text-red-500 mr-4" />
            <div>
              <p className="text-sm font-semibold text-gray-400">Lid sinds</p>
              <p className="text-lg">{formattedDate}</p>
            </div>
          </div>
        </div>

        <button
          onClick={handleLogout}
          disabled={loading}
          className="w-full mt-8 inline-flex items-center justify-center gap-2
           bg-gray-700 text-white px-4 py-3 rounded-lg font-medium hover:bg-gray-600
            transition-colors disabled:opacity-50"
        >
          <LogOut className="w-5 h-5" />
          Uitloggen
        </button>

        <div className="mt-6 text-center text-sm text-gray-500">
          Gebruikers ID: {currentUser.id}
        </div>
      </div>
    </div>
  );
};
