import { motion } from 'motion/react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const createIcon = (isHub: boolean) => L.divIcon({
  className: 'bg-transparent',
  html: `<div style="width:${isHub ? '20px' : '12px'};height:${isHub ? '20px' : '12px'};background:#1565C0;border-radius:50%;border:3px solid white;box-shadow:0 0 10px rgba(0,0,0,0.4)"></div>`,
  iconSize: [isHub ? 20 : 12, isHub ? 20 : 12],
  iconAnchor: [isHub ? 10 : 6, isHub ? 10 : 6],
  popupAnchor: [0, -10],
});

const CITIES = [
  { id: 'High Point', position: [35.9557, -80.0053] as [number, number], isHub: true, desc: 'Our HQ and central dispatch.' },
  { id: 'Winston-Salem', position: [36.0999, -80.2442] as [number, number], desc: 'Fast response times for all WS projects.' },
  { id: 'Greensboro', position: [36.0726, -79.7920] as [number, number], desc: 'Serving the entire GSO metro area.' },
  { id: 'Kernersville', position: [36.1199, -80.0736] as [number, number], desc: 'Heart of the Triad, immediate service.' },
  { id: 'Thomasville', position: [35.8826, -80.0820] as [number, number], desc: 'Quick deployment for Davidson County.' },
  { id: 'Clemmons', position: [36.0232, -80.3820] as [number, number], desc: 'Premium concrete services in Clemmons.' },
  { id: 'Bermuda Run', position: [35.9962, -80.4284] as [number, number], desc: 'Dedicated crews for Bermuda Run.' },
  { id: 'Lewisville', position: [36.0965, -80.4192] as [number, number], desc: 'Reliable concrete solutions for Lewisville.' },
  { id: 'Mocksville', position: [35.8943, -80.5615] as [number, number], desc: 'Full-scale project coverage in Mocksville.' },
];

export default function InteractiveMapSection() {
  const center: [number, number] = [35.9557, -80.0053];

  return (
    <section className="bg-white">

      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-24 md:pt-40 pb-14 md:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary font-bold tracking-[0.25em] uppercase text-xs mb-5">Service Area</p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-12 md:mb-16">
            <h2 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter leading-none uppercase">
              The <span className="text-primary">Triad</span>
            </h2>
            <p className="text-slate-500 text-lg font-medium max-w-sm leading-relaxed">
              Based in High Point, NC — we serve a 30-mile radius across the Triad, from Winston-Salem to Greensboro.
            </p>
          </div>

          {/* City tags — light style */}
          <div className="flex flex-wrap gap-3">
            {CITIES.map((city) => (
              <span
                key={city.id}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold tracking-wide border transition-colors ${
                  city.isHub
                    ? 'bg-primary text-white border-primary'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-primary hover:text-primary'
                }`}
              >
                {city.id}{city.isHub ? ' ★' : ''}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Map — light tile instead of dark */}
      <div className="w-full h-[45vh] md:h-[52vh] border-t border-slate-100">
        <MapContainer center={center} zoom={10} scrollWheelZoom={false} className="w-full h-full">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          />
          {CITIES.map((city) => (
            <Marker key={city.id} position={city.position} icon={createIcon(!!city.isHub)}>
              <Popup>
                <div className="font-bold text-slate-900 text-sm mb-1">{city.id}{city.isHub ? ' HQ' : ''}</div>
                <div className="text-slate-500 text-xs">{city.desc}</div>
              </Popup>
            </Marker>
          ))}
          <Circle
            center={center}
            radius={48280.3}
            pathOptions={{ fillColor: '#1565C0', fillOpacity: 0.07, color: '#1565C0', weight: 1.5, dashArray: '6, 4' }}
          />
        </MapContainer>
      </div>

    </section>
  );
}
