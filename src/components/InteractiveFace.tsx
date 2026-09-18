import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

type FaceKey =
  | 'front'
  | 'right3q'
  | 'right-profile'
  | 'left3q'
  | 'left-profile'
  | 'up'
  | 'down'
  | 'up-left'
  | 'down-right';

// Real background-removed cutouts (transparent PNG) -- no card, no square,
// just the subject floating over the page.
const FACES: { key: FaceKey; src: string }[] = [
  { key: 'front', src: '/faces/face-front.png' },
  { key: 'right3q', src: '/faces/face-right3q.png' },
  { key: 'right-profile', src: '/faces/face-right-profile.png' },
  { key: 'left3q', src: '/faces/face-left3q.png' },
  { key: 'left-profile', src: '/faces/face-left-profile.png' },
  { key: 'up', src: '/faces/face-up.png' },
  { key: 'down', src: '/faces/face-down.png' },
  { key: 'up-left', src: '/faces/face-up-left.png' },
  { key: 'down-right', src: '/faces/face-down-right.png' },
];

// Buckets the cursor's position (relative to this element, normalized -1..1)
// into one of the 9 captured face angles -- a cheap stand-in for real-time 3D
// rotation, same trick the "9 face positions" reference sheet suggests.
function pickFace(nx: number, ny: number): FaceKey {
  const ax = Math.abs(nx);
  const ay = Math.abs(ny);

  if (ax < 0.12 && ay < 0.12) return 'front';
  if (nx < -0.25 && ny < -0.25) return 'up-left';
  if (nx > 0.25 && ny > 0.25) return 'down-right';

  if (ay > ax) {
    return ny < 0 ? 'up' : 'down';
  }

  if (nx > 0) {
    return nx > 0.55 ? 'right-profile' : 'right3q';
  }
  return nx < -0.55 ? 'left-profile' : 'left3q';
}

interface InteractiveFaceProps {
  className?: string;
}

export default function InteractiveFace({ className = '' }: InteractiveFaceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const currentRef = useRef<FaceKey>('front');
  const [active, setActive] = useState<FaceKey>('front');
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    setEnabled(isFinePointer);
    if (!isFinePointer) return;

    const move = (e: MouseEvent) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const nx = Math.max(-1, Math.min(1, (e.clientX - centerX) / (window.innerWidth / 2)));
      const ny = Math.max(-1, Math.min(1, (e.clientY - centerY) / (window.innerHeight / 2)));

      const next = pickFace(nx, ny);
      if (next !== currentRef.current) {
        currentRef.current = next;
        setActive(next);
      }
    };

    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={{ aspectRatio: '640 / 430' }}
    >
      {/* Soft color glow behind the cutout -- no card, just ambient light */}
      <motion.div
        aria-hidden
        className="absolute -inset-8 sm:-inset-12 pointer-events-none blur-3xl"
        animate={{
          background: [
            'radial-gradient(ellipse at 50% 60%, rgba(182,0,168,0.35), transparent 65%)',
            'radial-gradient(ellipse at 50% 60%, rgba(190,76,0,0.32), transparent 65%)',
            'radial-gradient(ellipse at 50% 60%, rgba(118,33,176,0.35), transparent 65%)',
            'radial-gradient(ellipse at 50% 60%, rgba(182,0,168,0.35), transparent 65%)',
          ],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />

      {FACES.map((face) => (
        <motion.img
          key={face.key}
          src={face.src}
          alt="Rafael Porgatorio"
          className="absolute inset-0 w-full h-full object-contain"
          style={{ filter: 'drop-shadow(0 25px 35px rgba(0,0,0,0.55))' }}
          initial={false}
          animate={{ opacity: (enabled ? active : 'front') === face.key ? 1 : 0 }}
          transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
        />
      ))}
    </div>
  );
}
