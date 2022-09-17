import React from 'react';
import { useSfx } from '../context/sfxContext';
import { GagInfo, GagInstance, GagTrackInfo } from '../types';
import { getUniqueId } from '../utils/uniqueUtils';
import Gag from './Gag';

type Props = {
  track: GagTrackInfo;
  onGagHover: (gag: GagInfo) => void;
  onGagSelect: (gag: GagInstance) => void;
};

export default function GagTrack({ track, onGagHover, onGagSelect }: Props) {
  const { playClickSfx, playHoverSfx } = useSfx();
  const { name, color, gags } = track;
  return (
    <div
      className="flex max-w-max flex-1 gap-2 rounded-[2%/45%] p-2 px-4 shadow-[0_5px_13px_1px_black]"
      style={{
        backgroundColor: color,
      }}
    >
      <div className="flex min-w-[90px] flex-col justify-center sm:hidden xl:block">
        <div className="text-2xl uppercase">{name}</div>
      </div>
      <div className="flex gap-2">
        {gags.map((gag) => (
          <Gag
            gag={gag}
            key={gag.name}
            onGagClick={(isOrganic) => {
              onGagSelect({
                ...gag,
                isOrganic,
                id: getUniqueId(),
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
