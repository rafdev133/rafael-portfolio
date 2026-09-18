import type { CSSProperties } from 'react';
import { motion } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
  style?: CSSProperties;
}

// A simple, uniform-colored paragraph that fades/staggers its words in once
// as it scrolls into view -- no lingering per-character dimming, so the
// whole paragraph always reads as one consistent color once it's in.
export default function AnimatedText({ text, className, style }: AnimatedTextProps) {
  const words = text.split(' ');

  return (
    <motion.p
      className={className}
      style={style}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.014 } },
      }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          style={{ display: 'inline-block' }}
          variants={{
            hidden: { opacity: 0, y: 8 },
            show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } },
          }}
        >
          {word}
          {i < words.length - 1 ? ' ' : ''}
        </motion.span>
      ))}
    </motion.p>
  );
}
