import { DatabaseProvider } from '../../src/drizzle/drizzle.provider';
import { drivers } from '../../src/drizzle/schema';

export const DRIVERS_SEED = [
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
];

export async function seedDrivers(drizzle: DatabaseProvider) {
  await drizzle.insert(drivers).values(DRIVERS_SEED);
}

export async function clearDrivers(drizzle: DatabaseProvider) {
  await drizzle.delete(drivers);
}
