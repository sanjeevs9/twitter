type StatTileProps = {
  label: string;
  value: string;
  sublabel?: string;
};

export function StatTile({ label, value, sublabel }: StatTileProps) {
  return (
    <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-4">
      <div className="text-sm text-[var(--text-secondary)]">{label}</div>
      <div className="mt-1 text-3xl font-semibold tracking-tight">{value}</div>
      {sublabel && (
        <div className="mt-1 text-xs text-[var(--text-muted)]">{sublabel}</div>
      )}
    </div>
  );
}
