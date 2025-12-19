//import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import DriverCard from "../components/drivers/DriverCard.jsx";
import { slug } from "../utils/slugify.js";
import "./Drivers.css";
import useSWR from "swr";
import AsyncData from "../components/AsyncData.jsx";
import { getAll } from "../api/index.js";
import { useFavorites } from "../hooks/useFavorites.js";
import { getAssetUrl } from "./utils/getImage.js";

const Drivers = () => {
  const { isDriverFavorite, toggleFavoriteDriver } = useFavorites();

  const navigate = useNavigate();

  const handleDriverClick = (driver) => {
    const driverName = slug(driver.name);
    navigate(`/drivers/${driverName}`);
  };

  const { data: drivers = [], isLoading, error } = useSWR("drivers", getAll);

  if (error) {
    return (
      <div className="error-container">
        <p>Fout bij het ophalen van coureurs</p>
      </div>
    );
  }

  return (
    <main className="drivers-page" style={{ padding: 24 }}>
      <h1 className="text-5xl font-black uppercase tracking-tighter">
        F1 <span className="text-red-600">Drivers</span>
      </h1>
      <div className="drivers-grid">
        <AsyncData loading={isLoading} error={error}>
          {Array.isArray(drivers) &&
            drivers.map((d) => (
              <DriverCard
                key={d.id}
                name={d.name}
                team={d.team.name}
                number={d.number}
                photo={getAssetUrl("driverHeadshots", d.photo)}
                country={d.country}
                isFavorite={isDriverFavorite(d.id)}
                onToggleFavorite={() => toggleFavoriteDriver(d.id)}
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
