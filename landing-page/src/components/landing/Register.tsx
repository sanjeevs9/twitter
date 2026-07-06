"use client";

import { useState, type FormEvent } from "react";
import LiveCounter from "@/components/landing/LiveCounter";

export default function Register() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section id="register" className="border-t-2 border-ink bg-paper-raised">
      <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:items-center">
          <div className="md:col-span-5">
            <p className="font-meta text-xs font-semibold uppercase tracking-[0.2em] text-orange-dark">
              Save your seat
            </p>
            <h2 className="mt-4 text-balance font-display text-4xl leading-[1.05] text-ink sm:text-5xl">
              Live only.
              <br />
              One evening. <span className="marker-highlight">No replay.</span>
            </h2>
            <p className="mt-6 max-w-sm leading-relaxed text-ink-dim">
              Free to attend, no credit card. You&apos;ll get one calendar
              invite and one reminder email — nothing else.
            </p>
            <div className="mt-6">
              <LiveCounter className="text-xs uppercase tracking-wide text-ink-dim" />
            </div>
          </div>

          <div className="md:col-span-7">
            <div className="riso-shadow-block relative mx-auto max-w-md rotate-1 border-2 border-ink bg-paper p-9">
              <span
                className="absolute -top-4 left-10 h-8 w-20 -rotate-3 border border-ink/20 bg-cobalt/25"
                aria-hidden="true"
              />

              {submitted ? (
                <div className="flex min-h-[220px] flex-col items-center justify-center text-center">
                  <p className="riso-shadow-text font-display text-3xl text-orange">
                    You&apos;re in.
                  </p>
                  <p className="mt-4 max-w-xs leading-relaxed text-ink-dim">
                    Check your inbox for the calendar invite. See you
                    Sunday, July 12 at 2:00 PM ET (7:00 PM UK).
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="border-b-2 border-dashed border-ink/25 pb-5">
                    <p className="font-display text-xl text-ink">
                      HALAL MONEY MASTERCLASS
                    </p>
                    <p className="font-meta text-xs uppercase tracking-[0.15em] text-ink-dim">
                      Admit one · July 12, 2:00 PM ET
                    </p>
                  </div>

                  <div className="pt-1">
                    <label className="block font-meta text-xs font-semibold uppercase tracking-[0.1em] text-ink-dim">
                      Name
                      <input
                        required
                        type="text"
                        name="name"
                        placeholder="Jordan Lee"
                        className="mt-2 w-full border-2 border-ink bg-paper px-4 py-3 font-body text-base font-normal normal-case tracking-normal text-ink placeholder:text-ink-dim/50 focus:bg-paper-raised focus:outline-none"
                      />
                    </label>

                    <label className="mt-4 block font-meta text-xs font-semibold uppercase tracking-[0.1em] text-ink-dim">
                      Email
                      <input
                        required
                        type="email"
                        name="email"
                        placeholder="jordan@studio.com"
                        className="mt-2 w-full border-2 border-ink bg-paper px-4 py-3 font-body text-base font-normal normal-case tracking-normal text-ink placeholder:text-ink-dim/50 focus:bg-paper-raised focus:outline-none"
                      />
                    </label>

                    <label className="mt-4 block font-meta text-xs font-semibold uppercase tracking-[0.1em] text-ink-dim">
                      Phone
                      <input
                        required
                        type="tel"
                        name="phone"
                        placeholder="+1 555 000 0000"
                        className="mt-2 w-full border-2 border-ink bg-paper px-4 py-3 font-body text-base font-normal normal-case tracking-normal text-ink placeholder:text-ink-dim/50 focus:bg-paper-raised focus:outline-none"
                      />
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="riso-shadow-block-sm mt-2 w-full border-2 border-ink bg-orange px-6 py-4 font-display text-base text-paper transition-transform hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none"
                  >
                    RESERVE MY SEAT — FREE
                  </button>

                  <p className="text-center font-meta text-xs text-ink-dim/80">
                    No spam, no upsell emails. Unsubscribe anytime.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
