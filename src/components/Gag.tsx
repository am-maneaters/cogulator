import React, { useMemo, useState } from "react";
import { GagInfo } from "../types";

type Props = {
  gagInfo: GagInfo;
  onMouseEnter: () => void;
  onClick: () => void;
};
const imgFromPath = (path: string) => new URL(path, import.meta.url).href;

export default function Gag({ gagInfo, onMouseEnter, onClick }: Props) {
  const [gagCount, setGagCount] = useState(0);

  const gagImagePath = useMemo(() => {
    const imgName = gagInfo.name.replaceAll(" ", "_");
    return imgFromPath(`/assets/gags/${imgName}.webp`);
  }, [gagInfo]);

  const handleClick = () => {
    setGagCount(gagCount + 1);
    onClick();
  };

  return (
    <div
      className="px-2 pb-1 pl-2 rounded-2xl text-white flex items-end 
         border-2 border-blue-500
         bg-gradient-to-b from-blue-500 to-[#00b4ff]
         shadow-[-1px_2px_4px_2px_rgba(0,0,0,0.5)]
         hover:brightness-110 hover:shadow-xl w-22 select-none"
      onClick={handleClick}
      onMouseEnter={onMouseEnter}
      role="button"
      tabIndex={0}
      onKeyDown={onMouseEnter}
    >
      <img
        className="aspect-square"
        src={gagImagePath}
        width={50}
        alt={gagInfo.name}
        draggable={false}
      />
      <div className="w-5 float-right text-xl text-right">{gagCount}</div>
    </div>
  );
}
