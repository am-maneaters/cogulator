import { GagTrackInfo } from '../types';
import { imgFromPath } from '../utils/imageUtils';
import gagsInfo from './gagsInfo';

const imgs = import.meta.globEager('../../assets/gags/*.webp');

const tracksInfo: Omit<GagTrackInfo, 'gags'>[] = [
  {
    name: 'Toonup',
    color: '#C55AE8',
    order: 0,
    dmgType: 'Heal',
  },
  {
    name: 'Trap',
    color: '#E8E65A',
    order: 1,
    dmgType: 'Damage',
  },
  {
    name: 'Lure',
    color: '#33BD35',
    order: 2,
    dmgType: 'Lure',
  },
  {
    name: 'Sound',
    color: '#3D5DEB',
    order: 3,
    dmgType: 'Damage',
  },
  {
    name: 'Throw',
    color: '#ED9F32',
    order: 4,
    dmgType: 'Damage',
  },
  {
    name: 'Squirt',
    color: '#F55BD6',
    order: 5,
    dmgType: 'Damage',
  },
  {
    name: 'Drop',
    color: '#32EAED',
    order: 6,
    dmgType: 'Damage',
  },
];

export const gagTracks: GagTrackInfo[] = tracksInfo.map(
  ({ name, color, order, dmgType }) => ({
    gags: gagsInfo
      .filter((gag) => gag.track === name)
      .sort((a, b) => a.level - b.level)
      .map((gag) => ({
        ...gag,
        image: imgFromPath(imgs[`../../assets/gags/${gag.image}`].default),
      })),
    color,
    name,
    order,
    dmgType,
  })
);
