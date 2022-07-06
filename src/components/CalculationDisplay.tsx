import React, { useMemo } from 'react';
import { useSfx } from '../context/sfxContext';
import { gagTracks } from '../data/gagTracksInfo';
import { GagInstance } from '../types';
import Gag from './Gag';

type Props = {
  selectedGags: GagInstance[];
  onSelectionChanged: (gags: GagInstance[]) => void;
  totalDamage: number;
  loading: boolean;
};

export default function CalculationDisplay({
  selectedGags,
  onSelectionChanged,
  totalDamage,
  loading,
}: Props) {
  const { playClickSfx, playHoverSfx } = useSfx();
  const orderedGags = useMemo(
    () =>
      selectedGags.sort((a, b) =>
        a.track === b.track
          ? a.level - b.level
          : (gagTracks.find(({ name }) => name === a.track)?.order ?? 0) -
            (gagTracks.find(({ name }) => name === b.track)?.order ?? 0)
      ),
    [selectedGags]
  );

  return (
    <div className="flex h-36 flex-col rounded-xl bg-green-600">
      <div className="flex flex-row items-center justify-center">
        <span className="p-2 text-2xl">
          {selectedGags.length > 0 ? 'Selected Gags' : 'No Gags Selected'}
        </span>

        {selectedGags.length > 0 && (
          <button
            className=" aspect-square w-10 rounded-full border-2 border-solid border-black bg-red-500 text-2xl hover:bg-red-400"
            type="button"
            onMouseEnter={() => playHoverSfx()}
            onClick={() => {
              playClickSfx();
              onSelectionChanged([]);
            }}
          >
            X
          </button>
        )}
      </div>

      <div className="flex flex-row items-center justify-start gap-3 p-4">
        <span className="flex-1 p-2 text-lg">
          {!loading &&
            selectedGags.length === 0 &&
            'Select Gags to Calculate Damage!'}
          {loading && 'LOADING...'}
        </span>

        {selectedGags.length > 0 && (
          <>
            {orderedGags.map((gag, i) => (
              <React.Fragment key={gag.id}>
                <Gag
                  gag={gag}
                  onGagClick={() => {
                    const newGags = selectedGags.filter(
                      ({ id }) => gag.id !== id
                    );
                    onSelectionChanged(newGags);
                  }}
                />
                {i !== orderedGags.length - 1 && (
                  <span className="font-minnie text-5xl">+</span>
                )}
              </React.Fragment>
            ))}
            <span className="font-minnie text-5xl">=</span>
            <span className="font-minnie text-5xl">{totalDamage}</span>
          </>
        )}
      </div>
    </div>
  );
}
