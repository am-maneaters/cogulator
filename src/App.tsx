import React, { useMemo, useState } from 'react';
import { useSound } from 'use-sound';

import clickSfx from '../assets/sounds/GUI_create_toon_fwd.mp3';
import hoverSfx from '../assets/sounds/GUI_rollover.mp3';
import { Buttoon } from './components/Buttoon';
import CalculationDisplay from './components/CalculationDisplay';
import { CogDamageGauge } from './components/CogDamageGauge';
import { CogDamageTable } from './components/CogDamageTable';
import GagInfoDisplay, { Divider } from './components/GagInfoDisplay';
import GagTrack from './components/GagTrack';
import { Header } from './components/Header';
import { SfxContext } from './context/sfxContext';
import { GagTracks as GAG_TRACKS } from './data/gagTracksInfo';
import type { GagInfo, GagInstance } from './types';
import {
  calculateMaxCogLevel,
  calculateTotalDamage,
} from './utils/calculatorUtils';
import MeterIcon from '../assets/icons/thermometer.svg?react';
import GridIcon from '../assets/icons/grid.svg?react';
import HelpIcon from '../assets/icons/help-circle.svg?react';
import CogDamageHelpModal from './components/CogDamageHelpModal';

const HIDE_TOONUP = true;
const MAX_GAGS = 5;

const GagTracks = GAG_TRACKS.filter(
  (track) => !HIDE_TOONUP || track.name !== 'Toonup',
);

const CalculatorLine = ({ label = '', value = 0 }) =>
  value > 0 && (
    <div className="flex w-full items-center justify-between">
      <div className="text-xs text-[#aa9c81]">{label}</div>
      <div>{value}</div>
    </div>
  );

function App() {
  const [hoveredGag, setHoveredGag] = React.useState<GagInfo>();

  const [soundEnabled, setSoundEnabled] = useState(false);
  const [showBetaCogDisplay, setShowBetaCogDisplay] = useState(false);

  const [playHoverSfx] = useSound(hoverSfx, { soundEnabled });
  const [playClickSfx] = useSound(clickSfx, { soundEnabled });

  const [selectedGags, setSelectedGags] = useState<GagInstance[]>([]);

  const [showCogDamageHelp, setShowCogDamageHelp] = useState(false);

  const maxCogDefeated = useMemo(
    () => calculateMaxCogLevel(selectedGags),
    [selectedGags],
  );

  const { totalDamage, baseDamage, groupBonus, lureBonus } = useMemo(
    () =>
      calculateTotalDamage(selectedGags, {
        level: maxCogDefeated + 1,
      }),
    [maxCogDefeated, selectedGags],
  );

  const soundContext = useMemo(
    () => ({ playHoverSfx, playClickSfx }),
    [playClickSfx, playHoverSfx],
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

  return (
    <SfxContext.Provider value={soundContext}>
      <div className="mx-auto flex h-full flex-col items-center justify-center gap-2 drop-shadow-box md:gap-4">
        <Header setSoundEnabled={setSoundEnabled} soundEnabled={soundEnabled} />

        <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto rounded-xl border-1 border-solid border-gray-500 bg-gray-400 p-3 shadow-2xl ">
          {showBetaCogDisplay ? (
            <CogDamageGauge
              hoveredGag={hoveredGag}
              selectedGags={selectedGags}
              totalDamage={totalDamage}
            />
          ) : (
            <CogDamageTable
              hoveredGag={hoveredGag}
              selectedGags={selectedGags}
            />
          )}
          <div className="flex flex-col items-center gap-2 text-gray-300">
            <HelpIcon
              className="h-6 w-6 cursor-pointer hover:opacity-50"
              onClick={() => setShowCogDamageHelp(true)}
            />
            {showCogDamageHelp && (
              <CogDamageHelpModal onClose={() => setShowCogDamageHelp(false)} />
            )}

            {showBetaCogDisplay ? (
              <GridIcon
                className="h-6 w-6 cursor-pointer hover:opacity-50"
                onClick={() => setShowBetaCogDisplay(false)}
              />
            ) : (
              <MeterIcon
                className="h-6 w-6 cursor-pointer hover:opacity-50"
                onClick={() => setShowBetaCogDisplay(true)}
              />
            )}
          </div>
        </div>

        {/* Gag Tracks */}
        <div className="mb-4 flex w-full flex-col overflow-y-auto rounded-xl bg-red-600 shadow-2xl md:px-4 border-red-700 border-4 max-w-min">
          <CalculationDisplay
            onGagHover={setHoveredGag}
            onSelectionChanged={handleGagsSelected}
            selectedGags={selectedGags}
            totalDamage={totalDamage}
          />
          <div className="flex flex-col items-stretch lg:flex-row">
            <div className="flex flex-1 flex-col overflow-auto p-4">
              {GagTracks.map((track) => (
                <GagTrack
                  key={track.name}
                  onGagHover={setHoveredGag}
                  onGagSelect={handleGagSelected}
                  track={track}
                />
              ))}
            </div>

            <div className="flex flex-col gap-1 p-0 lg:gap-2 lg:p-4">
              <div className="bg-toon-paper shadow-inner-xl hidden aspect-square h-60 w-64 flex-col items-center rounded-md p-2 pt-4 text-lg lg:flex">
                {baseDamage > 0 && !hoveredGag && (
                  <div className="mt-auto flex w-full flex-col items-end">
                    <CalculatorLine
                      label="Base Gag Damage"
                      value={baseDamage}
                    />
                    <CalculatorLine label="Lure Bonus" value={lureBonus} />
                    <CalculatorLine label="Group Bonus" value={groupBonus} />
                    <Divider />
                    <div className="font-minnie text-4xl font-bold text-red-500!">
                      - {totalDamage}
                    </div>
                  </div>
                )}
                {hoveredGag && <GagInfoDisplay gag={hoveredGag} />}
              </div>

              {/* <div className="flex justify-between gap-8 px-6">
                <Buttoon
                  className="flex-1"
                  onClick={() => {
                    setSoundEnabled(!soundEnabled);
                  }}
                  type="button"
                >
                  <VolumeIcon className="h-6 md:h-8" />
                </Buttoon>
                <Buttoon className="flex-1">
                  <HelpIcon className="h-6 md:h-8" />
                </Buttoon>
              </div> */}
              <Buttoon
                className="w-4/5 flex-1 self-center font-minnie text-2xl"
                onClick={() => setSelectedGags([])}
              >
                Clear
              </Buttoon>

              <div className="text-md font-toon text-white/70 self-center ">
                calculator made by{' '}
                <a href="https://matenaer.dev" className="underline">
                  master reggie
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SfxContext.Provider>
  );
}

export default App;
