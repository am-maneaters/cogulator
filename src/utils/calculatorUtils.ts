// Get the health points of a cog by level

import { sum } from 'lodash-es';
import { GagTracks } from '../data/gagTracksInfo';
import { CogStatus, GagInfo } from '../types';

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
  cogStatus: CogStatus = {}
): number {
  const baseDamage = Math.max(
    1,
    Math.floor(maxDmg + (isOrganic ? Math.max(1, maxDmg * 0.1) : 0))
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

export function calculateTotalDamage(
  gags: GagInfo[],
  initialCogStatus: CogStatus = {}
) {
  let totalDamage = 0;

  const cogStatus: CogStatus = { ...initialCogStatus };
  let trapGag: GagInfo | undefined;

  // Get a list of the gag tracks that are used and sort them by track order
  const gagTracks = [...new Set(gags.map((gag) => gag.track))].sort(
    (a, b) =>
      trackOrder.findIndex((name) => name === a) -
      trackOrder.findIndex((name) => name === b)
  );

  // For each of the currently used gag tracks, calculate the total damage
  gagTracks.forEach((gagTrack) => {
    // Get the gags of the current track
    const trackGags = gags.filter((gag) => gag.track === gagTrack);

    const gagTrackInfo = GagTracks.find((track) => track.name === gagTrack);

    if (!gagTrackInfo) {
      throw new Error(`Gag track ${gagTrack} not found`);
    }

    const { dmgType, name: trackName } = gagTrackInfo;

    // Calculate individual gag damage
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

    const summedGagDamage = sum(gagDamage);

    totalDamage += summedGagDamage;

    if (dmgType === 'Damage' && totalDamage > 0 && cogStatus.lured) {
      cogStatus.lured = false;
      cogStatus.trapped = false;

      // Lure bonus
      if (gagTrack !== 'Sound') totalDamage += Math.ceil(totalDamage / 2);
    }

    // Group bonus only applies when multiple gags are used together
    if (trackGags.filter((g) => g.track !== 'Lure').length > 1) {
      totalDamage += Math.ceil(summedGagDamage / 5);
    }
  });
  return totalDamage;
}
