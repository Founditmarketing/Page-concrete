import { motion } from 'motion/react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix generic marker icon rendering for strict Next/Vite environments by using custom injected Div icons exclusively
const createIcon = (isHub: boolean) => L.divIcon({
  className: 'bg-transparent',
  html: `<div style="width: ${isHub ? '24px' : '16px'}; height: ${isHub ? '24px' : '16px'}; background-color: #1d4e89; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 10px rgba(0,0,0,0.5);"></div>`,
  iconSize: [isHub ? 24 : 16, isHub ? 24 : 16],
  iconAnchor: [isHub ? 12 : 8, isHub ? 12 : 8],
  popupAnchor: [0, isHub ? -12 : -8]
});

const CITIES = [
  { id: 'High Point', position: [35.9557, -80.0053] as [number, number], isHub: true, desc: "Our HQ and central dispatch." },
  { id: 'Winston-Salem', position: [36.0999, -80.2442] as [number, number], desc: "Fast response times for all WS projects." },
  { id: 'Greensboro', position: [36.0726, -79.7920] as [number, number], desc: "Serving the entire GSO metro area." },
  { id: 'Kernersville', position: [36.1199, -80.0736] as [number, number], desc: "Heart of the Triad, immediate service." },
  { id: 'Thomasville', position: [35.8826, -80.0820] as [number, number], desc: "Quick deployment for Davidson County." },
  { id: 'Clemmons', position: [36.0232, -80.3820] as [number, number], desc: "Premium concrete services in Clemmons." },
  { id: 'Bermuda Run', position: [35.9962, -80.4284] as [number, number], desc: "Dedicated crews for Bermuda Run residents." },
  { id: 'Lewisville', position: [36.0965, -80.4192] as [number, number], desc: "Reliable concrete solutions for Lewisville." },
  { id: 'Mocksville', position: [35.8943, -80.5615] as [number, number], desc: "Full-scale project coverage in Mocksville." }
];

export default function InteractiveMapSection() {
  // Center on High Point
  const centerPosition: [number, number] = [35.9557, -80.0053];

  return (
    <section className="pt-24 md:pt-32 pb-0 bg-slate-950 relative overflow-hidden">

      {/* Massive Watermark Title - Dark Mode (100% Absolute True Full Width) */}
      <div className="w-full mb-8 relative z-10 text-center px-4 md:px-0">
        <h2 className="text-[10vw] md:text-[7vw] font-black text-white tracking-tighter leading-none uppercase mb-4 drop-shadow-2xl whitespace-nowrap">
          The <span className="text-primary">Triad</span>
        </h2>
        <p className="text-lg text-slate-400 mb-6 max-w-2xl font-medium mx-auto px-4">
          Based in High Point, NC, we provide premium concrete services within a 30-mile radius. From Winston-Salem to Greensboro, we bring our heavy-duty equipment and expert crew directly to your site.
        </p>
        
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-slate-300 font-medium text-lg px-4 mb-4">
          {CITIES.map((city, index) => (
            <span key={city.id} className="flex items-center">
              {city.id}
              {index < CITIES.length - 1 && <span className="mx-3 text-slate-600">•</span>}
            </span>
          ))}
        </div>
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
      </div>
      <div className="relative w-full z-10">
        <div className="w-full mx-auto h-[40vh] md:h-[50vh] shadow-[0_0_50px_rgba(0,0,0,0.5)] border-t border-b border-slate-800 relative z-0">
          <MapContainer 
            center={centerPosition} 
            zoom={10} 
            scrollWheelZoom={false} 
            className="w-full h-full z-0"
            style={{ background: '#0f172a' }}
          >
            {/* Professional Dark-Themed Map Layer from CartoDB */}
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>'
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />

            {/* Render accurately pinned cities */}
            {CITIES.map((city) => (
              <Marker 
                key={city.id} 
                position={city.position}
                icon={createIcon(!!city.isHub)}
              >
                <Popup className="custom-popup">
                  <div className="font-bold text-slate-900 text-sm mb-1">{city.id}{city.isHub ? ' HQ' : ''}</div>
                  <div className="text-slate-600 text-xs">{city.desc}</div>
                </Popup>
              </Marker>
            ))}

            {/* Exactly 30 miles equals 48280.3 meters */}
            <Circle 
              center={centerPosition}
              radius={48280.3}
              pathOptions={{ fillColor: '#1d4e89', fillOpacity: 0.1, color: '#1d4e89', weight: 1, dashArray: '5, 5' }}
            />
          </MapContainer>
        </div>
      </div>

    </section>
  );
}
