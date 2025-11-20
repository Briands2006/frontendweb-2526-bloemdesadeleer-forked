//import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import DriverCard from "../components/drivers/DriverCard.jsx";
import { DRIVERS, slug } from "../api/mock-data.js";
import "./Drivers.css";
import useSWR from "swr";
import AsyncData from "../components/AsyncData.jsx";
import { getAll } from "../api/index.js";

const Drivers = () => {
  //const [selectedDriver, setSelectedDriver] = useState(null);
  // initialiseer state voor geselecteerde driver, deze is dus null bij start
  //const deselectDriver = () => //setSelectedDriver(null); // functie om geselecteerde driver te deselecteren
  const navigate = useNavigate();

  const handleDriverClick = (driver) => {
    const driverName = slug(driver.name);
    navigate(`/drivers/${driverName}`);
  };

  const { data: drivers = [], isLoading, error } = useSWR("drivers", getAll);

  return (
    <main className="drivers-page" style={{ padding: 24 }}>
      <h1 className="text-5xl font-extrabold pb-4">F1 Drivers 2025</h1>
      <p className="mb-8">The F1 drivers for the 2025 season</p>
      <div className="drivers-grid">
        <AsyncData loading={isLoading} error={error}>
          {Array.isArray(drivers) && drivers.map((d) => (
            <DriverCard
              key={d.id}
              name={d.name}
              team={d.team.name}
              number={d.number}
              photo={d.photo}
              country={d.country}
              onClick={() => {
                handleDriverClick(d);
              }}
            />
          ))}
        </AsyncData>
      </div>
    </main>
  );
};

export default Drivers;
