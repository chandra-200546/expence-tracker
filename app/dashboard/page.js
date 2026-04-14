import Link from "next/link";
import { Plus } from "lucide-react";
import { ExpenseChart } from "@/components/dashboard/expense-chart";
import { ExpenseList } from "@/components/dashboard/expense-list";
import { ExpenseSummary } from "@/components/dashboard/expense-summary";
import { LogoutButton } from "@/components/dashboard/logout-button";
import { AppShell } from "@/components/shared/app-shell";
import { getUserOrRedirect } from "@/lib/auth";
import { buildMonthlyExpenseData } from "@/lib/utils";
import { getExpensesForUser } from "@/services/expense-service";

export const metadata = {
  title: "Dashboard | Spendly"
};

export default async function DashboardPage() {
  const user = await getUserOrRedirect();
  const expenses = await getExpensesForUser(user.id);
  const totalExpenses = expenses.reduce((sum, expense) => sum + Number(expense.amount), 0);
  const monthlyData = buildMonthlyExpenseData(expenses);

  return (
    <AppShell
      title="Expense dashboard"
      description="Monitor total spending, review transactions, and act fast on any category."
      action={
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href="/add-expense" className="button-primary">
            <Plus className="mr-2 h-4 w-4" />
            Add Expense
          </Link>
          <LogoutButton />
        </div>
      }
    >
      <ExpenseSummary expenses={expenses} totalExpenses={totalExpenses} userEmail={user.email} />
      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <ExpenseList expenses={expenses} />
        <ExpenseChart data={monthlyData} />
      </div>
    </AppShell>
  );
}
