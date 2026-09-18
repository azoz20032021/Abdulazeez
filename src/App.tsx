import { useEffect } from 'react';
import Nav from './components/Nav';
import Intro from './components/Intro';
import Backdrop from './components/Backdrop';
import Hero from './components/Hero';
import Metrics from './components/Metrics';
import Work from './components/Work';
import About from './components/About';
import Stack from './components/Stack';
import Contact from './components/Contact';
import TopButton from './components/TopButton';
import { keepTriggersFresh, scrollToSection, startSmoothScroll } from './lib/motion';
import { trackPointer } from './lib/pointer';

export default function App() {
  useEffect(() => {
    const stopScroll = startSmoothScroll();
    const stopPointer = trackPointer();
    const stopRefresh = keepTriggersFresh();

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
    };
  }, []);

  return (
    <>
      <Intro />
      <Backdrop />
      <div className="grain" aria-hidden="true" />
      <Nav />
      <main>
        <Hero />
        <Metrics />
        <Work />
        <About />
        <Stack />
        <Contact />
      </main>
      <TopButton />
    </>
  );
}
