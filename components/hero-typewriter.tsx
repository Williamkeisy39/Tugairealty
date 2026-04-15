"use client";

import { useEffect, useMemo, useState } from 'react';

type HeroTypewriterProps = {
  text?: string;
  texts?: string[];
  startDelay?: number;
  typingSpeed?: number;
  pauseDuration?: number;
  loop?: boolean;
  cursorBlinkSpeed?: number;
  className?: string;
  cursorClassName?: string;
};

export default function HeroTypewriter({
  text,
  texts,
  startDelay = 150,
  typingSpeed = 55,
  pauseDuration = 1400,
  loop = false,
  cursorBlinkSpeed = 500,
  className,
  cursorClassName
}: HeroTypewriterProps) {
  const [displayed, setDisplayed] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);
  const [reduceMotion, setReduceMotion] = useState(false);
  const phrases = useMemo(() => (texts && texts.length ? texts : [text ?? '']), [texts, text]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = () => setReduceMotion(mediaQuery.matches);
    handleChange();
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      setDisplayed(phrases[0] ?? '');
      return;
    }

    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const typePhrase = (phraseIndex: number) => {
      if (cancelled) return;
      const phrase = phrases[phraseIndex] ?? '';
      let index = 0;
      setDisplayed('');

      const step = () => {
        if (cancelled) return;
        index += 1;
        setDisplayed(phrase.slice(0, index));
        if (index < phrase.length) {
          timeoutId = setTimeout(step, typingSpeed);
          return;
        }

        const shouldContinue = loop || phraseIndex < phrases.length - 1;
        if (shouldContinue) {
          timeoutId = setTimeout(() => {
            const nextIndex = (phraseIndex + 1) % phrases.length;
            typePhrase(nextIndex);
          }, pauseDuration);
        }
      };

      timeoutId = setTimeout(step, typingSpeed);
    };

    timeoutId = setTimeout(() => typePhrase(0), startDelay);

    return () => {
      cancelled = true;
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [phrases, startDelay, typingSpeed, pauseDuration, loop, reduceMotion]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, cursorBlinkSpeed);

    return () => clearInterval(cursorInterval);
  }, [cursorBlinkSpeed]);

  return (
    <span className={className} aria-label={phrases.filter(Boolean).join(' ')}>
      <span aria-hidden="true">{displayed}</span>
      <span aria-hidden="true" className={cursorClassName}>
        {cursorVisible ? '|' : '\u00A0'}
      </span>
    </span>
  );
}
