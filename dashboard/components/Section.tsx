export function Section({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-4">
      <h2 className="text-sm font-semibold">{title}</h2>
      {subtitle && (
        <p className="text-xs text-[var(--text-muted)] mt-0.5">{subtitle}</p>
      )}
      <div className="mt-3">{children}</div>
    </div>
  );
}
