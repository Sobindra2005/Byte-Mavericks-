import React, { useState } from 'react';
import Region from './region';
import Crops from './crops';

export default function RegionalCrops() {
  const [coordinates, setCoordinates] = useState({ latitude: null, longitude: null });

  const handleFetchCrops = (latitude, longitude) => {
    setCoordinates({ latitude, longitude });
  };

  return (
    <div>
      <Region onFetchCrops={handleFetchCrops} />
      {coordinates.latitude && coordinates.longitude && (
        <Crops latitude={coordinates.latitude} longitude={coordinates.longitude} />
      )}
    </div>
  );
}
