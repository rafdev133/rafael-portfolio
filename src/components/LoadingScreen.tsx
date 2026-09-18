import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Clapperboard, Aperture } from 'lucide-react';
import FloatingCube from './FloatingCube';

interface LoadingScreenProps {
  onComplete: () => void;
}

const BRAND = 'RAFMEDIA';

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const start = performance.now();
    const duration = 1900;
    let rafId: number;

    function tick(now: number) {
      const elapsed = now - start;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);
      if (pct < 100) {
        rafId = requestAnimationFrame(tick);
      } else {
        setTimeout(() => onCompleteRef.current(), 450);
      }
    }

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0C0C0C] overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ y: '-100%' }}
      transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
    >
      {/* Colorful ambient glow blobs */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-32 -left-24 w-[380px] h-[380px] rounded-full opacity-40 blur-3xl"
        style={{ background: 'radial-gradient(circle, #B600A8, transparent 70%)' }}
        animate={{ x: [0, 50, 0], y: [0, 40, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-36 -right-20 w-[420px] h-[420px] rounded-full opacity-35 blur-3xl"
        style={{ background: 'radial-gradient(circle, #BE4C00, transparent 70%)' }}
        animate={{ x: [0, -40, 0], y: [0, -30, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute top-1/3 right-1/4 w-[260px] h-[260px] rounded-full opacity-30 blur-3xl"
        style={{ background: 'radial-gradient(circle, #7621B0, transparent 70%)' }}
        animate={{ x: [0, 25, 0], y: [0, -25, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
      />

      {/* Floating 3D cubes scattered around the intro */}
      <FloatingCube size={54} className="top-[14%] left-[12%] hidden sm:block" duration={9} colors={['#B600A8', '#7621B0']} opacity={0.5} />
      <FloatingCube size={40} className="top-[20%] right-[16%]" duration={7} colors={['#BE4C00', '#B600A8']} opacity={0.55} />
      <FloatingCube size={46} className="bottom-[18%] left-[18%]" duration={11} colors={['#7621B0', '#BE4C00']} opacity={0.5} />
      <FloatingCube size={34} className="bottom-[24%] right-[14%] hidden sm:block" duration={8} colors={['#B600A8', '#BE4C00']} opacity={0.55} />

      {/* Equipment animation: spinning aperture halo behind a clapping clapperboard, cycling through the brand palette */}
      <div className="relative z-10 w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center mb-8 sm:mb-10">
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ rotate: 360, color: ['#B600A8', '#7621B0', '#BE4C00', '#B600A8'] }}
          transition={{
            rotate: { duration: 4, repeat: Infinity, ease: 'linear' },
            color: { duration: 3.6, repeat: Infinity, ease: 'linear' },
          }}
          style={{ opacity: 0.55 }}
        >
          <Aperture size={96} strokeWidth={1} />
        </motion.div>
        <motion.div
          className="relative"
          animate={{
            rotate: [0, -18, 0],
            color: ['#D7E2EA', '#BE4C00', '#B600A8', '#D7E2EA'],
          }}
          transition={{
            rotate: { duration: 1.1, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.2 },
            color: { duration: 3.6, repeat: Infinity, ease: 'linear' },
          }}
        >
          <Clapperboard size={44} strokeWidth={1.5} />
        </motion.div>
      </div>

      {/* Wordmark */}
      <div className="relative z-10 flex overflow-hidden mb-6 sm:mb-8">
        {BRAND.split('').map((letter, i) => (
          <motion.span
            key={i}
            className="hero-heading font-black uppercase text-3xl sm:text-4xl md:text-5xl tracking-tight"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.15 + i * 0.05, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {letter}
          </motion.span>
        ))}
      </div>

      {/* Timeline-style progress scrubber */}
      <div className="relative z-10 w-56 sm:w-72 flex flex-col items-center gap-3">
        <div className="relative w-full h-1 rounded-full bg-white/10 overflow-visible">
          <motion.div
            className="h-full rounded-full"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #B600A8, #7621B0, #BE4C00)',
            }}
          />
          <div
            className="absolute top-1/2 w-3 h-3 rounded-full bg-white border-2 border-[#0C0C0C] shadow"
            style={{ left: `${progress}%`, transform: 'translate(-50%, -50%)' }}
          />
        </div>
        <span className="text-[#D7E2EA]/50 text-xs font-mono tracking-widest">
          {progress}%
        </span>
      </div>
    </motion.div>
  );
}
