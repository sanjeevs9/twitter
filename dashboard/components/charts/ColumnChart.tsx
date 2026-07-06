"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { Bucket } from "@/lib/aggregate";

export function ColumnChart({ data }: { data: Bucket[] }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} margin={{ top: 16, right: 8, bottom: 0, left: 0 }}>
        <CartesianGrid vertical={false} stroke="var(--grid-line)" />
        <XAxis
          dataKey="label"
          tickLine={false}
          axisLine={{ stroke: "var(--axis-line)" }}
          tick={{ fill: "var(--text-secondary)", fontSize: 12 }}
        />
        <YAxis hide />
        <Tooltip
          formatter={(value) => [Number(value).toLocaleString(), "Leads"]}
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
          fill="var(--chart-blue)"
          radius={[4, 4, 0, 0]}
          maxBarSize={40}
          isAnimationActive={false}
        >
          <LabelList
            dataKey="value"
            position="top"
            zIndex={0}
            style={{ fill: "var(--text-secondary)", fontSize: 12 }}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
