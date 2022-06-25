import React, { useMemo } from 'react';
import useSound from 'use-sound';
import './App.css';
import { useList } from 'react-use';
import hoverSfx from '../assets/sounds/GUI_rollover.mp3';
import clickSfx from '../assets/sounds/GUI_create_toon_fwd.mp3';
import Gag from './components/Gag';
import { GagInfo, GagTrackInfo } from './types';
import GagInfoDisplay from './components/GagInfoDisplay';
import gagsInfo from './data/gagsInfo';
import gagTracksInfo from './data/gagTracksInfo';
import { imgFromPath } from './utils/imageUtils';
import { TrackInfo } from './components/TrackInfo';

const gagTracks: GagTrackInfo[] = gagTracksInfo.map(
  ({ name, color, order }) => ({
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
  })
);

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
      <div className="flex h-32 flex-row gap-8 p-8">
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
