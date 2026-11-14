import React, { useRef, useEffect } from 'react';

const LOGO_ITEMS = [
  { text: 'JAVA OOP', fontClass: 'font-archivo text-base md:text-[calc(30*var(--u))] tracking-[-0.01em] uppercase' },
  { text: 'PYTHON', fontClass: 'font-unbounded font-bold text-base md:text-[calc(30*var(--u))] tracking-[0.02em]' },
  { text: 'REACT.JS', fontClass: 'font-syncopate font-bold text-sm md:text-[calc(26*var(--u))] tracking-[0.04em]' },
  { text: 'DATA ANALYTICS', fontClass: 'font-michroma text-sm md:text-[calc(25*var(--u))] tracking-[0.06em]' },
  { text: 'SPRING BOOT', fontClass: 'font-inter-tight font-light text-base md:text-[calc(28*var(--u))] tracking-[0.42em]' },
  { text: 'Machine Learning', fontClass: 'font-inter-tight font-semibold text-base md:text-[calc(30*var(--u))] tracking-[-0.03em]' },
  { text: 'CYBERSECURITY', fontClass: 'font-unbounded font-bold text-base md:text-[calc(30*var(--u))] tracking-[0.02em]' },
  { text: 'CLOUD & GIT', fontClass: 'font-archivo text-base md:text-[calc(30*var(--u))] uppercase' },
];

const GlazeLogoTicker: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const list = listRef.current;
    if (!track || !list) return;

    let posX = 0;
    let boost = 0;
    let lastScrollY = window.scrollY;
    let animId: number;
    let lastTime = performance.now();
    let isVisible = true;

    // Check intersection observer so it only runs when visible
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    if (containerRef.current) observer.observe(containerRef.current);

    // Scroll listener for boost
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = Math.abs(currentScrollY - lastScrollY);
      lastScrollY = currentScrollY;
      boost += delta * 2.2;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    const isPhone = window.innerWidth <= 820;
    const speedMult = isPhone ? 2.4 : 1.0;

    const tick = () => {
      animId = requestAnimationFrame(tick);
      const now = performance.now();
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      if (!isVisible) return;

      const baseSpeed = 70;
      const scale = window.innerWidth / 1536;
      const speed = (baseSpeed + boost) * dt * scale * speedMult;
      posX -= speed;

      // Boost decay by factor 0.04^dt
      boost *= Math.pow(0.04, dt);

      const listWidth = list.offsetWidth;
      if (listWidth > 0 && Math.abs(posX) >= listWidth) {
        posX += listWidth;
      }

      track.style.transform = `translate3d(${posX}px, 0, 0)`;
    };

    tick();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden bg-surface-primary select-none border-b border-border"
      style={{
        paddingTop: 'max(44px, calc(72 * var(--u)))',
        paddingBottom: 'max(20px, calc(40 * var(--u)))',
      }}
    >
      {/* Caption */}
      <div className="text-center px-6">
        <p
          className="font-inter-tight font-medium text-text-muted"
          style={{
            fontSize: 'max(14px, calc(20.66 * var(--u)))',
            letterSpacing: '0.033em',
          }}
        >
          Master industry-demanded technical skills through structured internships
        </p>
      </div>

      {/* Marquee with edge fade mask */}
      <div
        className="relative w-full overflow-hidden mt-[max(20px,calc(52*var(--u)))]"
        style={{
          maskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
        }}
      >
        <div
          ref={trackRef}
          className="flex will-change-transform"
          style={{ whiteSpace: 'nowrap' }}
        >
          {/* List 1 */}
          <ul
            ref={listRef}
            className="flex items-center text-text-secondary shrink-0"
            style={{
              gap: 'max(48px, calc(96 * var(--u)))',
              paddingRight: 'max(48px, calc(96 * var(--u)))',
              height: 'max(36px, calc(48 * var(--u)))',
            }}
          >
            {LOGO_ITEMS.map((item, idx) => (
              <li key={idx} className={`shrink-0 leading-none ${item.fontClass} hover:text-white transition-colors`}>
                {item.text}
              </li>
            ))}
          </ul>

          {/* List 2 (Clone for seamless loop) */}
          <ul
            aria-hidden="true"
            className="flex items-center text-text-secondary shrink-0"
            style={{
              gap: 'max(48px, calc(96 * var(--u)))',
              paddingRight: 'max(48px, calc(96 * var(--u)))',
              height: 'max(36px, calc(48 * var(--u)))',
            }}
          >
            {LOGO_ITEMS.map((item, idx) => (
              <li key={`clone-${idx}`} className={`shrink-0 leading-none ${item.fontClass} hover:text-white transition-colors`}>
                {item.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default GlazeLogoTicker;

