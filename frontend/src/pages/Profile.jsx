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
        <div className="w-full max-w-4xl mx-auto p-8 bg-gray-900 rounded-xl border border-gray-800 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="w-full lg:order-1 order-2">
              <div className="text-center mb-8">
                <div
                  className="mx-auto w-24 h-24 bg-red-600 rounded-full flex items-center
             justify-center mb-4 border-4 border-red-800"
                >
                  <User className="w-12 h-12 text-white" />
                </div>
                <h1 className="text-4xl font-bold mb-1">
                  Welkom,{" "}
                  <span className="text-red-600">
                    {user.name || user.email.split("@")[0]}
                  </span>
                  !
                </h1>
                <p className="text-gray-400">Uw F1 Tracker Profiel</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center p-4 bg-gray-800 rounded-lg border border-gray-700">
                  <Mail className="w-5 h-5 text-red-500 mr-4" />
                  <div>
                    <p className="text-sm font-semibold text-gray-400">
                      E-mail
                    </p>
                    <p className="text-lg">{user.email}</p>
                  </div>
                </div>

                {user.name && (
                  <div className="flex items-center p-4 bg-gray-800 rounded-lg border border-gray-700">
                    <User className="w-5 h-5 text-red-500 mr-4" />
                    <div>
                      <p className="text-sm font-semibold text-gray-400">
                        Gebruikersnaam
                      </p>
                      <p className="text-lg">{user.name}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-center p-4 bg-gray-800 rounded-lg border border-gray-700">
                  <Calendar className="w-5 h-5 text-red-500 mr-4" />
                  <div>
                    <p className="text-sm font-semibold text-gray-400">
                      Geboren op
                    </p>
                    <p className="text-lg">{formattedDate(user.birthdate)}</p>
                  </div>
                </div>

                <div className="flex items-center p-4 bg-gray-800 rounded-lg border border-gray-700">
                  <Calendar className="w-5 h-5 text-red-500 mr-4" />
                  <div>
                    <p className="text-sm font-semibold text-gray-400">
                      Lid sinds
                    </p>
                    <p className="text-lg">{formattedDate(user.dateJoined)}</p>
                  </div>
                </div>
              </div>

              {isAdmin && (
                <button
                  onClick={handleAdminPanel}
                  className="w-full mt-8 inline-flex items-center justify-center gap-2
             bg-red-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-red-700
             transition-colors cursor-pointer"
                >
                  <Lock className="w-5 h-5" />
                  Admin Panel
                </button>
              )}

              <button
                onClick={handleLogout}
                disabled={loading}
                className="w-full mt-4 inline-flex items-center justify-center gap-2
             bg-gray-700 text-white px-4 py-3 rounded-lg font-medium hover:bg-gray-600
             transition-colors disabled:opacity-50 cursor-pointer"
              >
                <LogOut className="w-5 h-5" />
                Uitloggen
              </button>

              <div className="mt-6 text-center text-sm text-gray-500">
                Gebruikers ID: {user.id}
              </div>
            </div>
            <div className="w-full lg:order-2 order-1">
              <div className="h-38 md:h-40 lg:h-38 hidden sm:block"></div>
              <h2 className="text-3xl font-bold text-red-600 flex">
                <FaStar className="text-yellow-400 text-3xl mr-3 " /> Favorieten
              </h2>
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <GiFullMotorcycleHelmet className="text-3xl text-red-500 mr-2" />
                  <h3 className="text-xl font-semibold text-white">
                    Favoriete Coureurs
                  </h3>
                </div>
                <ul className="space-y-3">
                  {user.favoriteDrivers && user.favoriteDrivers.length > 0 ? (
                    user.favoriteDrivers
                      .filter((fav) => fav.driver) // Filter items die de driver relatie missen
                      .map((favItem, index) => (
                        <li
                          key={favItem.driver.id || index} // Gebruik de driver ID als key
                          className="flex items-center p-3 bg-gray-800 rounded-md 
                          shadow-sm hover:bg-gray-700 transition-colors cursor-pointer"
                        >
                          <img
                            src={getAssetUrl("driverHeadshots", favItem.driver.photo)}
                            alt={`Foto van ${favItem.driver.name}`}
                            className="w-10 h-10 object-cover rounded-full mr-4 border border-red-600"
                          />
                          <Link
                            to={`/drivers/${slug(favItem.driver.name)}`}
                            className="text-lg font-medium w-full"
                          >
                            {favItem.driver.name}
                          </Link>
                        </li>
                      ))
                  ) : (
                    // Toon de fallback als er geen favorieten zijn
                    <li className="flex items-center p-3 bg-gray-800 rounded-md shadow-sm">
                      <span className="text-lg font-medium text-gray-400">
                        Nog niet ingesteld
                      </span>
                    </li>
                  )}
                </ul>
              </div>
              <div>
                <div className="flex items-center mb-4">
                  <Flag className="w-6 h-6 text-red-500 mr-3" />
                  <h3 className="text-xl font-semibold text-white">
                    Favoriete Circuits
                  </h3>
                </div>
                <ul className="space-y-3">
                  {user.favoriteTracks && user.favoriteTracks.length > 0 ? (
                    user.favoriteTracks
                      .filter((fav) => fav.track)
                      .map((favItem, index) => {
                        const location = favItem.track.location;
                        const countryCode = getCountryCode(location);
                        const FlagComponent = countryCode
                          ? Flags[countryCode]
                          : null;

                        return (
                          <li
                            key={favItem.track.id || index}
                            className="flex items-center p-3 bg-gray-800 rounded-md 
                       shadow-sm hover:bg-gray-700 transition-colors cursor-pointer"
                          >
                            <div
                              className="w-10 h-10 rounded-full overflow-hidden relative 
                                 shrink-0 mr-4 border border-red-600"
                            >
                              {FlagComponent ? (
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <FlagComponent className="min-w-full min-h-full scale-[1.8] object-cover" />
                                </div>
                              ) : (
                                <Flag className="w-full h-full object-none" />
                              )}
                            </div>

                            <Link
                              to={`/tracks/${slug(favItem.track.name)}`}
                              className="text-lg font-medium w-full"
                            >
                              {favItem.track.name}
                            </Link>
                          </li>
                        );
                      })
                  ) : (
                    <li className="flex items-center p-3 bg-gray-800 rounded-md shadow-sm">
                      <span className="text-lg font-medium text-gray-400">
                        Nog niet ingesteld
                      </span>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AsyncData>
  );
};
