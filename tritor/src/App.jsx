import { useState } from 'react';
import { LazyMotion, domAnimation } from 'framer-motion';
import Navbar from './components/layout/Navbar/Navbar';
import Footer from './components/layout/Footer/Footer';
import Hero from './components/sections/Hero/Hero';
import Services from './components/sections/Services/Services';
import About from './components/sections/About/About';
import WhyChooseUs from './components/sections/WhyChooseUs/WhyChooseUs';
import Gallery from './components/sections/Gallery/Gallery';
import GoogleReviews from './components/sections/GoogleReviews/GoogleReviews';
import Booking from './components/sections/Booking/Booking';
import Contact from './components/sections/Contact/Contact';
import Cursor from './components/ui/Cursor/Cursor';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <LazyMotion features={domAnimation}>
      <Cursor />
      <Navbar onBookingClick={() => setIsBookingOpen(true)} />
      <main>
        <Hero />
        <Services />
        <About />
        <WhyChooseUs />
        <Gallery />
        <GoogleReviews />
        <Contact />
      </main>
      <Footer />
      <Booking isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </LazyMotion>
  );
}
