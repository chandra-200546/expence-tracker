"use client";

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { formatCurrency } from "@/lib/utils";

export function ExpenseChart({ data }) {
  return (
    <section className="panel relative overflow-hidden p-6">
      <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-brand-500/10 blur-3xl" />
      <div className="mb-6">
        <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Monthly Overview</p>
        <h2 className="mt-2 font-[var(--font-space-grotesk)] text-2xl font-bold text-white">
          Spending trend
        </h2>
        <p className="mt-2 text-sm text-slate-400">
          Use this chart to spot heavier months and adjust your upcoming budget.
        </p>
      </div>

      <div className="relative h-80 rounded-[24px] border border-white/6 bg-slate-950/35 p-3">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="expenseFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4ADE80" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#4ADE80" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.12)" />
            <XAxis dataKey="month" tick={{ fill: "#94A3B8", fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis
              tick={{ fill: "#94A3B8", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => `Rs ${value}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(15, 23, 42, 0.92)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "18px",
                color: "#F8FAFC"
              }}
              formatter={(value) => formatCurrency(value)}
            />
            <Area
              type="monotone"
              dataKey="total"
              stroke="#4ADE80"
              strokeWidth={3}
              fill="url(#expenseFill)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
