"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import { EXPENSE_CATEGORIES } from "@/lib/constants";
import { createClient } from "@/lib/supabase/client";

export function ExpenseForm({ mode, initialData }) {
  const router = useRouter();
  const isEdit = mode === "edit";
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    amount: initialData?.amount ?? "",
    category: initialData?.category ?? EXPENSE_CATEGORIES[0],
    note: initialData?.note ?? ""
  });

  const heading = {
    title: isEdit ? "Update expense" : "New expense",
    description: isEdit
      ? "Adjust the record and keep your dashboard accurate."
      : "Fill in the details below and this expense will appear instantly in your dashboard."
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    startTransition(async () => {
      const supabase = createClient();
      const payload = {
        amount: Number(formData.amount),
        category: formData.category,
        note: formData.note.trim()
      };

      if (Number.isNaN(payload.amount) || payload.amount <= 0) {
        setError("Amount must be a number greater than zero.");
        return;
      }

      const query = isEdit
        ? supabase.from("expenses").update(payload).eq("id", initialData.id)
        : supabase.from("expenses").insert(payload);

      const { error: saveError } = await query;

      if (saveError) {
        setError(saveError.message);
        return;
      }

      router.push("/dashboard");
      router.refresh();
    });
  };

  return (
    <section className="panel p-6 sm:p-8">
      <div className="mb-8">
        <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Expense Form</p>
        <h2 className="mt-2 font-[var(--font-space-grotesk)] text-3xl font-bold text-white">
          {heading.title}
        </h2>
        <p className="mt-2 text-sm text-slate-400">{heading.description}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="amount" className="label">
            Amount
          </label>
          <input
            id="amount"
            type="number"
            min="0.01"
            step="0.01"
            required
            className="input"
            placeholder="250.00"
            value={formData.amount}
            onChange={(event) => setFormData((current) => ({ ...current, amount: event.target.value }))}
          />
        </div>

        <div>
          <label htmlFor="category" className="label">
            Category
          </label>
          <select
            id="category"
            required
            className="input"
            value={formData.category}
            onChange={(event) =>
              setFormData((current) => ({ ...current, category: event.target.value }))
            }
          >
            {EXPENSE_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="note" className="label">
            Note
          </label>
          <textarea
            id="note"
            rows={5}
            className="input resize-none"
            placeholder="Dinner with clients, bus fare, electricity bill..."
            value={formData.note}
            onChange={(event) => setFormData((current) => ({ ...current, note: event.target.value }))}
          />
        </div>

        {error ? (
          <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {error}
          </div>
        ) : null}

        <div className="flex flex-col gap-3 sm:flex-row">
          <button type="submit" disabled={isPending} className="button-primary">
            {isPending ? <LoaderCircle className="mr-2 h-4 w-4 animate-spin" /> : null}
            {isEdit ? "Save changes" : "Add expense"}
          </button>
          <Link href="/dashboard" className="button-secondary">
            Cancel
          </Link>
        </div>
      </form>
    </section>
  );
}
