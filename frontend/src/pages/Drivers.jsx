import { React, useState } from "react";
import DriverCard from "../components/DriverCard.jsx";
import { DRIVERS } from "../api/mock-data.js"; // component moet nog aangepast worden :)

export default function Drivers() {
  const [selectedDriver, setSelectedDriver] = useState(null); // initialiseer state voor geselecteerde driver, deze is dus null bij start
  const deselectDriver = () => setSelectedDriver(null); // functie om geselecteerde driver te deselecteren

  return (
    <main className="drivers-page" style={{ padding: 24 }}>
      <h1>Drivers</h1>
      <div
        className="drivers-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(240px, 1fr))",
          gap: 16,
          marginTop: 16,
        }}
      >
        {DRIVERS.map((d) => (
          <DriverCard
            key={d.id}
            name={d.name}
            team={d.team}
            number={d.number}
            photo={d.photo}
            country={d.country}
            onClick={() => {
              setSelectedDriver(d);
              alert(`You selected ${d.name}`);
            }
            }
          />
        ))}
      </div>
      {selectedDriver && (
        <div
          onClick={deselectDriver}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-gray-900 text-white rounded-2xl p-6 max-w-md w-[90%] relative animate-scaleIn"
          >
            <button
              onClick={deselectDriver}
              className="absolute top-3 right-3 text-gray-400 hover:text-white text-2xl leading-none"
            >
              ×
            </button>

            <img
              src={selectedDriver.photo}
              alt={selectedDriver.name}
              className="w-32 h-32 rounded-full mx-auto mb-4 object-cover shadow-lg"
            />
            <h2 className="text-3xl font-bold text-center mb-2">
              {selectedDriver.name}
            </h2>
            <p className="text-center text-gray-400 mb-4">{selectedDriver.team}</p>

            <div className="grid grid-cols-2 gap-y-2 text-sm">
              <p className="font-semibold text-gray-400">Car Number</p>
              <p className="text-right">#{selectedDriver.number}</p>

              <p className="font-semibold text-gray-400">Country</p>
              <p className="text-right">{selectedDriver.country}</p>
            </div>

            <button
              onClick={deselectDriver}
              className="mt-6 w-full bg-red-600 hover:bg-red-700 transition-colors py-2 rounded-lg font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
