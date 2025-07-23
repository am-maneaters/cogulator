import clsx from 'clsx';
import XCircleIcon from '../../assets/icons/x-circle.svg?react';
import { Buttoon } from './Buttoon';

interface Props {
  onClose: () => void;
}

export default function CogDamageHelpModal({ onClose }: Props) {
  return (
    <div className="fixed inset-0 z-10 flex h-full w-full items-center justify-center bg-black/50 text-black">
      <div className="w-1/2 rounded-lg bg-white p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Help!</h2>
          <Buttoon className="p-2 text-2xl font-bold" onClick={onClose}>
            <XCircleIcon />
          </Buttoon>
        </div>
        <div className="mt-4 flex flex-col">
          <h3 className="text-lg font-bold">Cog Damage Table</h3>
          <div className="flex flex-row justify-center self-center rounded-xl border-1 border-solid border-gray-500 bg-gray-400 p-3 shadow-2xl w-44">
            <div className="flex flex-row justify-center border-2 border-solid border-gray-700">
              <div
                className={clsx(
                  'flex flex-col items-center font-cog text-sm md:text-xl outline-double p-4',
                )}
              >
                <div>
                  <span className="text-sm md:text-lg font-bold">Level</span>
                </div>
                <div className="text-xs md:text-sm">Remaining HP</div>
              </div>
            </div>
          </div>
          <p className="pt-4">
            The cog damage table displays the total damage dealt to cogs by the
            selected gags. It shows the level of each cog and the remaining
            health after the damage is applied. If a cell is highlighted green,
            it means the cog is defeated. Red means the cog is still alive.
          </p>
          <h3 className="pt-4 text-lg font-bold">Cog Damage Gauge</h3>
          <p className="pt-2">
            The cog damage gauge displays the total damage dealt to cogs as a
            percentage fill bar. The bar fills up as you select gags, and it
            shows the total damage dealt to cogs. If you hover over a gag, it
            will show the hypothetical total damage that would be dealt if that
            gag were selected.
          </p>
        </div>
      </div>
    </div>
  );
}
