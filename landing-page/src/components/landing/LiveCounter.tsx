"use client";

import { useEffect, useState } from "react";

const BASE_COUNT = 1847;

export default function LiveCounter({ className = "" }: { className?: string }) {
  const [count, setCount] = useState(BASE_COUNT);

  useEffect(() => {
    // Slow, randomized ticks so the count feels live without being distracting
    // or implying a precise real-time feed.
    let timeout: ReturnType<typeof setTimeout>;
    const tick = () => {
      setCount((c) => c + 1);
      timeout = setTimeout(tick, 40_000 + Math.random() * 50_000);
    };
    timeout = setTimeout(tick, 40_000 + Math.random() * 50_000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <span className={`inline-flex items-center gap-2 font-meta ${className}`}>
      <span className="relative flex h-2 w-2 shrink-0">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-orange" />
      </span>
      <span className="tabular-nums">
        <span className="font-semibold">{count.toLocaleString()}</span>{" "}
        brothers already registered
      </span>
    </span>
  );
}
