"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, LoaderCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export function LogoutButton() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

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
    <button type="button" onClick={handleLogout} disabled={isPending} className="button-secondary">
      {isPending ? <LoaderCircle className="mr-2 h-4 w-4 animate-spin" /> : <LogOut className="mr-2 h-4 w-4" />}
      Logout
    </button>
  );
}
