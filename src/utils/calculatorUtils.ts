// Get the health points of a cog by level

import { sum } from 'lodash-es';
import { CogStatus, GagInfo, GagTrack } from '../types';

// https://toontownrewritten.fandom.com/wiki/Health_of_Cogs
export function calculateCogHealth(lvl: number): number {
  if (lvl < 1) {
    throw new Error('Cog health cannot be calculated for level less than 1');
  }

  // Cogs lvl 1-11 have health of f(x) = (x + 1) * (x + 2)
  if (lvl < 12) {
    return (lvl + 1) * (lvl + 2);
  }

  // Cogs lvl 12+ have health of f(x) = (x + 1) * (x + 2) + 14
  return (lvl + 1) * (lvl + 2) + 14;
}

export function getGagDmg({ maxDmg, isOrganic }: GagInfo): number {
  return Math.max(1, Math.floor((maxDmg ?? 0) * (isOrganic ? 1.1 : 1)));
}

export function getGagAccuracy({
  accuracy,
  dmgType,
  isOrganic,
}: Pick<GagInfo, 'accuracy' | 'dmgType' | 'isOrganic'>): number {
  if (dmgType === 'Lure' && isOrganic) {
    return Math.min(95, accuracy + 10);
  }
  return accuracy;
}

const trackOrder: GagTrack[] = [
  'Toonup',
  'Trap',
  'Lure',
  'Sound',
  'Throw',
  'Squirt',
  'Drop',
];

export function calculateTotalDamage(
  gags: GagInfo[],
  initialCogStatus: CogStatus = {}
) {
  let totalDamage = 0;

  const cogStatus: CogStatus = { ...initialCogStatus };
  let trapGag: GagInfo | undefined;

  const gagTracks = [...new Set(gags.map((gag) => gag.track))];

  gagTracks.sort(
    (a, b) =>
      trackOrder.findIndex((name) => name === a) -
      trackOrder.findIndex((name) => name === b)
  );

  gagTracks.forEach((name) => {
    const trackGags = gags.filter((gag) => gag.track === name);

    const gagDamage = trackGags.map((currentGag) => {
      const { track } = currentGag;

      if (track === 'Trap') {
        [trapGag] = trackGags;
        cogStatus.trapped = true;
        return 0;
      }

      if (track === 'Drop' && cogStatus.lured) {
        return 0;
      }

      if (currentGag.dmgType === 'Damage') {
        return getGagDmg(currentGag);
      }

      if (currentGag.dmgType === 'Lure') {
        if (trapGag) {
          cogStatus.trapped = false;
          const dmg = getGagDmg(trapGag);
          trapGag = undefined;
          return dmg;
        }

        cogStatus.lured = true;
      }

      return 0;
    });

    const summedGagDamage = sum(gagDamage);

    totalDamage += summedGagDamage;

    if (
      !['Lure', 'Toonup'].includes(name) &&
      totalDamage > 0 &&
      cogStatus.lured
    ) {
      cogStatus.lured = false;
      cogStatus.trapped = false;

      // Lure bonus
      if (name !== 'Sound') totalDamage += Math.ceil(summedGagDamage / 2);
    }

    if (trackGags.length > 1) {
      // Group bonus only applies when multiple gags are used together
      totalDamage += Math.ceil(summedGagDamage / 5);
    }
  });
  return totalDamage;
}
