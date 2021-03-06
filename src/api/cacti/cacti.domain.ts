import {IdHolder} from '../api.domain';

export interface GenusWithoutId {
  name: string;
}

export type Genus = IdHolder<string> & GenusWithoutId;

export interface SpecieWithoutId {
  name: string;
  genusId: string;
}

export type Specie = IdHolder<string> & SpecieWithoutId;

export interface FormWithoutId {
  name: string;
  specieId: string;
}

export type Form = IdHolder<string> & FormWithoutId;

/*export*/
interface CactusSmallWithoutId {
  number: string;
  genusId?: string;
  specieId?: string;
  formId?: string;
  fieldNumber?: string;
}

export type CactusSmall = IdHolder<string> & CactusSmallWithoutId;

export interface CactusWithoutId {
  number: string;
  genusId?: string;
  specieId?: string;
  formId?: string;
  fieldNumber?: string;
  flowerColor?: string;
  images?: string[];
  synonymes?: string;
  age?: string;
  state?: CactusState;
  acquisition?: CactusAcquisition;
  careGroup?: CareGroup;
}

export type Cactus = IdHolder<string> & CactusWithoutId;

export interface CactusState {
  noLongerInPossessionTimestamp?: string;
  noLongerInPossessionReason?: string;
  vitality?: string;
}

export interface CactusAcquisition {
  timestamp?: string;
  age?: string;
  place?: string;
  plantType?: string;
  born?: string;
}

export interface CareGroupWithoutId {
  name: string;
  home?: string;
  soil?: string;
  growTime?: CareGroupTime;
  restTime?: CareGroupTime;
}

export type CareGroup = IdHolder<string> & CareGroupWithoutId;

export interface CareGroupTime {
  light?: string;
  air?: string;
  temperature?: string;
  humidity?: string;
  other?: string;
}

export interface CactusHistoryEntry {
  date: string;
  content: string;
}
