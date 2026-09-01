import { useEffect, useRef } from 'react'

/**
 * Continuous, seamless auto-scrolling carousel.
 *
 * Requires the caller to render the list of cards TWICE back-to-back
 * inside the scroll container (see usage note below). This lets the
 * scroll position wrap from the end of the first copy to 0 with no
 * visible jump, since the second copy is pixel-identical to the first.
 *
 * Manual prev/next still works via scrollByCard, and temporarily
 * pauses the auto-scroll (resuming after `resumeDelayMs`).
 */
export function useCarousel(cardClass: string, speedPxPerSec = 40) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const pausedRef = useRef(false);
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastTsRef = useRef<number | null>(null);
  const singleSetWidthRef = useRef(0);

  const measure = () => {
    const el = scrollRef.current;
    if (!el) return;
    // Total scrollable width is 2x one set (since content is duplicated).
    singleSetWidthRef.current = el.scrollWidth / 2;
  };

  const tick = (ts: number) => {
    const el = scrollRef.current;
    if (!el) {
      rafRef.current = requestAnimationFrame(tick);
      return;
    }

    if (lastTsRef.current === null) lastTsRef.current = ts;
    const deltaSec = (ts - lastTsRef.current) / 1000;
    lastTsRef.current = ts;

    if (!pausedRef.current) {
      el.scrollLeft += speedPxPerSec * deltaSec;

      if (singleSetWidthRef.current === 0) measure();

      // Seamlessly wrap once we've scrolled past one full set.
      if (singleSetWidthRef.current > 0 && el.scrollLeft >= singleSetWidthRef.current) {
        el.scrollLeft -= singleSetWidthRef.current;
      }
    }

    rafRef.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    measure();
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pauseAutoScroll = () => {
    pausedRef.current = true;
  };

  const resumeAutoScroll = () => {
    pausedRef.current = false;
    lastTsRef.current = null; // avoid a large delta jump after being paused
  };

  // Manual step, still respects the wrap-around.
  const scrollByCard = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;

    const cardWidth = el.querySelector<HTMLDivElement>(`.${cardClass}`)?.clientWidth ?? 380;
    const gap = 32;
    const step = cardWidth + gap;

    pauseAutoScroll();
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);

    el.scrollBy({ left: direction === 'left' ? -step : step, behavior: 'smooth' });

    // Resume the smooth auto-scroll a moment after manual interaction.
    resumeTimeoutRef.current = setTimeout(resumeAutoScroll, 1200);
  };

  return {
    scrollRef,
    scrollByCard,
    startAutoScroll: resumeAutoScroll,
    stopAutoScroll: pauseAutoScroll,
  };
}