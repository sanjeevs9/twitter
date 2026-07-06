const STATS = [
  { value: "2,000+", label: "brothers helped" },
  { value: "92%", label: "success rate" },
  { value: "$10K+/mo", label: "average student revenue" },
];

export default function Authority() {
  return (
    <section className="border-t-2 border-ink bg-paper-raised">
      <div className="mx-auto max-w-3xl px-6 py-20 md:px-10 md:py-28">
        <p className="font-meta text-xs font-semibold uppercase tracking-[0.2em] text-orange-dark">
          Why listen to me
        </p>

        <p className="mt-6 flex gap-4 text-2xl leading-relaxed text-ink">
          <span
            aria-hidden="true"
            className="-mt-2 shrink-0 font-display text-7xl leading-[0.75] text-orange"
          >
            I
          </span>
          <span>
            &apos;m Abu Lahya. Not long ago I was working doubles as a
            waiter for €11 an hour, mask on, exhausted, stuck. I learned one
            remote skill — cold email — landed my first paying client
            within weeks, and replaced my wage within three months. No
            camera, no audience, no products to sell, nothing that
            isn&apos;t halal. This session is the exact system I now teach
            the brothers I coach.
          </span>
        </p>

        <div className="riso-shadow-block-sm mt-14 grid grid-cols-1 divide-y-2 divide-ink border-2 border-ink bg-paper sm:grid-cols-3 sm:divide-x-2 sm:divide-y-0">
          {STATS.map((stat) => (
            <div key={stat.label} className="px-6 py-6 text-center">
              <p className="font-display text-4xl text-cobalt">
                {stat.value}
              </p>
              <p className="mt-2 font-meta text-[0.7rem] uppercase tracking-wide text-ink-dim">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
