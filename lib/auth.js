import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function getOptionalUser() {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  return user ?? null;
}

export async function getUserOrRedirect() {
  const user = await getOptionalUser();

  if (!user) {
    redirect("/login");
  }

  return user;
}
