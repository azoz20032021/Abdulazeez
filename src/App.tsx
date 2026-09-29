import { useEffect } from 'react';
import Nav from './components/Nav';
import Intro from './components/Intro';
import Backdrop from './components/Backdrop';
import Hero from './components/Hero';
import Metrics from './components/Metrics';
import Work from './components/Work';
import Approach from './components/Approach';
import Footer from './components/Footer';
import Cursor from './components/Cursor';
import About from './components/About';
import Stack from './components/Stack';
import Contact from './components/Contact';
import TopButton from './components/TopButton';
import { keepTriggersFresh, scrollToSection, startSmoothScroll } from './lib/motion';
import { trackPointer } from './lib/pointer';
import { trackSpotlight } from './lib/spotlight';

export default function App() {
  useEffect(() => {
    const stopScroll = startSmoothScroll();
    const stopPointer = trackPointer();
    const stopRefresh = keepTriggersFresh();
    const stopSpot = trackSpotlight();

    // A shared #section link should land on that section once Lenis owns the
    // scroll, and again once images have settled and moved everything below them.
    const hash = window.location.hash;
    const jump = () => scrollToSection(hash);
    if (hash) {
      requestAnimationFrame(jump);
      window.addEventListener('load', jump, { once: true });
    }

    return () => {
      stopScroll();
      stopPointer();
      stopRefresh();
      stopSpot();
    };
  }, []);

  return (
    <>
      <a
        className="skip"
        href="#work"
        onClick={(e) => {
          e.preventDefault();
          scrollToSection('#work');
        }}
      >
        Skip to the work
      </a>
      <Intro />
      <Backdrop />
      <div className="grain" aria-hidden="true" />
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <Metrics />
        <Work />
        <Approach />
        <About />
        <Stack />
        <Contact />
      </main>
      <Footer />
      <TopButton />
    </>
  );
}
