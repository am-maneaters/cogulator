// Get the health points of a cog by level

import { gagTracks } from '../data/gagTracksInfo';
import { CogStatus, GagInfo } from '../types';

// https://toontownrewritten.fandom.com/wiki/Health_of_Cogs
export function calculateCogHealth(lvl: number): number {
  if (lvl < 1) {
    throw Error('Cog health cannot be calculated for level less than 1');
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
}: GagInfo): number {
  if (dmgType === 'Lure' && isOrganic) {
    return Math.min(95, accuracy + 10);
  }
  return accuracy;
}

export function calculateTotalDamage(
  gags: GagInfo[],
  initialCogStatus: CogStatus
) {
  let totalDamage = 0;

  const cogStatus: CogStatus = { ...initialCogStatus };
  let trapGag: GagInfo | undefined;

  gagTracks.forEach(({ name, dmgType }) => {
    const trackGags = gags.filter((gag) => gag.track === name);

    const gagDamage = trackGags
      .map((currentGag) => {
        const { track } = currentGag;

        if (track === 'Trap') {
          [trapGag] = trackGags;
          cogStatus.trapped = true;
          return 0;
        }

        if (dmgType === 'Damage') {
          return getGagDmg(currentGag);
        }

        if (dmgType === 'Lure') {
          cogStatus.lured = true;
          if (trapGag) {
            cogStatus.trapped = false;
            cogStatus.lured = false;
            const dmg = getGagDmg(trapGag);
            trapGag = undefined;
            return dmg;
          }
        }
        return 0;
      })
      .reduce((a, v) => a + v, 0);

    totalDamage += gagDamage;

    if (dmgType === 'Damage' && totalDamage > 0 && cogStatus.lured) {
      cogStatus.lured = false;
      cogStatus.trapped = false;

      if (name !== 'Sound') totalDamage += gagDamage / 2;
    }
    if (trackGags.length > 1) {
      // Group bonus only applies when multiple gags are used together
      totalDamage += Math.ceil(gagDamage / 5);
    }
  });
  return totalDamage;
}
