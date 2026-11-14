import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface FullLoaderProps {
  onComplete: () => void;
  is3dReady: boolean;
}

const FullLoader: React.FC<FullLoaderProps> = ({ onComplete, is3dReady }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const [removed, setRemoved] = useState(false);
  const hasExitedRef = useRef(false);

  useEffect(() => {
    // Check reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setRemoved(true);
      onComplete();
      return;
    }

    const container = containerRef.current;
    const text = textRef.current;
    if (!container || !text) return;

    // Initial state
    gsap.set(container, { clipPath: 'inset(0% 0% 0% 0%)' });
    gsap.set(text, { yPercent: 110, opacity: 1 });

    // Entrance: after 0.15s rises into view
    gsap.to(text, {
      yPercent: 0,
      duration: 0.7,
      delay: 0.15,
      ease: 'expo.out',
    });

    const startTime = Date.now();

    const triggerExit = () => {
      if (hasExitedRef.current) return;
      hasExitedRef.current = true;

      const tl = gsap.timeline({
        onComplete: () => {
          setRemoved(true);
        },
      });

      // Line leaves upward to -110% over 0.55s expo.in
      tl.to(text, {
        yPercent: -110,
        duration: 0.55,
        ease: 'expo.in',
      });

      // Layer wipes upward to clip-path: inset(0 0 100% 0) over 0.8s expo.inOut (overlapping by 0.15s)
      tl.to(
        container,
        {
          clipPath: 'inset(0% 0% 100% 0%)',
          duration: 0.8,
          ease: 'power3.inOut',
          onStart: () => {
            onComplete();
          },
        },
        '-=0.15'
      );
    };

    // Check condition: both 3D ready and 1.4s have passed
    const checkInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      if (is3dReady && elapsed >= 1400) {
        clearInterval(checkInterval);
        triggerExit();
      }
    }, 50);

    // Failsafe timer at 5.0s
    const failsafe = setTimeout(() => {
      clearInterval(checkInterval);
      triggerExit();
    }, 5000);

    return () => {
      clearInterval(checkInterval);
      clearTimeout(failsafe);
    };
  }, [is3dReady, onComplete]);

  if (removed) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-[#0b0d11] pointer-events-auto"
      style={{
        clipPath: 'inset(0% 0% 0% 0%)',
        willChange: 'clip-path',
      }}
    >
      <div className="overflow-hidden px-6 py-3">
        <p
          ref={textRef}
          className="font-inter-tight font-medium text-slate-900 dark:text-white text-center tracking-tight select-none"
          style={{
            fontSize: 'max(22px, calc(34 * var(--u)))',
            letterSpacing: '-0.01em',
            willChange: 'transform',
          }}
        >
          Learn Skills. Build Projects. Move Forward.
        </p>
      </div>
    </div>
  );
};

export default FullLoader;

