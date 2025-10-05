'use client';

import {APIProvider, Map, Marker} from '@vis.gl/react-google-maps';
import {useRef} from 'react';

const japanBounds = {
  north: 48.4,
  south: 25.0,
  east: 156.6,
  west: 123.3,
};

const center = {lat: 35.6812, lng: 139.7671}; // Tokyo

const customMapStyle = [
  {
    featureType: 'all',
    elementType: 'geometry',
    stylers: [{ saturation: -100 }, { lightness: 30 }]
  },
  {
    featureType: 'administrative.country',
    elementType: 'geometry',
    stylers: [{ visibility: 'off' }]
  }
];

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
        restriction={{
          latLngBounds: japanBounds,
          // strictBounds: true,
        }}
        minZoom={2}
        maxZoom={20}
      >
        {/* <Marker position={center} /> */}
      </Map>

        
      </APIProvider>
    </div>
  );
}
