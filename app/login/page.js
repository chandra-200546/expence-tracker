import Link from "next/link";
import { redirect } from "next/navigation";
import { AuthForm } from "@/components/auth/auth-form";
import { getOptionalUser } from "@/lib/auth";

export const metadata = {
  title: "Login | Spendly"
};

export default async function LoginPage() {
  const user = await getOptionalUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <main className="min-h-screen px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-6xl gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="panel relative overflow-hidden p-8 sm:p-10">
          <div className="absolute inset-0 bg-hero-grid bg-[size:100%_100%,36px_36px,36px_36px] opacity-40" />
          <div className="relative">
            <span className="inline-flex rounded-full border border-brand-500/30 bg-brand-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-brand-500">
              Spendly
            </span>
            <h1 className="mt-6 max-w-xl font-[var(--font-space-grotesk)] text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Take control of every rupee with a dashboard that feels premium.
            </h1>
            <p className="mt-4 max-w-lg text-base text-slate-300 sm:text-lg">
              Secure auth, instant expense insights, clean monthly trends, and a workflow built
              for everyday financial discipline.
            </p>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                { label: "Active Security", value: "Supabase Auth" },
                { label: "Monthly Trends", value: "Live Charting" },
                { label: "Fast Workflow", value: "Add in Seconds" }
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4">
                  <p className="text-sm text-slate-400">{item.label}</p>
                  <p className="mt-2 text-lg font-semibold text-white">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="panel flex items-center p-6 sm:p-8">
          <div className="w-full">
            <div className="mb-8">
              <h2 className="font-[var(--font-space-grotesk)] text-3xl font-bold text-white">
                Welcome back
              </h2>
              <p className="mt-2 text-sm text-slate-400">
                Log in to manage your expenses, charts, and categories.
              </p>
            </div>
            <AuthForm mode="login" />
            <p className="mt-6 text-sm text-slate-400">
              New here?{" "}
              <Link href="/signup" className="font-semibold text-brand-500 hover:text-brand-400">
                Create an account
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
