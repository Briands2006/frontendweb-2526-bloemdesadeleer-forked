const slug = (text) => {
  // zelfde helper functie als bij et nieuws
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

export const F1_MOCK_TRACKS = [
  {
    name: "Bahrain International Circuit",
    location: "Sakhir, Brihan",
    length_km: 5.412,
    laps: 57,
    fastest_lap: { time: "1:31.447", driver: "Pedro de la Rosa", year: 2005 },
  },
  {
    name: "Jeddah Corniche Circuit",
    location: "Jeddah, Saudi Arabia",
    length_km: 6.174,
    laps: 50,
    fastest_lap: { time: "1:30.734", driver: "Lewis Hamilton", year: 2021 },
  },
  {
    name: "Albert Park Circuit",
    location: "Melbourne, Australia",
    length_km: 5.303,
    laps: 58,
    fastest_lap: { time: "1:19.813", driver: "Charles Leclerc", year: 2024 },
  },
  {
    name: "Suzuka International Racing Course",
    location: "Suzuka, Japan",
    length_km: 5.807,
    laps: 53,
    fastest_lap: {
      time: "1:30.965",
      driver: "Andrea Kimi Antonelli",
      year: 2025,
    },
  },
  {
    name: "Shanghai International Circuit",
    location: "Shanghai, China",
    length_km: 5.451,
    laps: 56,
    fastest_lap: { time: "1:32.238", driver: "Michael Schumacher", year: 2004 },
  },
  {
    name: "Miami International Autodrome",
    location: "Miami, USA",
    length_km: 5.412,
    laps: 57,
    fastest_lap: { time: "1:29.708", driver: "Max Verstappen", year: 2023 },
  },
  {
    name: "Autodromo Enzo e Dino Ferrari (Imola)",
    location: "Imola, Italy",
    length_km: 4.909,
    laps: 63,
    fastest_lap: { time: "1:15.484", driver: "Lewis Hamilton", year: 2020 },
  },
  {
    name: "Circuit de Monaco",
    location: "Monte Carlo, Monaco",
    length_km: 3.337, // Shortest circuit, special race distance
    laps: 78,
    fastest_lap: { time: "1:12.909", driver: "Lewis Hamilton", year: 2021 },
  },
  {
    name: "Circuit de Barcelona-Catalunya",
    location: "Barcelona, Spain",
    length_km: 4.655,
    laps: 66,
    fastest_lap: { time: "1:16.330", driver: "Oscar Piastri", year: 2025 },
  },
  {
    name: "Circuit Gilles Villeneuve",
    location: "Montreal, Canada",
    length_km: 4.361,
    laps: 70,
    fastest_lap: { time: "1:13.078", driver: "Valtteri Bottas", year: 2019 },
  },
  {
    name: "Red Bull Ring",
    location: "Spielberg, Austria",
    length_km: 4.318,
    laps: 71,
    fastest_lap: { time: "1:05.619", driver: "Carlos Sainz Jr.", year: 2020 },
  },
  {
    name: "Silverstone Circuit",
    location: "Silverstone, UK",
    length_km: 5.891,
    laps: 52,
    fastest_lap: { time: "1:27.097", driver: "Max Verstappen", year: 2020 }, // Using 2020 record on current layout
  },
  {
    name: "Hungaroring",
    location: "Budapest, Hungary",
    length_km: 4.381,
    laps: 70,
    fastest_lap: { time: "1:16.627", driver: "Lewis Hamilton", year: 2020 },
  },
  {
    name: "Circuit de Spa-Francorchamps",
    location: "Spa, Belgium",
    length_km: 7.004, // Longest circuit
    laps: 44,
    fastest_lap: { time: "1:44.701", driver: "Sergio Pérez", year: 2024 },
  },
  {
    name: "Circuit Zandvoort",
    location: "Zandvoort, Netherlands",
    length_km: 4.259,
    laps: 72,
    fastest_lap: { time: "1:11.097", driver: "Lewis Hamilton", year: 2021 },
  },
  {
    name: "Autodromo Nazionale Monza",
    location: "Monza, Italy",
    length_km: 5.793,
    laps: 53,
    fastest_lap: { time: "1:20.091", driver: "Lando Norris", year: 2025 },
  },
  {
    name: "Baku City Circuit",
    location: "Baku, Azerbaijan",
    length_km: 6.003,
    laps: 51,
    fastest_lap: { time: "1:43.009", driver: "Charles Leclerc", year: 2019 },
  },
  {
    name: "Marina Bay Street Circuit",
    location: "Marina Bay, Singapore",
    length_km: 4.928, // Revised layout for 2023/2024
    laps: 62,
    fastest_lap: { time: "1:35.867", driver: "Daniel Ricciardo", year: 2024 },
  },
  {
    name: "Circuit of the Americas (COTA)",
    location: "Austin, USA",
    length_km: 5.513,
    laps: 56,
    fastest_lap: { time: "1:36.169", driver: "Charles Leclerc", year: 2019 },
  },
  {
    name: "Autódromo Hermanos Rodríguez",
    location: "Mexico City, Mexico",
    length_km: 4.304,
    laps: 71,
    fastest_lap: { time: "1:17.774", driver: "Valtteri Bottas", year: 2021 },
  },
  {
    name: "Autódromo José Carlos Pace (Interlagos)",
    location: "São Paulo, Brazil",
    length_km: 4.309,
    laps: 71,
    fastest_lap: { time: "1:10.540", driver: "Valtteri Bottas", year: 2018 },
  },
  {
    name: "Las Vegas Strip Circuit",
    location: "Las Vegas, USA",
    length_km: 6.201,
    laps: 50,
    fastest_lap: { time: "1:34.876", driver: "Lando Norris", year: 2024 },
  },
  {
    name: "Lusail International Circuit",
    location: "Lusail, Qatar",
    length_km: 5.419,
    laps: 57,
    fastest_lap: { time: "1:22.384", driver: "Lando Norris", year: 2024 },
  },
  {
    name: "Yas Marina Circuit",
    location: "Abu Dhabi, UAE",
    length_km: 5.281, // Current layout
    laps: 58,
    fastest_lap: { time: "1:26.103", driver: "Max Verstappen", year: 2021 },
  },
];

export const getTrackBySlug = (slugValue) => {
  return F1_MOCK_TRACKS.find((t) => slug(t.name) === slugValue);
};

export { slug }; // dit is een test
