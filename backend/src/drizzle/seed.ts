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
      name: 'Circuit de Spa-Francorchamps',
      location: 'Stavelot, Belgium',
      lengthKm: '7.004',
      laps: 44,
      fastestLapTime: '1:46.286',
      fastestLapDriver: 'Valtteri Bottas',
      fastestLapYear: 2018,
      slug: 'spa-francorchamps',
    },
    {
      id: 2,
      name: 'Monza',
      location: 'Monza, Italy',
      lengthKm: '5.793',
      laps: 53,
      fastestLapTime: '1:21.046',
      fastestLapDriver: 'Rubens Barrichello',
      fastestLapYear: 2004,
      slug: 'monza',
    },
    // Voeg hier meer circuits toe...
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
