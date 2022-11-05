/// <reference types="vite-plugin-svgr/client" />
/// <reference types="vite/client" />

import React, { useEffect, useMemo, useState } from 'react';

import useSound from 'use-sound';
import './App.css';
import { range } from 'lodash-es';
import clsx from 'clsx';
import hoverSfx from '../assets/sounds/GUI_rollover.mp3';
import clickSfx from '../assets/sounds/GUI_create_toon_fwd.mp3';
import { ReactComponent as VolumeOnIcon } from '../assets/icons/volume-on.svg';
import { ReactComponent as VolumeOffIcon } from '../assets/icons/volume-off.svg';
import { ReactComponent as XCircleIcon } from '../assets/icons/x-circle.svg';
import { GagInfo, GagInstance } from './types';
import GagInfoDisplay from './components/GagInfoDisplay';

import { Cog } from './components/Cog';
import { calculateTotalDamage } from './utils/calculatorUtils';
import { gagTracks } from './data/gagTracksInfo';
import CalculationDisplay from './components/CalculationDisplay';
import { SfxContext } from './context/sfxContext';
import { useOptimalGags } from './hooks/useOptimalGags';
import GagTrack from './components/GagTrack';

const Button = ({
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    className={clsx(
      `relative flex h-auto min-h-0 select-none
    items-center justify-center rounded-2xl
    border-2 border-blue-500 bg-gradient-to-b 
    from-blue-500 to-[#00b4ff] px-2 pb-1 
    text-white shadow-[-1px_2px_4px_2px_rgba(0,0,0,0.5)] hover:shadow-xl hover:brightness-110
   focus:brightness-110`,
      className
    )}
    {...props}
    type="button"
  />
);

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
          <div className="hidden flex-col items-stretch gap-4 lg:flex">
            <GagInfoDisplay gag={hoveredGag} />
            <div className="flex justify-evenly">
              <Button
                onClick={() => {
                  setSoundEnabled(!soundEnabled);
                }}
                type="button"
              >
                <VolumeIcon className="h-6 md:h-8" />
              </Button>
              <Button>
                <XCircleIcon className="h-6 md:h-8" />
              </Button>
            </div>
            <Button className="w-48 flex-1 self-center font-minnie text-5xl">
              {totalDamage}
              <XCircleIcon className="h-6 md:h-8" />
            </Button>
          </div>
        </div>

        <div>
          {/* Gag calculation display */}
          <CalculationDisplay
            selectedGags={selectedGags}
            onSelectionChanged={setSelectedGags}
            totalDamage={totalDamage}
            loading={isLoading}
          />

          {/* Cog Health Displays */}
          <div className="w-full max-w-max flex-row flex-nowrap gap-4 overflow-x-scroll rounded-xl bg-gray-400 p-4">
            <div className="flex">
              {range(10).map((i) => (
                <Cog
                  level={i + 1}
                  key={i}
                  damage={totalDamage}
                  onCogClick={beginCalculation}
                />
              ))}
            </div>
            <div className="flex">
              {range(10, 20).map((i) => (
                <Cog
                  level={i + 1}
                  key={i}
                  damage={totalDamage}
                  onCogClick={beginCalculation}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </SfxContext.Provider>
  );
}

export default App;
