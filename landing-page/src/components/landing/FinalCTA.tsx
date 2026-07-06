export default function FinalCTA() {
  return (
    <section className="grain border-t-2 border-ink bg-cobalt text-paper">
      <div className="mx-auto max-w-4xl px-6 py-20 text-center md:px-10 md:py-28">
        <p className="font-meta text-xs font-semibold uppercase tracking-[0.2em] text-paper/80">
          Sunday, July 12 · 2:00 PM ET / 7:00 PM UK
        </p>
        <h2 className="mt-5 text-balance font-display text-4xl leading-[1.15] text-paper sm:text-6xl">
          1,847 brothers in.
          <br />
          <span className="marker-highlight text-ink">Your move.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-md leading-relaxed text-paper/80">
          Free, live, and built for brothers ready to trade hours on someone
          else&apos;s clock for one halal, remote skill.
        </p>
        <a
          href="#register"
          className="mt-10 inline-flex -rotate-1 items-center gap-2 border-2 border-ink bg-orange px-10 py-4 font-display text-base text-paper shadow-[8px_8px_0_0_var(--ink)] transition-transform hover:translate-x-[3px] hover:translate-y-[3px] hover:rotate-0 hover:shadow-none"
        >
          RESERVE YOUR SEAT →
        </a>
      </div>
    </section>
  );
}
