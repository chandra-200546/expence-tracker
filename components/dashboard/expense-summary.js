import { IndianRupee, ReceiptText, Wallet } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export function ExpenseSummary({ expenses, totalExpenses, userEmail }) {
  const latestExpense = expenses[0];
  const categoriesCount = new Set(expenses.map((expense) => expense.category)).size;
  const averageExpense = expenses.length ? totalExpenses / expenses.length : 0;

  const cards = [
    {
      label: "Total spent",
      value: formatCurrency(totalExpenses),
      icon: Wallet,
      description: "Combined amount across all recorded expenses.",
      eyebrow: "Portfolio"
    },
    {
      label: "Average ticket",
      value: formatCurrency(averageExpense),
      icon: ReceiptText,
      description: `${expenses.length} tracked transaction${expenses.length === 1 ? "" : "s"} across your workspace.`,
      eyebrow: "Velocity"
    },
    {
      label: "Active categories",
      value: categoriesCount.toString(),
      icon: IndianRupee,
      description: latestExpense
        ? `Latest entry by ${userEmail} in ${latestExpense.category}.`
        : "Start by adding your first expense.",
      eyebrow: "Coverage"
    }
  ];

  return (
    <section className="grid gap-6 lg:grid-cols-3">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <article key={card.label} className="panel relative overflow-hidden p-6">
            <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-white/5 blur-2xl" />
            <div className="relative flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">{card.eyebrow}</p>
                <p className="mt-4 text-sm text-slate-400">{card.label}</p>
                <h2 className="mt-3 font-[var(--font-space-grotesk)] text-3xl font-bold text-white sm:text-4xl">
                  {card.value}
                </h2>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-3 text-brand-300">
                <Icon className="h-5 w-5" />
              </div>
            </div>
            <p className="relative mt-8 text-sm leading-6 text-slate-400">{card.description}</p>
          </article>
        );
      })}
    </section>
  );
}
