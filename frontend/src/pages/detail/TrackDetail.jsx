import { useParams, Link } from "react-router-dom";
import useSWR from "swr";
import { getBySlug } from "../../api/index.js";
import AsyncData from "../../components/AsyncData.jsx";
import { useAuth } from "../../context/auth.js";
import { FaStar } from "react-icons/fa6";
import { useFavorites } from "../../hooks/useFavorites.js";

const BASE_URL_TRACKS = "https://cdn.racingnews365.com/Circuits";
const CONSTANT_IMAGE_PART = "/_639xAUTO_crop_center-center_none/f1_2024";
const VERSION_PARAM = "?v=1708703502";

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
  "autodromo-hermanos-rodriguez": { folder: "Mexico", code: "mex" },
  "autodromo-jose-carlos-pace-interlagos": { folder: "Brazil", code: "bra" },
  "las-vegas-strip-circuit": { folder: "Las-Vegas", code: "lve" },
  "lusail-international-circuit": { folder: "Qatar", code: "qat" },
  "yas-marina-circuit": { folder: "Abu-Dhabi", code: "abu" },
};

export const TrackDetail = () => {
  const { trackName } = useParams();
  const { isTrackFavorite, toggleFavoriteTrack } = useFavorites();

  const { isAuthed, loading } = useAuth();

  const key = trackName ? ["/tracks", trackName] : null;

  const {
    data: track,
    isLoading,
    error,
  } = useSWR(key, ([url, slug]) => getBySlug(url, slug));

  if (isLoading || !track) {
    return <AsyncData loading={isLoading} error={error} />;
  }

  // Image logic
  const details = TRACK_URL_MAPPING[trackName];
  const imageUrl = details
    ? `${BASE_URL_TRACKS}/${details.folder}${CONSTANT_IMAGE_PART}_${details.code}_outline.png${VERSION_PARAM}`
    : "fallback-image-url.png";

  const isFavorite = isTrackFavorite(track.id);

  const handleToggleFavorite = async () => {
  
    if (!isAuthed || loading) return; // Preventie

    try {
      // Roep de back-end aan om de favoriet te togglen
      await toggleFavoriteTrack(track.id); 
      
    } catch (e) {
      console.error("Fout bij het togglen van favoriet:", e);
    }
  };

  return (
    <main className="track-detail-page" style={{ padding: 24 }}>
      <Link
        to="/tracks"
        className="py-2 px-2.5 rounded-md text-red-600 mb-20 left-0"
      >
        Terug
      </Link>

      <div className="max-w-4xl mx-auto">
        <div
          className={[
            "bg-transparent",
            "w-full",
            "rounded-2xl",
            "grid",
            "grid-cols-1 sm:grid-cols-2",
            "overflow-hidden",
            "transition-transform",
          ].join(" ")}
        >
          <img
            className="h-full w-full object-cover rounded-2xl mt-3"
            src={imageUrl}
            alt={track.name}
          />

          <div className="grid grid-cols-2 gap-y-2 text-white p-8 self-center">
            <div className="flex justify-between items-center col-span-2 mb-2">
              <p className="text-5xl font-bold col-span-2 leading-tight mb-2">
                {track.name}
              </p>
              {isAuthed && (
                <button onClick={handleToggleFavorite} disabled={loading}>
                  <FaStar 
                    className={`w-8 h-8 transition-colors ${
                      isFavorite ? "text-yellow-400" : "text-gray-500 hover:text-yellow-200"
                    }`}
                  />
                </button>
              )}
            </div>
            <p className="text-base font-semibold text-gray-400">Location</p>
            <p className="text-xl text-right pr-3">{track.location}</p>

            <p className="text-base font-semibold text-gray-400">Length</p>
            <p className="text-xl text-right pr-3">{track.lengthKm} km</p>

            <p className="text-base font-semibold text-gray-400">Laps</p>
            <p className="text-xl text-right pr-3">{track.laps}</p>

            <p className="text-base font-semibold text-gray-400">Fastest lap</p>
            <p className="text-xl text-right pr-3">{track.fastestLapTime}</p>

            <p className="text-base font-semibold text-gray-400">Driver</p>
            <p className="text-xl text-right pr-3">{track.fastestLapDriver}</p>

            <p className="text-base font-semibold text-gray-400">Year</p>
            <p className="text-xl text-right pr-3">{track.fastestLapYear}</p>
          </div>
        </div>
      </div>
    </main>
  );
};
