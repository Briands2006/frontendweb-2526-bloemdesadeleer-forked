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
// mclaren logo => https://placehold.co/150x80/FF8700/000000?text=McLaren+Logo
// redbullRacing logo => https://placehold.co/150x80/0A1F67/FFFFFF?text=RBR+Logo
// ferrari logo => https://placehold.co/150x80/dc0000/FFFFFF?text=Ferrari+Logo
// mercedes logo => https://placehold.co/150x80/00A99D/000000?text=Merc+Logo
// AM => https://placehold.co/150x80/00554E/FFFFFF?text=Aston+Logo
// Haas => https://placehold.co/150x80/FFFFFF/000000?text=Haas+Logo
// Visa Cash App - Red Bull => https://placehold.co/150x80/081F48/FFFFFF?text=VCARB+Logo

const RAW_TEAMS_DATA = [
  {
    id: 1,
    name: "Red Bull Racing",
    base: "Milton Keynes, UK",
    chief: "Christian Horner",
    championships: 6,
    logo: "../../teamLogos/redbull.png",
    car: "../../teamCars/2025redbullracingcarright.avif",
    info: "Red Bull Racing is een van de meest succesvolle teams van de afgelopen tien jaar, bekend om zijn agressieve designfilosofie onder leiding van Adrian Newey.",
    primaryColor: "#3671C6",
  },
  {
    id: 2,
    name: "Scuderia Ferrari",
    base: "Maranello, Italy",
    chief: "Frédéric Vasseur",
    championships: 16,
    logo: "../../teamLogos/ferrari.png",
    car: "../../teamCars/2025ferraricarright.avif",
    info: "Het oudste en meest succesvolle team in de geschiedenis van de Formule 1. Ferrari staat synoniem voor de sport.",
    primaryColor: "#DC0000",
  },
  {
    id: 3,
    name: "Mercedes-AMG Petronas",
    base: "Brackley, UK",
    chief: "Toto Wolff",
    championships: 8,
    logo: "../../teamLogos/mercedes.png",
    car: "../../teamCars/2025mercedescarright.avif",
    info: "Mercedes domineerde het hybridetijdperk van 2014 tot 2021. Ze staan bekend om hun technische uitmuntendheid en teammanagement.",
    primaryColor: "#00A99D",
  },
  {
    id: 4,
    name: "McLaren F1 Team",
    base: "Woking, UK",
    chief: "Andrea Stella",
    championships: 8,
    logo: "../../teamLogos/mclaren.png",
    car: "../../teamCars/2025mclarencarright.avif",
    info: "McLaren is een historisch team dat bekend staat om zijn papaja-oranje kleurstelling en ambitie om terug te keren naar de top.",
    primaryColor: "#FF8700",
  },
  {
    id: 5,
    name: "Aston Martin Aramco F1",
    base: "Silverstone, UK",
    chief: "Mike Krack",
    championships: 0,
    logo: "../../teamLogos/aston-martin.png",
    car: "../../teamCars/2025astonmartincarright.avif",
    info: "Het iconische Britse merk streeft ernaar een topteam te worden met aanzienlijke investeringen en ambitieuze doelen.",
    primaryColor: "#006F62",
  },
  {
    id: 6,
    name: "BWT Alpine F1 Team",
    base: "Enstone, UK",
    chief: "Bruno Famin",
    championships: 2,
    logo: "../../teamLogos/alpine.png",
    car: "../../teamCars/2025alpinecarright.avif",
    info: "Het Franse fabrieksteam met sterke banden met Renault. Bekend om hun opvallende blauw-roze livery.",
    primaryColor: "#0090FF",
  },
  {
    id: 7,
    name: "Williams Racing",
    base: "Grove, UK",
    chief: "James Vowles",
    championships: 9,
    logo: "../../teamLogos/williams.png",
    car: "../../teamCars/2025williamscarright.avif",
    info: "Een van de meest succesvolle teams in de F1-geschiedenis, nu gericht op een heropleving onder nieuw leiderschap.",
    primaryColor: "#00a1df",
  },
  {
    id: 8,
    name: "Kick Sauber F1 Team",
    base: "Hinwil, Switzerland",
    chief: "Alessandro Alunni Bravi",
    championships: 0,
    logo: "../../teamLogos/kick.webp",
    car: "../../teamCars/2025kicksaubercarright.avif",
    info: "Het Zwitserse team, bekend als Alfa Romeo, opereert nu als Kick Sauber in afwachting van de overname door Audi.",
    primaryColor: "#00E07A",
  },
  {
    id: 9,
    name: "Haas F1 Team",
    base: "Kannapolis, US",
    chief: "Ayao Komatsu",
    championships: 0,
    logo: "../../teamLogos/haas.webp",
    car: "../../teamCars/2025haasf1teamcarright.avif",
    info: "Het Amerikaanse team, opgericht door Gene Haas, richt zich op consistentie en maximale efficiëntie.",
    primaryColor: "#B6BABD",
  },
  {
    id: 10,
    name: "Visa Cash App Racing Bulls",
    base: "Faenza, Italy",
    chief: "Laurent Mekies",
    championships: 0,
    logo: "../../teamLogos/visa-rb.png",
    car: "../../teamCars/2025racingbullscarright.avif",
    info: "Het zusterteam van Red Bull Racing, gericht op het ontwikkelen van jong talent. Voorheen bekend als AlphaTauri en Toro Rosso.",
    primaryColor: "#4B92DB",
  },
];

export const TEAMS = RAW_TEAMS_DATA.map((team) => ({
  ...team,
  slug: slug(team.name),
}));

export const RAW_DRIVERS_DATA = [
  {
    id: 1,
    name: "Max Verstappen",
    team: "Red Bull Racing",
    number: 33,
    photo: "../../driverHeadshots/max-verstappen.jpg",
    country: "NL",
  },
  {
    id: 2,
    name: "Yuki Tsunoda",
    team: "Red Bull Racing",
    number: 22,
    photo: "../../driverHeadshots/yuki-tsunoda.jpg",
    country: "JP",
  },
  {
    id: 3,
    name: "Lewis Hamilton",
    team: "Scuderia Ferrari",
    number: 44,
    photo: "../../driverHeadshots/lewis-hamilton.png",
    country: "GB",
  },
  {
    id: 4,
    name: "Charles Leclerc",
    team: "Scuderia Ferrari",
    number: 16,
    photo: "../../driverHeadshots/charles-leclerc.png",
    country: "MC",
  },
  {
    id: 5,
    name: "Lando Norris",
    team: "McLaren F1 Team",
    number: 4,
    photo: "../../driverHeadshots/lando-norris.png",
    country: "GB",
  },
  {
    id: 6,
    name: "Oscar Piastri",
    team: "McLaren F1 Team",
    number: 81,
    photo: "../../driverHeadshots/oscar-piastri.png",
    country: "AU",
  },
  {
    id: 7,
    name: "George Russell",
    team: "Mercedes-AMG Petronas",
    number: 63,
    photo: "../../driverHeadshots/george-russel.png",
    country: "GB",
  },
  {
    id: 8,
    name: "Kimi Antonelli",
    team: "Mercedes-AMG Petronas",
    number: 12,
    photo: "../../driverHeadshots/kimi-antonelli.png",
    country: "IT",
  },
  {
    id: 9,
    name: "Fernando Alonso",
    team: "Aston Martin Aramco F1",
    number: 14,
    photo: "../../driverHeadshots/fernando-alonso.png",
    country: "ES",
  },
  {
    id: 10,
    name: "Lance Stroll",
    team: "Aston Martin Aramco F1",
    number: 18,
    photo: "../../driverHeadshots/lance-stroll.png",
    country: "CA",
  },
  {
    id: 11,
    name: "Pierre Gasly",
    team: "BWT Alpine F1 Team",
    number: 10,
    photo: "../../driverHeadshots/pierre-gasly.png",
    country: "FR",
  },
  {
    id: 12,
    name: "Franco Colapinto",
    team: "BWT Alpine F1 Team",
    number: 7,
    photo: "../../driverHeadshots/franco-calopinto.webp",
    country: "AR",
  },
  {
    id: 13,
    name: "Alex Albon",
    team: "Williams Racing",
    number: 23,
    photo: "../../driverHeadshots/alexander-albon.png",
    country: "TH",
  },
  {
    id: 14,
    name: "Carlos Sainz",
    team: "Williams Racing",
    number: 55,
    photo: "../../driverHeadshots/carlos-sainz.jpeg",
    country: "ES",
  },
  {
    id: 15,
    name: "Nico Hülkenberg",
    team: "Kick Sauber F1 Team",
    number: 27,
    photo: "../../driverHeadshots/nico-hulkenberg.png",
    country: "DE",
  },
  {
    id: 16,
    name: "Gabriel Bortoleto",
    team: "Kick Sauber F1 Team",
    number: 5,
    photo: "../../driverHeadshots/gabriel-bortoleto.png",
    country: "BR",
  },
  {
    id: 17,
    name: "Oliver Bearman",
    team: "Haas F1 Team",
    number: 77,
    photo: "../../driverHeadshots/oliver-bearman.png",
    country: "GB",
  },
  {
    id: 18,
    name: "Esteban Ocon",
    team: "Haas F1 Team",
    number: 31,
    photo: "../../driverHeadshots/esteban-ocon.png",
    country: "FR",
  },
  {
    id: 19,
    name: "Liam Lawson",
    team: "Visa Cash App Racing Bulls",
    number: 30,
    photo: "../../driverHeadshots/liam-lawson.png",
    country: "NZ",
  },
  {
    id: 20,
    name: "Isack Hadjar",
    team: "Visa Cash App Racing Bulls",
    number: 6,
    photo: "../../driverHeadshots/isack-hadjar.png",
    country: "FR",
  },
];

export const DRIVERS = RAW_DRIVERS_DATA.map((driver) => ({
  ...driver,
  slug: slug(driver.name),
}));

export const getTeamBySlug = (slugValue) => {
  return TEAMS.find((team) => team.slug === slugValue);
};

export const getDriversByTeamName = (teamName) => {
  return DRIVERS.filter((driver) => driver.team === teamName);
};

export const getDriverBySlug = (slugValue) => {
  return DRIVERS.find((d) => d.slug === slugValue);
};

export { slug };
