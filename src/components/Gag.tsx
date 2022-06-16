import React, { useState } from 'react';
import { GagInfo } from '../types';

type Props = {
  gag: GagInfo;
  onMouseEnter?: () => void;
  onClick?: () => void;
  disableCount?: boolean;
};

export default function Gag({
  gag,
  onMouseEnter,
  onClick,
  disableCount,
}: Props & React.HTMLProps<HTMLDivElement>) {
  const [gagCount, setGagCount] = useState(0);

  const handleClick = () => {
    setGagCount(gagCount + 1);
    if (onClick) onClick();
  };

  const handleMouseEnter = () => {
    if (onMouseEnter) onMouseEnter();
  };

  return (
    <div
      className="px-2 pb-1 pl-2 rounded-2xl text-white flex items-end 
         border-2 border-blue-500
         bg-gradient-to-b from-blue-500 to-[#00b4ff]
         shadow-[-1px_2px_4px_2px_rgba(0,0,0,0.5)]
         hover:brightness-110 hover:shadow-xl w-22 select-none w-fit h-fit"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      role="button"
      tabIndex={0}
      onKeyDown={handleMouseEnter}
    >
      <img
        className="aspect-square"
        src={gag.image}
        width={50}
        alt={gag.name}
        draggable={false}
      />
      {!disableCount && (
        <div className="w-5 float-right text-xl text-right">{gagCount}</div>
      )}
    </div>
  );
}
