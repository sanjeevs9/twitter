const QUOTES = [
  {
    quote:
      "I sent my first cold email between shifts at the restaurant. Six weeks later I handed in my notice.",
    name: "Hamza R.",
    role: "Former waiter, now full-time via email",
    rotate: "-rotate-2",
    tape: "left-8",
  },
  {
    quote:
      "No camera, no following, no product to sell — just a laptop and one skill. That's what let me leave interest-based work behind for good.",
    name: "Yusuf D.",
    role: "Remote email specialist",
    rotate: "rotate-1",
    tape: "right-10",
  },
  {
    quote:
      "Abu Lahya named the exact thing keeping me stuck applying to jobs. Left with a real system, not just motivation.",
    name: "Ibrahim K.",
    role: "Career switcher",
    rotate: "-rotate-1",
    tape: "left-12",
  },
];

export default function SocialProof() {
  return (
    <section id="proof" className="border-t-2 border-ink bg-paper">
      <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="max-w-xl text-balance font-display text-4xl leading-[1.05] text-ink sm:text-5xl">
            Brothers trading hours for wages, one skill away from their own.
          </h2>
          <span className="font-meta text-xs uppercase tracking-wide text-ink-dim">
            Illustrative feedback, for this concept
          </span>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-3 sm:items-start">
          {QUOTES.map((q, i) => (
            <figure
              key={q.name}
              className={`riso-shadow-block-sm relative border-2 border-ink bg-paper-raised p-7 ${q.rotate} ${
                i === 1 ? "sm:mt-10" : ""
              }`}
            >
              <span
                className={`absolute -top-3 ${q.tape} h-6 w-16 rotate-3 border border-ink/20 bg-orange/40`}
                aria-hidden="true"
              />
              <blockquote className="font-body text-lg italic leading-snug text-ink">
                &ldquo;{q.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 font-meta text-xs text-ink-dim">
                <span className="font-semibold text-ink">{q.name}</span>
                {" — "}
                {q.role}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
