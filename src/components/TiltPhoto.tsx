import { useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, MemoryStick, Zap, Wifi, Sparkles, Laptop } from 'lucide-react';

interface TiltPhotoProps {
  src: string;
  alt: string;
  className?: string;
}

const COLORS = ['#B600A8', '#7621B0', '#BE4C00'];

// Your real setup.
const SPEC_ITEMS = [
  { label: 'Processor', value: 'Ryzen 5 5500', icon: Cpu },
  { label: 'Memory', value: '32 GB RAM', icon: MemoryStick },
  { label: 'Graphics', value: 'RTX 3050 8GB', icon: Zap },
  { label: 'Internet', value: '250 Mbps', icon: Wifi },
  { label: 'Editing App', value: 'CapCut Pro', icon: Sparkles },
  { label: 'OS', value: 'Windows 11 Pro', icon: Laptop },
];

const STORAGE_USED_GB = 828;
const STORAGE_TOTAL_GB = 954;
const STORAGE_PCT = Math.round((STORAGE_USED_GB / STORAGE_TOTAL_GB) * 100);

// A big square photo that spins 180deg on hover to reveal your real setup
// on the back -- the single-image successor to the old 9-angle
// InteractiveFace crossfade.
export default function TiltPhoto({ src, alt, className = '' }: TiltPhotoProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className={`relative ${className}`}
      style={{ perspective: 1400 }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={() => setFlipped((f) => !f)}
    >
      {/* Soft color glow behind the photo, pulses faster once flipped */}
      <motion.div
        aria-hidden
        className="absolute -inset-8 sm:-inset-12 pointer-events-none blur-3xl rounded-full"
        animate={{
          background: [
            'radial-gradient(ellipse at 50% 50%, rgba(182,0,168,0.35), transparent 65%)',
            'radial-gradient(ellipse at 50% 50%, rgba(190,76,0,0.32), transparent 65%)',
            'radial-gradient(ellipse at 50% 50%, rgba(118,33,176,0.35), transparent 65%)',
            'radial-gradient(ellipse at 50% 50%, rgba(182,0,168,0.35), transparent 65%)',
          ],
        }}
        transition={{ duration: flipped ? 3.5 : 7, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="relative aspect-square w-full cursor-pointer"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {/* Front -- the photo */}
        <div
          className="absolute inset-0 overflow-hidden rounded-[28px] border border-white/10"
          style={{ backfaceVisibility: 'hidden', boxShadow: '0 30px 60px rgba(0,0,0,0.45)' }}
        >
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover select-none"
            draggable={false}
          />
        </div>

        {/* Back -- the setup / specs */}
        <div
          className="absolute inset-0 overflow-hidden rounded-[28px] border border-white/15 p-5 sm:p-6 flex flex-col gap-3.5 sm:gap-4 justify-center"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: 'linear-gradient(165deg, #201524 0%, #14151a 100%)',
          }}
        >
          {/* Pulsing glow ring around the whole back panel while flipped */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[28px]"
            animate={{
              boxShadow: flipped
                ? [
                    'inset 0 0 0px rgba(182,0,168,0), 0 0 0px rgba(182,0,168,0)',
                    'inset 0 0 30px rgba(182,0,168,0.25), 0 0 32px rgba(182,0,168,0.4)',
                    'inset 0 0 0px rgba(182,0,168,0), 0 0 0px rgba(182,0,168,0)',
                  ]
                : 'inset 0 0 0px rgba(182,0,168,0), 0 0 0px rgba(182,0,168,0)',
            }}
            transition={{ duration: 2.6, repeat: flipped ? Infinity : 0, ease: 'easeInOut' }}
          />

          <div className="relative flex items-center gap-2">
            <motion.span
              animate={{ rotate: flipped ? [0, 18, -12, 0] : 0, scale: flipped ? [1, 1.2, 1] : 1 }}
              transition={{ duration: 1.4, repeat: flipped ? Infinity : 0, repeatDelay: 1.4 }}
            >
              <Sparkles size={17} style={{ color: '#BE4C00' }} />
            </motion.span>
            <h4 className="hero-heading font-black uppercase text-base sm:text-lg">
              My Setup
            </h4>
          </div>

          <div className="relative grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-2.5">
            {SPEC_ITEMS.map((spec, i) => {
              const Icon = spec.icon;
              const color = COLORS[i % COLORS.length];
              return (
                <motion.div
                  key={spec.label}
                  className="rounded-xl border border-white/10 p-2 sm:p-2.5 flex flex-col gap-1"
                  style={{ background: `linear-gradient(160deg, ${color}26 0%, ${color}0a 100%)` }}
                  animate={{
                    opacity: flipped ? 1 : 0,
                    y: flipped ? 0 : 14,
                    scale: flipped ? 1 : 0.88,
                  }}
                  transition={{ duration: 0.35, delay: flipped ? 0.1 + i * 0.06 : 0, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <Icon size={14} style={{ color }} />
                  <span className="text-[7.5px] sm:text-[8.5px] uppercase tracking-wider text-[#D7E2EA]/45 leading-none">
                    {spec.label}
                  </span>
                  <span className="text-white font-semibold text-[10.5px] sm:text-xs leading-tight">
                    {spec.value}
                  </span>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            className="relative"
            animate={{ opacity: flipped ? 1 : 0 }}
            transition={{ duration: 0.3, delay: flipped ? 0.5 : 0 }}
          >
            <div className="flex justify-between text-[8px] sm:text-[9px] text-[#D7E2EA]/45 uppercase tracking-wider mb-1">
              <span>Storage</span>
              <span>{STORAGE_USED_GB}GB / {STORAGE_TOTAL_GB}GB</span>
            </div>
            <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg, #B600A8, #7621B0, #BE4C00)' }}
                animate={{ width: flipped ? `${STORAGE_PCT}%` : '0%' }}
                transition={{ duration: 1, ease: 'easeInOut', delay: 0.55 }}
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
