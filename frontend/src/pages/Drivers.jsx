import React from "react";
import DriverCard from "../components/DriverCard.jsx"; // component moet nog aangepast worden :)

const drivers = [
  {
    id: 1,
    name: "Max Verstappen",
    team: "Red Bull Racing",
    number: 33,
    photo:
      "https://thumbs.dreamstime.com/b/vector-placeholder-upload-profile-picture-design-" +
      "minimalistic-features-simple-circular-symbol-representing-352593011.jpg",
    bio: "Aggressive racer, multiple-time world champion",
  },
  {
    id: 2,
    name: "Lewis Hamilton",
    team: "Mercedes",
    number: 44,
    photo:
      "https://thumbs.dreamstime.com/b/vector-placeholder-upload-profile-picture-design-" +
      "minimalistic-features-simple-circular-symbol-representing-352593011.jpg",
    bio: "Experienced driver with many wins",
  },
  {
    id: 3,
    name: "Lando Norris",
    team: "McLaren",
    number: 4,
    photo:
      "https://thumbs.dreamstime.com/b/vector-placeholder-upload-profile-picture-design-" +
      "minimalistic-features-simple-circular-symbol-representing-352593011.jpg",
    bio: "Young talent with strong pace",
  },
];

export default function Drivers() {
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
        {drivers.map((d) => (
          <DriverCard
            key={d.id}
            name={d.name}
            team={d.team}
            number={d.number}
            photo={d.photo}
            bio={d.bio}
          />
        ))}
      </div>
    </main>
  );
}
