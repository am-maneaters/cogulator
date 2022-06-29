import React, { useMemo } from 'react';
import useSound from 'use-sound';
import './App.css';
import { useList } from 'react-use';
import { range } from 'lodash-es';
import hoverSfx from '../assets/sounds/GUI_rollover.mp3';
import clickSfx from '../assets/sounds/GUI_create_toon_fwd.mp3';
import Gag from './components/Gag';
import { GagInfo } from './types';
import GagInfoDisplay from './components/GagInfoDisplay';

import { TrackInfo } from './components/TrackInfo';
import { Cog } from './components/Cog';
import { calculateTotalDamage } from './utils/calculatorUtils';
import { gagTracks } from './data/gagTracksInfo';

let currentId = 0;

type GagInstance = GagInfo & { id: number };

function App() {
  const [hoveredGag, setHoveredGag] = React.useState<GagInfo>();
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

  return (
    <div>
      <div className="flex flex-col bg-blue-500">
        <div className="flex flex-row items-center">
          <span className="p-2 font-minnie text-5xl">Selected Gags</span>
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
        <div className="flex h-32 flex-row items-center justify-start gap-3 p-4">
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
          {selectedGags.length > 0 && (
            <>
              <span className="font-minnie text-5xl">=</span>
              <span className="font-minnie text-5xl">{totalDamage}</span>
            </>
          )}
        </div>
      </div>

      <div className="flex flex-row flex-wrap gap-4">
        {range(20).map((i) => (
          <Cog level={i + 1} key={i} damage={totalDamage} />
        ))}
      </div>
      <div className="m-2 flex rounded-xl bg-red-600 p-8">
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
