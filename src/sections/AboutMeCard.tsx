import { Instagram, Youtube, Mail } from 'lucide-react';
import FadeIn from '../components/FadeIn';
import AnimatedText from '../components/AnimatedText';
import SocialLink from '../components/SocialLink';
import ContactButton from '../components/ContactButton';

const BIO =
  "I'm a freelance video editor with 4+ years of experience in short-form and social media content. I work across talking head, faceless, YouTube, vlogs, trading, and real estate videos, blending motion graphics, captions, and B-roll into edits that grab attention and keep viewers watching.";

const STATS = [
  { value: '4+ Yrs', label: 'Experience' },
  { value: 'Freelance', label: 'Role' },
  { value: 'Local & Global', label: 'Clients' },
  { value: 'CapCut Pro', label: 'Main Tool' },
];

// TODO: swap these placeholder handles/email for Rafael's real ones.
const SOCIALS = [
  { icon: <Instagram size={16} />, label: 'instagram', href: 'https://instagram.com/' },
  { icon: <Youtube size={16} />, label: 'youtube', href: 'https://youtube.com/' },
  { icon: <Mail size={16} />, label: 'email', href: 'mailto:hello@example.com' },
];

export default function AboutMeCard() {
  return (
    <section id="about" className="px-6 md:px-10 py-16 md:py-24">
      <FadeIn delay={0} y={30}>
        <div
          className="max-w-4xl mx-auto rounded-[28px] border border-white/10 p-6 sm:p-8 md:p-10"
          style={{ background: '#111214' }}
        >
          <div className="grid sm:grid-cols-[auto_1fr] gap-6 sm:gap-8 items-start">
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden flex-shrink-0 border border-white/10">
              <img
                src="/avatar-face.jpg"
                alt="Rafael Porgatorio"
                className="w-full h-full object-cover"
                style={{ filter: 'grayscale(1) contrast(1.15)' }}
              />
            </div>

            <div className="flex flex-col gap-3">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white font-mono tracking-tight">
                Rafael Porgatorio
              </h2>
              <AnimatedText
                text={BIO}
                className="text-[#D7E2EA]/80 text-sm sm:text-base leading-relaxed max-w-xl"
              />
              <div className="flex flex-wrap gap-4 pt-1">
                {SOCIALS.map((s) => (
                  <SocialLink key={s.label} icon={s.icon} label={s.label} href={s.href} />
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-6">
            {STATS.map((stat, i) => (
              <FadeIn key={stat.label} delay={i * 0.08} y={16}>
                <div className="flex flex-col gap-1">
                  <span className="text-white text-lg sm:text-xl font-mono">{stat.value}</span>
                  <span className="text-[#D7E2EA]/50 text-xs uppercase tracking-wider">
                    {stat.label}
                  </span>
                </div>
              </FadeIn>
            ))}
          </div>

          <div className="mt-8 pt-8 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-[#D7E2EA]/70 text-sm sm:text-base">
              Got a project in mind? Let's create something worth watching.
            </p>
            <ContactButton label="Contact Me" />
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
