import { motion } from 'motion/react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const createIcon = (isHub: boolean) => L.divIcon({
  className: 'bg-transparent',
  html: `<div style="width: ${isHub ? '24px' : '14px'}; height: ${isHub ? '24px' : '14px'}; background-color: #1565C0; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 12px rgba(0,0,0,0.5);"></div>`,
  iconSize: [isHub ? 24 : 14, isHub ? 24 : 14],
  iconAnchor: [isHub ? 12 : 7, isHub ? 12 : 7],
  popupAnchor: [0, isHub ? -12 : -7],
});

const CITIES = [
  { id: 'High Point', position: [35.9557, -80.0053] as [number, number], isHub: true, desc: 'Our HQ and central dispatch.' },
  { id: 'Winston-Salem', position: [36.0999, -80.2442] as [number, number], desc: 'Fast response times for all WS projects.' },
  { id: 'Greensboro', position: [36.0726, -79.7920] as [number, number], desc: 'Serving the entire GSO metro area.' },
  { id: 'Kernersville', position: [36.1199, -80.0736] as [number, number], desc: 'Heart of the Triad, immediate service.' },
  { id: 'Thomasville', position: [35.8826, -80.0820] as [number, number], desc: 'Quick deployment for Davidson County.' },
  { id: 'Clemmons', position: [36.0232, -80.3820] as [number, number], desc: 'Premium concrete services in Clemmons.' },
  { id: 'Bermuda Run', position: [35.9962, -80.4284] as [number, number], desc: 'Dedicated crews for Bermuda Run residents.' },
  { id: 'Lewisville', position: [36.0965, -80.4192] as [number, number], desc: 'Reliable concrete solutions for Lewisville.' },
  { id: 'Mocksville', position: [35.8943, -80.5615] as [number, number], desc: 'Full-scale project coverage in Mocksville.' },
];

export default function InteractiveMapSection() {
  const centerPosition: [number, number] = [35.9557, -80.0053];

  return (
    <section className="pt-32 md:pt-48 pb-0 bg-[#0D2B5E] relative overflow-hidden">

      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 mb-16 md:mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-blue-300 font-bold tracking-[0.25em] uppercase text-sm mb-5">Service Area</p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter leading-none uppercase">
              The <span className="text-primary">Triad</span>
            </h2>
            <p className="text-slate-400 text-lg font-medium max-w-sm leading-relaxed">
              Based in High Point, NC. Premium concrete services within a 30-mile radius — Winston-Salem to Greensboro.
            </p>
          </div>

          {/* City pills */}
          <div className="flex flex-wrap gap-3 mt-10">
            {CITIES.map((city) => (
              <span
                key={city.id}
                className={`px-4 py-2 rounded-full text-sm font-semibold tracking-wide border ${
                  city.isHub
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white/8 text-slate-300 border-white/15'
                }`}
              >
                {city.id}{city.isHub ? ' ★' : ''}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Map */}
      <div className="relative w-full h-[45vh] md:h-[55vh] border-t border-white/10">
        <MapContainer
          center={centerPosition}
          zoom={10}
          scrollWheelZoom={false}
          className="w-full h-full z-0"
          style={{ background: '#0f172a' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />
          {CITIES.map((city) => (
            <Marker key={city.id} position={city.position} icon={createIcon(!!city.isHub)}>
              <Popup>
                <div className="font-bold text-slate-900 text-sm mb-1">{city.id}{city.isHub ? ' HQ' : ''}</div>
                <div className="text-slate-600 text-xs">{city.desc}</div>
              </Popup>
            </Marker>
          ))}
          <Circle
            center={centerPosition}
            radius={48280.3}
            pathOptions={{ fillColor: '#1565C0', fillOpacity: 0.1, color: '#1565C0', weight: 1, dashArray: '5, 5' }}
          />
        </MapContainer>
      </div>
    </section>
  );
}
