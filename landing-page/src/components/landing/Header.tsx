export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b-2 border-ink bg-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-10">
        <a href="#top" className="font-display text-lg tracking-tight text-ink">
          HALAL MONEY
        </a>

        <nav className="hidden items-center gap-8 font-meta text-xs font-semibold uppercase tracking-[0.1em] text-ink-dim md:flex">
          <a href="#proof" className="transition-colors hover:text-ink">
            Who it&apos;s for
          </a>
          <a href="#faq" className="transition-colors hover:text-ink">
            FAQ
          </a>
        </nav>

        <a
          href="#register"
          className="riso-shadow-block-sm -rotate-1 border-2 border-ink bg-orange px-5 py-2.5 text-sm font-bold text-paper transition-transform hover:translate-x-[2px] hover:translate-y-[2px] hover:rotate-0 hover:shadow-none"
        >
          Save my free seat
        </a>
      </div>
    </header>
  );
}
