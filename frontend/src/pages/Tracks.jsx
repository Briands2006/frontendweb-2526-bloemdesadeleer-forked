//import { React, useState } from "react";
import TrackCard from "../components/tracks/TrackCard.jsx";
// Zorg ervoor dat je de 'slug' functie hier kunt importeren als die niet in deze file staat.
import { F1_MOCK_TRACKS, slug } from "../api/mock-tracks.js"; 
import { useNavigate } from "react-router-dom";
import "./Tracks.css";

const BASE_URL_TRACKS = "https://cdn.racingnews365.com/Circuits";
// Dit is het constante deel voor grootte en cropping.
const CONSTANT_IMAGE_PART = "/_503xAUTO_crop_center-center_none/f1_2024";
const VERSION_PARAM = "?v=1708703502";

// Deze mapping is nodig omdat de URL-mappen en bestandsafkortingen 
// niet direct uit de naam of locatie kunnen worden afgeleid.
const TRACK_URL_MAPPING = {
  "bahrain-international-circuit": { folder: "Bahrain", code: "bhr" },
  "jeddah-corniche-circuit": { folder: "Saudi-Arabia", code: "sau" },
  "albert-park-circuit": { folder: "Australia", code: "aus" },
  "suzuka-international-racing-course": { folder: "Japan", code: "jap" },
  "shanghai-international-circuit": { folder: "China", code: "chn" },
  "miami-international-autodrome": { folder: "Miami", code: "mia" },
  "autodromo-enzo-e-dino-ferrari-imola": { folder: "Italy", code: "ita" },
  "circuit-de-monaco": { folder: "Monaco", code: "mco" },
  "circuit-de-barcelona-catalunya": { folder: "Spain", code: "spn" },
  "circuit-gilles-villeneuve": { folder: "Canada", code: "can" },
  "red-bull-ring": { folder: "Austria", code: "aut" },
  "silverstone-circuit": { folder: "Great-Britain", code: "gbr" },
  "hungaroring": { folder: "Hungary", code: "hun" },
  "circuit-de-spa-francorchamps": { folder: "Belgium", code: "bel" },
  "circuit-zandvoort": { folder: "The-Netherlands", code: "nld" },
  "autodromo-nazionale-monza": { folder: "Italy", code: "ita" },
  "baku-city-circuit": { folder: "Azerbaijan", code: "aze" },
  "marina-bay-street-circuit": { folder: "Singapore", code: "sgp" },
  "circuit-of-the-americas-cota": { folder: "United-States", code: "usa" },
  "autdromo-hermanos-rodrguez": { folder: "Mexico", code: "mex" },
  "autdromo-jos-carlos-pace-interlagos": { folder: "Brazil", code: "bra" },
  "las-vegas-strip-circuit": { folder: "Las-Vegas", code: "lve" },
  "lusail-international-circuit": { folder: "Qatar", code: "qat" },
  "yas-marina-circuit": { folder: "Abu-Dhabi", code: "abu" },
};

const Tracks = () => {
  const navigate = useNavigate();
  const handleTrackClick = (track) => {
    const trackName = slug(track.name);
    navigate(`/tracks/${trackName}`);
  };

  return (
    <main className="track-page" style={{ padding: 24 }}>
      <h1 className="text-5xl font-extrabold pb-4">F1 Tracks 2025</h1>
      <p className="mb-8">Tracks 2025 season</p>
      <div className="track-grid">
        {F1_MOCK_TRACKS.map((t, index) => {
          const trackSlug = slug(t.name);
          const details = TRACK_URL_MAPPING[trackSlug];

          let imageUrl = null;

          if (details) {
            // Voorbeeld van opbouw voor Albert Park Circuit (Australia):
            // https://cdn.racingnews365.com/Circuits/Australia/
            // _639xAUTO_crop_center-center_none/
            // f1_2024_aus_outline.png?v=1708703502
            const imagePath = `${details.folder}${CONSTANT_IMAGE_PART}_${details.code}_outline.png`;
            imageUrl = `${BASE_URL_TRACKS}/${imagePath}${VERSION_PARAM}`;
          }

          return (
            <TrackCard
              key={index}
              name={t.name}
              photo={imageUrl} // De dynamisch gecreëerde URL
              length_km={t.length_km}
              location={t.location}
              laps={t.laps}
              fastest_lap={t.fastest_lap}
              onClick={() => {
                handleTrackClick(t);
              }}
            />
          );
        })}
      </div>
    </main>
  );
};

export default Tracks;