/// <reference types="vite-plugin-svgr/client" />
/// <reference types="vite/client" />

import React, { useEffect, useMemo, useState } from 'react';

import useSound from 'use-sound';
import './App.css';
import { range } from 'lodash-es';
import hoverSfx from '../assets/sounds/GUI_rollover.mp3';
import clickSfx from '../assets/sounds/GUI_create_toon_fwd.mp3';
import { ReactComponent as VolumeOnIcon } from '../assets/icons/volume-on.svg';
import { ReactComponent as VolumeOffIcon } from '../assets/icons/volume-off.svg';
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

  const [soundEnabled, setSoundEnabled] = useState(false);

  const [playHoverSfx] = useSound(hoverSfx, { soundEnabled });
  const [playClickSfx] = useSound(clickSfx, { soundEnabled });

  const [selectedGags, setSelectedGags] = useState<GagInstance[]>([]);

  const { optimalGags, isLoading, beginCalculation } = useOptimalGags();

  useEffect(() => {
    if (optimalGags) setSelectedGags(optimalGags);
  }, [optimalGags]);

  const totalDamage = useMemo(
    () => calculateTotalDamage(selectedGags, {}),
    [selectedGags]
  );

  const soundContext = useMemo(
    () => ({ playHoverSfx, playClickSfx }),
    [playClickSfx, playHoverSfx]
  );

  const handleGagSelected = (gag: GagInstance) => {
    setSelectedGags((prevGags) => [...prevGags, gag]);
  };

  return (
    <SfxContext.Provider value={soundContext}>
      <div className="container mx-auto flex flex-col items-center justify-start">
        <header className="p-2 font-minnie text-7xl tracking-[-0.09em] !text-[#FEF200]">
          Big Brain Town
          <button
            onClick={() => {
              setSoundEnabled(!soundEnabled);
            }}
            type="button"
          >
            <div className="scale-50">
              {soundEnabled ? <VolumeOnIcon /> : <VolumeOffIcon />}
            </div>
          </button>
        </header>

        {/* Gag Tracks */}
        <div className="m-2 flex w-fit resize overflow-auto rounded-xl bg-red-600 p-8">
          <div className="flex flex-1 flex-col pr-8">
            {gagTracks.map((track) => (
              <GagTrack
                key={track.name}
                track={track}
                onGagHover={setHoveredGag}
                onGagSelect={handleGagSelected}
              />
            ))}
          </div>
          <GagInfoDisplay gag={hoveredGag} />
        </div>

        {/* Gag calculation display */}
        <CalculationDisplay
          selectedGags={selectedGags}
          onSelectionChanged={setSelectedGags}
          totalDamage={totalDamage}
          loading={isLoading}
        />

        {/* Cog Health Displays */}
        <div className="my-2 flex flex-row flex-wrap gap-4 rounded-xl bg-gray-400 p-4">
          {range(20).map((i) => (
            <Cog
              level={i + 1}
              key={i}
              damage={totalDamage}
              onCogClick={beginCalculation}
            />
          ))}
        </div>
      </div>
    </SfxContext.Provider>
  );
}

export default App;
