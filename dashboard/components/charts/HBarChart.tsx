"use client";

import {
  Bar,
  BarChart,
  Cell,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { Bucket } from "@/lib/aggregate";
import { formatCompactCurrency } from "@/lib/format";

type HBarChartProps = {
  data: Bucket[];
  colors?: string[];
  valueFormat?: "number" | "currency";
  height?: number;
};

export function HBarChart({
  data,
  colors,
  valueFormat = "number",
  height,
}: HBarChartProps) {
  const formatValue = (v: number) =>
    valueFormat === "currency" ? formatCompactCurrency(v) : v.toLocaleString();
  const rowHeight = 34;
  const chartHeight = height ?? Math.max(data.length * rowHeight + 16, 80);
  const maxLabelChars = Math.min(
    Math.max(...data.map((d) => d.label.length), 8),
    28
  );

  return (
    <ResponsiveContainer width="100%" height={chartHeight}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 4, right: 44, bottom: 4, left: 4 }}
        barCategoryGap={6}
      >
        <XAxis type="number" hide />
        <YAxis
          type="category"
          dataKey="label"
          width={maxLabelChars * 6.5 + 8}
          tickLine={false}
          axisLine={false}
          tick={{ fill: "var(--text-secondary)", fontSize: 12 }}
          tickFormatter={(label: string) =>
            label.length > 30 ? `${label.slice(0, 29)}…` : label
          }
        />
        <Tooltip
          cursor={{ fill: "var(--grid-line)", opacity: 0.4 }}
          formatter={(value) => [formatValue(Number(value)), "Leads"]}
          contentStyle={{
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: 8,
            fontSize: 12,
          }}
          labelStyle={{ color: "var(--foreground)", fontWeight: 600 }}
          itemStyle={{ color: "var(--text-secondary)" }}
        />
        <Bar
          dataKey="value"
          radius={[0, 4, 4, 0]}
          maxBarSize={24}
          isAnimationActive={false}
        >
          {data.map((entry, i) => (
            <Cell
              key={entry.label}
              fill={colors ? colors[i % colors.length] : "var(--chart-blue)"}
            />
          ))}
          <LabelList
            dataKey="value"
            position="right"
            zIndex={0}
            formatter={(v: unknown) => formatValue(Number(v))}
            style={{ fill: "var(--text-secondary)", fontSize: 12 }}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
