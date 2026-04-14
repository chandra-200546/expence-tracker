import { AppShell } from "@/components/shared/app-shell";

export default function DashboardLoading() {
  return (
    <AppShell title="Expense dashboard" description="Loading your financial overview...">
      <div className="grid gap-6 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="panel h-32 animate-pulse bg-surface-900/60" />
        ))}
      </div>
      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="panel h-[28rem] animate-pulse bg-surface-900/60" />
        <div className="panel h-[28rem] animate-pulse bg-surface-900/60" />
      </div>
    </AppShell>
  );
}
