const ITEMS = [
  "FREE LIVE SESSION · SUN JULY 12 · 2PM EST / 7PM UK",
  "1,847+ BROTHERS ALREADY REGISTERED",
  "REPLAY NOT GUARANTEED — SHOW UP LIVE",
  "HOSTED BY ABU LAHYA",
];

function TickerContent() {
  return (
    <span className="flex shrink-0 items-center">
      {ITEMS.map((item, i) => (
        <span key={i} className="flex items-center">
          <span className="px-6 font-meta text-[0.7rem] font-semibold tracking-[0.14em] text-paper">
            {item}
          </span>
          <span className="text-paper/50">●</span>
        </span>
      ))}
    </span>
  );
}

export default function Ticker() {
  return (
    <div className="overflow-hidden border-b-2 border-ink bg-orange py-2">
      <div className="marquee-track flex w-max">
        <TickerContent />
        <TickerContent />
      </div>
    </div>
  );
}
