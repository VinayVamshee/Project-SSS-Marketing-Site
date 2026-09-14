import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import Home from './pages/Home';
import Overview from './pages/Overview';

// Global Styles
import './styles/variables.css';
import './styles/globals.css';
import './styles/animations.css';

export default function App() {
  const [activeMode, setActiveMode] = useState('overview');

  useEffect(() => {
    // Only switch to explore if URL explicitly has #explore
    if (typeof window !== 'undefined' && window.location.hash.startsWith('#explore')) {
      setActiveMode('explore');
    }

    // Sync hash changes (e.g. browser back/forward or direct links)
    const handleHashChange = () => {
      if (window.location.hash.startsWith('#explore')) {
        setActiveMode('explore');
      } else {
        setActiveMode('overview');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSelectMode = (mode, targetId) => {
    setActiveMode(mode);
    if (typeof window !== 'undefined') {
      if (mode === 'explore') {
        window.location.hash = targetId ? `explore-${targetId}` : 'explore';
      } else {
        window.history.pushState(null, '', window.location.pathname);
      }

      setTimeout(() => {
        if (targetId) {
          const el = document.getElementById(targetId);
          if (el) {
            const offset = 80;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = el.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            return;
          }
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 150);
    }
  };

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Clean up on component unmount
    return () => {
      lenis.destroy();
    };
  }, [activeMode]);

  return (
    <>
      {activeMode === 'explore' ? (
        <Home activeMode={activeMode} onSelectMode={handleSelectMode} />
      ) : (
        <Overview activeMode={activeMode} onSelectMode={handleSelectMode} />
      )}
    </>
  );
}
