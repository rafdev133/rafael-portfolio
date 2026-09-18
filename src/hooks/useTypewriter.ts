import { useEffect, useState } from 'react';

interface TypewriterResult {
  displayed: string;
  done: boolean;
}

/**
 * Reveals `text` one character at a time, starting after `startDelay` ms,
 * then advancing one character every `speed` ms.
 */
export function useTypewriter(text: string, speed = 38, startDelay = 600): TypewriterResult {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed('');
    setDone(false);

    let index = 0;
    let intervalId: ReturnType<typeof setInterval> | undefined;

    const delayId = setTimeout(() => {
      intervalId = setInterval(() => {
        index += 1;
        setDisplayed(text.slice(0, index));
        if (index >= text.length) {
          if (intervalId) clearInterval(intervalId);
          setDone(true);
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(delayId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [text, speed, startDelay]);

  return { displayed, done };
}
