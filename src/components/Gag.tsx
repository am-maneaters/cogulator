import React, { useState } from 'react';
import leaf from '../../assets/organic_leaf.webp';
import { GagInfo } from '../types';

type Props = {
  gag: GagInfo;
  onMouseEnter?: () => void;
  onGagClick?: (isOrganic: boolean) => void;
  disableCount?: boolean;
};

export default function Gag({
  gag,
  onMouseEnter,
  onGagClick,
  disableCount,
}: Props & React.HTMLProps<HTMLDivElement>) {
  const [gagCount, setGagCount] = useState(0);

  const handleClick = (isOrganic: boolean) => {
    if (onGagClick) onGagClick(isOrganic);
  };

  const handleMouseEnter = () => {
    if (onMouseEnter) onMouseEnter();
  };

  return (
    <div
      className="w-22 relative flex h-fit w-fit select-none items-end rounded-2xl 
         border-2 border-blue-500
         bg-gradient-to-b from-blue-500 to-[#00b4ff] 
         px-2 pb-1 text-white shadow-[-1px_2px_4px_2px_rgba(0,0,0,0.5)] 
         hover:shadow-xl hover:brightness-110 focus:brightness-110"
      onClick={() => handleClick(false)}
      onMouseEnter={handleMouseEnter}
      role="button"
      tabIndex={0}
      onKeyDown={handleMouseEnter}
    >
      <div
        className={`absolute top-[-10px] right-[-7px] h-[30px] w-[30px] grayscale ${
          gag.isOrganic === undefined ? 'hover:grayscale-0' : ''
        }`}
        style={gag.isOrganic ? { filter: `grayscale(0)` } : {}}
        onClick={(e) => {
          e.stopPropagation();
          handleClick(true);
        }}
        onKeyDown={() => {}}
        role="button"
        tabIndex={0}
      >
        <div className="pointer-events-none absolute h-[30px] w-[30px] rounded-full bg-green-800 drop-shadow-[1px_1px_1px_black]" />
        <img
          className="pointer-events-none absolute aspect-square overflow-hidden drop-shadow-[1px_1px_1px_black]"
          src={leaf}
          width={30}
          height={30}
          alt={gag.name}
        />
      </div>
      <img
        className="aspect-square"
        src={gag.image}
        width={50}
        alt={gag.name}
        draggable={false}
      />
      {!disableCount && (
        <div className="float-right w-5 text-right text-xl">{gagCount}</div>
      )}
    </div>
  );
}
