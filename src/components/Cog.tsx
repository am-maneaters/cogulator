import clsx from 'clsx';
import React, { useMemo } from 'react';
import { calculateCogHealth } from '../utils/calculatorUtils';

type Props = {
  level: number;
  damage?: number;
  onCogClick: (hp: number) => void;
};

export const Cog = ({ level, damage = 0, onCogClick }: Props) => {
  const hp = useMemo(() => calculateCogHealth(level), [level]);

  const remainingHp = useMemo(() => Math.max(0, hp - damage), [hp, damage]);

  return (
    <div
      className="flex w-24 flex-col bg-[#D2D2D2] font-cog text-xl outline-double"
      onClick={() => onCogClick(hp)}
    >
      <div>
        {level}:
        <span
          className={clsx(
            'text-2xl',
            'font-extrabold',
            remainingHp === 0 ? 'text-green-500' : 'text-red-500'
          )}
        >
          {remainingHp}
        </span>
      </div>
    </div>
  );
};
