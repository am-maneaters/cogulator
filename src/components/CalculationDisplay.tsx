import React, { useMemo } from 'react';
import { GagTracks } from '../data/gagTracksInfo';
import { GagInstance } from '../types';
import { Buttoon } from './Buttoon';
import Gag from './Gag';
import { ReactComponent as XCircleIcon } from '../../assets/icons/x-circle.svg';

type Props = {
  selectedGags: GagInstance[];
  onSelectionChanged: (gags: GagInstance[]) => void;
  onGagHover: (gag: GagInstance | undefined) => void;
};

export default function CalculationDisplay({
  selectedGags,
  onSelectionChanged,
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
    <div className="flex items-center justify-between gap-4">
      <div className="bg-toon-paper flex h-20 flex-1 flex-col overflow-x-auto rounded-xl bg-white">
        <div className="shadow-inner-xl flex select-none flex-row items-center justify-start gap-3 overflow-y-hidden p-4">
          {selectedGags.length === 0 && (
            <span className="flex-1 p-2 text-center text-xl md:text-2xl">
              Select Gags to Calculate Damage!
            </span>
          )}

          {orderedGags.map((gag, i) => (
            <Gag
              key={gag.id}
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
          ))}
          <Buttoon
            onClick={() => {
              onSelectionChanged([]);
            }}
            disabled={selectedGags.length === 0}
            className="ml-auto"
            transparent
          >
            <XCircleIcon className="h-6 md:h-8" />
          </Buttoon>
        </div>
      </div>
    </div>
  );
}
