import Link from "next/link";
import { ArrowUpRight, BarChart3, Sparkles } from "lucide-react";

export function AppShell({ title, description, action, children }) {
  return (
    <main className="dashboard-grid min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="panel relative isolate overflow-hidden p-6 sm:p-8">
          <div className="glass-orb -left-10 top-6 h-28 w-28 bg-brand-500/20" />
          <div className="glass-orb right-10 top-10 h-24 w-24 bg-sky-400/20" />
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-brand-300"
                >
                  <BarChart3 className="h-4 w-4" />
                  Spendly
                </Link>
                <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-amber-200">
                  <Sparkles className="h-3.5 w-3.5" />
                  Premium overview
                </span>
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.3em] text-slate-500">
                <span>Finance cockpit</span>
                <span className="h-1 w-1 rounded-full bg-slate-600" />
                <span>Live insights</span>
                <span className="h-1 w-1 rounded-full bg-slate-600" />
                <span>Secure sync</span>
              </div>
              <h1 className="mt-5 max-w-3xl font-[var(--font-space-grotesk)] text-4xl font-bold tracking-tight text-white sm:text-5xl">
                {title}
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">{description}</p>
            </div>
            <div className="relative z-10 flex flex-col items-start gap-4 lg:items-end">
              <div className="rounded-3xl border border-white/10 bg-slate-950/40 px-5 py-4">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Performance</p>
                <div className="mt-3 flex items-center gap-3">
                  <div className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_18px_rgba(74,222,128,0.7)]" />
                  <p className="text-sm font-medium text-white">Your workspace is synced and ready.</p>
                </div>
                <p className="mt-2 inline-flex items-center gap-2 text-sm text-slate-400">
                  Review trends, manage entries, and stay on top of every transaction.
                  <ArrowUpRight className="h-4 w-4" />
                </p>
              </div>
              <div className="relative z-10">{action}</div>
            </div>
          </div>
        </header>
        {children}
      </div>
    </main>
  );
}
