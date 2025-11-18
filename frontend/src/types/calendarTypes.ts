export interface Race {
  id: number;
  date: string;
  weather: string;
  trackRecord: string;
  trackId: number;
  calendarYear: number;
  slug: string;
}

export interface FullCalendarEvent {
  id: number;
  title: string;
  start: string;
  url?: string;
}
