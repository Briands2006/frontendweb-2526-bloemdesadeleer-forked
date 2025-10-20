import React from "react";
import DriverCard from "../components/DriverCard.jsx";
import { DRIVERS } from "../api/mock-data.js"; // component moet nog aangepast worden :)

export default function Drivers() {
  const [selectedDriver, setSelectedDriver] = useState(null); // initialiseer state voor geselecteerde driver, deze is dus null bij start

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
            onClick={()=> setSelectedDriver(d)}
          />
        ))}
      </div>
    </main>
  );
}
