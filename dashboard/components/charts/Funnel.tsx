import type { Bucket } from "@/lib/aggregate";

const STEPS = ["var(--chart-blue-250)", "var(--chart-blue-450)", "var(--chart-blue-650)"];

export function Funnel({ data }: { data: Bucket[] }) {
  const max = Math.max(...data.map((d) => d.value), 1);
  const first = data[0]?.value || 1;

  return (
    <div className="flex flex-col gap-4">
      {data.map((step, i) => {
        const widthPct = Math.max((step.value / max) * 100, 4);
        const ofFirst = step.value / first;
        return (
          <div key={step.label}>
            <div className="flex items-baseline justify-between text-sm mb-1">
              <span className="text-[var(--text-secondary)]">{step.label}</span>
              <span className="tabular-nums font-medium">
                {step.value.toLocaleString()}
                <span className="text-[var(--text-muted)] font-normal ml-1.5 text-xs">
                  {i === 0 ? "" : `${(ofFirst * 100).toFixed(1)}% of leads`}
                </span>
              </span>
            </div>
            <div
              className="h-6 rounded-r-md"
              style={{
                width: `${widthPct}%`,
                minWidth: 8,
                background: STEPS[i % STEPS.length],
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
