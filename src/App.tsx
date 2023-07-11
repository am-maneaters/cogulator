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

import { GagInfo, GagInstance } from './types';
import GagInfoDisplay, { Divider } from './components/GagInfoDisplay';

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

const HIDE_TOONUP = true;
const HIDDEN_COLUMNS: number[] = [];

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
function calculateMaxCogLevel(damage: number) {
  const maxCogLevel = range(1, 21).find(
    (level) => damage < calculateCogHealth(level)
  );

  return (maxCogLevel ?? 21) - 1;
}

function App() {
  const [hoveredGag, setHoveredGag] = React.useState<GagInfo>();

  const [soundEnabled, setSoundEnabled] = useState(false);
  const [helpModalOpen, setHelpModalOpen] = useState(false);
  const [useV2Cog, setUseV2Cog] = useState(false);

  const [playHoverSfx] = useSound(hoverSfx, { soundEnabled });
  const [playClickSfx] = useSound(clickSfx, { soundEnabled });

  const [selectedGags, setSelectedGags] = useState<GagInstance[]>([]);

  const { totalDamage, baseDamage, groupBonus, lureBonus } = useMemo(
    () => calculateTotalDamage(selectedGags, { v2: useV2Cog }),
    [selectedGags, useV2Cog]
  );

  const soundContext = useMemo(
    () => ({ playHoverSfx, playClickSfx }),
    [playClickSfx, playHoverSfx]
  );

  const handleGagSelected = (gag: GagInstance) => {
    setSelectedGags((prevGags) => [...prevGags, gag]);
  };

  const VolumeIcon = soundEnabled ? VolumeOnIcon : VolumeOffIcon;

  const minCogLevelDefeated = useMemo(
    () => calculateMaxCogLevel(totalDamage),
    [totalDamage]
  );

  const [maxCogLevel, setMaxCogLevel] = useState(20);

  const maxCogHealth = useMemo(
    () => calculateCogHealth(maxCogLevel),
    [maxCogLevel]
  );

  const barPercentage = useMemo(
    () => (totalDamage / maxCogHealth) * 99,
    [maxCogHealth, totalDamage]
  );

  const hypotheticalTotalDamage = useMemo(
    () =>
      hoveredGag
        ? calculateTotalDamage([...selectedGags, hoveredGag], {
            v2: useV2Cog,
          }).totalDamage
        : 0,
    [hoveredGag, selectedGags, useV2Cog]
  );

  const hypotheticalBarPercentage = useMemo(
    () => (hoveredGag ? (hypotheticalTotalDamage / maxCogHealth) * 99 : 0),
    [hoveredGag, hypotheticalTotalDamage, maxCogHealth]
  );

  return (
    <SfxContext.Provider value={soundContext}>
      <div className="container mx-auto flex flex-col items-center justify-start gap-2 p-1">
        <header className="flex items-center p-2 font-minnie text-4xl tracking-[-0.09em]  !text-[#FEF200] sm:text-6xl md:text-7xl ">
          Big Brain Town
        </header>

        {helpModalOpen && <HelpModal onClose={() => setHelpModalOpen(false)} />}

        {/* Cog Health Displays */}
        <div className="flex w-full items-center rounded-xl border-2 border-solid border-gray-500 bg-gray-400 p-4 py-6 font-cog shadow-2xl">
          <div className="relative mt-2 h-8 w-full rounded-2xl border-2 border-gray-900 bg-white shadow-2xl">
            {/* Display the total damage as a percentage fill */}
            <div
              className="absolute rounded-l-2xl rounded-r-sm bg-red-500 opacity-95"
              style={{ inset: `0px ${100 - barPercentage}% 0px 0px` }}
            >
              {/* Display the total damage */}
              {totalDamage > 0 && (
                <div
                  className="absolute font-minnie text-2xl font-bold "
                  style={{
                    right: 0,
                    bottom: -32,
                  }}
                >
                  -{totalDamage}!
                </div>
              )}
            </div>

            {/* Display the hypothetical total damage when a user is hovering a gag */}
            {hoveredGag && (
              <div
                className="absolute rounded-l-2xl rounded-r-sm bg-red-500 opacity-30"
                style={{
                  inset: `0px ${100 - hypotheticalBarPercentage}% 0px 0px`,
                }}
              >
                {hypotheticalTotalDamage > 0 && (
                  <div
                    className="absolute font-minnie text-2xl font-bold "
                    style={{
                      right: 0,
                      bottom: -32,
                    }}
                  >
                    -{hypotheticalTotalDamage}!
                  </div>
                )}
              </div>
            )}

            {/* for cogs level 1 - 20, there should be a vertical divider that overlays the bar to show where its health is on the bar */}
            {range(1, maxCogLevel + 1).map((level) => {
              const cogHealth = calculateCogHealth(level);

              return (
                <React.Fragment key={level}>
                  <div
                    className={clsx(
                      'absolute h-full bg-black py-2',
                      level <= minCogLevelDefeated && 'opacity-25'
                    )}
                    style={{
                      left: `calc(${(cogHealth / maxCogHealth) * 99}% - 3px)`,
                      width: 3,
                    }}
                  >
                    {level > minCogLevelDefeated && (
                      <div
                        className="absolute text-xs font-bold text-gray-500"
                        style={{ right: 4 }}
                      >
                        {cogHealth - totalDamage}
                      </div>
                    )}{' '}
                  </div>
                  {/* Display the level above */}
                  <div
                    className={clsx(
                      level <= minCogLevelDefeated
                        ? 'text-white'
                        : 'text-black',
                      'absolute text-lg font-bold',
                      // (level - 1) % 2 && 'hidden',
                      '-top-6'
                    )}
                    style={{
                      left: `${(cogHealth / maxCogHealth) * 99}%`,
                    }}
                  >
                    {level}
                  </div>

                  {/* If the level is greater than maxCogLevel, show the remaining health */}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Gag Tracks */}
        <div className="mb-4 flex w-full max-w-max flex-col gap-8 overflow-y-auto rounded-xl bg-red-600 p-8 shadow-2xl">
          <CalculationDisplay
            selectedGags={selectedGags}
            onSelectionChanged={setSelectedGags}
            onGagHover={() => {}}
          />
          <div className="flex">
            <div className="flex flex-1 flex-col pr-8">
              {GagTracks.map((track) => (
                <GagTrack
                  key={track.name}
                  track={track}
                  hiddenColumns={HIDDEN_COLUMNS}
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
              <Buttoon className="w-48 flex-1 self-center font-minnie text-2xl">
                Destroys Lvl {minCogLevelDefeated}
              </Buttoon>
            </div>
          </div>
        </div>
      </div>
    </SfxContext.Provider>
  );
}

export default App;
