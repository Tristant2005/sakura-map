'use client';

import {APIProvider, Map, Marker} from '@vis.gl/react-google-maps';
import {useRef} from 'react';

const center = {lat: 35.6812, lng: 139.7671}; // Tokyo

export default function Page() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!;
  return (
    <div style={{height: '100dvh', width: '100%'}}>
      <APIProvider apiKey={apiKey}>
        <Map
          defaultCenter={center}
          defaultZoom={6}
          mapId={process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID}
          gestureHandling="greedy"
          disableDefaultUI={false}
        >
          <Marker position={center} />
        </Map>
      </APIProvider>
    </div>
  );
}
