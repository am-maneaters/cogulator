import clsx from 'clsx';
import { range } from 'lodash-es';
import { useMemo } from 'react';

import type { GagInfo } from '../types';
import { calculateTotalDamage } from '../utils/calculatorUtils';
import { Cog } from './Cog';
import { Switch } from './Switch';

export function CogDamageTable({
  selectedGags,
  useV2Cog,
  setUseV2Cog,
  hoveredGag,
}: {
  selectedGags: GagInfo[];
  useV2Cog: boolean;
  setUseV2Cog: (v: boolean) => void;
  hoveredGag: GagInfo | undefined;
}) {
  const hypotheticalGags = useMemo(
    () => hoveredGag && [...selectedGags, hoveredGag],
    [hoveredGag, selectedGags],
  );

  return (
    <div className="flex w-full max-w-max flex-col flex-nowrap items-center gap-2 sm:gap-4 overflow-x-auto rounded-xl border-2 border-solid border-gray-500 bg-gray-400 p-3 shadow-2xl sm:flex-row">
      <div className="flex flex-row items-center gap-2 sm:flex-col">
        <div
          className={clsx(
            'flex h-auto w-28 flex-col items-center font-cog outline-double',
            'bg-gray-500',
          )}
        >
          <div>
            <span className="text-sm md:text-lg font-bold">Cog Level</span>
          </div>
          <div className="text-sm md:text-lg">HP Left</div>
        </div>
        <Switch checked={useV2Cog} label="v2.0" onChange={setUseV2Cog} />
      </div>
      <div className="grid grid-cols-10 border-2 border-solid border-gray-700 lg:grid-flow-col-dense ">
        {range(20).map((i) => (
          <Cog
            damage={
              calculateTotalDamage(selectedGags, {
                v2: useV2Cog,
                level: i + 1,
              }).totalDamage
            }
            hypotheticalDamage={
              hypotheticalGags &&
              calculateTotalDamage(hypotheticalGags, {
                v2: useV2Cog,
                level: i + 1,
              }).totalDamage
            }
            key={i}
            level={i + 1}
          />
        ))}
      </div>
    </div>
  );
}
