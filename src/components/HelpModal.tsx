import React from 'react';

import XCircleIcon from '../../assets/icons/x-circle.svg?react';
import { Buttoon } from './Buttoon';

interface Props {
  onClose: () => void;
}

export default function HelpModal({ onClose }: Props) {
  return (
    <div className="absolute left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
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
              className="font-bold text-blue-500 underline"
              href="https://www.toontownrewritten.com"
              rel="noreferrer"
              target="_blank"
            >
              Toontown Rewritten
            </a>
            .
          </p>
          <p className="mt-4">
            This calculator is a work in progress. If you find any bugs or have
            any suggestions, please send me an email at{' '}
            <a
              className="font-bold text-blue-500 underline"
              href="mailto:big@brain.town"
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
