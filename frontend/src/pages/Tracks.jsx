//import { React, useState } from "react";
import TrackCard from "../components/tracks/TrackCard.jsx";
import { F1_MOCK_TRACKS, slug } from "../api/mock-tracks.js";
import { useNavigate } from "react-router-dom";
import "./Tracks.css";

const Tracks = () => {
  // const [selectedTrack, setSelectedTrack] = useState(null);

  // const deselectTrack = () => setSelectedTrack(null);
  const navigate = useNavigate();
  const handleTrackClick = (track) => {
    const trackName =  slug(track.name);
    navigate(`/tracks/${trackName}`);
  };

  return (
    <main className="track-page" style={{ padding: 24 }}>
      <h1 className="text-5xl font-extrabold pb-4">F1 Tracks 2025</h1>
      <p className="mb-8">Tracks 2025 season</p>
      <div className="track-grid">
        {F1_MOCK_TRACKS.map((t, index) => (
          <TrackCard
            key={index}
            name={t.name}
            photo={t.photo}
            length_km={t.length_km}
            location={t.location}
            laps={t.laps}
            fastest_lap={t.fastest_lap}
            onClick={() => {
              handleTrackClick(t);
            }}
          />
        ))}
      </div>
      {/* {selectedTrack && (
        <div
          onClick={deselectTrack}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-gray-900 text-white rounded-2xl p-6 max-w-md w-[90%] relative animate-scaleIn"
          >
            <button
              onClick={deselectTrack}
              className="absolute top-3 right-3 text-gray-400 hover:text-white text-2xl leading-none"
            >
              ×
            </button>

            <img
              src={selectedTrack.photo}
              alt={selectedTrack.name}
              className="w-32 h-32 rounded-full mx-auto mb-4 object-cover shadow-lg"
            />
            <h2 className="text-3xl font-bold text-center mb-2">
              {selectedTrack.name}
            </h2>
            <p className="text-center text-gray-400 mb-4">
              {selectedTrack.location}
            </p>

            <div className="grid grid-cols-2 gap-y-2 text-sm">
              <p className="font-semibold text-gray-400">Locatie</p>
              <p className="text-right">{selectedTrack.location}</p>

              <p className="font-semibold text-gray-400">Rondes</p>
              <p className="text-right">#{selectedTrack.laps}</p>
            </div>

            <button
              onClick={deselectTrack}
              className={`cursor-pointer mt-6 w-full bg-red-600 
                    hover:bg-red-700 transition-colors py-2 rounded-lg font-semibold`}
            >
              Close
            </button>
          </div>
        </div>
      </main>
      )}*/}

    </main>
  );
};

export default Tracks;
