"use client";

import { useEffect, useMemo, useState } from 'react';

type HeroTypewriterProps = {
  text?: string;
  texts?: string[];
  startDelay?: number;
  pauseDuration?: number;
  loop?: boolean;
  className?: string;
};

export default function HeroTypewriter({
  text,
  texts,
  startDelay = 150,
  pauseDuration = 1400,
  loop = false,
  className
}: HeroTypewriterProps) {
  const [activeIndex, setActiveIndex] = useState(0);
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
    if (reduceMotion) return;
    if (phrases.length <= 1) return;

    let intervalId: ReturnType<typeof setInterval> | null = null;
    const timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        setActiveIndex((prev) => {
          const next = prev + 1;
          if (loop) return next % phrases.length;
          return next >= phrases.length ? prev : next;
        });
      }, pauseDuration);
    }, startDelay);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [phrases, startDelay, pauseDuration, loop, reduceMotion]);

  const currentPhrase = phrases[activeIndex] ?? '';

  return (
    <span className={className} aria-label={phrases.filter(Boolean).join(' ')}>
      <span
        key={`${currentPhrase}-${activeIndex}`}
        aria-hidden="true"
        className={reduceMotion ? 'inline-block' : 'hero-title-slide-left inline-block'}
      >
        {currentPhrase}
      </span>
    </span>
  );
}
