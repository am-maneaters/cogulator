/* eslint-disable no-bitwise */
/* eslint-disable no-plusplus */
/* eslint-disable no-continue */
import { GagInfo } from '../types';
import { calculateTotalDamage } from './calculatorUtils';

type OptimalGagProps = {
  availableGags: GagInfo[];
  targetDamage: number;
  currentGags: GagInfo[];
};

type OptimalGagResult = {
  gags: GagInfo[];
  totalDamage: number;
  cost: number;
};

function getCombinations<T>(valuesArray: T[]) {
  const combi: T[][] = [];
  let temp: T[] = [];

  for (let i = 0; i < 4; i += 1) {
    temp = [];
    for (let j = 0; j < valuesArray.length; j += 1) {
      if (i & (2 ** j)) {
        temp.push(valuesArray[j]);
      }
    }
    if (temp.length > 0) {
      combi.push(temp);
    }
  }

  return combi;
}

function getOptimalGags({
  targetDamage,
  availableGags,
  currentGags,
}: OptimalGagProps): GagInfo[] {
  let closestDifference = Infinity;
  let closestCost = Infinity;
  let closestSelectedGags: GagInfo[] = [];
  let counter = 0;

  const possibleGags = availableGags.filter((gag) => gag.track !== 'Toonup');
  const gagsLength = possibleGags.length;

  const matches: OptimalGagResult[] = [];

  console.log(getCombinations(availableGags));

  for (let gag1Idx = 0; gag1Idx < gagsLength; gag1Idx++) {
    const gag1 = possibleGags[gag1Idx];

    for (let gag2Idx = 0; gag2Idx < gagsLength; gag2Idx++) {
      const gag2 = possibleGags[gag2Idx];

      for (let gag3Idx = 0; gag3Idx < gagsLength; gag3Idx++) {
        const gag3 = possibleGags[gag3Idx];

        for (let gag4Idx = 0; gag4Idx < gagsLength; gag4Idx++) {
          const gag4 = possibleGags[gag4Idx];
          const selectedGags = [gag1, gag2, gag3, gag4];

          if (selectedGags.filter((g) => g.track === 'Trap').length > 1) {
            continue;
          }
          if (selectedGags.filter((g) => g.track === 'Lure').length > 1) {
            continue;
          }

          const totalDamage = calculateTotalDamage(selectedGags);
          const cost = gag1.level + gag2.level + gag3.level + gag4.level;

          const diff = Math.abs(totalDamage - targetDamage);

          if (totalDamage >= targetDamage && diff < closestDifference) {
            closestDifference = diff;
            closestCost = cost;
            closestSelectedGags = selectedGags;
            matches.push({ gags: selectedGags, totalDamage, cost });
          }

          if (diff === closestDifference) {
            if (cost < closestCost) {
              closestDifference = diff;
              closestCost = cost;
              closestSelectedGags = selectedGags;
              matches.push({ gags: selectedGags, totalDamage, cost });
            }
          }

          counter += 1;
        }
      }
    }
  }
  console.log(matches);
  console.log(`took ${counter} iterations`);
  return closestSelectedGags;
}

// eslint-disable-next-line no-restricted-globals
self.addEventListener('message', (e: MessageEvent<OptimalGagProps>) => {
  const closestGags = getOptimalGags(e.data);
  // eslint-disable-next-line no-restricted-globals
  self.postMessage(closestGags);
});
