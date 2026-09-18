import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

interface VideoHoverPreviewProps {
  active: boolean;
  // Either a YouTube video id (embedded via iframe) or a local file in
  // /public (rendered as a native <video>, e.g. "/quint.mp4"). Provide
  // exactly one.
  videoId?: string;
  videoSrc?: string;
  title: string;
  aspectRatio?: string;
  maxWidth?: string;
  accentColor?: string;
  icon?: LucideIcon;
  label?: string;
  muted?: boolean;
  // When true, the video boots muted (browsers require that for the very
  // first autoplay -- there is no way around this, it's a platform rule,
  // not a limitation of this build) and automatically switches to
  // unmuted, with no button or click needed from the visitor, the instant
  // they make ANY real click/tap/key-press anywhere on the page. That
  // first interaction is what the browser requires before it will allow
  // sound to play automatically at all.
  autoUnmute?: boolean;
}

// Shared fixed, viewport-centered, hover-triggered video preview popup.
// Used by the Services grid (9:16 shorts, icon + label header, YouTube)
// and the Hero name hover (16:9 local clip, no header, auto-unmute) --
// same fade/scale-in mechanic, different aspect ratio + source + sound
// behavior.
export default function VideoHoverPreview({
  active,
  videoId,
  videoSrc,
  title,
  aspectRatio = '9 / 16',
  maxWidth = '300px',
  accentColor = '#B600A8',
  icon: Icon,
  label,
  muted = false,
  autoUnmute = false,
}: VideoHoverPreviewProps) {
  const [soundOn, setSoundOn] = useState(false);
  const isMuted = autoUnmute ? !soundOn : muted;

  useEffect(() => {
    if (!autoUnmute || soundOn) return;
    const unlock = () => setSoundOn(true);
    window.addEventListener('pointerdown', unlock, { once: true });
    window.addEventListener('keydown', unlock, { once: true });
    window.addEventListener('touchstart', unlock, { once: true });
    return () => {
      window.removeEventListener('pointerdown', unlock);
      window.removeEventListener('keydown', unlock);
      window.removeEventListener('touchstart', unlock);
    };
  }, [autoUnmute, soundOn]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="video-hover-popup"
          aria-hidden
          className="fixed inset-0 z-[60] flex items-center justify-center p-6 pointer-events-none"
          style={{ background: 'rgba(0,0,0,0.38)', backdropFilter: 'blur(3px)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <motion.div
            className="relative rounded-3xl overflow-hidden border"
            style={{
              width: `min(${maxWidth}, 90vw)`,
              aspectRatio,
              borderColor: `${accentColor}66`,
              boxShadow: `0 0 60px ${accentColor}66, 0 30px 60px rgba(0,0,0,0.6)`,
            }}
            initial={{ opacity: 0, scale: 0.85, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          >
            {videoSrc ? (
              // Local file in /public -- muted updates live via the DOM
              // property (React handles this specially for <video>), so
              // it flips to sound-on in place, no restart needed.
              <video
                key={videoSrc}
                src={videoSrc}
                autoPlay
                loop
                playsInline
                muted={isMuted}
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <iframe
                key={`${videoId}-${isMuted ? 'muted' : 'sound'}`}
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=${isMuted ? 1 : 0}&loop=1&playlist=${videoId}&controls=0&modestbranding=1&rel=0&playsinline=1`}
                title={title}
                allow="autoplay; encrypted-media"
                className="absolute inset-0 w-full h-full"
                style={{ border: 0 }}
              />
            )}
            {Icon && label && (
              <div className="absolute top-0 left-0 right-0 p-3 sm:p-4 flex flex-col items-center gap-2 bg-gradient-to-b from-black/75 to-transparent">
                <span
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${accentColor}33`, border: `1px solid ${accentColor}66` }}
                >
                  <Icon size={22} style={{ color: accentColor }} />
                </span>
                <span className="text-white text-base sm:text-lg font-bold uppercase tracking-wide text-center leading-tight">
                  {label}
                </span>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
