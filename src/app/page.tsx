'use client';

import {APIProvider, Map, Marker} from '@vis.gl/react-google-maps';
import {useRef} from 'react';

const japanBounds = {
  north: 48.4,
  south: 25.0,
  east: 156.6,
  west: 123.3,
};

const Tokyo = {lat: 35.6762, lng: 139.6503};

const locations = [
  { name: 'Wakkanai', lat: 45.4158108, lng: 141.6730309 },
  { name: 'Asahikawa', lat: 43.770625, lng: 142.3649743 },
  { name: 'Abashiri', lat: 44.0206027, lng: 144.2732035 },
  { name: 'Sapporo', lat: 43.061936, lng: 141.3542924 },
  { name: 'Obihiro', lat: 42.923809, lng: 143.1966324 },
  { name: 'Kushiro', lat: 42.9849503, lng: 144.3820491 },
  { name: 'Muroran', lat: 42.3152461, lng: 140.9740731 },
  { name: 'Hakodate', lat: 41.768793, lng: 140.729008 },
  { name: 'Aomori', lat: 40.886943, lng: 140.590121 },
  { name: 'Akita', lat: 39.6898802, lng: 140.342608 },
  { name: 'Morioka', lat: 39.7021331, lng: 141.1545397 },
  { name: 'Yamagata', lat: 38.4746705, lng: 140.083237 },
  { name: 'Sendai', lat: 38.2677554, lng: 140.8691498 },
  { name: 'Fukushima', lat: 37.760777, lng: 140.4745807 },
  { name: 'Niigata', lat: 37.6452283, lng: 138.7669125 },
  { name: 'Kanazawa', lat: 36.561627, lng: 136.6568822 },
  { name: 'Toyama', lat: 36.6468015, lng: 137.2183531 },
  { name: 'Nagano', lat: 36.1143945, lng: 138.0319015 },
  { name: 'Utsunomiya', lat: 36.5549677, lng: 139.8828776 },
  { name: 'Fukui', lat: 35.9263502, lng: 136.6068127 },
  { name: 'Maebashi', lat: 36.3893418, lng: 139.0632826 },
  { name: 'Kumagaya', lat: 36.1472472, lng: 139.3886141 },
  { name: 'Mito', lat: 36.3745814, lng: 140.4714517 },
  { name: 'Gifu', lat: 35.7867449, lng: 137.0460777 },
  { name: 'Nagoya', lat: 35.1851045, lng: 136.8998438 },
  { name: 'Kofu', lat: 35.6652481, lng: 138.5710441 },
  { name: 'Choshi', lat: 35.7345338, lng: 140.8272667 },
  { name: 'Tsu', lat: 34.730283, lng: 136.508588 },
  { name: 'Shizuoka', lat: 34.9332488, lng: 138.0955398 },
  { name: 'Tokyo', lat: 35.6768601, lng: 139.7638947 },
  { name: 'Yokohama', lat: 35.4503381, lng: 139.6343802 },
  { name: 'Matsue', lat: 35.468115, lng: 133.048768 },
  { name: 'Tottori', lat: 35.3555075, lng: 133.8678525 },
  { name: 'Kyoto', lat: 35.0115754, lng: 135.7681441 },
  { name: 'Hikone', lat: 35.2744066, lng: 136.2596539 },
  { name: 'Hiroshima', lat: 34.3917241, lng: 132.4517589 },
  { name: 'Okayama', lat: 34.8581334, lng: 133.7759256 },
  { name: 'Kobe', lat: 34.6932379, lng: 135.1943764 },
  { name: 'Osaka', lat: 34.6937569, lng: 135.5014539 },
  { name: 'Wakayama', lat: 33.8070292, lng: 135.5930743 },
  { name: 'Nara', lat: 34.685086, lng: 135.80485 },
  { name: 'Matsuyama', lat: 33.8395188, lng: 132.7653521 },
  { name: 'Takamatsu', lat: 34.3425592, lng: 134.0465338 },
  { name: 'Kochi', lat: 33.5597068, lng: 133.5310795 },
  { name: 'Tokushima', lat: 33.9196418, lng: 134.2509634 },
  { name: 'Shimonoseki', lat: 33.9577116, lng: 130.9415455 },
  { name: 'Fukuoka', lat: 33.6251241, lng: 130.6180016 },
  { name: 'Saga', lat: 33.2634823, lng: 130.3008579 },
  { name: 'Oita', lat: 33.2393864, lng: 131.6096524 },
  { name: 'Nagasaki', lat: 33.1154683, lng: 129.7874339 },
  { name: 'Kumamoto', lat: 32.6450475, lng: 130.6341345 },
  { name: 'Kagoshima', lat: 31.521587, lng: 130.5474077 },
  { name: 'Miyazaki', lat: 32.097681, lng: 131.294542 },
  { name: 'Naze', lat: 5.4519997, lng: 7.0566745 },
  { name: 'Ishigaki Island', lat: 24.4710165, lng: 124.2385061 },
  { namo: "Miyakojima", lat: 24.8054647, lng: 125.2811296 },
  { name: 'Naha', lat: 58.1773741, lng: 27.4576502 },
  { name: 'Minami Daito Island', lat: 25.8488, lng: 131.2507 }
];

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
    <div style={{height: '60dvh', width: '60%'}}>
      <APIProvider apiKey={apiKey}>
        <Map
          defaultCenter={Tokyo}
          defaultZoom={6}
          mapId={process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID}
          gestureHandling="greedy"
          disableDefaultUI={false}
          restriction={{
            latLngBounds: japanBounds,
          }}
          minZoom={2}
          maxZoom={20}
        >
          {locations.map((loc, i) => (
        <Marker
          key={loc.name}
          position={{ lat: loc.lat, lng: loc.lng }}
          title={loc.name}
          icon={{
            url: i % 2 === 0
              ? "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
              : "http://maps.google.com/mapfiles/ms/icons/purple-dot.png",
          }}
        />
      ))}
        </Map>
      </APIProvider>
    </div>
  );
}
