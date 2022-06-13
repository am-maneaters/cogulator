import React from "react";
import useSound from "use-sound";
import "./App.css";
import gagsJson from "./gags.json";
import hoverSfx from "../assets/sounds/GUI_rollover.mp3";
import clickSfx from "../assets/sounds/GUI_create_toon_fwd.mp3";
import Gag from "./components/Gag";
import { GagTrackInfo, GagInfo } from "./types";

const tracksInfo: GagTrackInfo[] = [
  {
    name: "Toonup",
    color: "#C55AE8",
    order: 0,
  },
  {
    name: "Trap",
    color: "#E8E65A",
    order: 1,
  },
  {
    name: "Lure",
    color: "#33BD35",
    order: 2,
  },
  {
    name: "Sound",
    color: "#3D5DEB",
    order: 3,
  },
  {
    name: "Throw",
    color: "#ED9F32",
    order: 4,
  },
  {
    name: "Squirt",
    color: "#F55BD6",
    order: 5,
  },
  {
    name: "Drop",
    color: "#32EAED",
    order: 6,
  },
];
const gagTracks = tracksInfo.map(({ name, color }) => ({
  gags: (gagsJson as GagInfo[])
    .filter((gag) => gag.track === name)
    .sort((a, b) => a.level - b.level),
  color,
  name,
}));

function App() {
  const [playHoverSfx] = useSound(hoverSfx);
  const [playClickSfx] = useSound(clickSfx);

  return (
    <div className="flex flex-row">
      <div>
        {gagTracks.map(({ gags, color, name }) => (
          <div
            className="flex p-2 gap-2"
            style={{ backgroundColor: color }}
            key={name}
          >
            <div className="w-32">
              <div className="text-2xl uppercase">{name}</div>
              <div className=" shadow-inner border-2 border-black flex justify-center border-opacity-20 bg-[#0000002c]">
                381 to Go!
              </div>
            </div>
            {gags.map((gag) => (
              <Gag
                gagInfo={gag}
                key={gag.name}
                onClick={() => playClickSfx()}
                onMouseEnter={() => playHoverSfx()}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
