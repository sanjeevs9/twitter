import type { Lead } from "./data";

export type Bucket = { label: string; value: number };

function countBy(
  leads: Lead[],
  getKey: (lead: Lead) => string | null,
  fallbackLabel = "Unknown"
): Bucket[] {
  const counts = new Map<string, number>();
  for (const lead of leads) {
    const key = getKey(lead) ?? fallbackLabel;
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  return [...counts.entries()].map(([label, value]) => ({ label, value }));
}

function sortDesc(buckets: Bucket[]): Bucket[] {
  return [...buckets].sort((a, b) => b.value - a.value);
}

/** Fold small tail buckets into "Other" once there are more than `max` entries. */
function foldTail(buckets: Bucket[], max: number): Bucket[] {
  const sorted = sortDesc(buckets);
  if (sorted.length <= max) return sorted;
  const head = sorted.slice(0, max - 1);
  const tail = sorted.slice(max - 1);
  const otherTotal = tail.reduce((sum, b) => sum + b.value, 0);
  return [...head, { label: "Other", value: otherTotal }];
}

export function getKpis(leads: Lead[]) {
  const totalLeads = leads.length;
  const bookedCalls = leads.filter((l) => l.bookedCall === "Yes").length;
  const closedDeals = leads.filter((l) => l.closed === "Yes").length;
  const cashCollected = leads.reduce((sum, l) => sum + (l.cashCollected ?? 0), 0);
  const scored = leads.filter((l) => l.leadScore != null);
  const avgLeadScore =
    scored.length > 0
      ? scored.reduce((sum, l) => sum + (l.leadScore ?? 0), 0) / scored.length
      : 0;

  return {
    totalLeads,
    bookedCalls,
    closedDeals,
    cashCollected,
    avgLeadScore,
    bookedRate: totalLeads > 0 ? bookedCalls / totalLeads : 0,
    closeRate: bookedCalls > 0 ? closedDeals / bookedCalls : 0,
  };
}

export function getFunnel(leads: Lead[]): Bucket[] {
  const { totalLeads, bookedCalls, closedDeals } = getKpis(leads);
  return [
    { label: "Leads captured", value: totalLeads },
    { label: "Booked a call", value: bookedCalls },
    { label: "Closed", value: closedDeals },
  ];
}

export function getLeadsOverTime(leads: Lead[]): Bucket[] {
  const buckets = countBy(leads, (l) => l.dateCaptured?.slice(0, 10) ?? null);
  return buckets.sort((a, b) => a.label.localeCompare(b.label));
}

export function getLeadSources(leads: Lead[]): Bucket[] {
  const buckets = countBy(leads, (l) => l.utmSource, "Direct / unknown");
  return foldTail(buckets, 6);
}

export function getTopCampaigns(leads: Lead[], n = 8): Bucket[] {
  const buckets = countBy(leads, (l) => l.utmCampaign, "No campaign tag");
  return sortDesc(buckets).slice(0, n);
}

const GRADE_ORDER = ["A", "B", "C", "D"];
export function getLeadGrades(leads: Lead[]): Bucket[] {
  const buckets = countBy(leads, (l) => l.leadGrade, "Ungraded");
  const map = new Map(buckets.map((b) => [b.label, b.value]));
  return GRADE_ORDER.filter((g) => map.has(g)).map((g) => ({
    label: g,
    value: map.get(g) ?? 0,
  }));
}

export function getProfessions(leads: Lead[]): Bucket[] {
  return foldTail(countBy(leads, (l) => l.profession, "Not answered"), 7);
}

export function getMonthlyIncome(leads: Lead[]): Bucket[] {
  return sortDesc(countBy(leads, (l) => l.monthlyIncome, "Not answered"));
}

export function getDayToDay(leads: Lead[]): Bucket[] {
  return foldTail(countBy(leads, (l) => l.dayToDay, "Not answered"), 7);
}

export function getCapitalAvailable(leads: Lead[]): Bucket[] {
  return sortDesc(countBy(leads, (l) => l.capitalAvailable, "Not answered"));
}

export function getWantsMost(leads: Lead[]): Bucket[] {
  return sortDesc(countBy(leads, (l) => l.wantsMost, "Not answered"));
}

export function getFrustration(leads: Lead[]): Bucket[] {
  return sortDesc(countBy(leads, (l) => l.frustration, "Not answered"));
}

export function getProgramRevenue(leads: Lead[]): Bucket[] {
  const map = new Map<string, number>();
  for (const l of leads) {
    if (!l.programType || l.cashCollected == null) continue;
    map.set(l.programType, (map.get(l.programType) ?? 0) + l.cashCollected);
  }
  return sortDesc([...map.entries()].map(([label, value]) => ({ label, value })));
}

export function getPaymentTypes(leads: Lead[]): Bucket[] {
  return sortDesc(countBy(leads.filter((l) => l.paymentType != null), (l) => l.paymentType));
}

const AGE_BUCKETS: [number, number, string][] = [
  [0, 18, "<18"],
  [18, 25, "18-24"],
  [25, 35, "25-34"],
  [35, 45, "35-44"],
  [45, 55, "45-54"],
  [55, Infinity, "55+"],
];
export function getAgeDistribution(leads: Lead[]): Bucket[] {
  const counts = new Map(AGE_BUCKETS.map(([, , label]) => [label, 0]));
  for (const l of leads) {
    if (l.age == null) continue;
    const bucket = AGE_BUCKETS.find(([min, max]) => l.age! >= min && l.age! < max);
    if (bucket) counts.set(bucket[2], (counts.get(bucket[2]) ?? 0) + 1);
  }
  return AGE_BUCKETS.map(([, , label]) => ({ label, value: counts.get(label) ?? 0 }));
}

export function getOpportunityStages(leads: Lead[]): Bucket[] {
  return sortDesc(
    countBy(leads.filter((l) => l.opportunityStage != null), (l) => l.opportunityStage)
  );
}
