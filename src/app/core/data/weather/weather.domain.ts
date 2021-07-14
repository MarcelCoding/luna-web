import { IdHolder } from '../base.domain';

export interface SensorWithoutId {
  name: string;
  description: string;
  unit: string;
  illustration: SensorIllustration;
  groupId: string;
}

export type Sensor = IdHolder & SensorWithoutId;

export type SensorIllustration = 'LINE_CHART';

export interface SensorData {
  timestamp: string;
  value: number;
}

export type Resolution = 'MINUTELY' | 'HOURLY' | 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY';

export interface SensorGroupWithoutId {
  name: string;
  description: string;
}

export type SensorGroup = IdHolder & SensorGroupWithoutId;
