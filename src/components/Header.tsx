import { ReactComponent as VolumeOnIcon } from '../../assets/icons/volume-on.svg';
import { ReactComponent as VolumeOffIcon } from '../../assets/icons/volume-off.svg';
import { ReactComponent as HelpIcon } from '../../assets/icons/help-circle.svg';
import HelpModal from './HelpModal';
import { useState } from 'react';

export function Header({
  soundEnabled,
  setSoundEnabled,
}: {
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
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
      </header>
      {helpModalOpen && <HelpModal onClose={() => setHelpModalOpen(false)} />}
    </>
  );
}
