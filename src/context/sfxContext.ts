import React from 'react';

type SfxContextType = {
  playHoverSfx: () => void;
  playClickSfx: () => void;
};

export const SfxContext = React.createContext<SfxContextType>({
  playHoverSfx: () => {},
  playClickSfx: () => {},
});

export function useSfx(): SfxContextType {
  return React.useContext(SfxContext);
}
