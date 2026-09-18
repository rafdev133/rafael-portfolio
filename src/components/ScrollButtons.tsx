import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { useSmoothScroll } from '../lib/SmoothScroll';

const SECTION_IDS = ['home', 'projects', 'services', 'process'];

export default function ScrollButtons() {
  const { scrollTo } = useSmoothScroll();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.4);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentIndex = () => {
    let idx = 0;
    SECTION_IDS.forEach((id, i) => {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.5) {
        idx = i;
      }
    });
    return idx;
  };

  const handleUp = () => {
    const idx = currentIndex();
    const targetId = SECTION_IDS[Math.max(0, idx - 1)];
    scrollTo(`#${targetId}`);
  };

  const handleDown = () => {
    const idx = currentIndex();
    const targetId = SECTION_IDS[Math.min(SECTION_IDS.length - 1, idx + 1)];
    scrollTo(`#${targetId}`);
  };

  return (
    <div className="fixed right-4 sm:right-6 bottom-6 sm:bottom-8 z-40 flex flex-col gap-2">
      <AnimatePresence>
        {scrolled && (
          <motion.button
            key="up"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            whileHover={{ scale: 1.08 }}
            onClick={handleUp}
            aria-label="Scroll up"
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-white/15 flex items-center justify-center text-[#D7E2EA]"
            style={{ background: 'rgba(12, 12, 12, 0.6)', backdropFilter: 'blur(12px)' }}
          >
            <ArrowUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.08 }}
        onClick={handleDown}
        aria-label="Scroll down"
        className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-white/15 flex items-center justify-center text-[#D7E2EA]"
        style={{ background: 'rgba(12, 12, 12, 0.6)', backdropFilter: 'blur(12px)' }}
      >
        <motion.span
          animate={{ y: [0, 3, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={18} />
        </motion.span>
      </motion.button>
    </div>
  );
}
