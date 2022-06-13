export type GagInfo = {
  name: string;
  track: string;
  level: number;
  accuracy: number;
  affects_type: 'Cog' | 'Toon';
  affects_num: 'Single' | 'All';
  min_dmg: number;
  max_dmg: number;
  effect: string;
  image: string;
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
};
