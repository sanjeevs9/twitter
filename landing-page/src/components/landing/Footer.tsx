export default function Footer() {
  return (
    <footer className="border-t-2 border-ink bg-paper px-6 py-10 md:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-display text-lg text-ink">HALAL MONEY MASTERCLASS</p>
        <p className="max-w-md font-meta text-xs leading-relaxed text-ink-dim">
          Hosted by Abu Lahya. Testimonial quotes shown are illustrative
          examples for this page design, not verified student results.
        </p>
        <p className="font-meta text-xs text-ink-dim">
          © 2026 Halal Money Masterclass
        </p>
      </div>
    </footer>
  );
}
