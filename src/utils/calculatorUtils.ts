import { sum } from 'lodash-es';

import { GagTracks } from '../data/gagTracksInfo';
import type { CogStatus, GagInfo } from '../types';

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

export function getGagDmg(
  { maxDmg = 0, isOrganic }: GagInfo,
  cogStatus: CogStatus = {},
): number {
  const baseDamage = Math.max(
    1,
    Math.floor(maxDmg + (isOrganic ? Math.max(1, maxDmg * 0.1) : 0)),
  );

  // If the cog is a v2.0 cog, add resistance to the damage
  if (cogStatus.v2 && cogStatus.level) {
    const cogResistance = Math.floor(cogStatus.level * 1.5);

    return Math.max(0, baseDamage - cogResistance);
  }

  return baseDamage;
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

const trackOrder = GagTracks.map((t) => t.name);

export interface DamageResult {
  baseDamage: number;
  groupBonus: number;
  lureBonus: number;
  totalDamage: number;
}

export function calculateTotalDamage(
  gags: GagInfo[],
  initialCogStatus: CogStatus = {},
): DamageResult {
  let baseDamage = 0;
  let groupBonus = 0;
  let lureBonus = 0;

  const cogStatus: CogStatus = { ...initialCogStatus };

  // Get a list of the gag tracks that are used and sort them by track order
  const gagTracks = [...new Set(gags.map((gag) => gag.track))].sort(
    (a, b) => trackOrder.indexOf(a) - trackOrder.indexOf(b),
  );

  // Save a reference to the current trap gag
  let trapGag: GagInfo | undefined;

  // For each of the currently used gag tracks, calculate the total damage
  for (const gagTrack of gagTracks) {
    // Get the gags of the current track
    const trackGags = gags.filter((gag) => gag.track === gagTrack);

    // Get the relevant track info
    const gagTrackInfo = GagTracks.find((track) => track.name === gagTrack);
    if (!gagTrackInfo) throw new Error(`Gag track ${gagTrack} not found`);
    const { dmgType, name: trackName } = gagTrackInfo;

    // Calculate gag damage for each selected gag in the current track
    const gagDamage = trackGags.map((currentGag) => {
      // If the current gag is a trap, save it for lure later
      if (trackName === 'Trap') {
        [trapGag] = trackGags;
        cogStatus.trapped = true;
        return 0;
      }

      // Drop does no damage when the cog is lured
      if (trackName === 'Drop' && cogStatus.lured) {
        return 0;
      }

      if (dmgType === 'Damage') {
        return getGagDmg(currentGag, cogStatus);
      }

      if (dmgType === 'Lure') {
        // If there is a previous trap gag, apply the trap damage and do not set the cog status to lured
        if (trapGag) {
          cogStatus.trapped = false;
          const dmg = getGagDmg(trapGag, cogStatus);
          trapGag = undefined;
          return dmg;
        }

        cogStatus.lured = true;
      }

      return 0;
    });

    const trackBaseDamage = sum(gagDamage);

    baseDamage += trackBaseDamage;

    if (cogStatus.lured && dmgType === 'Damage' && trackBaseDamage > 0) {
      cogStatus.lured = false;
      cogStatus.trapped = false;

      // Lure bonus applies to all damage types except sound
      if (gagTrack !== 'Sound') lureBonus = Math.ceil(trackBaseDamage / 2);
    }

    // Group bonus only applies when multiple gags are used together
    if (trackGags.filter((g) => g.track !== 'Lure').length > 1) {
      groupBonus = Math.ceil(trackBaseDamage / 5);
    }
  }
  return {
    baseDamage,
    groupBonus,
    lureBonus,
    totalDamage: baseDamage + groupBonus + lureBonus,
  };
}
