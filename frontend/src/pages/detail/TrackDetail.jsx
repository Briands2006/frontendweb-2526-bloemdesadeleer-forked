import { useParams,Link } from "react-router-dom";
import { getTrackBySlug } from "../../api/mock-tracks";

// constants
const BASE_URL_TRACKS = "https://cdn.racingnews365.com/Circuits";
const CONSTANT_IMAGE_PART = "/_503xAUTO_crop_center-center_none/f1_2024";
const VERSION_PARAM = "?v=1708703502";

// mapping
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

export const TrackDetail = () => {
  const {trackName} = useParams();
    
  if(!trackName) {
    return (
      <main style={{ padding: 24 }}>
        <h1>404 - Track niet gevonden </h1>
        <Link to="/tracks">Terug</Link>
      </main>
    ); 
  }

  const foundTrack = getTrackBySlug(trackName);

  if (!foundTrack) {
    return (
      <main style={{ padding: 24 }}>
        <h1>404 - Track niet gevonden </h1>
        <Link to="/tracks">Terug</Link>
      </main>
    );
  }

  const details = TRACK_URL_MAPPING[trackName];
  let imageUrl = null;

  if (details) {
    const imagePath = `${details.folder}${CONSTANT_IMAGE_PART}_${details.code}_outline.png`;
    imageUrl = `${BASE_URL_TRACKS}/${imagePath}${VERSION_PARAM}`;
  }
  
  const photoUrl = imageUrl || foundTrack.photo || "fallback-image-url.png";

  const {name, location, length_km, laps, fastest_lap} = foundTrack;

  return (
    <main className="track-detail-page" style={{ padding: 24 }}>
      <Link
        to="/tracks"
        className="py-2 px-2.5 rounded-md text-red-600 mb-20 left-0"
      >
        Terug
      </Link>
      <div
        // Centrum de kaart op de pagina en geef het een vaste grootte
        className="max-w-4xl mx-auto"
      >
        <div
          className={[
            "bg-gray-90oshadow-2xl",
            "rounded-2xl",
            "grid",
            "grid-cols-2",
            "overflow-hidden",
            "transition-transform",
          ].join(" ")}
        >
          <img
            className="h-full w-full object-cover rounded-2xl mt-3"
            src={photoUrl}
            alt={name}
          />

          <div className="grid grid-cols-2 gap-y-2 text-white p-8 self-center">
            <p className="text-5xl font-bold col-span-2 leading-tight mb-2">
              {name}
            </p>

            <p className="text-base font-semibold col-span-1 text-gray-400">
              Location
            </p>
            <p className="text-xl text-right pr-3 col-span-1">{location}</p>

            <p className="text-base font-semibold col-span-1 text-gray-400">
              Length
            </p>
            <p className="text-xl text-right pr-3 col-span-1">{length_km}</p>
            
            <p className="text-base font-semibold col-span-1 text-gray-400">
              Laps
            </p>
            <p className="text-xl text-right pr-3 col-span-1">{laps}</p>
            <p className="text-base font-semibold col-span-1 text-gray-400">
              Fastest lap
            </p>
            <p className="text-xl text-right pr-3 col-span-1">{fastest_lap.time}</p>
            <p className="text-base font-semibold col-span-1 text-gray-400 text-center">
              Driver
            </p>
            <p className="text-xl text-right pr-3 col-span-1">{fastest_lap.driver}</p>
            <p className="text-base font-semibold col-span-1 text-gray-400 text-center">
              Jaar
            </p>
            <p className="text-xl text-right pr-3 col-span-1">{fastest_lap.year}</p>
          </div>
        </div>
      </div>
    </main>
  );
};

