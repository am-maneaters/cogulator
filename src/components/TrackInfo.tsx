import React from 'react';

export const TrackInfo = ({ name }: { name: string }) => (
  <div className="w-32">
    <div className="text-2xl uppercase">{name}</div>
    <div className="flex justify-center border-2 border-black border-opacity-20 bg-black bg-opacity-10 shadow-inner">
      <p className="whitespace-nowrap">381 to Go!</p>
    </div>
  </div>
);