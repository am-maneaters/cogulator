import clsx from 'clsx';

import leaf from '../../assets/organic_leaf.webp';
import type { GagInfo } from '../types';

interface Props {
  gag: GagInfo;
  onGagHover?: (isOrganic: boolean) => void;
  onGagClick?: (isOrganic: boolean) => void;
}

export default function Gag({
  gag,
  onGagHover,
  onGagClick,
  disabled,
  ...props
}: Props & React.HTMLProps<HTMLDivElement>) {
  const handleClick = (isOrganic: boolean) => {
    onGagClick?.(isOrganic);
  };

  const handleMouseEnter = (isOrganic: boolean) => {
    onGagHover?.(isOrganic);
  };

  return (
    <div
      className={clsx(
        `cursor-pointer group relative flex h-auto w-14 select-none items-center justify-center
         rounded-2xl border-2 border-blue-500
         bg-linear-to-b from-blue-500 to-[#00b4ff] 
         px-2 pb-1 text-white shadow-gag 
         hover:shadow-xl hover:brightness-110 focus:brightness-110 active:brightness-75
         md:w-16 lg:w-20`,
        disabled && 'cursor-not-allowed opacity-50',
      )}
      onClick={() => handleClick(false)}
      onKeyDown={() => handleMouseEnter(false)}
      onMouseEnter={() => handleMouseEnter(false)}
      // biome-ignore lint/a11y/useSemanticElements: Button adds extra bad stuff
      role="button"
      tabIndex={0}
      {...props}
    >
      {gag.isOrganic !== false && (
        <div
          className={clsx(
            'absolute right-[-10px] top-[-13px] h-[25px] w-[25px] grayscale hover:grayscale-0 group-hover:block',
            gag.isOrganic && 'grayscale-0',
            !gag.isOrganic && 'hidden',
          )}
          onClick={(e) => {
            e.stopPropagation();
            handleClick(true);
          }}
          onKeyDown={() => {}}
          onMouseEnter={(e) => {
            e.stopPropagation();
            handleMouseEnter(true);
          }}
          onMouseLeave={() => {
            handleMouseEnter(false);
          }}
          // biome-ignore lint/a11y/useSemanticElements: Don't wanna
          role="button"
          tabIndex={0}
        >
          {/* Green Circle behind Organic Leaf */}
          <div className="pointer-events-none absolute h-[25px] w-[25px] rounded-full bg-green-800 drop-shadow-[1px_1px_1px_black]" />
          {/* Organic Leaf icon */}
          <img
            alt={gag.name}
            className="pointer-events-none absolute right-[-4px] top-[-4px] aspect-square overflow-hidden drop-shadow-[1px_1px_1px_black]"
            height={30}
            src={leaf}
            width={30}
          />
        </div>
      )}
      <img
        alt={gag.name}
        className="min-w-0 max-w-[65%] object-scale-down"
        draggable={false}
        src={gag.image}
      />
    </div>
  );
}
