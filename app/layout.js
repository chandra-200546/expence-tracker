import "./globals.css";
import { SupabaseAuthProvider } from "@/components/providers/supabase-auth-provider";

export const metadata = {
  title: "Spendly | Expense Tracker",
  description: "Track, analyze, and manage personal expenses with Supabase-powered security."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-[var(--font-manrope)]">
        <SupabaseAuthProvider>{children}</SupabaseAuthProvider>
      </body>
    </html>
  );
}
