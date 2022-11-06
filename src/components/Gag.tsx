import clsx from 'clsx';
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
  ...props
}: Props & React.HTMLProps<HTMLDivElement>) {
  const handleClick = (isOrganic: boolean) => {
    if (onGagClick) onGagClick(isOrganic);
  };

  const handleMouseEnter = (isOrganic: boolean) => {
    if (onGagHover) onGagHover(isOrganic);
  };

  return (
    <div
      className="group relative flex h-auto min-h-0 w-fit min-w-[85px] max-w-[85px]
         select-none items-center justify-center
         rounded-2xl border-2 border-blue-500 
         bg-gradient-to-b from-blue-500 to-[#00b4ff] px-2 
         pb-1 text-white shadow-[-1px_2px_4px_2px_rgba(0,0,0,0.5)] hover:shadow-xl
        hover:brightness-110 focus:brightness-110 active:brightness-75"
      onClick={() => handleClick(false)}
      onMouseEnter={() => {
        handleMouseEnter(false);
      }}
      role="button"
      tabIndex={0}
      onKeyDown={() => {
        handleMouseEnter(false);
      }}
      {...props}
    >
      {gag.isOrganic !== false && (
        <div
          className={clsx(
            'absolute top-[-13px] right-[-10px] h-[25px] w-[25px] grayscale hover:grayscale-0 group-hover:block',
            gag.isOrganic && 'grayscale-0',
            !gag.isOrganic && 'hidden'
          )}
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
          {/* Green Circle behind Organic Leaf */}
          <div className="pointer-events-none absolute h-[25px] w-[25px] rounded-full bg-green-800 drop-shadow-[1px_1px_1px_black]" />
          {/* Organic Leaf icon */}
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
        className="min-w-0 max-w-[65%] object-scale-down"
        src={gag.image}
        alt={gag.name}
        draggable={false}
      />
    </div>
  );
}
