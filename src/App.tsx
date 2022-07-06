import React, { useEffect, useMemo, useState } from 'react';

import useSound from 'use-sound';
import './App.css';
import { range } from 'lodash-es';
import hoverSfx from '../assets/sounds/GUI_rollover.mp3';
import clickSfx from '../assets/sounds/GUI_create_toon_fwd.mp3';
import { GagInfo, GagInstance } from './types';
import GagInfoDisplay from './components/GagInfoDisplay';

import { Cog } from './components/Cog';
import { calculateTotalDamage } from './utils/calculatorUtils';
import { gagTracks } from './data/gagTracksInfo';
import CalculationDisplay from './components/CalculationDisplay';
import { SfxContext } from './context/sfxContext';
import { useOptimalGags } from './hooks/useOptimalGags';
import GagTrack from './components/GagTrack';

function App() {
  const [hoveredGag, setHoveredGag] = React.useState<GagInfo>();
  const [playHoverSfx] = useSound(hoverSfx);
  const [playClickSfx] = useSound(clickSfx);

  const [selectedGags, setSelectedGags] = useState<GagInstance[]>([]);

  const { optimalGags, isLoading, beginCalculation } = useOptimalGags();

  useEffect(() => {
    if (optimalGags) setSelectedGags(optimalGags);
  }, [optimalGags]);

  const totalDamage = useMemo(
    () => calculateTotalDamage(selectedGags, {}),
    [selectedGags]
  );

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
          loading={isLoading}
        />

        {/* Cog Health Displays */}
        <div className="mx-12 my-2 flex flex-row flex-wrap gap-4 rounded-xl bg-gray-400 p-4">
          {range(20).map((i) => (
            <Cog
              level={i + 1}
              key={i}
              damage={totalDamage}
              onCogClick={beginCalculation}
            />
          ))}
        </div>
        <div className="m-2 flex w-fit rounded-xl bg-red-600 p-8">
          <div className="pr-8">
            {gagTracks.map((track) => (
              <GagTrack
                key={track.name}
                track={track}
                onGagHover={setHoveredGag}
                onGagSelect={(gag) => {
                  setSelectedGags((prevGags) => [...prevGags, gag]);
                }}
              />
            ))}
          </div>
          <GagInfoDisplay gag={hoveredGag} />
        </div>
      </div>
    </SfxContext.Provider>
  );
}

export default App;
