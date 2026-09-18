import type { ReactNode } from 'react';
import { Film, Clapperboard, Video, Camera } from 'lucide-react';
import FadeIn from '../components/FadeIn';
import AnimatedText from '../components/AnimatedText';
import ContactButton from '../components/ContactButton';

const BIO =
  "With more than four years of experience as a freelance video editor, i focus on short-form and social media content, i truly enjoy working with talking head, faceless, YouTube, vlog, trading, and real estate creators who want their story told well. Let's build something incredible together!";

function CornerBadge({ children, className }: { children: ReactNode; className: string }) {
  return (
    <div
      className={`absolute rounded-3xl border border-[#D7E2EA]/20 bg-white/5 backdrop-blur-sm flex items-center justify-center ${className}`}
    >
      {children}
    </div>
  );
}

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative min-h-screen flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-20"
    >
      <FadeIn delay={0.1} x={-80} y={0} duration={0.9}>
        <CornerBadge className="top-[4%] left-[1%] sm:left-[2%] md:left-[4%] w-[120px] h-[120px] sm:w-[160px] sm:h-[160px] md:w-[210px] md:h-[210px]">
          <Film className="w-1/2 h-1/2 text-[#D7E2EA]" strokeWidth={1.25} />
        </CornerBadge>
      </FadeIn>

      <FadeIn delay={0.25} x={-80} y={0} duration={0.9}>
        <CornerBadge className="bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] w-[100px] h-[100px] sm:w-[140px] sm:h-[140px] md:w-[180px] md:h-[180px]">
          <Camera className="w-1/2 h-1/2 text-[#D7E2EA]" strokeWidth={1.25} />
        </CornerBadge>
      </FadeIn>

      <FadeIn delay={0.15} x={80} y={0} duration={0.9}>
        <CornerBadge className="top-[4%] right-[1%] sm:right-[2%] md:right-[4%] w-[120px] h-[120px] sm:w-[160px] sm:h-[160px] md:w-[210px] md:h-[210px]">
          <Clapperboard className="w-1/2 h-1/2 text-[#D7E2EA]" strokeWidth={1.25} />
        </CornerBadge>
      </FadeIn>

      <FadeIn delay={0.3} x={80} y={0} duration={0.9}>
        <CornerBadge className="bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] w-[130px] h-[130px] sm:w-[170px] sm:h-[170px] md:w-[220px] md:h-[220px]">
          <Video className="w-1/2 h-1/2 text-[#D7E2EA]" strokeWidth={1.25} />
        </CornerBadge>
      </FadeIn>

      <div className="flex flex-col items-center gap-10 sm:gap-14 md:gap-16">
        <FadeIn delay={0} y={40}>
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight text-center"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            About me
          </h2>
        </FadeIn>

        <div className="flex flex-col items-center gap-16 sm:gap-20 md:gap-24">
          <AnimatedText
            text={BIO}
            className="text-[#D7E2EA] font-medium text-center leading-relaxed max-w-[560px]"
            style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
          />
          <ContactButton label="Contact Me" />
        </div>
      </div>
    </section>
  );
}
