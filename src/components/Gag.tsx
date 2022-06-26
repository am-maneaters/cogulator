import React from 'react';
import leaf from '../../assets/organic_leaf.webp';
import { GagInfo } from '../types';

type Props = {
  gag: GagInfo;
  onGagHover?: (isOrganic: boolean) => void;
  onGagClick?: (isOrganic: boolean) => void;
};

export default function Gag({
  gag,
  onGagHover,
  onGagClick,
}: Props & React.HTMLProps<HTMLDivElement>) {
  const handleClick = (isOrganic: boolean) => {
    if (onGagClick) onGagClick(isOrganic);
  };

  const handleMouseEnter = (isOrganic: boolean) => {
    if (onGagHover) onGagHover(isOrganic);
  };

  return (
    <div
      className="w-22 relative flex h-fit w-fit select-none items-end 
         rounded-2xl border-2
         border-blue-500 bg-gradient-to-b from-blue-500 
         to-[#00b4ff] px-2 pb-1 text-white 
         shadow-[-1px_2px_4px_2px_rgba(0,0,0,0.5)] hover:shadow-xl hover:brightness-110 focus:brightness-110"
      onClick={() => handleClick(false)}
      onMouseEnter={() => {
        handleMouseEnter(false);
      }}
      role="button"
      tabIndex={0}
      onKeyDown={() => {
        handleMouseEnter(false);
      }}
    >
      {gag.isOrganic !== false && (
        <div
          className="absolute top-[-13px] right-[-10px] h-[30px] w-[30px] grayscale hover:grayscale-0"
          style={gag.isOrganic ? { filter: `grayscale(0)` } : {}}
          onClick={(e) => {
            e.stopPropagation();
            handleClick(true);
          }}
          onMouseEnter={(e) => {
            e.stopPropagation();
            handleMouseEnter(true);
          }}
          onMouseLeave={() => {
            handleMouseEnter(false);
          }}
          onKeyDown={() => {}}
          role="button"
          tabIndex={0}
        >
          <div className="pointer-events-none absolute h-[30px] w-[30px] rounded-full bg-green-800 drop-shadow-[1px_1px_1px_black]" />
          <img
            className="pointer-events-none absolute right-[-4px] top-[-4px] aspect-square overflow-hidden drop-shadow-[1px_1px_1px_black]"
            src={leaf}
            width={30}
            height={30}
            alt={gag.name}
          />
        </div>
      )}
      <img
        className="mx-2 aspect-square"
        src={gag.image}
        width={50}
        alt={gag.name}
        draggable={false}
      />
    </div>
  );
}
