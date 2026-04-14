"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { PencilLine, Trash2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { formatCurrency, formatExpenseDate } from "@/lib/utils";

export function ExpenseList({ expenses }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState("");

  const handleDelete = (expenseId) => {
    setError("");
    setDeletingId(expenseId);

    startTransition(async () => {
      const supabase = createClient();
      const { error: deleteError } = await supabase.from("expenses").delete().eq("id", expenseId);

      if (deleteError) {
        setError(deleteError.message);
        setDeletingId("");
        return;
      }

      setDeletingId("");
      router.refresh();
    });
  };

  return (
    <section className="panel p-6">
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Transactions</p>
          <h2 className="mt-2 font-[var(--font-space-grotesk)] text-2xl font-bold text-white">
            Latest expenses
          </h2>
        </div>
        <Link href="/add-expense" className="button-secondary">
          Add another
        </Link>
      </div>

      {error ? (
        <div className="mb-4 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {error}
        </div>
      ) : null}

      {expenses.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-700 bg-slate-950/30 p-10 text-center">
          <h3 className="text-lg font-semibold text-white">No expenses yet</h3>
          <p className="mt-2 text-sm text-slate-400">
            Add your first expense to unlock totals, charts, and a clean running history.
          </p>
          <Link href="/add-expense" className="button-primary mt-6">
            Add your first expense
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {expenses.map((expense) => (
            <article
              key={expense.id}
              className="rounded-3xl border border-slate-800 bg-slate-950/40 p-5 transition hover:border-slate-700"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full border border-brand-500/20 bg-brand-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-brand-400">
                      {expense.category}
                    </span>
                    <span className="text-sm text-slate-500">{formatExpenseDate(expense.created_at)}</span>
                  </div>
                  <h3 className="mt-4 text-2xl font-bold text-white">{formatCurrency(expense.amount)}</h3>
                  <p className="mt-2 text-sm text-slate-400">
                    {expense.note || "No note added for this expense."}
                  </p>
                </div>

                <div className="flex gap-3">
                  <Link href={`/edit-expense/${expense.id}`} className="button-secondary">
                    <PencilLine className="mr-2 h-4 w-4" />
                    Edit
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleDelete(expense.id)}
                    disabled={isPending && deletingId === expense.id}
                    className="inline-flex items-center justify-center rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-100 transition hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    {isPending && deletingId === expense.id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
