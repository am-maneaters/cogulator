import clsx from 'clsx';
import React, { useMemo } from 'react';

import { calculateCogHealth } from '../utils/calculatorUtils';

interface Props {
  level: number;
  damage?: number;
  hypotheticalDamage?: number;
}

export const Cog = ({ level, damage = 0, hypotheticalDamage }: Props) => {
  const hp = useMemo(() => calculateCogHealth(level), [level]);

  const remainingHp = useMemo(() => Math.max(0, hp - damage), [hp, damage]);

  const remainingHypotheticalHp = useMemo(
    () => hypotheticalDamage && Math.max(0, hp - hypotheticalDamage),
    [hp, hypotheticalDamage],
  );

  function getBackgroundColor() {
    if (remainingHp === 0) {
      return 'bg-green-500';
    }
    if (
      remainingHypotheticalHp === 0 &&
      remainingHp !== 0 &&
      hypotheticalDamage !== 0
    ) {
      return 'bg-green-300';
    }
    if (damage === 0) {
      return 'bg-gray-500';
    }

    return 'bg-red-500';
  }

  return (
    <div
      className={clsx(
        'flex w-8 md:w-10 flex-col items-center font-cog text-sm md:text-xl outline-double',
        getBackgroundColor(),
      )}
    >
      <div>
        <span className="text-sm md:text-lg font-bold">{level}</span>
      </div>
      <div className="text-xs md:text-sm">
        {hypotheticalDamage === 0
          ? remainingHp
          : remainingHypotheticalHp ?? remainingHp}
      </div>
    </div>
  );
};
