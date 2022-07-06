import React from 'react';
import { useSfx } from '../context/sfxContext';
import { GagInfo, GagInstance, GagTrackInfo } from '../types';
import Gag from './Gag';

type Props = {
  track: GagTrackInfo;
  onGagHover: (gag: GagInfo) => void;
  onGagSelect: (gag: GagInstance) => void;
};

let currentId = 0;

export default function GagTrack({ track, onGagHover, onGagSelect }: Props) {
  const { playClickSfx, playHoverSfx } = useSfx();
  const { name, color, gags } = track;
  return (
    <div
      className="flex gap-2 rounded-[2%/45%] p-2 px-4 shadow-[0_5px_13px_1px_black]"
      style={{
        backgroundColor: color,
      }}
    >
      <div className="flex min-w-[90px] flex-col justify-center">
        <div className="text-2xl uppercase">{name}</div>
      </div>
      <div className="flex gap-2">
        {gags.map((gag) => (
          <Gag
            gag={gag}
            key={gag.name}
            onGagClick={(isOrganic) => {
              currentId += 1;
              onGagSelect({
                ...gag,
                isOrganic,
                id: currentId,
              });
              playClickSfx();
            }}
            onGagHover={(isOrganic) => {
              onGagHover({ ...gag, isOrganic });
              playHoverSfx();
            }}
          />
        ))}
      </div>
    </div>
  );
}
