export type AffectsType = 'Cog' | 'Toon';
export type AffectsNum = 'Single' | 'All';
export type GagDmgType = 'Damage' | 'Heal' | 'Lure';

export type GagInfo = {
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
};
export type GagTrack =
  | 'Toonup'
  | 'Trap'
  | 'Lure'
  | 'Sound'
  | 'Throw'
  | 'Squirt'
  | 'Drop';

export type GagTrackInfo = {
  color: string;
  name: GagTrack;
  order: number;
  gags: GagInfo[];
  dmgType: GagDmgType;
};

export type CogStatus = {
  lured?: boolean;
  trapped?: boolean;
};
