export interface HealthType {
  status: 'UP' | 'DOWN';
  uptime: number;
  timestamp: string;
  message: string;
}
