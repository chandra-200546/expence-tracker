import { AppShell } from "@/components/shared/app-shell";

export default function AddExpenseLoading() {
  return (
    <AppShell title="Add an expense" description="Preparing the form...">
      <div className="mx-auto max-w-2xl panel h-[28rem] animate-pulse bg-surface-900/60" />
    </AppShell>
  );
}
