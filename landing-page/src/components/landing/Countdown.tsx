"use client";

import { useEffect, useState } from "react";
import LiveCounter from "@/components/landing/LiveCounter";

const TARGET = new Date("2026-07-12T14:00:00-04:00").getTime();

const UNITS = [
  { key: "days", label: "Days" },
  { key: "hours", label: "Hrs" },
  { key: "minutes", label: "Min" },
  { key: "seconds", label: "Sec" },
] as const;

function getRemaining() {
  const diff = Math.max(TARGET - Date.now(), 0);
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1_000) % 60),
  };
}

export default function Countdown() {
  const [remaining, setRemaining] = useState<ReturnType<
    typeof getRemaining
  > | null>(null);

  useEffect(() => {
    // Deferred to the client on purpose: this page is statically prerendered,
    // so computing the countdown during render would bake in the build time
    // and desync from the visitor's actual clock.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRemaining(getRemaining());
    const id = setInterval(() => setRemaining(getRemaining()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="border-y-2 border-ink bg-ink py-16 text-center md:py-20">
      <div className="mx-auto max-w-3xl px-6">
        <span className="inline-flex items-center gap-2 border-2 border-paper px-4 py-1.5 font-meta text-xs font-semibold uppercase tracking-[0.12em] text-paper">
          <span className="h-2 w-2 rounded-full bg-orange" />
          We go live in
        </span>
        <p className="mt-3 font-meta text-xs uppercase tracking-wide text-paper/60">
          Sunday, July 12 · 2:00 PM EST / 7:00 PM UK
        </p>

        <div className="mx-auto mt-8 grid max-w-xl grid-cols-4 gap-2.5 sm:gap-4">
          {UNITS.map((unit) => (
            <div
              key={unit.key}
              className="border-2 border-paper bg-ink px-1 py-5 sm:py-7"
            >
              <p className="font-display text-4xl tabular-nums text-paper sm:text-6xl">
                {remaining
                  ? String(remaining[unit.key]).padStart(2, "0")
                  : "--"}
              </p>
              <p className="mt-2 font-meta text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-orange sm:text-xs">
                {unit.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <LiveCounter className="text-sm text-paper" />
        </div>

        <p className="mt-4 max-w-md mx-auto leading-relaxed text-paper/70">
          The replay is not guaranteed, so show up live — 100% free, 90
          minutes on Zoom.
        </p>

        <a
          href="#register"
          className="riso-shadow-block mt-8 inline-flex -rotate-1 items-center border-2 border-paper bg-orange px-8 py-3.5 font-display text-sm text-paper transition-transform hover:translate-x-[3px] hover:translate-y-[3px] hover:rotate-0 hover:shadow-none sm:text-base"
        >
          YES, SAVE MY FREE SEAT →
        </a>
      </div>
    </section>
  );
}
