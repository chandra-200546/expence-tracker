import { ExpenseForm } from "@/components/expenses/expense-form";
import { AppShell } from "@/components/shared/app-shell";
import { getUserOrRedirect } from "@/lib/auth";

export const metadata = {
  title: "Add Expense | Spendly"
};

export default async function AddExpensePage() {
  await getUserOrRedirect();

  return (
    <AppShell
      title="Add an expense"
      description="Capture the amount, category, and context while it is still fresh."
    >
      <div className="mx-auto max-w-2xl">
        <ExpenseForm mode="create" />
      </div>
    </AppShell>
  );
}
