import { IdHolder } from '../base.domain';
import { DateTime } from 'luxon/src/luxon';

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

export enum Resolution {
  MINUTELY = 'MINUTELY',
  HOURLY = 'HOURLY',
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY',
  YEARLY = 'YEARLY'
}

export interface SensorGroupWithoutId {
  name: string;
  description: string;
}

export type SensorGroup = IdHolder & SensorGroupWithoutId;

export interface TimeRange {
  from: DateTime,
  to?: DateTime,
  resolution: Resolution
}
