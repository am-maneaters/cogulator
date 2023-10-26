import React, { useMemo } from 'react';
import { GagTracks } from '../data/gagTracksInfo';
import { GagInstance } from '../types';
import Gag from './Gag';

type Props = {
  selectedGags: GagInstance[];
  onSelectionChanged: (gags: GagInstance[]) => void;
  totalDamage: number;
  onGagHover: (gag: GagInstance | undefined) => void;
};

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
            (GagTracks.find(({ name }) => name === b.track)?.order ?? 0)
      ),
    [selectedGags]
  );

  return (
    <div className="bg-toon-paper m-4 mb-0 flex h-16 flex-row items-center rounded-xl bg-white p-2 shadow-inner">
      <div className="flex flex-1 select-none flex-row items-center justify-start gap-3 overflow-auto p-2">
        {selectedGags.length === 0 && (
          <span className="flex-1 text-center text-xl md:text-2xl">
            Select Gags to Calculate Damage!
          </span>
        )}

        {selectedGags.length > 0 &&
          orderedGags.map((gag, i) => (
            <React.Fragment key={gag.id}>
              <Gag
                gag={gag}
                onGagClick={() =>
                  onSelectionChanged(
                    selectedGags.filter(({ id }) => gag.id !== id)
                  )
                }
                onGagHover={() => onGagHover(gag)}
                disabled={
                  i !== 0 &&
                  gag.track === 'Trap' &&
                  orderedGags[i - 1].track === 'Trap'
                }
              />
            </React.Fragment>
          ))}
      </div>
      {selectedGags.length > 0 && (
        <div className="text-right text-xl text-yellow-800 opacity-40 shadow-sm sm:text-5xl">
          = {totalDamage}
        </div>
      )}
    </div>
  );
}
