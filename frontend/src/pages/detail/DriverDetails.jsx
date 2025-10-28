import { useParams, Link } from "react-router-dom";
import { getDriverBySlug } from "../../api/mock-data";

export const DriverDetails = () => {
  const { driverName } = useParams();

  if (!driverName) {
    return (
      <main style={{ padding: 24 }}>
        <h1>404 - Driver niet gevonden </h1>
        <Link to="/drivers">Terug</Link>
      </main>
    );
  }

  const foundDriver = getDriverBySlug(driverName);

  if (!foundDriver) {
    return (
      <main style={{ padding: 24 }}>
        <h1>404 - Driver niet gevonden </h1>
        <Link to="/drivers">Terug</Link>
      </main>
    );
  }

  const { name, team, number, photo, country } = foundDriver;

  return (
    <main className="driver-details-page" style={{ padding: 24 }}>
      <Link
        to="/drivers"
        className="py-2 px-2.5 rounded-md text-white font-bold border
             border-red-600 bg-red-600 mb-20 left-0"
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
              Team
            </p>
            <p className="text-xl text-right pr-3 col-span-1">{team}</p>

            <p className="text-base font-semibold col-span-1 text-gray-400">
              Car #
            </p>
            <p className="text-xl text-right pr-3 col-span-1">{number}</p>

            <p className="text-base font-semibold col-span-1 text-gray-400">
              Country
            </p>
            <p className="text-xl text-right pr-3 col-span-1">{country}</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800">Extra Details</h2>
        <p className="mt-2 text-gray-600">
          Voeg hier statistieken, biografie of carrièrehoogtepunten toe die niet
          op de kaart stonden.
        </p>
      </div>
    </main>
  );
};
