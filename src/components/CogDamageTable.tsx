import { range } from 'lodash-es';
import { useMemo } from 'react';

import type { GagInfo } from '../types';
import { calculateTotalDamage } from '../utils/calculatorUtils';
import { Cog } from './Cog';

export function CogDamageTable({
  selectedGags,
  hoveredGag,
}: {
  selectedGags: GagInfo[];
  hoveredGag: GagInfo | undefined;
}) {
  const hypotheticalGags = useMemo(
    () => hoveredGag && [...selectedGags, hoveredGag],
    [hoveredGag, selectedGags],
  );

  return (
    <div className="grid grid-cols-10 border-2 border-solid border-gray-700 lg:grid-flow-col-dense">
      {range(20).map((i) => (
        <Cog
          damage={
            calculateTotalDamage(selectedGags, {
              level: i + 1,
            }).totalDamage
          }
          hypotheticalDamage={
            hypotheticalGags &&
            calculateTotalDamage(hypotheticalGags, {
              level: i + 1,
            }).totalDamage
          }
          key={i}
          level={i + 1}
        />
      ))}
    </div>
  );
}
