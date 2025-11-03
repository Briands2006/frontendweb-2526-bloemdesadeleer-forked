import { drizzle } from 'drizzle-orm/mysql2';
import * as mysql from 'mysql2/promise';
import * as schema from './schema';

const connection = mysql.createPool({
  uri: process.env.DATABASE_URL,
  connectionLimit: 5,
});

const db = drizzle(connection, {
  schema,
  mode: 'default',
});

async function resetDatabase() {
  console.log('🗑️ Database leegmaken...');
  await db.delete(schema.news);
  await db.delete(schema.drivers);
  await db.delete(schema.teams);
  await db.delete(schema.track);
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
      // Wachtwoord moet gehasht worden in een echte app!
      password: 'hashed_admin_password_placeholder',
      isAdmin: true,
      dateJoined: new Date(2023, 0, 1),
    },
    {
      id: 2,
      name: 'Regular Fan',
      email: 'fan@f1site.com',
      password: 'hashed_fan_password_placeholder',
      isAdmin: false,
      dateJoined: new Date(2023, 0, 15),
    },
  ]);
  console.log('✅ Gebruikers succesvol gezaaid\n');
}

async function seedTeams() {
  console.log('🏭 Teams zaaien...');
  await db.insert(schema.teams).values([
    {
      id: 1,
      name: 'Oracle Red Bull Racing',
      base: 'Milton Keynes, UK',
      chief: 'Christian Horner',
      championships: 6,
      logo: '/logos/redbull.png',
      car: 'RB20',
      info: 'Een dominant team in de moderne Formule 1 met Max Verstappen en Sergio Pérez.',
      primaryColor: '#3671C6',
      slug: 'red-bull-racing',
    },
    {
      id: 2,
      name: 'Mercedes-AMG PETRONAS F1 Team',
      base: 'Brackley, UK',
      chief: 'Toto Wolff',
      championships: 8,
      logo: '/logos/mercedes.png',
      car: 'W15',
      info: 'Het team dat het hybride tijdperk domineerde, met Lewis Hamilton en George Russell.',
      primaryColor: '#6CD3BF',
      slug: 'mercedes-f1',
    },
    // Voeg hier meer teams toe...
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
  await db.insert(schema.track).values([
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
