import { drizzle } from 'drizzle-orm/mysql2';
import * as mysql from 'mysql2/promise';
import * as schema from './schema';
import * as argon2 from 'argon2';

const connection = mysql.createPool({
  uri: process.env.DATABASE_URL,
  connectionLimit: 5,
});

const db = drizzle(connection, {
  schema,
  mode: 'default',
});

async function hashPassword(password: string): Promise<string> {
  return argon2.hash(password, {
    type: argon2.argon2id,
    hashLength: 32,
    timeCost: 2,
    memoryCost: 2 ** 16,
  });
}

async function resetDatabase() {
  console.log('🗑️ Database leegmaken...');
  await db.delete(schema.news);
  await db.delete(schema.drivers);
  await db.delete(schema.teams);
  await db.delete(schema.tracks);
  await db.delete(schema.users);
  await db.delete(schema.calendar);
  await db.delete(schema.races);
  console.log('✅ Database leegmaken voltooid\n');
}

async function seedUsers() {
  console.log('👥 Gebruikers zaaien...');
  await db.insert(schema.users).values([
    {
      id: 1,
      name: 'Admin User',
      email: 'admin@f1site.com',
      passwordHash: await hashPassword('testPassword'),
      birthdate: new Date(1990, 0, 1),
      isAdmin: true,
      dateJoined: new Date(2025, 0, 1),
    },
    {
      id: 2,
      name: 'Regular Fan',
      email: 'fan@f1site.com',
      passwordHash: await hashPassword('testPassword2'),
      birthdate: new Date(1995, 5, 15),
      isAdmin: false,
      dateJoined: new Date(2025, 0, 15),
    },
  ]);
  console.log('✅ Gebruikers succesvol gezaaid\n');
}
async function seedCalendar() {
  console.log('📅 Kalender zaaien...');

  await db.insert(schema.calendar).values([
    {
      year: 2025,
      nrOfRaces: 24,
    },
    {
      year: 2024,
      nrOfRaces: 22,
    },
  ]);

  console.log('✅ Kalender succesvol gezaaid\n');
}

async function seedRaces() {
  console.log('🏎️ Races zaaien...');

  await db.insert(schema.races).values([
    {
      id: 1,
      date: new Date(2025, 2, 14, 15, 0),
      weather: 'Sunny',
      trackRecord: '1:31.447',
      trackId: 1,
      calendarYear: 2025,
      slug: 'belgian-gp-2025',
    },
    {
      id: 2,
      date: new Date(2025, 8, 7, 15, 0),
      weather: 'Clear',
      trackRecord: '1:21.046',
      trackId: 2,
      calendarYear: 2025,
      slug: 'italian-gp-2025',
    },
    {
      id: 3,
      date: new Date(2024, 6, 30, 15, 0),
      weather: 'Rainy',
      trackRecord: '1:46.286',
      trackId: 1,
      calendarYear: 2024,
      slug: 'belgian-gp-2024',
    },
  ]);

  console.log('✅ Races succesvol gezaaid\n');
}

async function seedTeams() {
  await db.insert(schema.teams).values([
    {
      id: 1,
      name: 'Red Bull Racing',
      base: 'Milton Keynes, UK',
      chief: 'Christian Horner',
      championships: 6,
      logo: '../../teamLogos/redbull.png',
      car: '../../teamCars/2025redbullracingcarright.avif',
      info: 'Red Bull Racing is een van de meest succesvolle teams van de afgelopen tien jaar, bekend om zijn agressieve designfilosofie onder leiding van Adrian Newey.',
      primaryColor: '#3671C6',
      slug: 'red-bull-racing',
    },
    {
      id: 2,
      name: 'Scuderia Ferrari',
      base: 'Maranello, Italy',
      chief: 'Frédéric Vasseur',
      championships: 16,
      logo: '../../teamLogos/ferrari.png',
      car: '../../teamCars/2025ferraricarright.avif',
      info: 'Het oudste en meest succesvolle team in de geschiedenis van de Formule 1. Ferrari staat synoniem voor de sport.',
      primaryColor: '#DC0000',
      slug: 'scuderia-ferrari',
    },
    {
      id: 3,
      name: 'Mercedes-AMG Petronas',
      base: 'Brackley, UK',
      chief: 'Toto Wolff',
      championships: 8,
      logo: '../../teamLogos/mercedes.png',
      car: '../../teamCars/2025mercedescarright.avif',
      info: 'Mercedes domineerde het hybridetijdperk van 2014 tot 2021. Ze staan bekend om hun technische uitmuntendheid en teammanagement.',
      primaryColor: '#00A99D',
      slug: 'mercedes-amg-petronas',
    },
    {
      id: 4,
      name: 'McLaren F1 Team',
      base: 'Woking, UK',
      chief: 'Andrea Stella',
      championships: 8,
      logo: '../../teamLogos/mclaren.png',
      car: '../../teamCars/2025mclarencarright.avif',
      info: 'McLaren is een historisch team dat bekend staat om zijn papaja-oranje kleurstelling en ambitie om terug te keren naar de top.',
      primaryColor: '#FF8700',
      slug: 'mclaren-f1',
    },
    {
      id: 5,
      name: 'Aston Martin Aramco F1',
      base: 'Silverstone, UK',
      chief: 'Mike Krack',
      championships: 0,
      logo: '../../teamLogos/aston-martin.png',
      car: '../../teamCars/2025astonmartincarright.avif',
      info: 'Het iconische Britse merk streeft ernaar een topteam te worden met aanzienlijke investeringen en ambitieuze doelen.',
      primaryColor: '#006F62',
      slug: 'aston-martin-f1',
    },
    {
      id: 6,
      name: 'BWT Alpine F1 Team',
      base: 'Enstone, UK',
      chief: 'Bruno Famin',
      championships: 2,
      logo: '../../teamLogos/alpine.png',
      car: '../../teamCars/2025alpinecarright.avif',
      info: 'Het Franse fabrieksteam met sterke banden met Renault. Bekend om hun opvallende blauw-roze livery.',
      primaryColor: '#0090FF',
      slug: 'bwt-alpine-f1',
    },
    {
      id: 7,
      name: 'Williams Racing',
      base: 'Grove, UK',
      chief: 'James Vowles',
      championships: 9,
      logo: '../../teamLogos/williams.png',
      car: '../../teamCars/2025williamscarright.avif',
      info: 'Een van de meest succesvolle teams in de F1-geschiedenis, nu gericht op een heropleving onder nieuw leiderschap.',
      primaryColor: '#00a1df',
      slug: 'williams-racing',
    },
    {
      id: 8,
      name: 'Kick Sauber F1 Team',
      base: 'Hinwil, Switzerland',
      chief: 'Alessandro Alunni Bravi',
      championships: 0,
      logo: '../../teamLogos/kick.webp',
      car: '../../teamCars/2025kicksaubercarright.avif',
      info: 'Het Zwitserse team, bekend als Alfa Romeo, opereert nu als Kick Sauber in afwachting van de overname door Audi.',
      primaryColor: '#00E07A',
      slug: 'kick-sauber-f1',
    },
    {
      id: 9,
      name: 'Haas F1 Team',
      base: 'Kannapolis, US',
      chief: 'Ayao Komatsu',
      championships: 0,
      logo: '../../teamLogos/haas.webp',
      car: '../../teamCars/2025haasf1teamcarright.avif',
      info: 'Het Amerikaanse team, opgericht door Gene Haas, richt zich op consistentie en maximale efficiëntie.',
      primaryColor: '#B6BABD',
      slug: 'haas-f1',
    },
    {
      id: 10,
      name: 'Visa Cash App Racing Bulls',
      base: 'Faenza, Italy',
      chief: 'Laurent Mekies',
      championships: 0,
      logo: '../../teamLogos/visa-rb.png',
      car: '../../teamCars/2025racingbullscarright.avif',
      info: 'Het zusterteam van Red Bull Racing, gericht op het ontwikkelen van jong talent. Voorheen bekend als AlphaTauri en Toro Rosso.',
      primaryColor: '#4B92DB',
      slug: 'visa-cash-app-racing-bulls',
    },
  ]);
  console.log('✅ Teams succesvol gezaaid\n');
}

async function seedDrivers() {
  console.log('🧑‍🚀 Coureurs zaaien...');
  await db.insert(schema.drivers).values([
    {
      id: 1,
      name: 'Max Verstappen',
      number: 33,
      country: 'NL',
      photo: '../../driverHeadshots/max-verstappen.jpg',
      slug: 'max-verstappen',
      teamId: 1, // Red Bull Racing
    },
    {
      id: 2,
      name: 'Yuki Tsunoda',
      number: 22,
      country: 'JP',
      photo: '../../driverHeadshots/yuki-tsunoda.webp',
      slug: 'yuki-tsunoda',
      teamId: 1, // Red Bull Racing
    },
    {
      id: 3,
      name: 'Lewis Hamilton',
      number: 44,
      country: 'GB',
      photo: '../../driverHeadshots/lewis-hamilton.png',
      slug: 'lewis-hamilton',
      teamId: 2, // Scuderia Ferrari
    },
    {
      id: 4,
      name: 'Charles Leclerc',
      number: 16,
      country: 'MC',
      photo: '../../driverHeadshots/charles-leclerc.png',
      slug: 'charles-leclerc',
      teamId: 2, // Scuderia Ferrari
    },
    {
      id: 5,
      name: 'Lando Norris',
      number: 4,
      country: 'GB',
      photo: '../../driverHeadshots/lando-norris.png',
      slug: 'lando-norris',
      teamId: 3, // McLaren F1 Team
    },
    {
      id: 6,
      name: 'Oscar Piastri',
      number: 81,
      country: 'AU',
      photo: '../../driverHeadshots/oscar-piastri.png',
      slug: 'oscar-piastri',
      teamId: 3, // McLaren F1 Team
    },
    {
      id: 7,
      name: 'George Russell',
      number: 63,
      country: 'GB',
      photo: '../../driverHeadshots/george-russel.png',
      slug: 'george-russell',
      teamId: 4, // Mercedes-AMG Petronas
    },
    {
      id: 8,
      name: 'Kimi Antonelli',
      number: 12,
      country: 'IT',
      photo: '../../driverHeadshots/kimi-antonelli.png',
      slug: 'kimi-antonelli',
      teamId: 4, // Mercedes-AMG Petronas
    },
    {
      id: 9,
      name: 'Fernando Alonso',
      number: 14,
      country: 'ES',
      photo: '../../driverHeadshots/fernando-alonso.png',
      slug: 'fernando-alonso',
      teamId: 5, // Aston Martin Aramco F1
    },
    {
      id: 10,
      name: 'Lance Stroll',
      number: 18,
      country: 'CA',
      photo: '../../driverHeadshots/lance-stroll.png',
      slug: 'lance-stroll',
      teamId: 5, // Aston Martin Aramco F1
    },
    {
      id: 11,
      name: 'Pierre Gasly',
      number: 10,
      country: 'FR',
      photo: '../../driverHeadshots/pierre-gasly.png',
      slug: 'pierre-gasly',
      teamId: 6, // BWT Alpine F1 Team
    },
    {
      id: 12,
      name: 'Franco Colapinto',
      number: 7,
      country: 'AR',
      photo: '../../driverHeadshots/franco-calopinto.webp',
      slug: 'franco-colapinto',
      teamId: 6, // BWT Alpine F1 Team
    },
    {
      id: 13,
      name: 'Alex Albon',
      number: 23,
      country: 'TH',
      photo: '../../driverHeadshots/alexander-albon.png',
      slug: 'alex-albon',
      teamId: 7, // Williams Racing
    },
    {
      id: 14,
      name: 'Carlos Sainz',
      number: 55,
      country: 'ES',
      photo: '../../driverHeadshots/carlos-sainz.jpeg',
      slug: 'carlos-sainz',
      teamId: 7, // Williams Racing
    },
    {
      id: 15,
      name: 'Nico Hülkenberg',
      number: 27,
      country: 'DE',
      photo: '../../driverHeadshots/nico-hulkenberg.png',
      slug: 'nico-hulkenberg',
      teamId: 8, // Kick Sauber F1 Team
    },
    {
      id: 16,
      name: 'Gabriel Bortoleto',
      number: 5,
      country: 'BR',
      photo: '../../driverHeadshots/gabriel-bortoleto.png',
      slug: 'gabriel-bortoleto',
      teamId: 8, // Kick Sauber F1 Team
    },
    {
      id: 17,
      name: 'Oliver Bearman',
      number: 77,
      country: 'GB',
      photo: '../../driverHeadshots/oliver-bearman.png',
      slug: 'oliver-bearman',
      teamId: 9, // Haas F1 Team
    },
    {
      id: 18,
      name: 'Esteban Ocon',
      number: 31,
      country: 'FR',
      photo: '../../driverHeadshots/esteban-ocon.png',
      slug: 'esteban-ocon',
      teamId: 9, // Haas F1 Team
    },
    {
      id: 19,
      name: 'Liam Lawson',
      number: 30,
      country: 'NZ',
      photo: '../../driverHeadshots/liam-lawson.png',
      slug: 'liam-lawson',
      teamId: 10, // Visa Cash App Racing Bulls
    },
    {
      id: 20,
      name: 'Isack Hadjar',
      number: 6,
      country: 'FR',
      photo: '../../driverHeadshots/isack-hadjar.png',
      slug: 'isack-hadjar',
      teamId: 10, // Visa Cash App Racing Bulls
    },
  ]);
  console.log('✅ Coureurs succesvol gezaaid\n');
}

async function seedTracks() {
  console.log('🛣️ Circuits zaaien...');
  await db.insert(schema.tracks).values([
    {
      id: 1,
      name: 'Bahrain International Circuit',
      location: 'Sakhir, Bahrain',
      lengthKm: '5.412',
      laps: 57,
      fastestLapTime: '1:31.447',
      fastestLapDriver: 'Pedro de la Rosa',
      fastestLapYear: 2005,
      slug: 'bahrain-international-circuit',
    },
    {
      id: 2,
      name: 'Jeddah Corniche Circuit',
      location: 'Jeddah, Saudi Arabia',
      lengthKm: '6.174',
      laps: 50,
      fastestLapTime: '1:30.734',
      fastestLapDriver: 'Lewis Hamilton',
      fastestLapYear: 2021,
      slug: 'jeddah-corniche-circuit',
    },
    {
      id: 3,
      name: 'Albert Park Circuit',
      location: 'Melbourne, Australia',
      lengthKm: '5.278',
      laps: 58,
      fastestLapTime: '1:19.813',
      fastestLapDriver: 'Charles Leclerc',
      fastestLapYear: 2024,
      slug: 'albert-park-circuit',
    },
    {
      id: 4,
      name: 'Suzuka International Racing Course',
      location: 'Suzuka City, Japan',
      lengthKm: '5.807',
      laps: 53,
      fastestLapTime: '1:30.965',
      fastestLapDriver: 'Andrea Kimi Antonelli',
      fastestLapYear: 2025,
      slug: 'suzuka-international-racing-course',
    },
    {
      id: 5,
      name: 'Shanghai International Circuit',
      location: 'Shanghai, China',
      lengthKm: '5.451',
      laps: 56,
      fastestLapTime: '1:32.238',
      fastestLapDriver: 'Michael Schumacher',
      fastestLapYear: 2004,
      slug: 'shanghai-international-circuit',
    },
    {
      id: 6,
      name: 'Miami International Autodrome',
      location: 'Miami, United States',
      lengthKm: '5.412',
      laps: 57,
      fastestLapTime: '1:29.708',
      fastestLapDriver: 'Max Verstappen',
      fastestLapYear: 2023,
      slug: 'miami-international-autodrome',
    },
    {
      id: 7,
      name: 'Autodromo Enzo e Dino Ferrari (Imola)',
      location: 'Imola, Italy',
      lengthKm: '4.909',
      laps: 63,
      fastestLapTime: '1:15.484',
      fastestLapDriver: 'Lewis Hamilton',
      fastestLapYear: 2020,
      slug: 'autodromo-enzo-e-dino-ferrari-imola',
    },
    {
      id: 8,
      name: 'Circuit de Monaco',
      location: 'Monte Carlo, Monaco',
      lengthKm: '3.337',
      laps: 78,
      fastestLapTime: '1:12.909',
      fastestLapDriver: 'Lewis Hamilton',
      fastestLapYear: 2021,
      slug: 'circuit-de-monaco',
    },
    {
      id: 9,
      name: 'Circuit de Barcelona-Catalunya',
      location: 'Barcelona, Spain',
      lengthKm: '4.657',
      laps: 66,
      fastestLapTime: '1:15.743',
      fastestLapDriver: 'Oscar Piastri',
      fastestLapYear: 2025,
      slug: 'circuit-de-barcelona-catalunya',
    },
    {
      id: 10,
      name: 'Circuit Gilles Villeneuve',
      location: 'Montreal, Canada',
      lengthKm: '4.361',
      laps: 70,
      fastestLapTime: '1:13.078',
      fastestLapDriver: 'Valtteri Bottas',
      fastestLapYear: 2019,
      slug: 'circuit-gilles-villeneuve',
    },
    {
      id: 11,
      name: 'Red Bull Ring',
      location: 'Spielberg, Austria',
      lengthKm: '4.318',
      laps: 71,
      fastestLapTime: '1:05.619',
      fastestLapDriver: 'Max Verstappen',
      fastestLapYear: 2023,
      slug: 'red-bull-ring',
    },
    {
      id: 12,
      name: 'Silverstone Circuit',
      location: 'Silverstone, United Kingdom',
      lengthKm: '5.891',
      laps: 52,
      fastestLapTime: '1:27.097',
      fastestLapDriver: 'Max Verstappen',
      fastestLapYear: 2020,
      slug: 'silverstone-circuit',
    },
    {
      id: 13,
      name: 'Hungaroring',
      location: 'Mogyoród, Hungary',
      lengthKm: '4.381',
      laps: 70,
      fastestLapTime: '1:16.627',
      fastestLapDriver: 'Lewis Hamilton',
      fastestLapYear: 2020,
      slug: 'hungaroring',
    },
    {
      id: 14,
      name: 'Circuit de Spa-Francorchamps',
      location: 'Stavelot, Belgium',
      lengthKm: '7.004',
      laps: 44,
      fastestLapTime: '1:44.701',
      fastestLapDriver: 'Sergio Perez',
      fastestLapYear: 2024,
      slug: 'circuit-de-spa-francorchamps',
    },
    {
      id: 15,
      name: 'Circuit Zandvoort',
      location: 'Zandvoort, Netherlands',
      lengthKm: '4.259',
      laps: 72,
      fastestLapTime: '1:11.097',
      fastestLapDriver: 'Lewis Hamilton',
      fastestLapYear: 2021,
      slug: 'circuit-zandvoort',
    },
    {
      id: 16,
      name: 'Autodromo Nazionale Monza',
      location: 'Monza, Italy',
      lengthKm: '5.793',
      laps: 53,
      fastestLapTime: '1:20.901',
      fastestLapDriver: 'Lando Norris',
      fastestLapYear: 2025,
      slug: 'autodromo-nazionale-monza',
    },
    {
      id: 17,
      name: 'Baku City Circuit',
      location: 'Baku, Azerbaijan',
      lengthKm: '6.003',
      laps: 51,
      fastestLapTime: '1:43.009',
      fastestLapDriver: 'Charles Leclerc',
      fastestLapYear: 2019,
      slug: 'baku-city-circuit',
    },
    {
      id: 18,
      name: 'Marina Bay Street Circuit',
      location: 'Marina Bay, Singapore',
      lengthKm: '5.065',
      laps: 62,
      fastestLapTime: '1:41.905',
      fastestLapDriver: 'Kevin Magnussen',
      fastestLapYear: 2018,
      slug: 'marina-bay-street-circuit',
    },
    {
      id: 19,
      name: 'Circuit of the Americas (COTA)',
      location: 'Austin, United States',
      lengthKm: '5.513',
      laps: 56,
      fastestLapTime: '1:36.169',
      fastestLapDriver: 'Charles Leclerc',
      fastestLapYear: 2019,
      slug: 'circuit-of-the-americas-cota',
    },
    {
      id: 20,
      name: 'Autódromo Hermanos Rodríguez',
      location: 'Mexico City, Mexico',
      lengthKm: '4.304',
      laps: 71,
      fastestLapTime: '1:17.774',
      fastestLapDriver: 'Valtteri Bottas',
      fastestLapYear: 2021,
      slug: 'autodromo-hermanos-rodriguez',
    },
    {
      id: 21,
      name: 'Autódromo José Carlos Pace (Interlagos)',
      location: 'São Paulo, Brazil',
      lengthKm: '4.309',
      laps: 71,
      fastestLapTime: '1:10.540',
      fastestLapDriver: 'Valtteri Bottas',
      fastestLapYear: 2021,
      slug: 'autodromo-jose-carlos-pace-interlagos',
    },
    {
      id: 22,
      name: 'Las Vegas Strip Circuit',
      location: 'Las Vegas, United States',
      lengthKm: '6.201',
      laps: 50,
      fastestLapTime: '1:34.876',
      fastestLapDriver: 'Lando Norris',
      fastestLapYear: 2024,
      slug: 'las-vegas-strip-circuit',
    },
    {
      id: 23,
      name: 'Lusail International Circuit',
      location: 'Lusail, Qatar',
      lengthKm: '5.419',
      laps: 57,
      fastestLapTime: '1:24.319',
      fastestLapDriver: 'Lando Norris',
      fastestLapYear: 2023,
      slug: 'lusail-international-circuit',
    },
    {
      id: 24,
      name: 'Yas Marina Circuit',
      location: 'Abu Dhabi, UAE',
      lengthKm: '5.554',
      laps: 58,
      fastestLapTime: '1:23.196',
      fastestLapDriver: 'Max Verstappen',
      fastestLapYear: 2021,
      slug: 'yas-marina-circuit',
    },
  ]);
  console.log('✅ Circuits succesvol gezaaid\n');
}

async function seedNews() {
  console.log('📰 Nieuws zaaien...');
  await db.insert(schema.news).values([
    {
      id: 1,
      title: 'Verstappen wint de Grand Prix van België',
      summary:
        'Max Verstappen behaalt een dominante overwinning op Spa-Francorchamps na een spannende start.',
      fullContent:
        'Het volledige verslag van de race, met analyses van de bandenstrategie en inhaalmanoeuvres...',
      imageUrl: '/nieuws/spa_winst.jpg',
      date: new Date(2024, 6, 30, 15, 0), // 30 juli 2024
      tags: 'Verstappen, Red Bull, Spa-Francorchamps',
      authorId: 1, // Admin User
      trackId: 1, // Spa-Francorchamps
    },
    {
      id: 2,
      title: 'Mercedes kondigt upgrades aan voor Monza',
      summary:
        'Het Mercedes-team hoopt met nieuwe onderdelen de achterstand op Red Bull te dichten tijdens de Grand Prix van Italië.',
      fullContent:
        'Details over de nieuwe voorvleugel en vloer die het team in Monza zal introduceren...',
      imageUrl: '/nieuws/mercedes_monza.jpg',
      date: new Date(2024, 7, 25, 10, 0), // 25 augustus 2024
      tags: 'Mercedes, Monza, Upgrades',
      authorId: 1, // Admin User
      trackId: 2, // Monza
    },
    // Voeg hier meer nieuwsitems toe...
  ]);
  console.log('✅ Nieuws succesvol gezaaid\n');
}

async function main() {
  console.log('🌱 Database seeding starten...\n');

  await resetDatabase();
  await seedUsers();
  await seedTeams();
  await seedDrivers();
  await seedTracks();
  await seedCalendar();
  await seedRaces();
  await seedNews();

  console.log('🎉 Database seeding succesvol voltooid!');
}

main()
  .then(async () => {
    await connection.end();
  })
  .catch(async (e) => {
    console.error(e);
    await connection.end();
    process.exit(1);
  });
