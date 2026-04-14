import { AppShell } from "@/components/shared/app-shell";

export default function EditExpenseLoading() {
  return (
    <AppShell title="Edit expense" description="Loading the latest transaction details...">
      <div className="mx-auto max-w-2xl panel h-[28rem] animate-pulse bg-surface-900/60" />
    </AppShell>
  );
}
