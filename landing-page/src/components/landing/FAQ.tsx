"use client";

import { useState } from "react";

const FAQS = [
  {
    q: "Is this actually free?",
    a: "Yes. No credit card at registration, and nothing is sold on the call itself — you'll hear about paid coaching only if you ask about it afterward.",
  },
  {
    q: "Is this actually halal?",
    a: "Yes. Cold email is a service-based skill — you're paid for honest outreach work, not interest, gambling, or anything questionable. That's the whole premise of this session.",
  },
  {
    q: "Will there be a replay?",
    a: "The replay is not guaranteed, so show up live. The session runs live so I can take real questions, and that only works if people show up.",
  },
  {
    q: "What if I can't make it live?",
    a: "Register anyway if you're not sure — plans move, and better to hold a seat than miss it entirely. If you end up missing it, you're on the list for the next live date.",
  },
  {
    q: "Is this for me if I haven't started yet?",
    a: "Yes — this is built for beginners. You don't need a business, an audience, or any experience already. Just a laptop and a willingness to learn one skill.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="border-t-2 border-ink bg-paper">
      <div className="mx-auto max-w-3xl px-6 py-20 md:px-10 md:py-28">
        <span className="mx-auto flex w-fit items-center gap-2 border-2 border-ink px-4 py-1.5 font-meta text-xs font-semibold uppercase tracking-[0.12em] text-ink">
          <span className="h-2 w-2 rounded-full bg-cobalt" />
          Before you save your seat
        </span>
        <h2 className="mt-6 text-balance text-center font-display text-4xl leading-[1.05] text-ink sm:text-5xl">
          Questions people actually ask
        </h2>

        <div className="mt-14 divide-y-2 divide-ink border-y-2 border-ink">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <span className="font-display text-xl leading-snug text-ink sm:text-2xl">
                    {item.q}
                  </span>
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-ink font-display text-lg text-orange transition-transform ${
                      isOpen ? "rotate-45 bg-ink text-paper" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                {isOpen && (
                  <p className="max-w-xl pb-6 leading-relaxed text-ink-dim">
                    {item.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
