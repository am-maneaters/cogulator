import React from "react";
import { GagInfo } from "../types";

type Props = {
  gag?: GagInfo;
};

const Divider = () => (
  <div
    className="h-1 w-full px-2"
    style={{
      background:
        "linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(219,201,168,1) 25%, rgba(218,200,166,1) 82%, rgba(255,255,255,1) 100%)",
    }}
  />
);

type InfoLineItemProps = {
  label: string;
  value: string;
};

const InfoLineItem = ({ label, value }: InfoLineItemProps) => (
  <div className="text-[#03256A] flex text-lg">
    <div className="font-semibold">{label}</div>: {value}
  </div>
);

const formatAffects = ({ affects_num: num, affects_type: type }: GagInfo) =>
  num === "All" ? `${num} ${type}s` : `${num} ${type}`;

export default function GagInfoDisplay({ gag }: Props) {
  if (!gag) {
    return null;
  }
  const { name, image } = gag;
  return (
    <div
      className="bg-white aspect-square w-64 h-64 pt-4 flex flex-col items-center p-2"
      style={{
        background:
          "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(253,243,217,1) 100%)",
      }}
    >
      <div className="text-orange-500 text-3xl font-semibold">{name}</div>
      <img
        className="aspect-square mt-2"
        src={image}
        width={64}
        alt={name}
        draggable={false}
      />
      <div className="w-full px-2">
        <Divider />
        <InfoLineItem label="Accuracy" value={`${gag.accuracy}%`} />
        <Divider />
        <InfoLineItem label="Damage" value={`${gag.max_dmg}`} />
        <Divider />
        <InfoLineItem label="Affects" value={formatAffects(gag)} />
        <Divider />
        <InfoLineItem label="Skill Credit" value="12" />
        <Divider />
      </div>
    </div>
  );
}
