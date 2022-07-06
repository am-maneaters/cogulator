import React, { useEffect, useMemo, useState } from 'react';

import useSound from 'use-sound';
import './App.css';
import { range } from 'lodash-es';
import hoverSfx from '../assets/sounds/GUI_rollover.mp3';
import clickSfx from '../assets/sounds/GUI_create_toon_fwd.mp3';
import Gag from './components/Gag';
import { GagInfo, GagInstance } from './types';
import GagInfoDisplay from './components/GagInfoDisplay';
import gagsInfo from './data/gagsInfo';

import { TrackInfo } from './components/TrackInfo';
import { Cog } from './components/Cog';
import { calculateTotalDamage } from './utils/calculatorUtils';
import { gagTracks } from './data/gagTracksInfo';
import CalculationDisplay from './components/CalculationDisplay';
import { SfxContext } from './context/sfxContext';

const worker = new Worker(new URL('./utils/worker.ts', import.meta.url), {
  type: 'module',
});

let currentId = 0;

function App() {
  const [hoveredGag, setHoveredGag] = React.useState<GagInfo>();
  const [loading, setLoading] = React.useState(false);
  const [playHoverSfx] = useSound(hoverSfx);
  const [playClickSfx] = useSound(clickSfx);

  const [selectedGags, setSelectedGags] = useState<GagInstance[]>([]);

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
      setSelectedGags(gagsWithIds);
      setLoading(false);
    };
    worker.addEventListener('message', listener);

    return () => {
      worker.removeEventListener('message', listener);
    };
  }, []);

  const handleCogClicked = (hp: number) => {
    worker.postMessage({
      targetDamage: hp,
      availableGags: gagsInfo,
      currentGags: selectedGags,
    });
    setLoading(true);
    setSelectedGags([]);
  };

  const soundContext = useMemo(() => ({ playHoverSfx, playClickSfx }), []);

  return (
    <SfxContext.Provider value={soundContext}>
      <div className="flex flex-col items-center">
        <header className="p-4 font-minnie text-7xl tracking-[-0.09em] !text-[#FEF200]">
          Big Brain Town
        </header>

        {/* Gag calculation display */}
        <CalculationDisplay
          selectedGags={selectedGags}
          onSelectionChanged={setSelectedGags}
          totalDamage={totalDamage}
          loading={loading}
        />

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
                        currentId += 1;
                        setSelectedGags((prevGags) => [
                          ...prevGags,
                          {
                            ...gag,
                            isOrganic,
                            id: currentId,
                          },
                        ]);
                        playClickSfx();
                      }}
                      onGagHover={(isOrganic) => {
                        setHoveredGag({ ...gag, isOrganic });
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
    </SfxContext.Provider>
  );
}

export default App;
