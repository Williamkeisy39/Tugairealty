'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const TARGET_SELECTOR =
  '.scroll-reveal, .scroll-reveal-soft, .scroll-reveal-right, .explore-card-enter, .property-card-enter';

export default function ScrollRevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let lastY = window.scrollY;
    let hasHandledFirstIntersect = false;
    const observedTargets = new Set<Element>();

    const observer = new IntersectionObserver(
      (entries) => {
        const isScrollingDown = window.scrollY >= lastY;
        lastY = window.scrollY;

        for (const entry of entries) {
          if (!entry.isIntersecting) continue;

          const canRevealAtTop = window.scrollY <= 8;
          const canRevealOnFirstPass = !hasHandledFirstIntersect;
          if (!isScrollingDown && !canRevealAtTop && !canRevealOnFirstPass) continue;

          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
          hasHandledFirstIntersect = true;
        }
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -8% 0px'
      }
    );

    const observeTargets = () => {
      const targets = Array.from(document.querySelectorAll(TARGET_SELECTOR));
      targets.forEach((target) => {
        if (target.classList.contains('is-visible') || observedTargets.has(target)) return;
        observedTargets.add(target);
        observer.observe(target);
      });
    };

    observeTargets();

    const mutationObserver = new MutationObserver(() => {
      observeTargets();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true
    });

    const fallbackScan = window.setTimeout(() => {
      observeTargets();
    }, 350);

    return () => {
      window.clearTimeout(fallbackScan);
      mutationObserver.disconnect();
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}
