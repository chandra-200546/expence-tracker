import { notFound } from "next/navigation";
import { ExpenseForm } from "@/components/expenses/expense-form";
import { AppShell } from "@/components/shared/app-shell";
import { getUserOrRedirect } from "@/lib/auth";
import { getExpenseById } from "@/services/expense-service";

export const metadata = {
  title: "Edit Expense | Spendly"
};

export default async function EditExpensePage({ params }) {
  const user = await getUserOrRedirect();
  const expense = await getExpenseById(params.id, user.id);

  if (!expense) {
    notFound();
  }

  return (
    <AppShell
      title="Edit expense"
      description="Update the amount, category, or note without losing the original timeline."
    >
      <div className="mx-auto max-w-2xl">
        <ExpenseForm mode="edit" initialData={expense} />
      </div>
    </AppShell>
  );
}
