import React, { useMemo } from 'react';
import useSound from 'use-sound';
import './App.css';
import { useList } from 'react-use';
import hoverSfx from '../assets/sounds/GUI_rollover.mp3';
import clickSfx from '../assets/sounds/GUI_create_toon_fwd.mp3';
import Gag from './components/Gag';
import { GagInfo } from './types';
import GagInfoDisplay from './components/GagInfoDisplay';
import gagsInfo from './data/gagsInfo';
import gagTracksInfo from './data/gagTracksInfo';
import { imgFromPath } from './utils/imageUtils';

const gagTracks = gagTracksInfo.map(({ name, color }) => ({
  gags: gagsInfo
    .filter((gag) => gag.track === name)
    .sort((a, b) => a.level - b.level)
    .map((gag) => ({
      ...gag,
      image: imgFromPath(gag.image),
    })),
  color,
  name,
}));

function calculateTotalDamage(gags: GagInfo[]) {
  let totalDamage = 0;
  gagTracks.forEach(({ name }) => {
    const trackGags = gags.filter((gag) => gag.track === name);

    const gagDamage = trackGags
      .map(({ maxDmg, isOrganic, dmgType }) => {
        if (dmgType === 'Damage') {
          return Math.max(1, Math.floor((maxDmg ?? 0) * (isOrganic ? 1.1 : 1)));
        }
        return 0;
      })
      .reduce((a, v) => a + v, 0);

    totalDamage += gagDamage;

    // Group bonus only applies when multiple gags are used together
    if (trackGags.length > 1) {
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

  const totalDamage = useMemo(
    () => calculateTotalDamage(selectedGags),
    [selectedGags]
  );

  return (
    <div>
      <div className="flex h-32 flex-row">
        {selectedGags.map((gag, i) => (
          <Gag gag={gag} key={i} />
        ))}
      </div>
      Unlured: {totalDamage}
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
              <div className="w-32">
                <div className="text-2xl uppercase">{name}</div>
                <div className="flex justify-center border-2 border-black border-opacity-20 bg-black bg-opacity-10 shadow-inner">
                  <p className="whitespace-nowrap">381 to Go!</p>
                </div>
              </div>
              {gags.map((gag) => (
                <Gag
                  gag={gag}
                  key={gag.name}
                  onClick={() => {
                    selectedGagsList.push(gag);
                    playClickSfx();
                  }}
                  onMouseEnter={() => {
                    setHoveredGag(gag);
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
