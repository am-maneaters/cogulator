import React from 'react';
import { Buttoon } from './Buttoon';
import { ReactComponent as XCircleIcon } from '../../assets/icons/x-circle.svg';

type Props = {
  onClose: () => void;
};

export default function HelpModal({ onClose }: Props) {
  return (
    <div className="absolute top-0 left-0 z-10 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
      <div className="w-1/2 rounded-lg bg-white p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">About</h2>
          <Buttoon className="p-2 text-2xl font-bold" onClick={onClose}>
            <XCircleIcon />
          </Buttoon>
        </div>
        <div className="mt-4">
          <p>
            Big Brain Town is a calculator for Toontown Rewritten designed to
            help you figure out the exact damage you need to do to defeat each
            cog level. All rules and formulas follow the rules established in{' '}
            <a
              href="https://www.toontownrewritten.com"
              target="_blank"
              rel="noreferrer"
              className="font-bold text-blue-500 underline"
            >
              Toontown Rewritten
            </a>
            .
          </p>
          <p className="mt-4">
            This calculator is a work in progress. If you find any bugs or have
            any suggestions, please send me an email at{' '}
            <a
              href="mailto:big@brain.town"
              className="font-bold text-blue-500 underline"
            >
              big@brain.town
            </a>
            .
          </p>

          <p className="mt-4">
            Please note that this tool is <strong>not</strong> affiliated with
            Disney or Toontown Rewritten.
          </p>
        </div>
      </div>
    </div>
  );
}
