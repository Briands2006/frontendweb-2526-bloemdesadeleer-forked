import React from "react";
import { useAuth } from "../hooks/useAuth.js";
import {
  User,
  Mail,
  Calendar,
  LogOut,
  Loader2,
  Lock,
  Flag,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import AsyncData from "../components/AsyncData.jsx";
import { GiFullMotorcycleHelmet } from "react-icons/gi";

import { FaStar } from "react-icons/fa6";
import { slug } from "../utils/slugify.js";
import { Link } from "react-router-dom";
import Flags from "country-flag-icons/react/3x2";
import { getAssetUrl } from "./utils/getImage.js";

export const Profile = () => {
  const { isAdmin, isAuthed, user, logout, loading, error } = useAuth();

  const navigate = useNavigate();

  if (!isAuthed && !loading) {
    return (
      <div className="text-center p-10 text-white">U bent niet ingelogd.</div>
    );
  }

  if (!user || !user.email) {
    console.log(
      "User is authenticated but user object is not yet loaded. Showing spinner.",
    );
    return (
      <div className="min-h-[500px] flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-red-600" />
      </div>
    );
  }

  if (user && user.favoriteDrivers) {
    console.log("DEBUG: favoriteDrivers data:", user.favoriteDrivers);
    console.log("DEBUG: favoriteDrivers data:", user.favoriteTracks);
  }

  const COUNTRY_CODE_MAP = {
    Bahrain: "BH",
    "Saudi Arabia": "SA",
    Japan: "JP",
    China: "CN",
    Azerbaijan: "AZ",
    Singapore: "SG",
    Qatar: "QA",
    UAE: "AE",
    Italy: "IT",
    Monaco: "MC",
    Spain: "ES",
    Austria: "AT",
    "United Kingdom": "GB",
    Hungary: "HU",
    Belgium: "BE",
    Netherlands: "NL",
    "United States": "US",
    Canada: "CA",
    Mexico: "MX",
    Brazil: "BR",
    Australia: "AU",
  };

  const getCountryCode = (locationString) => {
    if (!locationString) return null;
    const parts = locationString.split(",").map((s) => s.trim());
    const countryName = parts[parts.length - 1];
    return COUNTRY_CODE_MAP[countryName] || null;
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (e) {
      console.error("Uitloggen mislukt:", e);
    }
  };

  const handleAdminPanel = () => {
    navigate("/admin-dashboard");
  };

  const formattedDate = (date) => {
    if (!date) {
      return "Onbekend";
    }

    const newDate = new Date(date);

    if (isNaN(newDate.getTime())) {
      console.error("Ongeldige date: ", newDate);
      return "Ongeldig Formaat";
    }

    return new Date(date).toLocaleDateString("nl-BE", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // const getNames = (items, key) => {
  //   if (!items || items.length === 0) {
  //     return ["Nog niet ingesteld"];
  //   }
  //   return items
  //     .filter((item) => item[key] && item[key].name)
  //     .map((item) => item[key].name);
  // };

  // const favoriteDrivers = getNames(user.favoriteDrivers, "driver");
  // const favoriteTracks = getNames(user.favoriteTracks, "track");

  return (
    <AsyncData isLoading={loading} error={error}>
      <div className="min-h-screen pt-20 pb-10 bg-transparent text-white grid place-items-start px-4">
        <div className="w-full max-w-4xl mx-auto p-6 md:p-8 bg-gray-900 rounded-xl border border-gray-800 shadow-xl">   
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8">

            <div className="w-full">
              <div className="text-center mb-8">
                <div className="mx-auto w-24 h-24 bg-red-600 rounded-full 
                flex items-center justify-center mb-4 border-4 border-red-800 shadow-lg">
                  <User className="w-12 h-12 text-white" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-1">
                  Welkom,{" "}
                  <span className="text-red-600">
                    {user.name || user.email.split("@")[0]}
                  </span>
                  !
                </h1>
                <p className="text-gray-400">Uw F1 Tracker Profiel</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                  <Mail className="w-5 h-5 text-red-500 mr-4 shrink-0" />
                  <div className="overflow-hidden">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">E-mail</p>
                    <p className="text-base md:text-lg truncate">{user.email}</p>
                  </div>
                </div>

                {user.name && (
                  <div className="flex items-center p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                    <User className="w-5 h-5 text-red-500 mr-4 shrink-0" />
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Gebruikersnaam</p>
                      <p className="text-base md:text-lg">{user.name}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-center p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                  <Calendar className="w-5 h-5 text-red-500 mr-4 shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Geboren op</p>
                    <p className="text-base md:text-lg">{formattedDate(user.birthdate)}</p>
                  </div>
                </div>

                <div className="flex items-center p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                  <Calendar className="w-5 h-5 text-red-500 mr-4 shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Lid sinds</p>
                    <p className="text-base md:text-lg">{formattedDate(user.dateJoined)}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 space-y-3">
                {isAdmin && (
                  <button
                    onClick={handleAdminPanel}
                    className="w-full inline-flex items-center justify-center gap-2 bg-red-600
                     text-white px-4 py-3 rounded-lg font-bold
                      hover:bg-red-700 transition-all active:scale-95 cursor-pointer"
                  >
                    <Lock className="w-5 h-5" />
                    Admin Panel
                  </button>
                )}

                <button
                  onClick={handleLogout}
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center gap-2 bg-gray-800
                   text-white px-4 py-3 rounded-lg font-bold hover:bg-gray-750 border
                    border-gray-700 transition-all active:scale-95"
                >
                  <LogOut className="w-5 h-5" />
                  Uitloggen
                </button>
              </div>
            </div>

            <div className="w-full">
              <div className="lg:pt-4">
                <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center mb-6">
                  <FaStar className="text-yellow-400 mr-3" /> Favorieten
                </h2>

                <div className="mb-8">
                  <div className="flex items-center mb-4">
                    <GiFullMotorcycleHelmet className="text-2xl text-red-500 mr-2" />
                    <h3 className="text-lg font-semibold text-gray-300">Coureurs</h3>
                  </div>
                  <ul className="grid grid-cols-1 gap-3">
                    {user.favoriteDrivers && user.favoriteDrivers.length > 0 ? (
                      user.favoriteDrivers
                        .filter((fav) => fav.driver)
                        .map((favItem, index) => (
                          <li key={favItem.driver.id || index}>
                            <Link
                              to={`/drivers/${slug(favItem.driver.name)}`}
                              className="flex items-center p-3 bg-gray-800/40 rounded-lg border
                               border-gray-700 hover:border-red-600 hover:bg-gray-800 transition-all group"
                            >
                              <img
                                src={getAssetUrl("driverHeadshots", favItem.driver.photo)}
                                alt={favItem.driver.name}
                                className="w-12 h-12 object-cover rounded-full mr-4 border-2
                                 border-transparent group-hover:border-red-600 transition-all"
                              />
                              <span className="text-lg font-medium">{favItem.driver.name}</span>
                            </Link>
                          </li>
                        ))
                    ) : (
                      <li className="p-4 bg-gray-800/20 rounded-lg border border-dashed
                       border-gray-700 text-gray-500 text-center">
                        Nog geen favoriete coureurs
                      </li>
                    )}
                  </ul>
                </div>

                <div>
                  <div className="flex items-center mb-4">
                    <Flag className="w-5 h-5 text-red-500 mr-3" />
                    <h3 className="text-lg font-semibold text-gray-300">Circuits</h3>
                  </div>
                  <ul className="grid grid-cols-1 gap-3">
                    {user.favoriteTracks && user.favoriteTracks.length > 0 ? (
                      user.favoriteTracks
                        .filter((fav) => fav.track)
                        .map((favItem, index) => {
                          const countryCode = getCountryCode(favItem.track.location);
                          const FlagComponent = countryCode ? Flags[countryCode] : null;

                          return (
                            <li key={favItem.track.id || index}>
                              <Link
                                to={`/tracks/${slug(favItem.track.name)}`}
                                className="flex items-center p-3 bg-gray-800/40 rounded-lg border
                                 border-gray-700 hover:border-red-600 hover:bg-gray-800 transition-all group"
                              >
                                <div className="w-12 h-12 rounded-full overflow-hidden mr-4 border-2
                                 border-transparent group-hover:border-red-600 relative shrink-0">
                                  {FlagComponent ? (
                                    <FlagComponent className="w-full h-full object-cover scale-150" />
                                  ) : (
                                    <div className="bg-gray-700 w-full h-full flex items-center justify-center">
                                      <Flag className="w-5 h-5 text-gray-500" />
                                    </div>
                                  )}
                                </div>
                                <span className="text-lg font-medium">{favItem.track.name}</span>
                              </Link>
                            </li>
                          );
                        })
                    ) : (
                      <li className="p-4 bg-gray-800/20 rounded-lg border
                       border-dashed border-gray-700 text-gray-500 text-center">
                        Nog geen favoriete circuits
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AsyncData>
  );
};
