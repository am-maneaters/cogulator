import React, { useEffect, useMemo, useState } from 'react';

import useSound from 'use-sound';
import './App.css';
import { range } from 'lodash-es';
import clsx from 'clsx';
import hoverSfx from '../assets/sounds/GUI_rollover.mp3';
import clickSfx from '../assets/sounds/GUI_create_toon_fwd.mp3';
import { ReactComponent as VolumeOnIcon } from '../assets/icons/volume-on.svg';
import { ReactComponent as VolumeOffIcon } from '../assets/icons/volume-off.svg';
import { ReactComponent as HelpIcon } from '../assets/icons/help-circle.svg';

import { GagInfo, GagInstance } from './types';
import GagInfoDisplay from './components/GagInfoDisplay';

import { Cog } from './components/Cog';
import {
  calculateCogHealth,
  calculateTotalDamage,
} from './utils/calculatorUtils';
import { gagTracks } from './data/gagTracksInfo';
import CalculationDisplay from './components/CalculationDisplay';
import { SfxContext } from './context/sfxContext';
import { useOptimalGags } from './hooks/useOptimalGags';
import GagTrack from './components/GagTrack';
import { Buttoon } from './components/Buttoon';
import HelpModal from './components/HelpModal';

// Given damage, figure out the max cog level that can be defeated
function calculateMaxCogLevel(damage: number) {
  const maxCogLevel = range(1, 20).find(
    (level) => damage < calculateCogHealth(level)
  );
  return (maxCogLevel ?? 21) - 1;
}

function App() {
  const [hoveredGag, setHoveredGag] = React.useState<GagInfo>();

  const [soundEnabled, setSoundEnabled] = useState(false);
  const [helpModalOpen, setHelpModalOpen] = useState(false);

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

  const maxCogDefeated = useMemo(
    () => calculateMaxCogLevel(totalDamage),
    [totalDamage]
  );

  return (
    <SfxContext.Provider value={soundContext}>
      <div className="container mx-auto flex flex-col items-center justify-start gap-2 p-1">
        <header className="flex items-center p-2 font-minnie text-4xl tracking-[-0.09em]  !text-[#FEF200] sm:text-6xl md:text-7xl ">
          Big Brain Town
        </header>

        {helpModalOpen && <HelpModal onClose={() => setHelpModalOpen(false)} />}

        {/* Gag Tracks */}
        <div className="flex w-full max-w-max flex-col gap-8 overflow-y-scroll rounded-xl bg-red-600 p-8">
          <CalculationDisplay
            selectedGags={selectedGags}
            onSelectionChanged={setSelectedGags}
            totalDamage={totalDamage}
            onGagHover={setHoveredGag}
          />
          <div className="flex">
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
              <div
                className="flex aspect-square h-[264px] w-64 flex-col items-center bg-white p-2 pt-4"
                style={{
                  background:
                    'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(253,243,217,1) 100%)',
                }}
              >
                {hoveredGag && <GagInfoDisplay gag={hoveredGag} />}
              </div>
              <div className="flex justify-between gap-8 px-6">
                <Buttoon
                  onClick={() => {
                    setSoundEnabled(!soundEnabled);
                  }}
                  type="button"
                  className="flex-1"
                >
                  <VolumeIcon className="h-6 md:h-8" />
                </Buttoon>
                <Buttoon
                  className="flex-1"
                  onClick={() => {
                    setHelpModalOpen(true);
                  }}
                >
                  <HelpIcon className="h-6 md:h-8" />
                </Buttoon>
              </div>
              <Buttoon className="w-48 flex-1 self-center font-minnie text-2xl">
                Destroys Lvl {maxCogDefeated}
              </Buttoon>
            </div>
          </div>
        </div>

        {/* Cog Health Displays */}
        <div className="flex w-full max-w-max flex-nowrap items-center gap-4 overflow-x-scroll rounded-xl bg-gray-400 p-4">
          <div
            className={clsx(
              'flex h-16 w-28 flex-col items-center font-cog text-xl outline-double',
              'bg-gray-500'
            )}
          >
            <div>
              <span className="text-lg font-bold">Cog Level</span>
            </div>
            <div className="text-xl">HP Left</div>
          </div>
          <div>
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
