import React, { useEffect } from 'react';
import gagsInfo from '../data/gagsInfo';
import { GagInfo, GagInstance } from '../types';

type OptimalGags = {
  isLoading: boolean;
  optimalGags?: GagInstance[];
  beginCalculation: (hp: number) => void;
};

const worker = new Worker(new URL('../utils/worker.ts', import.meta.url), {
  type: 'module',
});

let currentId = 0;

export function useOptimalGags(): OptimalGags {
  const [isLoading, setIsLoading] = React.useState(false);
  const [optimalGags, setOptimalGags] = React.useState<GagInstance[]>();

  useEffect(() => {
    const listener = (e: MessageEvent<GagInfo[]>) => {
      const gagsWithIds: GagInstance[] = e.data.map((gag) => ({
        ...gag,
        id: `optimal${currentId++}`,
      }));
      setOptimalGags(gagsWithIds);
      setIsLoading(false);
    };
    worker.addEventListener('message', listener);

    return () => {
      worker.removeEventListener('message', listener);
    };
  }, []);

  const beginCalculation = (hp: number) => {
    worker.postMessage({
      targetDamage: hp,
      availableGags: gagsInfo,
    });
    setIsLoading(true);
    setOptimalGags([]);
  };

  return { isLoading, optimalGags, beginCalculation };
}
