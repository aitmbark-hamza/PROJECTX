import { LazyMotion, domAnimation } from 'framer-motion';
import Navbar from './components/layout/Navbar/Navbar';
import Footer from './components/layout/Footer/Footer';
import Hero from './components/sections/Hero/Hero';
import Services from './components/sections/Services/Services';
import About from './components/sections/About/About';
import Gallery from './components/sections/Gallery/Gallery';
import Testimonials from './components/sections/Testimonials/Testimonials';
import Booking from './components/sections/Booking/Booking';
import Contact from './components/sections/Contact/Contact';
import Cursor from './components/ui/Cursor/Cursor';

export default function App() {
  return (
    <LazyMotion features={domAnimation}>
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <Services />
        <About />
        <Gallery />
        <Testimonials />
        <Booking />
        <Contact />
      </main>
      <Footer />
    </LazyMotion>
  );
}
