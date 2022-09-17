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

  const VolumeIcon = soundEnabled ? VolumeOnIcon : VolumeOffIcon;

  return (
    <SfxContext.Provider value={soundContext}>
      <div className="container mx-auto flex flex-col items-center justify-start gap-2 p-1">
        <header className="flex items-center p-2 font-minnie text-4xl tracking-[-0.09em]  !text-[#FEF200] sm:text-6xl md:text-7xl ">
          Big Brain Town
          <button
            onClick={() => {
              setSoundEnabled(!soundEnabled);
            }}
            type="button"
          >
            <VolumeIcon className="h-8 md:h-10" />
          </button>
        </header>

        {/* Gag Tracks */}
        <div className="flex w-full max-w-max overflow-y-scroll rounded-xl bg-red-600 p-8">
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
          <div className="hidden lg:block">
            <GagInfoDisplay gag={hoveredGag} />
          </div>
        </div>

        {/* Gag calculation display */}
        <CalculationDisplay
          selectedGags={selectedGags}
          onSelectionChanged={setSelectedGags}
          totalDamage={totalDamage}
          loading={isLoading}
        />

        {/* Cog Health Displays */}
        <div className="flex w-full max-w-max flex-row flex-nowrap gap-4 overflow-x-scroll rounded-xl bg-gray-400 p-4">
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
