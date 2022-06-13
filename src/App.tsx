import React from "react";
import useSound from "use-sound";
import "./App.css";
import gagsJson from "./gags.json";
import hoverSfx from "../assets/sounds/GUI_rollover.mp3";
import clickSfx from "../assets/sounds/GUI_create_toon_fwd.mp3";
import Gag from "./components/Gag";
import { GagTrackInfo, GagInfo } from "./types";
import GagInfoDisplay from "./components/GagInfoDisplay";

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

const imgFromPath = (path: string) => new URL(path, import.meta.url).href;

const gagTracks = tracksInfo.map(({ name, color }) => ({
  gags: (gagsJson as Exclude<GagInfo[], "image">)
    .filter((gag) => gag.track === name)
    .sort((a, b) => a.level - b.level)
    .map((gag) => ({
      ...gag,
      image: imgFromPath(`/assets/gags/${gag.name.replaceAll(" ", "_")}.webp`),
    })) as GagInfo[],
  color,
  name,
}));

function App() {
  const [hoveredGag, setHoveredGag] = React.useState<GagInfo>();
  const [playHoverSfx] = useSound(hoverSfx);
  const [playClickSfx] = useSound(clickSfx);

  return (
    <div className="flex bg-red-600 p-8">
      <div className="pr-8">
        {gagTracks.map(({ gags, color, name }) => (
          <div
            className="flex p-2 gap-2 px-4 shadow-2xl"
            style={{
              backgroundColor: color,
              borderRadius: "2% 2% 2% 2% / 45% 45% 45% 45% ",
              boxShadow: "0px 5px 13px 1px #000000",
            }}
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
                onMouseEnter={() => {
                  setHoveredGag(gag);
                  playHoverSfx();
                }}
              />
            ))}
          </div>
        ))}
      </div>
      <GagInfoDisplay gag={hoveredGag} />
    </div>
  );
}

export default App;
