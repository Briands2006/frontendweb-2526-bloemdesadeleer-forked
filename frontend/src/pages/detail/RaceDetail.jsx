import React, { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import useSWR from "swr";
import {
  ChevronLeft,
  Calendar as CalendarIcon,
  Clock,
  CloudRain,
  Sunrise,
  Sun,
  MapPin,
  Ruler,
} from "lucide-react";
import Flags from "country-flag-icons/react/3x2";
import AsyncData from "../../components/AsyncData.jsx";
import { getBySlug } from "../../api/index.js";
import { getTrackImageUrl } from "../utils/getTrackImage.js";

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

const formatDate = (dateString) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  if (!dateString) return "Datum Onbekend";
  return new Date(dateString).toLocaleDateString("en-US", options);
};

const getWeatherIcon = (weather) => {
  if (!weather) return <Sunrise className="w-6 h-6 text-gray-500" />;
  if (weather.toLowerCase().includes("rain"))
    return <CloudRain className="w-6 h-6 text-blue-400" />;
  if (
    weather.toLowerCase().includes("sunny") ||
    weather.toLowerCase().includes("clear")
  )
    return <Sun className="w-6 h-6 text-yellow-400" />;
  if (weather.toLowerCase().includes("cloudy"))
    return <CloudRain className="w-6 h-6 text-gray-400" />;
  return <Sunrise className="w-6 h-6 text-gray-500" />;
};

const slugToTitle = (slug) => {
  if (!slug) return "Onbekende Race";
  return slug
    .split("-")
    .map((word) => {
      if (word.toLowerCase() === "gp") return "GP";
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
};

export const RaceDetail = () => {
  const { raceName } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const key = raceName ? ["/races", raceName] : null;

  const { data, isLoading, error } = useSWR(key, ([url, slug]) =>
    getBySlug(url, slug),
  );

  const race = data?.race || data;
  const track = race?.track;

  if (isLoading || error) {
    return <AsyncData loading={isLoading} error={error} />;
  }

  const handleTrackCardClick = () => {
    if (track?.slug) {
      navigate(`/tracks/${track.slug}`);
    }
  };

  const trackCountryCode = getCountryCode(track?.location);
  const trackImageUrl = getTrackImageUrl(track?.slug);
  const Flag = Flags[trackCountryCode];

  if (!race) {
    return (
      <div
        className="min-h-screen bg-transparent text-white p-20 flex
        flex-col items-center justify-center text-center"
      >
        <h1 className="text-4xl font-extrabold text-red-600 mb-4">
          Fout: Race niet gevonden
        </h1>
        <p className="text-lg text-gray-400 mt-2">
          De race met de slug **'{raceName || "LEEG"}'** kon niet worden
          gevonden.
        </p>
        <button
          onClick={() => navigate("/calendar")}
          className="mt-8 px-6 py-3 bg-red-600 hover:bg-red-700
            text-white font-bold rounded-lg transition-colors flex items-center shadow-lg"
        >
          <ChevronLeft className="w-5 h-5 mr-2" /> Terug naar Kalender
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent text-white py-12 px-8 md:px-16">
      <button
        onClick={() => navigate("/calendar")}
        className="text-red-500 hover:text-red-400 flex items-center
          mb-8 transition-colors cursor-pointer font-semibold"
      >
        <ChevronLeft className="w-5 h-5 mr-2 cursor-pointer" data-cy='bt_races' /> Terug naar
        Kalender Overzicht
      </button>

      <header
        className="mb-10 p-6 rounded-xl relative overflow-hidden border-2 border-solid"
        style={{
          backgroundColor: "#FF000010",
          borderColor: "#FF0000",
        }}
      >
        <div className="flex items-center justify-between">
          <h1 className="text-5xl font-extrabold text-red-500">
            {slugToTitle(race.slug || raceName)}
          </h1>
          <div className="w-20 h-auto rounded-md shadow-lg overflow-hidden">
            <Flag className="w-20 ml-auto rounded" />
          </div>
        </div>

      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
            <h2 className="text-3xl font-bold mb-4 border-b border-gray-800 pb-2">
              Race Specificaties
            </h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <p className="font-semibold text-gray-500 flex items-center">
                <CalendarIcon className="w-4 h-4 mr-2" /> Datum & Tijd
              </p>
              <p className="text-right text-white">{formatDate(race.date)}</p>

              <p className="text-left font-semibold text-gray-500 flex items-center gap-1">
                {getWeatherIcon(race.weather)} Weersomstandigheden
              </p>
              <p className="text-right text-white">
                <b>{race.weather || "Onbekend"}</b>
              </p>

              <p className="font-semibold text-gray-500 flex items-center">
                <Clock className="w-4 h-4 mr-2" /> Huidig Baanrecord
              </p>
              <p className="text-right text-red-500 font-bold">
                {race.trackRecord || "N/A"}
              </p>

              <p className="font-semibold text-gray-500 flex items-center">
                Seizoen
              </p>
              <p className="text-right text-white">{race.calendarYear}</p>
            </div>
          </div>

          {track && (
            <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
              <h2 className="text-3xl font-bold mb-4 border-b border-gray-800 pb-2">
                Baan Informatie
              </h2>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <p className="font-semibold text-gray-500 flex items-center">
                  Naam
                </p>
                <p className="text-right text-white font-bold">{track.name}</p>

                <p className="font-semibold text-gray-500 flex items-center">
                  <MapPin className="w-4 h-4 mr-2" /> Locatie
                </p>
                <p className="text-right text-white">{track.location}</p>

                <p className="font-semibold text-gray-500 flex items-center">
                  <Ruler className="w-4 h-4 mr-2" /> Lengte
                </p>
                <p className="text-right text-white">{track.lengthKm} km</p>

                <p className="font-semibold text-gray-500 flex items-center">
                  Aantal Ronden
                </p>
                <p className="text-right text-white">{track.laps}</p>

                <p className="font-semibold text-gray-500 flex items-center">
                  Snelste Ronde Tijd
                </p>
                <p className="text-right text-red-500 font-bold">
                  {track.fastestLapTime || "N/A"}
                </p>

                <p className="font-semibold text-gray-500 flex items-center">
                  Snelste Ronde Coureur
                </p>
                <p className="text-right text-white">
                  {track.fastestLapDriver || "N/A"} (
                  {track.fastestLapYear || "N/A"})
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
            <h2 className="text-3xl font-bold mb-4">Baan Layout</h2>
            {trackImageUrl ? (
              <div
                onClick={handleTrackCardClick}
                className="h-100 w-auto rounded-lg bg-contain bg-center bg-no-repeat 
                           cursor-pointer transition-transform hover:scale-[1.02] 
                           border-2 border-gray-800"
                style={{
                  backgroundImage: `url('${trackImageUrl}')`,
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                }}
                title={`Bekijk details van ${track.name}`}
              >
                <div className="h-full flex items-end justify-end p-2 text-sm
                 text-white/70 font-bold bg-black/10 hover:bg-black/20 transition">
                  Klik voor Baan Details
                </div>
              </div>
            ) : (
              <div
                className="h-64 bg-gray-800 rounded-lg flex 
                           items-center justify-center text-gray-500 italic text-center p-4"
              >
                (Image van de baan niet beschikbaar)
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
