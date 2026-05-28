import { motion } from 'motion/react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Link, useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  return (
    <section className="bg-white py-24 md:py-40">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">

        {/* Eyebrow & Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 md:mb-20"
        >
          <p className="text-primary font-bold tracking-[0.25em] uppercase text-xs mb-5">Service Area</p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <h2 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter leading-none uppercase">
              The <span className="text-primary">Triad</span>
            </h2>
            <p className="text-slate-500 text-lg font-medium max-w-sm leading-relaxed">
              Based in High Point, NC — we serve a 30-mile radius across the Triad, from Winston-Salem to Greensboro.
            </p>
          </div>
        </motion.div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">

          {/* Left Column: Map */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="w-full h-[400px] sm:h-[450px] lg:h-auto rounded-3xl overflow-hidden border border-slate-200 shadow-xl relative z-10 min-h-[400px]"
          >
            <MapContainer center={center} zoom={10} scrollWheelZoom={false} className="w-full h-full">
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
              />
              {CITIES.map((city) => (
                <Marker
                  key={city.id}
                  position={city.position}
                  icon={createIcon(!!city.isHub)}
                  eventHandlers={{
                    click: () => {
                      navigate(city.id === 'High Point' ? '/service-areas/high-point' : `/service-areas/${city.id.toLowerCase().replace(' ', '-')}`);
                    }
                  }}
                >
                  <Popup>
                    <div className="font-bold text-slate-900 text-sm mb-1">{city.id}{city.isHub ? ' HQ' : ''}</div>
                    <div className="text-slate-500 text-xs mb-2">{city.desc}</div>
                    <Link
                      to={city.id === 'High Point' ? '/service-areas/high-point' : `/service-areas/${city.id.toLowerCase().replace(' ', '-')}`}
                      className="text-primary hover:underline font-bold text-xs inline-flex items-center gap-1"
                    >
                      View Local Services &rarr;
                    </Link>
                  </Popup>
                </Marker>
              ))}
              <Circle
                center={center}
                radius={48280.3}
                pathOptions={{ fillColor: '#1565C0', fillOpacity: 0.07, color: '#1565C0', weight: 1.5, dashArray: '6, 4' }}
              />
            </MapContainer>
          </motion.div>

          {/* Right Column: Directory & Routing */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <h3 className="text-2xl font-black text-slate-900 uppercase mb-4 tracking-tight">
              Select Your City Below
            </h3>
            <p className="text-slate-500 text-lg font-medium mb-8 leading-relaxed">
              Click your city below to learn more about our services in your area and get a free estimate.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {CITIES.map((city) => (
                <Link
                  key={city.id}
                  to={city.id === 'High Point' ? '/service-areas/high-point' : `/service-areas/${city.id.toLowerCase().replace(' ', '-')}`}
                  className={`px-5 py-3.5 rounded-2xl text-sm font-bold tracking-wide border transition-all text-center flex items-center justify-center hover:-translate-y-0.5 hover:shadow-md ${
                    city.isHub
                      ? 'bg-primary text-white border-primary hover:bg-[#0D47A1]'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-primary hover:text-primary hover:bg-white'
                  }`}
                >
                  {city.id}{city.isHub ? ' ★' : ''}
                </Link>
              ))}
            </div>

            <div className="mt-10 bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <p className="text-slate-900 mb-1 font-bold">Looking for a quote outside this zone?</p>
              <p className="text-sm text-slate-500 font-medium">We serve all intermediate counties and neighborhoods within our 30-mile operational radius. Call us if you have any questions.</p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
