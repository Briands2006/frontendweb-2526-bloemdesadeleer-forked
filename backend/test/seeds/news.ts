import { DatabaseProvider } from '../../src/drizzle/drizzle.provider';
import { news } from '../../src/drizzle/schema';

export const NEWS_SEED = [
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
    slug: 'verstappen-wint-de-grand-prix-van-belgië',
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
    slug: 'mercedes-kondigt-upgrades-aan-voor-monza',
  },
];

export async function seedNews(drizzle: DatabaseProvider) {
  await drizzle.insert(news).values(NEWS_SEED);
}

export async function clearNews(drizzle: DatabaseProvider) {
  await drizzle.delete(news);
}
