import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UltraHeader from './components/UltraHeader';
import HomePage from './pages/HomePage';
import FAQPage from './pages/FAQPage';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/ContactPage';
import ServicePage from './pages/ServicePage';
import ServiceAreaPage from './pages/ServiceAreaPage';
import ReviewsPage from './pages/ReviewsPage';
import FatFooter from './components/FatFooter';
import FloatingCallButton from './components/FloatingCallButton';

export default function App() {
  return (
    <BrowserRouter>
      <div className="overflow-x-clip bg-slate-50 text-slate-900 font-sans">
        <UltraHeader />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services/:id" element={<ServicePage />} />
          <Route path="/service-area" element={<ServiceAreaPage />} />
          <Route path="/faqs" element={<FAQPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
        <FatFooter />
        <FloatingCallButton />
      </div>
    </BrowserRouter>
  );
}
