import { useSfx } from '../context/sfxContext';
import type { GagInfo, GagInstance, GagTrackInfo } from '../types';
import { getUniqueId } from '../utils/uniqueUtils';
import Gag from './Gag';

interface Props {
  track: GagTrackInfo;
  onGagHover: (gag: GagInfo | undefined) => void;
  onGagSelect: (gag: GagInstance) => void;
  hiddenColumns?: number[];
}

export default function GagTrack({
  track,
  onGagHover,
  onGagSelect,
  hiddenColumns,
}: Props) {
  const { playClickSfx, playHoverSfx } = useSfx();
  const { name, color, gags } = track;

  // filter out gags with the indexes in hiddenColumns
  const filteredGags = gags.filter(
    (_, index) => !hiddenColumns?.includes(index),
  );

  return (
    <div
      className="flex w-min flex-1 gap-2 rounded-[2%/45%] p-2 px-4 shadow-[0_5px_13px_1px_black]"
      style={{ backgroundColor: color }}
    >
      <div className="hidden min-w-[90px] flex-col justify-center xl:flex">
        <div className="text-2xl uppercase">{name}</div>
      </div>
      <div className="flex gap-2">
        {filteredGags.map((gag) => (
          <Gag
            gag={gag}
            key={gag.name}
            onBlur={() => {
              onGagHover(undefined);
            }}
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
            onMouseLeave={() => {
              onGagHover(undefined);
            }}
          />
        ))}
      </div>
    </div>
  );
}
