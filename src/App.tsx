import React, { useMemo, useState } from 'react';

import useSound from 'use-sound';
import './App.css';
import { range } from 'lodash-es';
import clsx from 'clsx';
import hoverSfx from '../assets/sounds/GUI_rollover.mp3';
import clickSfx from '../assets/sounds/GUI_create_toon_fwd.mp3';
import { ReactComponent as VolumeOnIcon } from '../assets/icons/volume-on.svg';
import { ReactComponent as VolumeOffIcon } from '../assets/icons/volume-off.svg';
import { ReactComponent as HelpIcon } from '../assets/icons/help-circle.svg';

import { CogStatus, GagInfo, GagInstance } from './types';
import GagInfoDisplay, { Divider } from './components/GagInfoDisplay';

import { Cog } from './components/Cog';
import {
  calculateCogHealth,
  calculateTotalDamage,
} from './utils/calculatorUtils';
import { GagTracks as GAG_TRACKS } from './data/gagTracksInfo';
import CalculationDisplay from './components/CalculationDisplay';
import { SfxContext } from './context/sfxContext';
import GagTrack from './components/GagTrack';
import { Buttoon } from './components/Buttoon';
import HelpModal from './components/HelpModal';
import { Switch } from './components/Switch';

const HIDE_TOONUP = true;
const MAX_GAGS = 4;

const GagTracks = GAG_TRACKS.filter(
  (track) => !HIDE_TOONUP || track.name !== 'Toonup'
);

const CalculatorLine = ({ label = '', value = 0 }) =>
  value > 0 && (
    <div className="flex w-full items-center justify-between">
      <div className="text-xs text-[#aa9c81]">{label}</div>
      <div>{value}</div>
    </div>
  );

// Given damage, figure out the max cog level that can be defeated
function calculateMaxCogLevel(gags: GagInfo[], cogStatus: CogStatus = {}) {
  const maxCogLevel = range(1, 21).find(
    (level) =>
      calculateTotalDamage(gags, { ...cogStatus, level }).totalDamage <
      calculateCogHealth(level)
  );
  return (maxCogLevel ?? 21) - 1;
}

function App() {
  const [hoveredGag, setHoveredGag] = React.useState<GagInfo>();

  const [soundEnabled, setSoundEnabled] = useState(false);
  const [helpModalOpen, setHelpModalOpen] = useState(false);
  const [useV2Cog, setUseV2Cog] = useState(false);
  const [isLured, setIsLured] = useState(false);

  const [playHoverSfx] = useSound(hoverSfx, { soundEnabled });
  const [playClickSfx] = useSound(clickSfx, { soundEnabled });

  const [selectedGags, setSelectedGags] = useState<GagInstance[]>([]);

  const { totalDamage, baseDamage, groupBonus, lureBonus } = useMemo(
    () => calculateTotalDamage(selectedGags, { v2: useV2Cog, lured: isLured }),
    [selectedGags, useV2Cog, isLured]
  );

  const soundContext = useMemo(
    () => ({ playHoverSfx, playClickSfx }),
    [playClickSfx, playHoverSfx]
  );

  const handleGagsSelected = (gags: GagInstance[]) => {
    if (gags.length < MAX_GAGS) {
      setSelectedGags(gags);
    }
  };

  const handleGagSelected = (gag: GagInstance) => {
    if (selectedGags.length < MAX_GAGS) {
      setSelectedGags((prevGags) => [...prevGags, gag]);
    } else {
      setSelectedGags([gag]);
    }
  };

  const VolumeIcon = soundEnabled ? VolumeOnIcon : VolumeOffIcon;

  const maxCogDefeated = useMemo(
    () => calculateMaxCogLevel(selectedGags, { v2: useV2Cog, lured: isLured }),
    [isLured, selectedGags, useV2Cog]
  );

  return (
    <SfxContext.Provider value={soundContext}>
      <div className="container mx-auto flex flex-col items-center justify-start gap-2 p-1">
        <header className="flex items-center p-2 font-minnie text-4xl tracking-[-0.09em]  !text-[#FEF200] sm:text-6xl md:text-7xl ">
          Big Brain Town
        </header>

        {helpModalOpen && <HelpModal onClose={() => setHelpModalOpen(false)} />}

        {/* Gag Tracks */}
        <div className="mb-4 flex w-full max-w-max flex-col gap-8 overflow-y-auto rounded-xl bg-red-600 p-8 shadow-2xl">
          <CalculationDisplay
            selectedGags={selectedGags}
            onSelectionChanged={handleGagsSelected}
            totalDamage={totalDamage}
            onGagHover={setHoveredGag}
          />
          <div className="flex">
            <div className="flex flex-1 flex-col pr-8">
              {GagTracks.map((track) => (
                <GagTrack
                  key={track.name}
                  track={track}
                  onGagHover={setHoveredGag}
                  onGagSelect={handleGagSelected}
                />
              ))}
            </div>
            <div className="hidden flex-col items-stretch gap-4 lg:flex">
              <div className="bg-toon-paper shadow-inner-xl flex aspect-square h-60 w-64 flex-col items-center rounded-md p-2 pt-4 text-lg">
                {baseDamage > 0 && !hoveredGag && (
                  <div className="mt-auto flex w-full flex-col items-end">
                    <CalculatorLine
                      label="Base Gag Damage"
                      value={baseDamage}
                    />
                    <CalculatorLine label="Lure Bonus" value={lureBonus} />
                    <CalculatorLine label="Group Bonus" value={groupBonus} />
                    <Divider />
                    <div className="font-minnie text-4xl font-bold !text-red-500">
                      - {totalDamage}
                    </div>
                  </div>
                )}
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
              <Buttoon className="w-4/5 flex-1 self-center font-minnie text-2xl">
                Lvl {maxCogDefeated}
              </Buttoon>
            </div>
          </div>
        </div>

        {/* Cog Health Displays */}
        <div className="flex w-full max-w-max flex-nowrap items-center gap-4 overflow-x-auto rounded-xl border-2 border-solid border-gray-500 bg-gray-400 p-4 shadow-2xl">
          <div className="flex flex-col items-center gap-2">
            <div
              className={clsx(
                'flex h-16 w-28 flex-col items-center font-cog text-xl outline-double',
                'bg-gray-500'
              )}
            >
              <div>
                <span className="text-lg font-bold">Cog Level</span>
              </div>
              <div className="text-lg">HP Left</div>
            </div>
            <Switch checked={useV2Cog} onChange={setUseV2Cog} label="v2.0" />
            <Switch checked={isLured} onChange={setIsLured} label="Lured" />
          </div>
          <div className="grid grid-cols-5 border-2 border-solid border-gray-700 md:grid-cols-10">
            {range(20).map((i) => (
              <Cog
                level={i + 1}
                key={i}
                damage={
                  calculateTotalDamage(selectedGags, {
                    v2: useV2Cog,
                    level: i + 1,
                    lured: isLured,
                  }).totalDamage
                }
              />
            ))}
          </div>
        </div>
      </div>
    </SfxContext.Provider>
  );
}

export default App;
