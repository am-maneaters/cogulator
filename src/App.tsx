import React, { useMemo } from 'react';
import useSound from 'use-sound';
import './App.css';
import { useList } from 'react-use';
import hoverSfx from '../assets/sounds/GUI_rollover.mp3';
import clickSfx from '../assets/sounds/GUI_create_toon_fwd.mp3';
import Gag from './components/Gag';
import { CogStatus, GagInfo, GagTrackInfo } from './types';
import GagInfoDisplay from './components/GagInfoDisplay';
import gagsInfo from './data/gagsInfo';
import gagTracksInfo from './data/gagTracksInfo';
import { imgFromPath } from './utils/imageUtils';
import { TrackInfo } from './components/TrackInfo';
import { Cog } from './components/Cog';
import { getGagDmg } from './utils/calculatorUtils';

const gagTracks: GagTrackInfo[] = gagTracksInfo.map(
  ({ name, color, order, dmgType }) => ({
    gags: gagsInfo
      .filter((gag) => gag.track === name)
      .sort((a, b) => a.level - b.level)
      .map((gag) => ({
        ...gag,
        image: imgFromPath(gag.image),
      })),
    color,
    name,
    order,
    dmgType,
  })
);

function calculateTotalDamage(gags: GagInfo[], initialCogStatus: CogStatus) {
  let totalDamage = 0;

  const cogStatus: CogStatus = { ...initialCogStatus };
  let trapGag: GagInfo | undefined;

  gagTracks.forEach(({ name, dmgType }) => {
    const trackGags = gags.filter((gag) => gag.track === name);

    const gagDamage = trackGags
      .map((currentGag) => {
        const { track } = currentGag;

        if (track === 'Trap') {
          [trapGag] = trackGags;
          cogStatus.trapped = true;
          return 0;
        }

        if (dmgType === 'Damage') {
          return getGagDmg(currentGag);
        }

        if (dmgType === 'Lure') {
          cogStatus.lured = true;
          if (trapGag) {
            cogStatus.trapped = false;
            cogStatus.lured = false;
            const dmg = getGagDmg(trapGag);
            trapGag = undefined;
            return dmg;
          }
        }
        return 0;
      })
      .reduce((a, v) => a + v, 0);

    totalDamage += gagDamage;

    if (dmgType === 'Damage' && totalDamage > 0 && cogStatus.lured) {
      cogStatus.lured = false;
      cogStatus.trapped = false;

      if (name !== 'Sound') totalDamage += gagDamage / 2;
    }
    if (trackGags.length > 1) {
      // Group bonus only applies when multiple gags are used together
      totalDamage += Math.ceil(gagDamage / 5);
    }
  });
  return totalDamage;
}

function App() {
  const [hoveredGag, setHoveredGag] = React.useState<GagInfo>();
  const [playHoverSfx] = useSound(hoverSfx);
  const [playClickSfx] = useSound(clickSfx);

  const [selectedGags, selectedGagsList] = useList<GagInfo>([]);

  const orderedGags = useMemo(
    () =>
      selectedGags.sort((a, b) =>
        a.track === b.track
          ? a.level - b.level
          : gagTracks.find(({ name }) => name === a.track)?.order -
            gagTracks.find(({ name }) => name === b.track)?.order
      ),
    [selectedGags]
  );

  const totalDamage = useMemo(
    () => calculateTotalDamage(selectedGags, {}),
    [selectedGags]
  );

  return (
    <div>
      <div className=" bg-blue-500">
        <span className="font-mickey text-5xl">Selected Gags</span>
        <div className="flex h-32 flex-row gap-8 p-8">
          {orderedGags.map((gag, i) => (
            <Gag
              gag={gag}
              key={i}
              onGagClick={() => {
                const idx = selectedGags.findIndex((g) => g.name === gag.name);
                selectedGagsList.removeAt(idx);
              }}
            />
          ))}
        </div>
      </div>

      <span className="text-3xl">Total Damage: {totalDamage}</span>
      <div className="flex flex-row flex-wrap gap-4">
        {[...Array(20).keys()].map((i) => (
          <Cog level={i + 1} key={i} damage={totalDamage} />
        ))}
      </div>
      <div className="flex bg-red-600 p-8">
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
              {gags.map((gag) => (
                <Gag
                  gag={gag}
                  key={gag.name}
                  onGagClick={(isOrganic) => {
                    const newGag = { ...gag, isOrganic };
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
          ))}
        </div>
        <GagInfoDisplay gag={hoveredGag} />
      </div>
    </div>
  );
}

export default App;
