import {IdHolder} from "../api.domain";

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
  genusId: string | null;
  specieId: string | null;
  formId: string | null;
  fieldNumber: string | null;
}

export type CactusSmall = IdHolder<string> & CactusSmallWithoutId;

export interface CactusWithoutId {
  number: string;
  genusId: string | null;
  specieId: string | null;
  formId: string | null;
  fieldNumber: string | null;
  flowerColor: string | null;
  images: string[] | null;
  synonymes: string | null;
  age: string | null;
  state: CactusState | null;
  acquisition: CactusAcquisition | null;
  careGroup: CareGroupWithOptionalIdAndName | null;
}

export type Cactus = IdHolder<string> & CactusWithoutId;

export interface CactusState {
  noLongerInPossessionTimestamp: string | null;
  noLongerInPossessionReason: string | null;
  vitality: string | null;
}

export interface CactusAcquisition {
  timestamp: string | null;
  age: string | null;
  place: string | null;
  plantType: string | null;
  born: string | null;
}

interface CareGroupWithoutId {
  home: string | null;
  soil: string | null;
  growTime: CareGroupTime | null;
  restTime: CareGroupTime | null;
}

export type CareGroupWithOptionalIdAndName = IdHolder<string | null> & { name: string | null } & CareGroupWithoutId;
export type CareGroup = IdHolder<string> & { name: string } & CareGroupWithoutId;

export interface CareGroupTime {
  light: string | null;
  air: string | null;
  temperature: string | null;
  humidity: string | null;
  other: string | null;
}

export interface CactusHistoryEntry {
  date: string;
  content: string;
}
