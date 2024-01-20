import clsx from 'clsx';
import React, { useMemo } from 'react';

import { calculateCogHealth } from '../utils/calculatorUtils';

interface Props {
  level: number;
  damage?: number;
}

export const Cog = ({ level, damage = 0 }: Props) => {
  const hp = useMemo(() => calculateCogHealth(level), [level]);

  const remainingHp = useMemo(() => Math.max(0, hp - damage), [hp, damage]);

  return (
    <div
      className={clsx(
        'flex w-10 flex-col items-center font-cog text-xl outline-double',
        remainingHp === 0 ? 'bg-green-500' : 'bg-red-500',
        damage === 0 && 'bg-gray-500',
      )}
    >
      <div>
        <span className="text-lg font-bold">{level}</span>
      </div>
      <div className="text-sm">{remainingHp}</div>
    </div>
  );
};
