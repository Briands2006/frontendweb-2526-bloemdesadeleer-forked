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

  return (
    <main className="drivers-page" style={{ padding: 24 }}>
      <h1 className="text-5xl font-extrabold pb-4">F1 Drivers 2025</h1>
      <div className="drivers-grid">
        <AsyncData loading={isLoading} error={error}>
          {Array.isArray(drivers) &&
            drivers.map((d) => (
              console.log(getAssetUrl("driverHeadshots", d.photo)),
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
