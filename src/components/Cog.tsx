import clsx from 'clsx';
import React, { useMemo } from 'react';
import { calculateCogHealth } from '../utils/calculatorUtils';

type Props = { level: number; damage?: number };

export const Cog = ({ level, damage = 0 }: Props) => {
  const hp = useMemo(() => calculateCogHealth(level), [level]);

  const remainingHp = useMemo(() => Math.max(0, hp - damage), [hp, damage]);

  const hpTextColor = useMemo(() => {
    if (remainingHp === 0) {
      return 'text-green-500';
    }
    return 'text-red-500';
  }, []);
  return (
    <div className="flex w-16 flex-col bg-[#D2D2D2] font-cog text-xl outline-double">
      <div>{level}</div>
      <div>
        <span className={clsx('text-2xl', 'font-extrabold', hpTextColor)}>
          {remainingHp}
        </span>
      </div>
    </div>
  );
};
