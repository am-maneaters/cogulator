import clsx from 'clsx';
import { range } from 'lodash-es';
import { calculateTotalDamage } from '../utils/calculatorUtils';
import { Cog } from './Cog';
import { Switch } from './Switch';
import { GagInfo } from '../types';

export function CogDamageTable({
  selectedGags,
  useV2Cog,
  setUseV2Cog,
}: {
  selectedGags: GagInfo[];
  useV2Cog: boolean;
  setUseV2Cog: (v: boolean) => void;
}) {
  return (
    <div className="flex w-full max-w-max flex-col flex-nowrap items-center gap-4 overflow-x-auto rounded-xl border-2 border-solid border-gray-500 bg-gray-400 p-3 shadow-2xl sm:flex-row">
      <div className="flex flex-row items-center gap-2 sm:flex-col">
        <div
          className={clsx(
            'flex h-16 w-28 flex-col items-center font-cog text-xl outline-double',
            'bg-gray-500'
          )}
        >
          <div>
            <span className="text-lg font-bold">Cog Level</span>
          </div>
          <div className="text-lg">HP Left</div>
        </div>
        <Switch checked={useV2Cog} onChange={setUseV2Cog} label="v2.0" />
      </div>
      <div className="grid grid-cols-10 border-2 border-solid border-gray-700 ">
        {range(20).map((i) => (
          <Cog
            level={i + 1}
            key={i}
            damage={
              calculateTotalDamage(selectedGags, {
                v2: useV2Cog,
                level: i + 1,
              }).totalDamage
            }
          />
        ))}
      </div>
    </div>
  );
}
