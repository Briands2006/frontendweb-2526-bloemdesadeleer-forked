//import { React, useState } from "react";
import TrackCard from "../components/tracks/TrackCard.jsx";
import { slug } from "../utils/slugify.js";
import { useNavigate } from "react-router-dom";
import "./Tracks.css";
import AsyncData from "../components/AsyncData.jsx";
import useSWR from "swr";
import { getAll } from "../api/index.js";
import { getTrackImageUrl } from "./utils/getTrackImage.js";
import { useFavorites } from "../hooks/useFavorites.js";

const Tracks = () => {
  const navigate = useNavigate();
  const handleTrackClick = (track) => {
    const trackName = slug(track.name);
    navigate(`/tracks/${trackName}`);
  };

  const { data: response = [], isLoading, error } = useSWR("tracks", getAll);
  const tracks = response?.tracks ?? [];

  const {isTrackFavorite, toggleFavoriteTrack} = useFavorites();

  return (
    <main className="track-page" style={{ padding: 24 }}>
      <h1 className="text-5xl font-black uppercase tracking-tighter">
        F1 <span className="text-red-600">Tracks</span>
      </h1>
      <div className="track-grid">
        <AsyncData loading={isLoading} error={error}>
          {tracks.map((t, index) => {
            const trackSlug = slug(t.name);
            const imageUrl = getTrackImageUrl(trackSlug);

            return (
              <TrackCard
                key={index}
                name={t.name}
                photo={imageUrl} 
                length_km={t.length_km}
                location={t.location}
                laps={t.laps}
                fastestLapTime={t.fastestLapTime}
                fastestLapDriver={t.fastestLapDriver}
                fastestLapYear={t.fastestLapYear}
                onClick={() => {
                  handleTrackClick(t);
                }}
                isFavorite={isTrackFavorite(t.id)}
                onToggleFavorite={() => toggleFavoriteTrack(t.id)}
                
              />
            );
          })}
        </AsyncData>
      </div>
    </main>
  );
};

export default Tracks;