import Link from "next/link";
import { AuthForm } from "@/components/auth/auth-form";

export const metadata = {
  title: "Sign Up | Spendly"
};

export default async function SignupPage() {
  return (
    <main className="min-h-screen px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-6xl gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <section className="panel flex items-center p-6 sm:p-8">
          <div className="w-full">
            <div className="mb-8">
              <h1 className="font-[var(--font-space-grotesk)] text-3xl font-bold text-white">
                Create your account
              </h1>
              <p className="mt-2 text-sm text-slate-400">
                Start tracking expenses with secure authentication and a polished dashboard.
              </p>
            </div>
            <AuthForm mode="signup" />
            <p className="mt-6 text-sm text-slate-400">
              Already have an account?{" "}
              <Link href="/login" className="font-semibold text-brand-500 hover:text-brand-400">
                Sign in
              </Link>
            </p>
          </div>
        </section>

        <section className="panel relative overflow-hidden p-8 sm:p-10">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-500/10 via-transparent to-sky-400/10" />
          <div className="relative">
            <span className="inline-flex rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-sky-300">
              Personal Finance
            </span>
            <h2 className="mt-6 max-w-xl font-[var(--font-space-grotesk)] text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Replace messy notes and spreadsheets with one focused command center.
            </h2>
            <div className="mt-10 grid gap-4">
              {[
                "One secure login experience across your whole expense workflow.",
                "Mobile-friendly dashboard for quick review while traveling.",
                "Category insights and monthly trends ready from day one."
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-slate-800 bg-slate-950/40 p-5 text-slate-300">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
