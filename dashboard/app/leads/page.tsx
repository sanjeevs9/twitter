import Link from "next/link";
import { getLeads } from "@/lib/data";

const PAGE_SIZE = 50;

type SearchParams = {
  q?: string;
  grade?: string;
  source?: string;
  page?: string;
};

function buildHref(params: SearchParams, overrides: Partial<SearchParams>) {
  const merged = { ...params, ...overrides };
  const sp = new URLSearchParams();
  if (merged.q) sp.set("q", merged.q);
  if (merged.grade) sp.set("grade", merged.grade);
  if (merged.source) sp.set("source", merged.source);
  if (merged.page && merged.page !== "1") sp.set("page", merged.page);
  const qs = sp.toString();
  return qs ? `/leads?${qs}` : "/leads";
}

function formatDate(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function formatCash(n: number | null) {
  if (n == null) return "—";
  return `$${n.toLocaleString()}`;
}

export default async function LeadsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const leads = getLeads();

  const grades = [...new Set(leads.map((l) => l.leadGrade).filter(Boolean))].sort() as string[];
  const sources = [...new Set(leads.map((l) => l.utmSource).filter(Boolean))].sort() as string[];

  const q = (params.q ?? "").trim().toLowerCase();
  const gradeFilter = params.grade ?? "";
  const sourceFilter = params.source ?? "";

  let filtered = leads;
  if (q) {
    filtered = filtered.filter(
      (l) =>
        l.leadName?.toLowerCase().includes(q) || l.email?.toLowerCase().includes(q)
    );
  }
  if (gradeFilter) {
    filtered = filtered.filter((l) => l.leadGrade === gradeFilter);
  }
  if (sourceFilter) {
    filtered = filtered.filter((l) => l.utmSource === sourceFilter);
  }

  filtered = [...filtered].sort((a, b) =>
    (b.dateCaptured ?? "").localeCompare(a.dateCaptured ?? "")
  );

  const currentPage = Math.max(parseInt(params.page ?? "1", 10) || 1, 1);
  const totalPages = Math.max(Math.ceil(filtered.length / PAGE_SIZE), 1);
  const page = Math.min(currentPage, totalPages);
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Leads</h1>
          <p className="mt-1 text-sm text-[var(--text-muted)]">
            {filtered.length.toLocaleString()} of {leads.length.toLocaleString()} leads
            — internal use only, contains personal contact info
          </p>
        </div>
        <Link
          href="/"
          className="rounded-md border border-[var(--border)] bg-[var(--card)] px-3 py-1.5 text-sm font-medium hover:opacity-80"
        >
          ← Back to dashboard
        </Link>
      </header>

      <form
        className="mb-4 flex flex-wrap items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--card)] p-3"
        method="get"
      >
        <input
          type="text"
          name="q"
          defaultValue={params.q ?? ""}
          placeholder="Search name or email…"
          className="min-w-48 flex-1 rounded-md border border-[var(--border)] bg-transparent px-3 py-1.5 text-sm outline-none"
        />
        <select
          name="grade"
          defaultValue={gradeFilter}
          className="rounded-md border border-[var(--border)] bg-transparent px-3 py-1.5 text-sm"
        >
          <option value="">All grades</option>
          {grades.map((g) => (
            <option key={g} value={g}>
              Grade {g}
            </option>
          ))}
        </select>
        <select
          name="source"
          defaultValue={sourceFilter}
          className="rounded-md border border-[var(--border)] bg-transparent px-3 py-1.5 text-sm"
        >
          <option value="">All sources</option>
          {sources.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="rounded-md bg-[var(--chart-blue)] px-3 py-1.5 text-sm font-medium text-white"
        >
          Filter
        </button>
        {(q || gradeFilter || sourceFilter) && (
          <Link href="/leads" className="text-sm text-[var(--text-muted)] underline">
            Clear
          </Link>
        )}
      </form>

      <div className="overflow-x-auto rounded-lg border border-[var(--border)] bg-[var(--card)]">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead>
            <tr className="border-b border-[var(--border)] text-[var(--text-muted)]">
              <th className="px-3 py-2 font-medium">Name</th>
              <th className="px-3 py-2 font-medium">Email</th>
              <th className="px-3 py-2 font-medium">Captured</th>
              <th className="px-3 py-2 font-medium">Source</th>
              <th className="px-3 py-2 font-medium tabular-nums">Score</th>
              <th className="px-3 py-2 font-medium">Grade</th>
              <th className="px-3 py-2 font-medium">Booked</th>
              <th className="px-3 py-2 font-medium">Closed</th>
              <th className="px-3 py-2 font-medium tabular-nums">Cash</th>
              <th className="px-3 py-2 font-medium">Stage</th>
            </tr>
          </thead>
          <tbody>
            {pageItems.map((lead, i) => (
              <tr
                key={`${lead.email}-${i}`}
                className="border-b border-[var(--border)] last:border-0"
              >
                <td className="px-3 py-2 whitespace-nowrap">{lead.leadName ?? "—"}</td>
                <td className="px-3 py-2 whitespace-nowrap text-[var(--text-secondary)]">
                  {lead.email ?? "—"}
                </td>
                <td className="px-3 py-2 whitespace-nowrap tabular-nums">
                  {formatDate(lead.dateCaptured)}
                </td>
                <td className="px-3 py-2 whitespace-nowrap">{lead.utmSource ?? "—"}</td>
                <td className="px-3 py-2 tabular-nums">
                  {lead.leadScore != null ? lead.leadScore.toFixed(1) : "—"}
                </td>
                <td className="px-3 py-2">{lead.leadGrade ?? "—"}</td>
                <td className="px-3 py-2">{lead.bookedCall ?? "—"}</td>
                <td className="px-3 py-2">{lead.closed ?? "—"}</td>
                <td className="px-3 py-2 tabular-nums">{formatCash(lead.cashCollected)}</td>
                <td className="px-3 py-2 whitespace-nowrap">
                  {lead.opportunityStage ?? "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between text-sm">
        <span className="text-[var(--text-muted)]">
          Page {page} of {totalPages}
        </span>
        <div className="flex gap-2">
          <Link
            href={buildHref(params, { page: String(Math.max(page - 1, 1)) })}
            aria-disabled={page <= 1}
            className={`rounded-md border border-[var(--border)] px-3 py-1.5 ${
              page <= 1 ? "pointer-events-none opacity-40" : "hover:opacity-80"
            }`}
          >
            Previous
          </Link>
          <Link
            href={buildHref(params, { page: String(Math.min(page + 1, totalPages)) })}
            aria-disabled={page >= totalPages}
            className={`rounded-md border border-[var(--border)] px-3 py-1.5 ${
              page >= totalPages ? "pointer-events-none opacity-40" : "hover:opacity-80"
            }`}
          >
            Next
          </Link>
        </div>
      </div>
    </div>
  );
}
