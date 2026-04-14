"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircle, LogOut, Plus } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export function DashboardActions() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const handleAddExpense = () => {
    router.push("/add-expense");
  };

  const handleLogout = () => {
    setIsPending(true);

    (async () => {
      const supabase = createClient();
      await supabase.auth.signOut({ scope: "local" });
      router.replace("/login");
    })().catch(() => {
      setIsPending(false);
    });
  };

  return (
    <div className="relative z-20 flex flex-col gap-3 sm:flex-row sm:items-center">
      <button
        type="button"
        onClick={handleAddExpense}
        className="button-primary pointer-events-auto"
      >
        <Plus className="mr-2 h-4 w-4" />
        Add Expense
      </button>
      <button
        type="button"
        onClick={handleLogout}
        disabled={isPending}
        className="button-secondary pointer-events-auto"
      >
        {isPending ? (
          <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <LogOut className="mr-2 h-4 w-4" />
        )}
        Logout
      </button>
    </div>
  );
}
