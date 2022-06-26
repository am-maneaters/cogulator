import React, { useMemo } from 'react';
import { calculateCogHealth } from '../utils/calculatorUtils';
import luredEffect from '../../assets/lured_effect.webp';
import trappedEffect from '../../assets/trapped_effect.webp';
import cogImg from '../../assets/cog.png';
import { CogStatus } from '../types';

type Props = { level: number; damage?: number; effects?: CogStatus };

export const Cog = ({ level, damage = 0, effects = {} }: Props) => {
  const hp = useMemo(() => calculateCogHealth(level), [level]);

  return (
    <div className="flex w-16 flex-col bg-[#D2D2D2] font-cog text-xl outline-double">
      {/* <div>Cog</div>
      <img src={cogImg} width={50} /> */}
      <div>{level}</div>
      <div>
        <span className="text-2xl font-extrabold">
          {Math.max(0, hp - damage)}
          {/* {damage > 0 && `(-${damage})`} */}
        </span>
      </div>
      {/* <div className="flex h-6 flex-row gap-4">
        <img
          src={luredEffect}
          className={effects.lured ? '' : 'grayscale'}
          alt="luredIcon"
        />
        <img
          src={trappedEffect}
          className={effects.trapped ? '' : 'grayscale'}
          alt="trappedIcon"
        />
      </div> */}
    </div>
  );
};
