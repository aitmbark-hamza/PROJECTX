import { lazy, Suspense, useState } from 'react';
import { LazyMotion, domAnimation } from 'framer-motion';
import Navbar from './components/layout/Navbar/Navbar';
import Footer from './components/layout/Footer/Footer';
import Hero from './components/sections/Hero/Hero';
import SplashScreen from './components/ui/SplashScreen/SplashScreen';

const Services = lazy(() => import('./components/sections/Services/Services'));
const About = lazy(() => import('./components/sections/About/About'));
const WhyChooseUs = lazy(() => import('./components/sections/WhyChooseUs/WhyChooseUs'));
const Gallery = lazy(() => import('./components/sections/Gallery/Gallery'));
const GoogleReviews = lazy(() => import('./components/sections/GoogleReviews/GoogleReviews'));
const Booking = lazy(() => import('./components/sections/Booking/Booking'));
const Contact = lazy(() => import('./components/sections/Contact/Contact'));
const Cursor = lazy(() => import('./components/ui/Cursor/Cursor'));

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <LazyMotion features={domAnimation}>
      <SplashScreen />
      <Suspense fallback={null}><Cursor /></Suspense>
      <Navbar onBookingClick={() => setIsBookingOpen(true)} />
      <main>
        <Hero onBookingClick={() => setIsBookingOpen(true)} />
        <Suspense fallback={<div style={{ height: 300, background: '#0D0D0D' }} />}>
          <Services />
        </Suspense>
        <Suspense fallback={<div style={{ height: 300, background: '#080808' }} />}>
          <About />
        </Suspense>
        <Suspense fallback={<div style={{ height: 300, background: '#0D0D0D' }} />}>
          <WhyChooseUs />
        </Suspense>
        <Suspense fallback={<div style={{ height: 300, background: '#080808' }} />}>
          <Gallery />
        </Suspense>
        <Suspense fallback={<div style={{ height: 300, background: '#080808' }} />}>
          <GoogleReviews />
        </Suspense>
        <Suspense fallback={<div style={{ height: 300, background: '#0D0D0D' }} />}>
          <Contact />
        </Suspense>
      </main>
      <Footer />
      <Suspense fallback={null}>
        <Booking isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
      </Suspense>
    </LazyMotion>
  );
}
