import XCircleIcon from '../../assets/icons/x-circle.svg?react';
import { Buttoon } from './Buttoon';

interface Props {
  onClose: () => void;
}

const changelog = [
  {
    date: 'May 25th, 2024',
    notes: ['Updated gag values for the Under New Management update!'],
  },
  {
    date: 'January 2nd, 2025',
    notes: [
      'Removed v2.0 cog functionality since it is no longer in the game. Thanks Shane!',
    ],
  },
  {
    date: 'July 22nd, 2025',
    notes: [
      'Upgraded packages behind the scenes.',
      'Show mathematical symbols in the cog damage table on large screens.',
      'Added a new help modal for the cog damage table.',
      'Rearranged some UI elements for better usability.',
      'Minor improvements to make the app more responsive.',
    ],
  },
];

export default function HelpModal({ onClose }: Props) {
  return (
    <div className="fixed inset-0 z-10 flex h-full w-full items-center justify-center bg-black/50">
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
            cog level. All rules and formulas follow the rules established in
            <a
              className="font-bold text-blue-500 underline ml-1"
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
            any suggestions, please send me an email at
            <a
              className="font-bold text-blue-500 underline ml-1"
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
          <h2 className="text-2xl font-bold py-2">Changelog</h2>

          <div
            className="space-y-4 max-h-64 overflow-y-auto"
            style={{ scrollbarGutter: 'stable' }}
          >
            {changelog.reverse().map(({ date, notes }) => (
              <div
                aria-label="Changelog entry"
                key={date}
                className="rounded-lg border border-gray-200 bg-gray-50 p-4 shadow-sm"
              >
                <h4 className="font-semibold text-lg text-gray-800 mb-2">
                  {date}
                </h4>
                <ul
                  aria-label="Changelog notes"
                  className="list-disc pl-6 text-gray-700 space-y-1"
                >
                  {notes.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
