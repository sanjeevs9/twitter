import Link from "next/link";
import { getLeads } from "@/lib/data";
import {
  getAgeDistribution,
  getCapitalAvailable,
  getDayToDay,
  getFrustration,
  getFunnel,
  getKpis,
  getLeadGrades,
  getLeadSources,
  getLeadsOverTime,
  getMonthlyIncome,
  getOpportunityStages,
  getPaymentTypes,
  getProfessions,
  getProgramRevenue,
  getTopCampaigns,
  getWantsMost,
} from "@/lib/aggregate";
import { StatTile } from "@/components/StatTile";
import { Section } from "@/components/Section";
import { HBarChart } from "@/components/charts/HBarChart";
import { TrendLine } from "@/components/charts/TrendLine";
import { ColumnChart } from "@/components/charts/ColumnChart";
import { Funnel } from "@/components/charts/Funnel";
import { formatCompactCurrency, formatPercent } from "@/lib/format";

export default function Home() {
  const leads = getLeads();
  const kpis = getKpis(leads);
  const dates = getLeadsOverTime(leads).map((b) => b.label);
  const dateRange =
    dates.length > 0
      ? `${new Date(dates[0]).toLocaleDateString(undefined, {
          month: "short",
          day: "numeric",
        })} – ${new Date(dates[dates.length - 1]).toLocaleDateString(undefined, {
          month: "short",
          day: "numeric",
        })}`
      : "";

  const programRevenue = getProgramRevenue(leads);
  const paymentTypes = getPaymentTypes(leads);
  const opportunityStages = getOpportunityStages(leads);

  return (
    <div className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Webinar Lead & Sales Dashboard
          </h1>
          <p className="mt-1 text-sm text-[var(--text-muted)]">
            {leads.length.toLocaleString()} leads captured {dateRange && `· ${dateRange}`}
          </p>
        </div>
        <Link
          href="/leads"
          className="rounded-md border border-[var(--border)] bg-[var(--card)] px-3 py-1.5 text-sm font-medium hover:opacity-80"
        >
          Browse leads →
        </Link>
      </header>

      {/* KPI row */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        <StatTile label="Total leads" value={kpis.totalLeads.toLocaleString()} />
        <StatTile
          label="Booked a call"
          value={kpis.bookedCalls.toLocaleString()}
          sublabel={`${formatPercent(kpis.bookedRate)} of leads`}
        />
        <StatTile
          label="Closed deals"
          value={kpis.closedDeals.toLocaleString()}
          sublabel={`${formatPercent(kpis.closeRate)} of booked calls`}
        />
        <StatTile
          label="Cash collected"
          value={formatCompactCurrency(kpis.cashCollected)}
        />
        <StatTile label="Avg lead score" value={kpis.avgLeadScore.toFixed(1)} />
      </div>

      {/* Trend */}
      <div className="mt-4">
        <Section title="Leads captured over time">
          <TrendLine data={getLeadsOverTime(leads)} />
        </Section>
      </div>

      {/* Funnel + sources + grades */}
      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Section title="Conversion funnel">
          <Funnel data={getFunnel(leads)} />
        </Section>
        <Section title="Lead source">
          <HBarChart data={getLeadSources(leads)} />
        </Section>
        <Section title="Lead grade" subtitle="A = highest quality, D = lowest">
          <HBarChart data={getLeadGrades(leads)} />
        </Section>
      </div>

      {/* Campaigns */}
      <div className="mt-4">
        <Section title="Top campaigns by leads" subtitle="Top 8 UTM campaigns">
          <HBarChart data={getTopCampaigns(leads)} />
        </Section>
      </div>

      {/* Revenue */}
      {programRevenue.length > 0 && (
        <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Section title="Revenue by program">
            <HBarChart data={programRevenue} valueFormat="currency" />
          </Section>
          <Section title="Payment type">
            <HBarChart data={paymentTypes} />
          </Section>
          <Section title="Opportunity stage" subtitle="Leads currently in CRM">
            <HBarChart data={opportunityStages} />
          </Section>
        </div>
      )}

      {/* Demographics */}
      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Section title="Current profession">
          <HBarChart data={getProfessions(leads)} />
        </Section>
        <Section title="Monthly income (before tax)">
          <HBarChart data={getMonthlyIncome(leads)} />
        </Section>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Section title="Day-to-day situation">
          <HBarChart data={getDayToDay(leads)} />
        </Section>
        <Section title="Capital available in next 30 days">
          <HBarChart data={getCapitalAvailable(leads)} />
        </Section>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Section title="Age distribution">
          <ColumnChart data={getAgeDistribution(leads)} />
        </Section>
        <Section title="What they want most">
          <HBarChart data={getWantsMost(leads)} />
        </Section>
      </div>

      <div className="mt-4 mb-8">
        <Section title="What frustrates them most">
          <HBarChart data={getFrustration(leads)} />
        </Section>
      </div>
    </div>
  );
}
