import { ExpenseChart } from "@/components/dashboard/expense-chart";
import { DashboardActions } from "@/components/dashboard/dashboard-actions";
import { ExpenseList } from "@/components/dashboard/expense-list";
import { ExpenseSummary } from "@/components/dashboard/expense-summary";
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
      action={<DashboardActions />}
    >
      <ExpenseSummary expenses={expenses} totalExpenses={totalExpenses} userEmail={user.email} />
      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <ExpenseList expenses={expenses} />
        <ExpenseChart data={monthlyData} />
      </div>
    </AppShell>
  );
}
