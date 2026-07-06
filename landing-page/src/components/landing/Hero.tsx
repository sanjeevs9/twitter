import Image from "next/image";
import LiveCounter from "@/components/landing/LiveCounter";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-14 px-6 pb-20 pt-16 md:grid-cols-12 md:px-10 md:pb-28 md:pt-20">
        <div className="md:col-span-7">
          <span className="inline-flex items-center gap-2 border-2 border-ink px-4 py-1.5 font-meta text-xs font-semibold uppercase tracking-[0.12em] text-ink">
            <span className="h-2 w-2 rounded-full bg-orange" />
            Free live session · no cost
          </span>

          <h1 className="mt-7 text-balance font-display text-[2.6rem] leading-[1.22] text-ink sm:text-6xl lg:text-[4.4rem]">
            How to make money
            <br />
            <span className="marker-highlight">so fast it feels haram.</span>
          </h1>

          <p className="mt-8 max-w-lg text-lg leading-relaxed text-ink-dim">
            100% halal. No face, no audience, no products. Just email. The
            remote skill that took me from a €11/hour waiter to $10K/month —
            and 2,000+ brothers are now doing the same.
          </p>

          <a
            href="#register"
            className="riso-shadow-block mt-10 inline-flex -rotate-1 items-center gap-6 border-2 border-ink bg-orange px-7 py-4 text-paper transition-transform hover:translate-x-[3px] hover:translate-y-[3px] hover:rotate-0 hover:shadow-none"
          >
            <span className="text-left font-display text-base sm:text-lg">
              YES, SAVE MY FREE SEAT →
            </span>
            <span className="hidden border-l border-paper/40 pl-6 text-left font-meta text-xs leading-snug font-medium sm:block">
              Sun July 12
              <br />
              2PM EST · 7PM UK
            </span>
          </a>

          <div className="mt-5">
            <LiveCounter className="text-xs uppercase tracking-wide text-ink-dim" />
          </div>
        </div>

        <div className="md:col-span-5">
          <div className="relative mx-auto max-w-sm">
            <div className="halftone absolute -inset-6 -z-10 rounded-full text-orange/70" />

            <div className="flex items-stretch gap-3">
              <div className="riso-shadow-block-sm relative aspect-[4/5] w-[47%] -rotate-3 overflow-hidden border-2 border-ink">
                <Image
                  src="/before-photo.jpg"
                  alt="Before: working as a waiter for €11/hr"
                  fill
                  sizes="200px"
                  className="object-cover"
                />
                <span className="absolute left-2 top-2 rounded-full border border-ink bg-paper px-2.5 py-0.5 font-meta text-[0.6rem] font-semibold uppercase tracking-wider text-ink">
                  Before
                </span>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent p-3 pt-10">
                  <p className="font-display text-xl leading-none text-paper">
                    €11/hr
                  </p>
                  <p className="mt-1 font-meta text-[0.6rem] uppercase tracking-wider text-paper/80">
                    Waiter, stuck
                  </p>
                </div>
              </div>

              <span className="self-center font-display text-2xl text-cobalt">
                →
              </span>

              <div className="riso-shadow-block-sm relative aspect-[4/5] w-[47%] rotate-2 overflow-hidden border-2 border-ink">
                <Image
                  src="/after-photo.jpg"
                  alt="After: $10K/month, free and halal"
                  fill
                  sizes="200px"
                  className="object-cover"
                />
                <span className="absolute left-2 top-2 rounded-full border border-ink bg-orange px-2.5 py-0.5 font-meta text-[0.6rem] font-semibold uppercase tracking-wider text-paper">
                  3 months later
                </span>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent p-3 pt-10">
                  <p className="font-display text-xl leading-none text-paper">
                    $10K/mo
                  </p>
                  <p className="mt-1 font-meta text-[0.6rem] uppercase tracking-wider text-paper/80">
                    Free &amp; halal
                  </p>
                </div>
              </div>
            </div>

            <div className="riso-shadow-block-sm mt-6 -rotate-1 border-2 border-ink bg-paper p-5">
              <p className="font-display text-3xl text-ink">2,000+</p>
              <p className="mt-1 font-meta text-xs uppercase tracking-wide text-ink-dim">
                brothers have taken this session
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
