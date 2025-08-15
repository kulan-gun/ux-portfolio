"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Props = {
  final: string;          // e.g. "40+", "1.5×", "3,000+", "MVP"
  duration?: number;      // total scramble time in ms
  speed?: number;         // ms between ticks
  className?: string;
  scrambleLetters?: boolean; // allow letters to scramble too
};

function useInViewOnce<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current || inView) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [inView]);

  return { ref, inView };
}

// Random helpers
const A = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
function randomDigit() {
  return Math.floor(Math.random() * 10).toString();
}
function randomLetter(matchCase: "upper" | "lower") {
  const c = A[Math.floor(Math.random() * A.length)];
  return matchCase === "upper" ? c : c.toLowerCase();
}

export default function MetricShuffle({
  final,
  duration = 800,
  speed = 30,
  className,
  scrambleLetters = true,
}: Props) {
  const { ref, inView } = useInViewOnce<HTMLSpanElement>();
  const [display, setDisplay] = useState(final);

  // Indices we are allowed to scramble:
  // digits always scramble, letters scramble when enabled
  const scrambleIdx = useMemo(() => {
    const idx: number[] = [];
    for (let i = 0; i < final.length; i++) {
      const ch = final[i];
      if (/\d/.test(ch)) idx.push(i);
      else if (scrambleLetters && /[A-Za-z]/.test(ch)) idx.push(i);
    }
    return idx;
  }, [final, scrambleLetters]);

  useEffect(() => {
    if (!inView || scrambleIdx.length === 0) return;

    const started = performance.now();
    let timer = 0;

    const tick = () => {
      const now = performance.now();
      const t = Math.min(1, (now - started) / duration);

      // Progressive lock from left to right
      const lockUntil = Math.floor(scrambleIdx.length * t);

      const chars = final.split("");

      for (let k = 0; k < scrambleIdx.length; k++) {
        const i = scrambleIdx[k];
        if (k < lockUntil) {
          // locked to final
          chars[i] = final[i];
        } else {
          const orig = final[i];
          if (/\d/.test(orig)) {
            chars[i] = randomDigit();
          } else if (/[A-Za-z]/.test(orig)) {
            const matchCase = orig === orig.toUpperCase() ? "upper" : "lower";
            chars[i] = randomLetter(matchCase);
          }
        }
      }

      setDisplay(chars.join(""));

      if (t < 1) {
        timer = window.setTimeout(tick, speed);
      } else {
        setDisplay(final); // ensure exact final output
      }
    };

    timer = window.setTimeout(tick, 0);
    return () => window.clearTimeout(timer);
  }, [inView, final, scrambleIdx, duration, speed]);

  return (
    <span ref={ref} className={className} aria-live="off">
      {display}
      <span className="sr-only">{final}</span>
    </span>
  );
}
