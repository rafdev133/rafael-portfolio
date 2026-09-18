import { motion } from 'framer-motion';

interface FloatingCubeProps {
  size?: number;
  className?: string;
  colors?: [string, string];
  duration?: number;
  opacity?: number;
}

// A lightweight CSS 3D cube (no WebGL needed) used as ambient decoration.
export default function FloatingCube({
  size = 90,
  className = '',
  colors = ['#B600A8', '#7621B0'],
  duration = 20,
  opacity = 0.16,
}: FloatingCubeProps) {
  const half = size / 2;
  const faceTransforms = [
    `rotateY(0deg) translateZ(${half}px)`,
    `rotateY(90deg) translateZ(${half}px)`,
    `rotateY(180deg) translateZ(${half}px)`,
    `rotateY(-90deg) translateZ(${half}px)`,
    `rotateX(90deg) translateZ(${half}px)`,
    `rotateX(-90deg) translateZ(${half}px)`,
  ];

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute ${className}`}
      style={{ perspective: 900 }}
    >
      <motion.div
        style={{ width: size, height: size, position: 'relative', transformStyle: 'preserve-3d' }}
        animate={{ rotateX: [0, 360], rotateY: [0, 360] }}
        transition={{ duration, repeat: Infinity, ease: 'linear' }}
      >
        {faceTransforms.map((t, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              inset: 0,
              transform: t,
              background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`,
              opacity,
              border: '1px solid rgba(215, 226, 234, 0.15)',
              borderRadius: size * 0.14,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}
