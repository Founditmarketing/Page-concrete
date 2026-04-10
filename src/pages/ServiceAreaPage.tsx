import { useEffect } from 'react';
import { motion } from 'motion/react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { CheckCircle2, MapPin } from 'lucide-react';

// Reusing Map Marker Logic
const createIcon = (isHub: boolean) => L.divIcon({
  className: 'bg-transparent',
  html: `<div style="width: ${isHub ? '28px' : '20px'}; height: ${isHub ? '28px' : '20px'}; background-color: #1d4e89; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 10px rgba(0,0,0,0.5);"></div>`,
  iconSize: [isHub ? 28 : 20, isHub ? 28 : 20],
  iconAnchor: [isHub ? 14 : 10, isHub ? 14 : 10],
  popupAnchor: [0, isHub ? -14 : -10]
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

export default function ServiceAreaPage() {
  const centerPosition: [number, number] = [35.9557, -80.0053];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 pb-0">
      {/* Dark hero banner so the header white text is visible */}
      <div className="bg-slate-950 pt-48 md:pt-56 pb-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541888046428-d81bb19240f5?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20 MixBlendMode-overlay"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black tracking-tight text-white uppercase mb-6"
          >
            Our Service <span className="text-primary gap-2">Area</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto"
          >
            Proudly serving the Piedmont Triad area with premium concrete craftsmanship and rapid response times.
          </motion.p>
        </div>
      </div>

      <section className="pt-12 md:pt-16 pb-24 relative overflow-hidden z-10 bg-slate-50 border-b border-slate-200">
        {/* Background aesthetic elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-slate-200/50 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:items-center">
            
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-0"
            >
              <h2 className="text-3xl font-black text-slate-900 uppercase mb-6 flex items-center gap-3">
                <MapPin className="text-[#1d4e89]" size={36} />
                Local Commitment
              </h2>
              <div className="prose prose-lg text-slate-600 space-y-6">
                <p>
                  As an established contractor headquartered in High Point, NC, we pride ourselves on being deeply embedded in the Triad community. Our absolute dedication to local home and business owners means we maintain incredibly fast response times, local accountability, and an impeccable reputation across the region.
                </p>
                <p>
                  We operate heavy machinery, specialized concrete mixing equipment, and dispatch fully licensed crews daily. Because concrete has a strict setup time involving hydration and immediate finishing, we maintain a hard 30-mile operational radius. This ensures that every drop of concrete we pour arrives in perfect condition, allowing us to guarantee uncompromising structural integrity and aesthetic perfection on every single job.
                </p>
                <p className="font-semibold text-slate-900">
                  If your project falls slightly outside our mapped zone, give us a call! Special exceptions can be made for large-scale commercial flatwork or custom extensive driveway installations depending on scheduling.
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white p-8 rounded-3xl shadow-2xl border border-slate-100 relative"
            >
              <h3 className="text-2xl font-black text-slate-900 uppercase mb-8 border-b border-slate-100 pb-4">
                Primary Cities Served
              </h3>
              
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
                {CITIES.map((city) => (
                  <li key={city.id} className="flex items-center gap-3 group cursor-default">
                    <CheckCircle2 className="text-[#1d4e89] shrink-0" size={24} />
                    <span className="text-slate-800 font-bold text-lg group-hover:text-[#1d4e89] transition-colors">{city.id}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-10 bg-slate-50 p-6 rounded-2xl border border-slate-200 text-center">
                <p className="text-slate-900 mb-2 font-bold text-lg">Don't see your specific town listed?</p>
                <p className="text-sm text-slate-500 font-medium">We service all intermediate neighborhoods and counties within the 30-mile radius ring.</p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Massive Map Section (Moved Below Content) */}
      <div className="w-full h-[50vh] md:h-[65vh] shadow-inner relative z-20">
        <MapContainer 
          center={centerPosition} 
          zoom={10} 
          scrollWheelZoom={false} 
          className="w-full h-full z-0"
          style={{ background: '#f8fafc' }}
        >
          {/* Light-Themed Map Layer for daytime feel */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          />

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
            pathOptions={{ fillColor: '#1d4e89', fillOpacity: 0.1, color: '#1d4e89', weight: 2, dashArray: '5, 5' }}
          />
        </MapContainer>
      </div>

    </main>
  );
}
