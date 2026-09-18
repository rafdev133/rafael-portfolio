import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import SmoothScrollProvider from './lib/SmoothScroll';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import ScrollButtons from './components/ScrollButtons';
import CustomCursor from './components/CustomCursor';
import HeroSection from './sections/HeroSection';
import ProjectsSection from './sections/ProjectsSection';
import ServicesSection from './sections/ServicesSection';
import ProcessSection from './sections/ProcessSection';
import ContactSection from './sections/ContactSection';

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <SmoothScrollProvider>
      <div style={{ background: '#0C0C0C', overflowX: 'clip', minHeight: '100vh' }}>
        <CustomCursor />
        <AnimatePresence>
          {loading && <LoadingScreen key="loader" onComplete={() => setLoading(false)} />}
        </AnimatePresence>

        {!loading && (
          <>
            <Navbar />
            <ScrollButtons />
            <main>
              <HeroSection />
              <ProjectsSection />
              <ServicesSection />
              <ProcessSection />
              <ContactSection />
            </main>
          </>
        )}
      </div>
    </SmoothScrollProvider>
  );
}

export default App;
