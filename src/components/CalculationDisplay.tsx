import clsx from 'clsx';
import React, { useMemo } from 'react';

import XIcon from '../../assets/icons/x-circle.svg?react';
import { GagTracks } from '../data/gagTracksInfo';
import type { GagInstance } from '../types';
import Gag from './Gag';

interface Props {
  selectedGags: GagInstance[];
  onSelectionChanged: (gags: GagInstance[]) => void;
  totalDamage: number;
  onGagHover: (gag: GagInstance | undefined) => void;
}

export default function CalculationDisplay({
  selectedGags,
  onSelectionChanged,
  totalDamage,
  onGagHover,
}: Props) {
  const orderedGags = useMemo(
    () =>
      selectedGags.sort((a, b) =>
        a.track === b.track
          ? a.level - b.level
          : (GagTracks.find(({ name }) => name === a.track)?.order ?? 0) -
            (GagTracks.find(({ name }) => name === b.track)?.order ?? 0),
      ),
    [selectedGags],
  );

  return (
    <div className="bg-toon-paper m-4 mb-0 flex h-16 flex-row items-center rounded-xl bg-white p-2 shadow-inner">
      <div className="flex flex-1 select-none flex-row items-center justify-start gap-1 overflow-auto p-4 sm:gap-3">
        {selectedGags.length === 0 && (
          <span className="flex-1 text-center text-xl text-yellow-800 opacity-40 md:text-2xl">
            No gags selected
          </span>
        )}

        {selectedGags.length > 0 &&
          orderedGags.map((gag, i) => (
            <React.Fragment key={gag.id}>
              <Gag
                disabled={
                  i !== 0 &&
                  gag.track === 'Trap' &&
                  orderedGags[i - 1].track === 'Trap'
                }
                gag={gag}
                onGagClick={() => {
                  onSelectionChanged(
                    selectedGags.filter(({ id }) => gag.id !== id),
                  );
                  onGagHover(undefined);
                }}
                onGagHover={() => onGagHover(gag)}
                onMouseLeave={() => onGagHover(undefined)}
              />
            </React.Fragment>
          ))}
      </div>

      {selectedGags.length > 0 && (
        <div className="flex flex-row items-center justify-end gap-2">
          <div className="text-right text-xl text-yellow-800 opacity-40 shadow-sm sm:text-5xl">
            = {totalDamage}
          </div>
        </div>
      )}
      <button type="button" onClick={() => onSelectionChanged([])}>
        <XIcon
          className={clsx(
            'h-8 w-8 text-red-500 ml-2',
            selectedGags.length === 0 && 'opacity-50',
          )}
        />
      </button>
    </div>
  );
}
