import { useEffect, useState } from 'react';
import { Search, Scissors, Music, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import FadeIn from '../components/FadeIn';
import FloatingCube from '../components/FloatingCube';

const STEPS = [
  {
    number: '01',
    icon: Search,
    title: 'Brief & Research',
    description:
      "Understand the goal, the audience, and the platform before touching a single clip.",
  },
  {
    number: '02',
    icon: Scissors,
    title: 'Selects & Rough Cut',
    description:
      'Sort the raw footage and lock the story structure before any polish goes on top.',
  },
  {
    number: '03',
    icon: Music,
    title: 'Sound, Captions & Motion',
    description:
      'Layer in music, kinetic captions, and motion graphics for rhythm and personality.',
  },
  {
    number: '04',
    icon: Sparkles,
    title: 'Color & Polish',
    description:
      'Grade the footage and tighten pacing frame by frame until it feels effortless.',
  },
  {
    number: '05',
    icon: CheckCircle2,
    title: 'Review & Delivery',
    description:
      "One round of revisions, then export and deliver in your platform's exact spec.",
  },
];

const COLORS = ['#B600A8', '#7621B0', '#BE4C00'];
const RADIUS = 36; // percent of the container, from center to each node
const AUTOPLAY_MS = 3200;

// Nodes are placed evenly around a circle, starting at the top and going
// clockwise -- a "hub and spoke" layout instead of a literal road.
const POSITIONS = STEPS.map((_, i) => {
  const angleDeg = -90 + i * (360 / STEPS.length);
  const angleRad = (angleDeg * Math.PI) / 180;
  return {
    x: 50 + RADIUS * Math.cos(angleRad),
    y: 50 + RADIUS * Math.sin(angleRad),
  };
});

export default function ProcessSection() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % STEPS.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused]);

  const activeStep = STEPS[active];
  const activeColor = COLORS[active % COLORS.length];

  return (
    <section id="process" className="relative overflow-hidden px-6 md:px-10 py-20 sm:py-24 max-w-4xl mx-auto">
      <FloatingCube size={60} className="top-4 right-0 hidden md:block" duration={18} colors={['#7621B0', '#BE4C00']} />

      <FadeIn delay={0} y={30}>
        <h2 className="hero-heading font-black uppercase tracking-tight text-4xl sm:text-5xl md:text-6xl mb-3 text-center md:text-left">
          Process
        </h2>
      </FadeIn>
      <FadeIn delay={0.1} y={20}>
        <p className="text-[#D7E2EA]/60 text-sm sm:text-base mb-14 md:mb-16 max-w-xl mx-auto md:mx-0 text-center md:text-left">
          A simple five-step roadmap that keeps every edit intentional, on-brand, and on time.
        </p>
      </FadeIn>

      {/* ---- Desktop: rotating orbit hub ---- */}
      <div
        className="relative hidden md:block w-full max-w-[560px] aspect-square mx-auto"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Decorative counter-rotating orbit rings */}
        <motion.div
          aria-hidden
          className="absolute inset-[8%] rounded-full border border-dashed"
          style={{ borderColor: 'rgba(215,226,234,0.14)' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 55, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          aria-hidden
          className="absolute inset-[16%] rounded-full border border-dashed"
          style={{ borderColor: 'rgba(215,226,234,0.09)' }}
          animate={{ rotate: -360 }}
          transition={{ duration: 75, repeat: Infinity, ease: 'linear' }}
        />

        {/* Spokes connecting the hub to each step */}
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full overflow-visible" aria-hidden>
          {POSITIONS.map((pos, i) => {
            const isActive = i === active;
            const c = COLORS[i % COLORS.length];
            return (
              <motion.line
                key={i}
                x1={50}
                y1={50}
                x2={pos.x}
                y2={pos.y}
                stroke={c}
                strokeWidth={isActive ? 0.9 : 0.4}
                strokeDasharray="2.4 3.2"
                strokeLinecap="round"
                initial={{ opacity: 0 }}
                animate={{ opacity: isActive ? 0.95 : 0.22, strokeDashoffset: -22 }}
                transition={{
                  opacity: { duration: 0.35 },
                  strokeDashoffset: { duration: 1.3, repeat: Infinity, ease: 'linear' },
                }}
              />
            );
          })}
        </svg>

        {/* Hub -- shows which step is active, cycling on its own. Just the
            number + title live here; the full description gets its own big
            panel below so it's never squeezed down to fit a tiny circle. */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[34%] aspect-square rounded-full flex items-center justify-center p-3 lg:p-5 text-center overflow-hidden"
          style={{
            background: 'radial-gradient(circle at 35% 30%, #1c1d21 0%, #0a0a0b 75%)',
            border: `1.5px solid ${activeColor}66`,
            boxShadow: `0 0 30px ${activeColor}40, inset 0 0 22px rgba(0,0,0,0.6)`,
            transition: 'border-color 0.4s ease, box-shadow 0.4s ease',
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
              className="flex flex-col items-center gap-1.5 lg:gap-2"
            >
              <span className="font-mono text-xs lg:text-sm" style={{ color: activeColor }}>
                {activeStep.number}
              </span>
              <h3 className="text-white font-black uppercase text-sm lg:text-base leading-tight px-1">
                {activeStep.title}
              </h3>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Step nodes */}
        {STEPS.map((step, i) => {
          const Icon = step.icon;
          const pos = POSITIONS[i];
          const c = COLORS[i % COLORS.length];
          const isActive = i === active;
          return (
            <div
              key={step.number}
              className="absolute flex flex-col items-center gap-2"
              style={{ left: `${pos.x}%`, top: `${pos.y}%`, transform: 'translate(-50%, -50%)' }}
            >
              <motion.button
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                initial={{ scale: 0.4, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1, type: 'spring', stiffness: 260, damping: 18 }}
                className="relative w-14 h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center transition-shadow duration-300"
                style={{
                  background: '#0c0c0c',
                  border: `2px solid ${c}`,
                  boxShadow: isActive ? `0 0 22px ${c}99, 0 0 0 4px ${c}22` : `0 0 10px ${c}40`,
                }}
                aria-label={`Show step ${i + 1}: ${step.title}`}
              >
                {isActive && (
                  <motion.span
                    aria-hidden
                    className="absolute inset-0 rounded-full"
                    style={{ background: c }}
                    initial={{ opacity: 0.5, scale: 1 }}
                    animate={{ scale: [1, 1.7], opacity: [0.5, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' }}
                  />
                )}
                <Icon size={20} style={{ color: c }} />
                <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#0C0C0C] border border-white/20 text-[9px] font-bold text-[#D7E2EA] flex items-center justify-center">
                  {i + 1}
                </span>
              </motion.button>
              <span
                className="text-xs lg:text-sm font-medium uppercase tracking-wide text-center max-w-[100px] leading-tight transition-colors duration-300"
                style={{ color: isActive ? '#fff' : 'rgba(215,226,234,0.5)' }}
              >
                {step.title}
              </span>
            </div>
          );
        })}
      </div>

      {/* Big, highlighted description panel for whichever step is active --
          kept out of the tiny hub circle so the text can actually be read
          at a normal size. */}
      <div className="hidden md:block max-w-xl mx-auto mt-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            className="rounded-2xl border border-white/10 p-5 sm:p-6 flex items-start gap-4"
            style={{
              background: 'linear-gradient(160deg, #17181c 0%, #0c0c0c 100%)',
              borderLeft: `4px solid ${activeColor}`,
            }}
          >
            <span
              className="flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center"
              style={{ background: `${activeColor}26`, border: `1px solid ${activeColor}55` }}
            >
              {(() => {
                const ActiveIcon = activeStep.icon;
                return <ActiveIcon size={20} style={{ color: activeColor }} />;
              })()}
            </span>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs" style={{ color: activeColor }}>
                  {activeStep.number}
                </span>
                <h3 className="text-white font-bold uppercase text-base sm:text-lg">
                  {activeStep.title}
                </h3>
              </div>
              <p className="text-[#D7E2EA]/75 text-sm sm:text-base leading-relaxed">
                {activeStep.description}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <FadeIn delay={0.3} y={10}>
        <p className="hidden md:block text-center text-[#D7E2EA]/35 text-xs italic mt-6">
          Hover or tap a step -- or just watch it cycle on its own.
        </p>
      </FadeIn>

      {/* ---- Mobile: simple vertical stepper ---- */}
      <div className="relative pl-10 sm:pl-14 md:hidden">
        <div className="absolute left-[19px] sm:left-[27px] top-2 bottom-6 w-[3px] rounded-full overflow-hidden bg-white/10">
          <motion.div
            className="w-full"
            style={{ background: 'linear-gradient(180deg, #B600A8, #7621B0, #BE4C00)' }}
            initial={{ height: 0 }}
            whileInView={{ height: '100%' }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1.4, ease: 'easeInOut' }}
          />
        </div>
        <svg
          className="absolute left-[13px] sm:left-[21px] bottom-0"
          width="16"
          height="14"
          viewBox="0 0 16 14"
          fill="none"
        >
          <path d="M0,0 L8,14 L16,0 z" fill="#BE4C00" />
        </svg>

        <div className="flex flex-col gap-10 sm:gap-14">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            const color = COLORS[i % COLORS.length];
            return (
              <FadeIn key={step.number} delay={i * 0.12} x={i % 2 === 0 ? -24 : 24} y={0}>
                <div className="relative flex gap-5 sm:gap-8 items-start">
                  <div className="absolute -left-10 sm:-left-14 flex-shrink-0">
                    <motion.span
                      aria-hidden
                      className="absolute inset-0 rounded-full"
                      style={{ background: color }}
                      animate={{ scale: [1, 1.6], opacity: [0.45, 0] }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut', delay: i * 0.3 }}
                    />
                    <motion.div
                      initial={{ scale: 0.6, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.12 }}
                      className="relative w-10 h-10 sm:w-14 sm:h-14 rounded-full flex items-center justify-center"
                      style={{ background: '#0c0c0c', border: `2px solid ${color}`, boxShadow: `0 0 14px ${color}80` }}
                    >
                      <Icon size={18} style={{ color }} className="sm:w-5 sm:h-5" />
                    </motion.div>
                  </div>

                  <div className="flex flex-col gap-2 pt-1">
                    <span className="text-[#D7E2EA]/40 font-mono text-xs">{step.number}</span>
                    <h3 className="text-white font-medium uppercase text-lg sm:text-xl">
                      {step.title}
                    </h3>
                    <p className="text-[#D7E2EA]/60 text-sm sm:text-base leading-relaxed max-w-lg">
                      {step.description}
                    </p>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
