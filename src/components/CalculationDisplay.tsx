import clsx from 'clsx';
import React, { useMemo } from 'react';

import XIcon from '../../assets/icons/x-circle.svg?react';
import { GagTracks } from '../data/gagTracksInfo';
import type { GagInstance } from '../types';
import Gag from './Gag';
import { groupBy } from 'lodash-es';

interface Props {
  selectedGags: GagInstance[];
  onSelectionChanged: (gags: GagInstance[]) => void;
  totalDamage: number;
  onGagHover: (gag: GagInstance | undefined) => void;
}

export default function CalculationDisplay({
  selectedGags,
  onSelectionChanged,
  totalDamage,
  onGagHover,
}: Props) {
  const orderedGroupedGags = useMemo(() => {
    const orderedGags = [...selectedGags].sort((a, b) => {
      if (a.track === b.track) return a.level - b.level;
      const orderA = GagTracks.find((t) => t.name === a.track)?.order ?? 0;
      const orderB = GagTracks.find((t) => t.name === b.track)?.order ?? 0;
      return orderA - orderB;
    });
    return groupBy(orderedGags, (gag) => gag.track);
  }, [selectedGags]);

  const renderGags = () => {
    if (selectedGags.length === 0) {
      return (
        <span className="flex-1 text-center text-xl text-yellow-800/40 lg:text-2xl">
          No gags selected
        </span>
      );
    }

    const onlyOneType = Object.keys(orderedGroupedGags).length === 1;

    return Object.values(orderedGroupedGags).map(
      (group, groupIdx) => {
        const elements: React.ReactNode[] = [];
        const groupKey = group.map((g) => g.id).join('-');

        if (groupIdx > 0) {
          elements.push(
            <span
              key={`plus-${groupKey}`}
              className="text-yellow-800/40 text-xl hidden lg:block lg:text-2xl"
            >
              +
            </span>,
          );
        }

        if (group.length > 1 && !onlyOneType) {
          elements.push(
            <span
              key={`open-${groupKey}`}
              className="text-yellow-800/40 text-xl hidden lg:block lg:text-2xl"
            >
              (
            </span>,
          );
        }

        group.forEach((gag, i) => {
          if (i > 0) {
            elements.push(
              <span
                key={`plus-inner-${i}-${gag.id}`}
                className="text-yellow-800/40 text-xl hidden lg:block lg:text-2xl"
              >
                +
              </span>,
            );
          }

          elements.push(
            <Gag
              key={gag.id}
              disabled={
                i > 0 && gag.track === 'Trap' && group[i - 1].track === 'Trap'
              }
              gag={gag}
              onGagClick={() => {
                onSelectionChanged(
                  selectedGags.filter(({ id }) => id !== gag.id),
                );
                onGagHover(undefined);
              }}
              onGagHover={() => onGagHover(gag)}
              onMouseLeave={() => onGagHover(undefined)}
            />,
          );
        });

        if (group.length > 1 && !onlyOneType) {
          elements.push(
            <span
              key={`close-${groupKey}`}
              className="text-yellow-800/40 text-xl hidden lg:block lg:text-2xl"
            >
              )
            </span>,
          );
        }

        return elements;
      },
    );
  };

  return (
    <div className="bg-toon-paper m-4 mb-0 flex lg:h-16 h-12 flex-row items-center rounded-xl bg-white p-2 shadow-inner">
      <div className="flex flex-1 select-none flex-row items-center justify-start gap-1 overflow-auto p-4 md:gap-2">
        {renderGags()}
      </div>

      {selectedGags.length > 0 && (
        <div className="flex flex-row items-center justify-end gap-2">
          <div className="text-right text-2xl text-yellow-800/40 sm:text-4xl">
            = {totalDamage}
          </div>
        </div>
      )}

      <button
        className="cursor-pointer"
        type="button"
        onClick={() => onSelectionChanged([])}
      >
        <XIcon
          className={clsx(
            'h-8 w-8 text-red-500 ml-2',
            selectedGags.length === 0 && 'opacity-50',
          )}
        />
      </button>
    </div>
  );
}
