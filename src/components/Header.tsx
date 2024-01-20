import { useState } from 'react';

import GridIcon from '../../assets/icons/grid.svg?react';
import HelpIcon from '../../assets/icons/help-circle.svg?react';
import MeterIcon from '../../assets/icons/thermometer.svg?react';
import VolumeOffIcon from '../../assets/icons/volume-off.svg?react';
import VolumeOnIcon from '../../assets/icons/volume-on.svg?react';
import HelpModal from './HelpModal';

export function Header({
  soundEnabled,
  setSoundEnabled,
  showBetaCogDisplay,
  setShowBetaCogDisplay,
}: {
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  showBetaCogDisplay: boolean;
  setShowBetaCogDisplay: (show: boolean) => void;
}) {
  const [helpModalOpen, setHelpModalOpen] = useState(false);

  return (
    <>
      <header className="flex items-center gap-2 p-2 font-minnie text-4xl tracking-[-0.09em]  !text-[#FEF200] sm:text-6xl">
        {soundEnabled ? (
          <VolumeOnIcon
            className="ml-auto h-8 w-8 cursor-pointer"
            onClick={() => setSoundEnabled(false)}
          />
        ) : (
          <VolumeOffIcon
            className="ml-auto h-8 w-8 cursor-pointer"
            onClick={() => setSoundEnabled(true)}
          />
        )}
        Big Brain Town
        <HelpIcon
          className="ml-2 h-8 w-8 cursor-pointer hover:opacity-50"
          onClick={() => setHelpModalOpen(true)}
        />
        {showBetaCogDisplay ? (
          <MeterIcon
            className="h-8 w-8 cursor-pointer hover:opacity-50"
            onClick={() => setShowBetaCogDisplay(false)}
          />
        ) : (
          <GridIcon
            className="h-8 w-8 cursor-pointer hover:opacity-50"
            onClick={() => setShowBetaCogDisplay(true)}
          />
        )}
      </header>
      {helpModalOpen && <HelpModal onClose={() => setHelpModalOpen(false)} />}
    </>
  );
}
