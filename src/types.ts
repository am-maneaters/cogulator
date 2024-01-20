export type AffectsType = 'Cog' | 'Toon';
export type AffectsNum = 'All' | 'Single';
export type GagDmgType = 'Damage' | 'Heal' | 'Lure';

export interface GagInfo {
  name: string;
  track: GagTrack;
  level: number;
  accuracy: number;
  affectsType: AffectsType;
  affectsNum: AffectsNum;
  minDmg?: number;
  maxDmg?: number;
  image: string;
  isOrganic?: boolean;
  dmgType: GagDmgType;
}
export type GagTrack =
  | 'Drop'
  | 'Lure'
  | 'Sound'
  | 'Squirt'
  | 'Throw'
  | 'Toonup'
  | 'Trap';

export interface GagTrackInfo {
  color: string;
  name: GagTrack;
  order: number;
  gags: GagInfo[];
  dmgType: GagDmgType;
}

export interface CogStatus {
  lured?: boolean;
  trapped?: boolean;
  v2?: boolean;
  level?: number;
}

export type GagInstance = GagInfo & { id: number | string };
