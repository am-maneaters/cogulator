import React from 'react';
import { GagInfo } from '../types';
import { getGagAccuracy, getGagDmg } from '../utils/calculatorUtils';

type Props = {
  gag: GagInfo;
};

export const Divider = () => (
  <div
    className="h-1 w-full px-2"
    style={{
      background:
        'linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(219,201,168,1) 25%, rgba(218,200,166,1) 82%, rgba(255,255,255,1) 100%)',
    }}
  />
);

type InfoLineItemProps = {
  label: string;
  value: string;
};

const InfoLineItem = ({ label, value }: InfoLineItemProps) => (
  <div className="flex text-lg text-[#03256A]">
    <div className="font-semibold">{label}</div>: {value}
  </div>
);

const formatAffects = ({ affectsNum: num, affectsType: type }: GagInfo) =>
  num === 'All' ? `${num} ${type}s` : `${num} ${type}`;

export default function GagInfoDisplay({ gag }: Props) {
  return (
    <>
      <div className="text-3xl font-semibold text-orange-500">{gag.name}</div>
      <img
        className="mt-2 aspect-square"
        src={gag.image}
        width={64}
        alt={gag.name}
        draggable={false}
      />
      <div className="w-full px-2">
        <Divider />
        <InfoLineItem label="Accuracy" value={`${getGagAccuracy(gag)}%`} />
        <Divider />
        <InfoLineItem label={gag.dmgType} value={`${getGagDmg(gag)}`} />
        <Divider />
        <InfoLineItem label="Affects" value={formatAffects(gag)} />
        <Divider />
        <InfoLineItem label="Skill Credit" value="12" />
        <Divider />
      </div>
    </>
  );
}
