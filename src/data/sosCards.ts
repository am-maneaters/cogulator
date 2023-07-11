import { GagTrack } from '../types';

type SosCard = {
  name: string;
  tier: 3 | 4 | 5;
  ability: string;
  track: GagTrack;
  gag: string;
  image: string;
};
const sosCardsInfo = [
  {
    name: 'Clerk Will ',
    tier: 3,
    ability: 'Attack',
    track: 'Trap',
    gag: { maxDmg: 60, dmgType: 'Damage' },
  },
  {
    name: 'Clerk Penny ',
    tier: 4,
    ability: 'Attack',
    track: 'Trap',
    gag: { maxDmg: 120, dmgType: 'Damage' },
  },
  {
    name: 'Clerk Clara ',
    tier: 5,
    ability: 'Attack',
    track: 'Trap',
    gag: { maxDmg: 180, dmgType: 'Damage' },
  },
  {
    name: 'Stinky Ned ',
    tier: 3,
    ability: 'Lure',
    track: 'Lure',
    gag: { dmgType: 'Lure', maxDmg: 3 },
  },
  {
    name: 'Nancy Gas ',
    tier: 4,
    ability: 'Lure',
    track: 'Lure',
    gag: { dmgType: 'Lure', maxDmg: 4 },
  },
  {
    name: 'Lil Oldman ',
    tier: 5,
    ability: 'Lure',
    track: 'Lure',
    gag: { dmgType: 'Lure', maxDmg: 5 },
  },
  {
    name: 'Barbara Seville ',
    tier: 3,
    ability: 'Attack',
    track: 'Sound',
    gag: { maxDmg: 35, dmgType: 'Damage' },
  },
  {
    name: 'Sid Sonata ',
    tier: 4,
    ability: 'Attack',
    track: 'Sound',
    gag: { maxDmg: 55, dmgType: 'Damage' },
  },
  {
    name: 'Moe Zart ',
    tier: 5,
    ability: 'Attack',
    track: 'Sound',
    gag: { maxDmg: 75, dmgType: 'Damage' },
  },
  {
    name: 'Clumsy Ned ',
    tier: 3,
    ability: 'Attack',
    track: 'Drop',
    gag: { maxDmg: 60, dmgType: 'Damage' },
  },
  {
    name: 'Franz Neckvein ',
    tier: 4,
    ability: 'Attack',
    track: 'Drop',
    gag: { maxDmg: 100, dmgType: 'Damage' },
  },
  {
    name: 'Barnacle Bessie ',
    tier: 5,
    ability: 'Attack',
    track: 'Drop',
    gag: { maxDmg: 170, dmgType: 'Damage' },
  },
];
