'use client';

import {APIProvider, Map, Marker, useMap} from '@vis.gl/react-google-maps';
import {useRef, useState} from 'react';

const japanBounds = {
  north: 48.4,
  south: 25.0,
  east: 156.6,
  west: 123.3,
};

const Tokyo = {lat: 35.6762, lng: 139.6503};

const locations = [
  { name: 'Abashiri', lat: 44.0206027, lng: 144.2732035 },
  { name: 'Aomori', lat: 40.886943, lng: 140.590121 },
  { name: 'Akita', lat: 39.6898802, lng: 140.342608 },
  { name: 'Asahikawa', lat: 43.770625, lng: 142.3649743 },
  { name: 'Choshi', lat: 35.7345338, lng: 140.8272667 },
  { name: 'Fukui', lat: 35.9263502, lng: 136.6068127 },
  { name: 'Fukuoka', lat: 33.6251241, lng: 130.6180016 },
  { name: 'Fukushima', lat: 37.760777, lng: 140.4745807 },
  { name: 'Gifu', lat: 35.7867449, lng: 137.0460777 },
  { name: 'Hakodate', lat: 41.768793, lng: 140.729008 },
  { name: 'Hikone', lat: 35.2744066, lng: 136.2596539 },
  { name: 'Hiroshima', lat: 34.3917241, lng: 132.4517589 },
  { name: 'Ishigaki Island', lat: 24.4710165, lng: 124.2385061 },
  { name: 'Kagoshima', lat: 31.521587, lng: 130.5474077 },
  { name: 'Kanazawa', lat: 36.561627, lng: 136.6568822 },
  { name: 'Kobe', lat: 34.6932379, lng: 135.1943764 },
  { name: 'Kochi', lat: 33.5597068, lng: 133.5310795 },
  { name: 'Kofu', lat: 35.6652481, lng: 138.5710441 },
  { name: 'Kumagaya', lat: 36.1472472, lng: 139.3886141 },
  { name: 'Kumamoto', lat: 32.6450475, lng: 130.6341345 },
  { name: 'Kushiro', lat: 42.9849503, lng: 144.3820491 },
  { name: 'Kyoto', lat: 35.0115754, lng: 135.7681441 },
  { name: 'Maebashi', lat: 36.3893418, lng: 139.0632826 },
  { name: 'Matsue', lat: 35.468115, lng: 133.048768 },
  { name: 'Matsuyama', lat: 33.8395188, lng: 132.7653521 },
  { name: 'Miyakojima', lat: 24.8054647, lng: 125.2811296 },
  { name: 'Miyazaki', lat: 32.097681, lng: 131.294542 },
  { name: 'Minami Daito Island', lat: 25.8488, lng: 131.2507 },
  { name: 'Mito', lat: 36.3745814, lng: 140.4714517 },
  { name: 'Morioka', lat: 39.7021331, lng: 141.1545397 },
  { name: 'Muroran', lat: 42.3152461, lng: 140.9740731 },
  { name: 'Nagano', lat: 36.1143945, lng: 138.0319015 },
  { name: 'Nagasaki', lat: 33.1154683, lng: 129.7874339 },
  { name: 'Nagoya', lat: 35.1851045, lng: 136.8998438 },
  { name: 'Naha', lat: 26.2124, lng: 127.6809 },
  { name: 'Nara', lat: 34.685086, lng: 135.80485 },
  { name: 'Naze', lat: 28.3667, lng: 129.4833 },
  { name: 'Niigata', lat: 37.6452283, lng: 138.7669125 },
  { name: 'Obihiro', lat: 42.923809, lng: 143.1966324 },
  { name: 'Oita', lat: 33.2393864, lng: 131.6096524 },
  { name: 'Okayama', lat: 34.8581334, lng: 133.7759256 },
  { name: 'Osaka', lat: 34.6937569, lng: 135.5014539 },
  { name: 'Saga', lat: 33.2634823, lng: 130.3008579 },
  { name: 'Sapporo', lat: 43.061936, lng: 141.3542924 },
  { name: 'Sendai', lat: 38.2677554, lng: 140.8691498 },
  { name: 'Shimonoseki', lat: 33.9577116, lng: 130.9415455 },
  { name: 'Shizuoka', lat: 34.9332488, lng: 138.0955398 },
  { name: 'Takamatsu', lat: 34.3425592, lng: 134.0465338 },
  { name: 'Tokushima', lat: 33.9196418, lng: 134.2509634 },
  { name: 'Tokyo', lat: 35.6768601, lng: 139.7638947 },
  { name: 'Tottori', lat: 35.3555075, lng: 133.8678525 },
  { name: 'Toyama', lat: 36.6468015, lng: 137.2183531 },
  { name: 'Tsu', lat: 34.730283, lng: 136.508588 },
  { name: 'Utsunomiya', lat: 36.5549677, lng: 139.8828776 },
  { name: 'Wakkanai', lat: 45.4158108, lng: 141.6730309 },
  { name: 'Wakayama', lat: 33.8070292, lng: 135.5930743 },
  { name: 'Yamagata', lat: 38.4746705, lng: 140.083237 },
  { name: 'Yokohama', lat: 35.4503381, lng: 139.6343802 }
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

function weekToDate(week: number) {
  const year = new Date().getFullYear(); // current year
  const firstJan = new Date(year, 0, 1); // Jan 1st
  const days = (week - 1) * 7; // convert week to days offset
  const date = new Date(firstJan);
  date.setDate(firstJan.getDate() + days);
  return date;
}

function formatDate(date: Date) {
  const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric' };
  return date.toLocaleDateString(undefined, options); // e.g., "April 23"
}


function SakuraMarkers({ locations }: { locations: typeof locations }) {
  const map = useMap();
  if (!map) return null;

  return (
    <>
      {locations.map((loc, i) => (
        <Marker
          key={loc.name}
          position={{ lat: loc.lat, lng: loc.lng }}
          title={loc.name}
          icon={{
            url:
              i % 2 === 0
                ? 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
                : 'http://maps.google.com/mapfiles/ms/icons/purple-dot.png',
          }}
          onClick={() => {
            map.panTo({ lat: loc.lat, lng: loc.lng });
            map.setZoom(9);
          }}
        />
      ))}
    </>
  );
}


// --- Make UserInputForm a named export ---
export function UserInputForm() {
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [searchText, setSearchText] = useState('');
  const [dataPoints, setDataPoints] = useState<number[]>(Array(10).fill(0));
  const [prediction, setPrediction] = useState<number | null>(null);

   const dataPointNames = [
    "November Temperature",
    "December Temperature",
    "January Temperature",
    "February Temperature",
    "March Temperature",
    "November Wetdays",
    "December Wetdays",
    "January Wetdays",
    "February Wetdays",
    "March Wetdays"
  ];

  const handleDataChange = (index: number, value: string) => {
    const newData = [...dataPoints];
    newData[index] = Number(value);
    setDataPoints(newData);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedCity) {
      alert("Please select a city!");
      return;
    }

    try {
      // Convert all dataPoints to strings
      const dataStr = dataPoints.join("/");

      // Build the URL dynamically
      const url = `http://localhost:3001/prediction/${selectedCity.toLowerCase()}/${dataStr}`;
      // console.log(url)

      // Send GET request
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      // console.log("Prediction:", data["prediction"][0]);
      setPrediction(data["prediction"][0]);

    } catch (error) {
      console.error("Error fetching prediction:", error);
    }
  };

  const cityNames = locations.map(loc => loc.name);
  const filteredCities = cityNames.filter(city =>
    city.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px', margin: 'auto' }}>
      {/* <label>
        Search City:
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Type to search..."
          style={{ width: '100%', padding: '0.5rem' }}
        />
      </label> */}

      <label>
        Select City:
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          style={{ width: '100%', padding: '0.5rem' }}
        >
          <option value="">-- Select a city --</option>
          {filteredCities.map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
      </label>

      <div>
        {dataPoints.map((dp, i) => (
          <label key={i} style={{ display: 'block', marginTop: '0.5rem' }}>
            {dataPointNames[i]}:
            <input
              type="number"
              inputMode="numeric"
              pattern="[0-9]*"
              value={dp}
              onChange={(e) => handleDataChange(i, e.target.value)}
              style={{
                marginLeft: '0.5rem',
                width: '100px',
                MozAppearance: 'textfield',
                WebkitAppearance: 'none',
                appearance: 'textfield'
              }}
              required
              onWheel={e => (e.target as HTMLInputElement).blur()}
            />
          </label>
        ))}
      </div>

      <button type="submit" style={{ marginTop: '1rem', padding: '0.5rem' }}>
        Submit
      </button>

      {prediction !== null && (
      <div style={{ marginTop: '1rem', fontStyle: 'italic', fontSize: '1.2rem', color: '#d72660' }}>
        Predicted Bloom Week: {prediction.toFixed(2)} <br />
        Approximate Date: {formatDate(weekToDate(prediction))}
      </div>
    )}
    </form>
  );
}

// --- Keep Page as default export ---
export default function Page() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!;
  const [selectedCity, setSelectedCity] = useState<string>(''); // <-- new

  return (
    <div
      style={{
        minHeight: '100dvh',
        background: '#f9dcdcff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <h1 style={{ color: '#d72660', marginBottom: 24 }}>🌸 Sakura Map 🌸</h1>
      <p style={{ color: '#a8325a', marginBottom: 32 }}>
        Welcome! Explore cherry blossom bloom locations across Japan.
      </p>

      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-start',
          justifyContent: 'center',
          width: '100%',
          maxWidth: 1200,
          gap: '2rem'
        }}
      >
        <div style={{ flex: '0 0 350px' }}>
          <h2 style={{ marginTop: 0 }}>Enter Data</h2>
          <UserInputForm 
            selectedCity={selectedCity} 
            setSelectedCity={setSelectedCity} 
          />
        </div>
        <div style={{ height: '60dvh', width: '60vw', maxWidth: 800, minWidth: 320 }}>
          <APIProvider apiKey={apiKey}>
            <Map
              defaultCenter={Tokyo}
              defaultZoom={6}
              mapId={process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID}
              gestureHandling="greedy"
              disableDefaultUI={false}
              minZoom={2}
              maxZoom={20}
            >
              <SakuraMarkers 
                locations={locations} 
                selectedCity={selectedCity} 
                setSelectedCity={setSelectedCity} 
              />
            </Map>
          </APIProvider>
        </div>
      </div>
    </div>
  );
}

