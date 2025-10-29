import { useParams,Link } from "react-router-dom";
import { getTrackBySlug } from "../../api/mock-tracks";

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

  const {name, photo, location, length_km, laps, fastest_lap} = foundTrack;

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
            src={photo}
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

