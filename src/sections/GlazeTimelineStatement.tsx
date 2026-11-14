import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { Play, Pause, Code2, Globe2, BarChart2, Award } from 'lucide-react';

interface ClipPosition {
  id: number;
  track: 'T1' | 'T2';
  leftPercent: number;
  topPercent: number;
  title: string;
  innerContent: React.ReactNode;
}

const MILESTONE_CLIPS: ClipPosition[] = [
  {
    id: 1,
    track: 'T1',
    leftPercent: 9.5,
    topPercent: 18.5,
    title: 'Java OOP Core',
    innerContent: (
      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-tr from-[#ea580c] to-[#f97316] text-white p-2 text-center select-none">
        <Code2 className="w-4 h-4 mb-0.5 text-white" />
        <span className="font-mono text-[10px] font-bold leading-tight">JAVA.OOP</span>
      </div>
    ),
  },
  {
    id: 2,
    track: 'T2',
    leftPercent: 22.9,
    topPercent: 58.5,
    title: 'Web App & React',
    innerContent: (
      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-tr from-[#1e40af] to-[#3b82f6] text-white p-2 text-center select-none">
        <Globe2 className="w-4 h-4 mb-0.5 text-cyan-200" />
        <span className="font-mono text-[10px] font-bold leading-tight">WEB.DEV</span>
      </div>
    ),
  },
  {
    id: 3,
    track: 'T1',
    leftPercent: 34.1,
    topPercent: 18.5,
    title: 'Python & Data',
    innerContent: (
      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-tr from-[#047857] to-[#10b981] text-white p-2 text-center select-none">
        <BarChart2 className="w-4 h-4 mb-0.5 text-white" />
        <span className="font-mono text-[10px] font-bold leading-tight">PYTHON</span>
      </div>
    ),
  },
  {
    id: 4,
    track: 'T2',
    leftPercent: 50.6,
    topPercent: 58.5,
    title: 'Capstone Project',
    innerContent: (
      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-tr from-[#4338ca] to-[#6366f1] text-white p-2 text-center select-none">
        <span className="font-archivo text-[10px] leading-tight text-orange-300">BUILD</span>
        <span className="font-archivo text-[10px] leading-tight text-white">PROJECT</span>
      </div>
    ),
  },
  {
    id: 5,
    track: 'T1',
    leftPercent: 66.2,
    topPercent: 18.5,
    title: 'Evaluated Certificate',
    innerContent: (
      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-tr from-[#111827] to-[#1f2937] text-white p-2 text-center select-none">
        <Award className="w-4 h-4 mb-0.5 text-yellow-400" />
        <span className="font-mono text-[10px] font-bold text-yellow-300 leading-tight">VERIFIED</span>
      </div>
    ),
  },
];

const GlazeTimelineStatement: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineBoxRef = useRef<HTMLDivElement>(null);
  const sentenceRef = useRef<HTMLHeadingElement>(null);
  const clipRefs = useRef<(HTMLDivElement | null)[]>([]);
  const slotRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const [isPlaying, setIsPlaying] = useState(true);
  const [playheadWeek, setPlayheadWeek] = useState(2.4);
  const [isLandedInSentence, setIsLandedInSentence] = useState(false);
  const lastScrollYRef = useRef(0);
  const firstRevealDoneRef = useRef(false);

  // ── Playhead timer ────────────────────────────────────────────────────────
  useEffect(() => {
    if (!isPlaying) return;
    let animId: number;
    let last = performance.now();

    const loop = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;

      setPlayheadWeek((prev) => {
        let next = prev + dt * 0.8;
        if (next >= 6.0) next = 0;
        return next;
      });

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [isPlaying]);

  // Format playhead to Week progress e.g. "Week 2.4"
  const formatTimecode = (w: number) => {
    const weekNum = Math.floor(w) + 1;
    const day = Math.floor(((w - Math.floor(w)) * 7) + 1);
    return `Week ${weekNum} · Day ${day}`;
  };

  // ── FLIP Animation: Flying clips from Timeline to Sentence ─────────────────
  const flyClips = (toSentence: boolean) => {
    if (isLandedInSentence === toSentence) return;
    setIsLandedInSentence(toSentence);

    const timelineBox = timelineBoxRef.current;
    if (!timelineBox) return;

    MILESTONE_CLIPS.forEach((_, i) => {
      const clipEl = clipRefs.current[i];
      const slotEl = slotRefs.current[i];
      if (!clipEl || !slotEl) return;

      if (toSentence) {
        // Calculate bounding box delta (FLIP)
        const clipRect = clipEl.getBoundingClientRect();
        const slotRect = slotEl.getBoundingClientRect();

        const scale = slotRect.width / clipRect.width;
        const deltaX = slotRect.left - clipRect.left + (slotRect.width - clipRect.width) / 2;
        const deltaY = slotRect.top - clipRect.top + (slotRect.height - clipRect.height) / 2;

        const delay = i * 0.1;
        const wobbleAngle = Math.random() * 24 - 12; // gentle wobble between -12 and +12 deg

        const tl = gsap.timeline();
        tl.to(clipEl, {
          x: deltaX,
          y: deltaY,
          scale: scale,
          duration: 1.5,
          delay: delay,
          ease: 'power2.inOut',
          zIndex: 50,
        });

        // Rotation wobble
        tl.to(
          clipEl,
          {
            rotation: wobbleAngle,
            duration: 0.75,
            ease: 'power2.in',
          },
          `-=${1.5}`
        );
        tl.to(clipEl, {
          rotation: 0,
          duration: 0.75,
          ease: 'power2.out',
        });
      } else {
        // Fly back onto timeline tracks
        const delay = (4 - i) * 0.05;
        const tl = gsap.timeline();
        tl.to(clipEl, {
          x: 0,
          y: 0,
          scale: 1,
          rotation: 0,
          duration: 1.2,
          delay: delay,
          ease: 'power2.inOut',
          zIndex: 10,
        });
      }
    });
  };

  // ── Scroll Listener for Flight Trigger ────────────────────────────────────
  useEffect(() => {
    const handleScroll = () => {
      const sentence = sentenceRef.current;
      const timeline = timelineBoxRef.current;
      if (!sentence || !timeline) return;

      const currentScrollY = window.scrollY;
      const scrollingDown = currentScrollY > lastScrollYRef.current;
      lastScrollYRef.current = currentScrollY;

      // Check first reveal of timeline
      const tRect = timeline.getBoundingClientRect();
      if (!firstRevealDoneRef.current && tRect.top < window.innerHeight - 300) {
        firstRevealDoneRef.current = true;
        const firstClip = clipRefs.current[0];
        if (firstClip) {
          gsap.fromTo(
            firstClip,
            { y: -300, rotation: 15 },
            { y: 0, rotation: 0, duration: 2.0, ease: 'power1.out' }
          );
        }
      }

      // Sentence viewport visibility check
      const sRect = sentence.getBoundingClientRect();
      const sentenceInView = sRect.top < window.innerHeight && sRect.bottom > 0;

      if (sentenceInView) {
        if (scrollingDown && sRect.top < window.innerHeight * 0.75) {
          flyClips(true);
        } else if (!scrollingDown && sRect.top > window.innerHeight * 0.5) {
          flyClips(false);
        }
      } else if (sRect.top > window.innerHeight) {
        flyClips(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLandedInSentence]);

  // Playhead left position in percentage
  const playheadPercent = 8 + 89.6 * (playheadWeek / 6.0);

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden bg-surface-primary"
      style={{
        paddingTop: 'max(60px, calc(100 * var(--u)))',
        paddingBottom: 'max(60px, calc(120 * var(--u)))',
      }}
    >
      {/* ── 1. INTERNSHIP TIMELINE PANEL ─────────────────────────────────── */}
      <div
        className="w-full flex justify-center"
        style={{
          paddingLeft: 'max(14px, calc(68 * var(--u)))',
          paddingRight: 'max(14px, calc(68 * var(--u)))',
          paddingBottom: 'max(40px, calc(60 * var(--u)))',
        }}
      >
        <div
          ref={timelineBoxRef}
          className="relative w-full shadow-2xl select-none bg-slate-100 dark:bg-[#12151b] border border-slate-200 dark:border-white/10"
          style={{
            maxWidth: 'calc(1400 * var(--u))',
            aspectRatio: '1372 / 500',
            borderRadius: 'max(16px, calc(44 * var(--u)))',
            boxShadow:
              '0 calc(40 * var(--u)) calc(70 * var(--u)) rgba(40, 60, 110, 0.12), 0 calc(6 * var(--u)) calc(14 * var(--u)) rgba(20, 30, 60, 0.08)',
          }}
        >
          {/* Pause / Play Button */}
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label={isPlaying ? 'Pause progress simulation' : 'Resume progress simulation'}
            className="absolute z-20 flex items-center justify-center text-slate-700 dark:text-white transition-colors bg-slate-200 hover:bg-slate-300 dark:bg-[#2a2f39] dark:hover:bg-[#363c48]"
            style={{
              left: '1.7%',
              top: '4.4%',
              width: 'max(24px, calc(40 * var(--u)))',
              height: 'max(24px, calc(40 * var(--u)))',
              borderRadius: 'max(6px, calc(11 * var(--u)))',
            }}
          >
            {isPlaying ? (
              <Pause className="w-3.5 h-3.5 fill-current" />
            ) : (
              <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
            )}
          </button>

          {/* Milestone Ruler (Week 1 to Week 6) */}
          <div
            className="absolute flex items-center justify-between text-slate-800 dark:text-[#e9edf3] font-semibold"
            style={{
              left: '8%',
              right: '2.4%',
              top: '5.2%',
              height: 'max(16px, calc(28 * var(--u)))',
              fontSize: 'max(9px, calc(13 * var(--u)))',
            }}
          >
            {['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'].map((week, idx) => (
              <div key={week} className="relative flex flex-col items-center">
                <span>{week}</span>
                {idx < 5 && (
                  <div className="absolute left-full w-full flex justify-around -top-1 opacity-25">
                    <span className="w-px h-2 bg-slate-600 dark:bg-white" />
                    <span className="w-px h-2 bg-slate-600 dark:bg-white" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Track Labels (T1: Core, T2: Capstone) */}
          <span
            className="absolute font-mono font-semibold text-slate-500 dark:text-[#8d97a8] tracking-widest text-[11px]"
            style={{ left: '2.5%', top: '32.5%' }}
            title="Track 1: Foundational Coursework"
          >
            T1
          </span>
          <span
            className="absolute font-mono font-semibold text-slate-500 dark:text-[#8d97a8] tracking-widest text-[11px]"
            style={{ left: '2.5%', top: '72.5%' }}
            title="Track 2: Applied Project & Internship"
          >
            T2
          </span>

          {/* Track Lane T1 */}
          <div
            className="absolute bg-slate-200/60 dark:bg-white/5"
            style={{
              left: '8%',
              right: '2.4%',
              top: '16%',
              height: '33%',
              borderRadius: 'max(8px, calc(14 * var(--u)))',
            }}
          />

          {/* Track Lane T2 */}
          <div
            className="absolute bg-slate-200/60 dark:bg-white/5"
            style={{
              left: '8%',
              right: '2.4%',
              top: '56%',
              height: '33%',
              borderRadius: 'max(8px, calc(14 * var(--u)))',
            }}
          />

          {/* ── Five Milestone Clips ───────────────────────────────────── */}
          {MILESTONE_CLIPS.map((clip, idx) => (
            <div
              key={clip.id}
              ref={(el) => {
                clipRefs.current[idx] = el;
              }}
              className="absolute z-10 cursor-pointer overflow-hidden shadow-md will-change-transform"
              style={{
                left: `${clip.leftPercent}%`,
                top: `${clip.topPercent}%`,
                height: '28%',
                aspectRatio: '1 / 1',
                borderRadius: '22.4%',
                boxShadow: 'inset 0 0 calc(28 * var(--u) * 0.15) rgba(255, 255, 255, 0.55)',
                transformOrigin: 'center center',
              }}
            >
              {clip.innerContent}
            </div>
          ))}

          {/* Playhead (Orange sweeping milestone indicator + badge) */}
          <div
            className="absolute z-20 pointer-events-none flex flex-col items-center"
            style={{
              left: `${playheadPercent}%`,
              top: '12.5%',
              bottom: '4.5%',
              width: 'max(2px, calc(2 * var(--u)))',
              backgroundColor: '#ff5512',
              transform: 'translateX(-50%)',
              transition: isPlaying ? 'none' : 'left 0.1s ease-out',
            }}
          >
            {/* Timecode badge pill */}
            <div
              className="font-mono font-semibold text-white tracking-tight flex items-center justify-center shrink-0 whitespace-nowrap"
              style={{
                marginTop: '-18px',
                padding: 'calc(4 * var(--u)) calc(7 * var(--u))',
                borderRadius: 'max(4px, calc(6 * var(--u)))',
                backgroundColor: '#ff5512',
                fontSize: 'max(9px, calc(11.5 * var(--u)))',
              }}
            >
              {formatTimecode(playheadWeek)}
            </div>
          </div>
        </div>
      </div>

      {/* ── 2. EDITORIAL STATEMENT ────────────────────────────────────── */}
      <div
        className="w-full text-center px-6"
        style={{
          paddingTop: 'max(60px, calc(120 * var(--u)))',
          paddingBottom: 'max(60px, calc(140 * var(--u)))',
        }}
      >
        <h2
          ref={sentenceRef}
          className="font-inter-tight font-medium text-text-primary tracking-tight mx-auto max-w-[31.5ch] leading-[1.08]"
          style={{
            fontSize: 'max(26px, calc(57.2 * var(--u)))',
            letterSpacing: '-0.012em',
          }}
        >
          <span>EduPath </span>
          {/* Slot 1: Java */}
          <span
            ref={(el) => {
              slotRefs.current[0] = el;
            }}
            className="inline-block border border-dashed border-border-strong rounded-[22.4%] align-middle"
            style={{
              width: '1em',
              height: '1em',
              margin: '0.1em 0.2em -0.15em 0.2em',
            }}
          />
          <span> is the first learning </span>
          {/* Slot 2: Web */}
          <span
            ref={(el) => {
              slotRefs.current[1] = el;
            }}
            className="inline-block border border-dashed border-border-strong rounded-[22.4%] align-middle"
            style={{
              width: '1em',
              height: '1em',
              margin: '0.1em 0.2em -0.15em 0.2em',
            }}
          />
          <span> platform where students can </span>
          {/* Slot 3: Python */}
          <span
            ref={(el) => {
              slotRefs.current[2] = el;
            }}
            className="inline-block border border-dashed border-border-strong rounded-[22.4%] align-middle"
            style={{
              width: '1em',
              height: '1em',
              margin: '0.1em 0.2em -0.15em 0.2em',
            }}
          />
          <span> build and ship </span>
          {/* Slot 4: Capstone */}
          <span
            ref={(el) => {
              slotRefs.current[3] = el;
            }}
            className="inline-block border border-dashed border-border-strong rounded-[22.4%] align-middle"
            style={{
              width: '1em',
              height: '1em',
              margin: '0.1em 0.2em -0.15em 0.2em',
            }}
          />
          <span> practical software projects </span>
          {/* Slot 5: Verified Credential */}
          <span
            ref={(el) => {
              slotRefs.current[4] = el;
            }}
            className="inline-block border border-dashed border-border-strong rounded-[22.4%] align-middle"
            style={{
              width: '1em',
              height: '1em',
              margin: '0.1em 0.2em -0.15em 0.2em',
            }}
          />
          <span> right on schedule.</span>
        </h2>
      </div>
    </section>
  );
};

export default GlazeTimelineStatement;
