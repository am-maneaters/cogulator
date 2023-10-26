import clsx from 'clsx';
import { range } from 'lodash-es';
import React, { useState, useMemo } from 'react';
import {
  calculateCogHealth,
  calculateTotalDamage,
} from '../utils/calculatorUtils';
import { GagInfo } from '../types';

export function CogDamageGauge({
  totalDamage,
  hoveredGag,
  selectedGags,
  useV2Cog,
  maxCogDefeated,
}: {
  totalDamage: number;
  hoveredGag: GagInfo | undefined;
  selectedGags: GagInfo[];
  useV2Cog: boolean;
  maxCogDefeated: number;
}) {
  const [maxCogLevel, setMaxCogLevel] = useState(20);

  const maxCogHealth = useMemo(
    () => calculateCogHealth(maxCogLevel),
    [maxCogLevel]
  );

  const barPercentage = useMemo(
    () => (totalDamage / maxCogHealth) * 99,
    [maxCogHealth, totalDamage]
  );

  const hypotheticalTotalDamage = useMemo(
    () =>
      hoveredGag
        ? calculateTotalDamage([...selectedGags, hoveredGag], {
            v2: useV2Cog,
          }).totalDamage
        : 0,
    [hoveredGag, selectedGags, useV2Cog]
  );

  const hypotheticalBarPercentage = useMemo(
    () => (hoveredGag ? (hypotheticalTotalDamage / maxCogHealth) * 99 : 0),
    [hoveredGag, hypotheticalTotalDamage, maxCogHealth]
  );
  return (
    <div className="flex hidden w-full items-center rounded-xl border-2 border-solid border-gray-500 bg-gray-400 p-4 py-6 font-cog shadow-2xl lg:block">
      <div className="relative mt-2 h-8 w-full rounded-2xl border-2 border-gray-900 bg-white shadow-2xl">
        {/* Display the total damage as a percentage fill */}
        <div
          className="absolute rounded-l-2xl rounded-r-sm bg-red-500 opacity-95"
          style={{ inset: `0px ${100 - barPercentage}% 0px 0px` }}
        >
          {/* Display the total damage */}
          {totalDamage > 0 && (
            <div
              className="absolute font-minnie text-2xl font-bold "
              style={{
                right: 0,
                bottom: -32,
              }}
            >
              -{totalDamage}!
            </div>
          )}
        </div>

        {/* Display the hypothetical total damage when a user is hovering a gag */}
        {hoveredGag && (
          <div
            className="absolute rounded-l-2xl rounded-r-sm bg-red-500 opacity-30"
            style={{
              inset: `0px ${100 - hypotheticalBarPercentage}% 0px 0px`,
            }}
          >
            {hypotheticalTotalDamage > 0 && (
              <div
                className="absolute font-minnie text-2xl font-bold "
                style={{
                  right: 0,
                  bottom: -32,
                }}
              >
                -{hypotheticalTotalDamage}!
              </div>
            )}
          </div>
        )}

        {/* for cogs level 1 - 20, there should be a vertical divider that overlays the bar to show where its health is on the bar */}
        {range(1, maxCogLevel + 1).map((level) => {
          const cogHealth = calculateCogHealth(level);

          return (
            <React.Fragment key={level}>
              <div
                className={clsx(
                  'absolute h-full bg-black py-2',
                  level <= maxCogDefeated && 'opacity-25'
                )}
                style={{
                  left: `calc(${(cogHealth / maxCogHealth) * 99}% - 3px)`,
                  width: 3,
                }}
              >
                {level > maxCogDefeated && (
                  <div
                    className="absolute text-xs font-bold text-gray-500"
                    style={{ right: 4 }}
                  >
                    {cogHealth - totalDamage}
                  </div>
                )}{' '}
              </div>
              {/* Display the level above */}
              <div
                className={clsx(
                  level <= maxCogDefeated ? 'text-white' : 'text-black',
                  'absolute text-lg font-bold',
                  // (level - 1) % 2 && 'hidden',
                  '-top-6'
                )}
                style={{
                  left: `${(cogHealth / maxCogHealth) * 99}%`,
                }}
              >
                {level}
              </div>

              {/* If the level is greater than maxCogLevel, show the remaining health */}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
