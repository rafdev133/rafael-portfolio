import { Search, Scissors, Music, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import FadeIn from '../components/FadeIn';

const STEPS = [
  {
    number: '01',
    icon: Search,
    title: 'Brief & Research',
    description:
      "Understand the goal, the audience, and the platform before touching a single clip -- every edit starts with a clear plan.",
  },
  {
    number: '02',
    icon: Scissors,
    title: 'Selects & Rough Cut',
    description:
      'Sort through the raw footage and lock the story structure first, so the pacing works before any polish goes on top.',
  },
  {
    number: '03',
    icon: Music,
    title: 'Sound, Captions & Motion',
    description:
      'Layer in music, kinetic captions, and motion graphics that add rhythm, clarity, and personality to every scene.',
  },
  {
    number: '04',
    icon: Sparkles,
    title: 'Color & Polish',
    description:
      'Grade the footage, clean up the audio, and tighten pacing frame by frame until it feels effortless to watch.',
  },
  {
    number: '05',
    icon: CheckCircle2,
    title: 'Review & Delivery',
    description:
      "One round of revisions, then export and deliver in your platform's exact spec -- ready to post.",
  },
];

export default function Process() {
  return (
    <section className="px-6 md:px-10 pt-32 sm:pt-36 pb-24 max-w-4xl mx-auto">
      <FadeIn delay={0} y={30}>
        <h1 className="hero-heading font-black uppercase tracking-tight text-4xl sm:text-5xl md:text-6xl mb-3">
          Process
        </h1>
      </FadeIn>
      <FadeIn delay={0.1} y={20}>
        <p className="text-[#D7E2EA]/60 text-sm sm:text-base mb-14 md:mb-20 max-w-xl">
          A simple five-step workflow that keeps every edit intentional, on-brand, and on time.
        </p>
      </FadeIn>

      <div className="relative pl-10 sm:pl-14">
        <div className="absolute left-[19px] sm:left-[27px] top-2 bottom-2 w-px bg-white/10" />

        <div className="flex flex-col gap-10 sm:gap-14">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <FadeIn key={step.number} delay={i * 0.12} x={i % 2 === 0 ? -24 : 24} y={0}>
                <div className="relative flex gap-5 sm:gap-8 items-start">
                  <motion.div
                    initial={{ scale: 0.6, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.12 }}
                    className="absolute -left-10 sm:-left-14 w-10 h-10 sm:w-14 sm:h-14 rounded-full flex items-center justify-center border-2 border-[#D7E2EA] bg-[#0C0C0C] flex-shrink-0"
                  >
                    <Icon size={18} className="text-[#D7E2EA] sm:w-5 sm:h-5" />
                  </motion.div>

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
