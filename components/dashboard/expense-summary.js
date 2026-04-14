import { IndianRupee, ReceiptText, Wallet } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export function ExpenseSummary({ expenses, totalExpenses, userEmail }) {
  const latestExpense = expenses[0];
  const categoriesCount = new Set(expenses.map((expense) => expense.category)).size;

  const cards = [
    {
      label: "Total spent",
      value: formatCurrency(totalExpenses),
      icon: Wallet,
      description: "Combined amount across all recorded expenses."
    },
    {
      label: "Transactions",
      value: expenses.length.toString(),
      icon: ReceiptText,
      description: "Every personal expense stored in your account."
    },
    {
      label: "Active categories",
      value: categoriesCount.toString(),
      icon: IndianRupee,
      description: latestExpense
        ? `Latest entry by ${userEmail} in ${latestExpense.category}.`
        : "Start by adding your first expense."
    }
  ];

  return (
    <section className="grid gap-6 lg:grid-cols-3">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <article key={card.label} className="panel p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm text-slate-400">{card.label}</p>
                <h2 className="mt-3 font-[var(--font-space-grotesk)] text-3xl font-bold text-white">
                  {card.value}
                </h2>
              </div>
              <div className="rounded-2xl border border-brand-500/20 bg-brand-500/10 p-3 text-brand-400">
                <Icon className="h-5 w-5" />
              </div>
            </div>
            <p className="mt-4 text-sm text-slate-400">{card.description}</p>
          </article>
        );
      })}
    </section>
  );
}
