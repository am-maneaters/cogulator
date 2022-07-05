import React, { useEffect, useMemo } from 'react';

import useSound from 'use-sound';
import './App.css';
import { useList } from 'react-use';
import { range } from 'lodash-es';
import hoverSfx from '../assets/sounds/GUI_rollover.mp3';
import clickSfx from '../assets/sounds/GUI_create_toon_fwd.mp3';
import Gag from './components/Gag';
import { GagInfo } from './types';
import GagInfoDisplay from './components/GagInfoDisplay';
import gagsInfo from './data/gagsInfo';

import { TrackInfo } from './components/TrackInfo';
import { Cog } from './components/Cog';
import { calculateTotalDamage } from './utils/calculatorUtils';
import { gagTracks } from './data/gagTracksInfo';

const worker = new Worker(new URL('./worker.ts', import.meta.url), {
  type: 'module',
});

let currentId = 0;

type GagInstance = GagInfo & { id: number };

function App() {
  const [hoveredGag, setHoveredGag] = React.useState<GagInfo>();
  const [loading, setLoading] = React.useState(false);
  const [playHoverSfx] = useSound(hoverSfx);
  const [playClickSfx] = useSound(clickSfx);

  const [selectedGags, selectedGagsList] = useList<GagInstance>([]);

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

  const totalDamage = useMemo(
    () => calculateTotalDamage(selectedGags, {}),
    [selectedGags]
  );

  useEffect(() => {
    const listener = (e: MessageEvent<GagInfo[]>) => {
      const gagsWithIds: GagInstance[] = e.data.map((gag) => ({
        ...gag,
        id: currentId++,
      }));
      selectedGagsList.set(gagsWithIds);
      setLoading(false);
    };
    worker.addEventListener('message', listener);

    return () => {
      worker.removeEventListener('message', listener);
    };
  }, []);

  const handleCogClicked = (hp: number) => {
    worker.postMessage({ targetDamage: hp, availableGags: gagsInfo });
    setLoading(true);
    selectedGagsList.clear();
  };

  return (
    <div className="flex flex-col items-center">
      <header className="p-4 font-minnie text-7xl tracking-[-0.09em] !text-[#FEF200]">
        Big Brain Town
      </header>

      {/* Gag calculation display */}
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
                selectedGagsList.clear();
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
                      selectedGagsList.filter(({ id }) => gag.id !== id);
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

      {/* Cog Health Displays */}
      <div className="mx-12 my-2 flex flex-row flex-wrap gap-4 rounded-xl bg-gray-400 p-4">
        {range(20).map((i) => (
          <Cog
            level={i + 1}
            key={i}
            damage={totalDamage}
            onCogClick={handleCogClicked}
          />
        ))}
      </div>
      <div className="m-2 flex w-fit rounded-xl bg-red-600 p-8">
        <div className="pr-8">
          {gagTracks.map(({ gags, color, name }) => (
            <div
              className="flex gap-2 rounded-[2%/45%] p-2 px-4 shadow-[0_5px_13px_1px_black]"
              style={{
                backgroundColor: color,
              }}
              key={name}
            >
              <TrackInfo name={name} />
              <div className="flex gap-2">
                {gags.map((gag) => (
                  <Gag
                    gag={gag}
                    key={gag.name}
                    onGagClick={(isOrganic) => {
                      const newGag: GagInstance = {
                        ...gag,
                        isOrganic,
                        id: (currentId += 1),
                      };
                      selectedGagsList.push(newGag);
                      playClickSfx();
                    }}
                    onGagHover={(isOrganic) => {
                      const newGag = { ...gag, isOrganic };
                      setHoveredGag(newGag);
                      playHoverSfx();
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
        <GagInfoDisplay gag={hoveredGag} />
      </div>
    </div>
  );
}

export default App;
