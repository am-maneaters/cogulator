export type GagInfo = {
  name: string;
  track: string;
  level: number;
  accuracy: number;
  affects_type: string;
  affects_num: string;
  min_dmg: number;
  max_dmg: number;
  effect: string;
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
