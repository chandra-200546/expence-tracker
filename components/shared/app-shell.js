import Link from "next/link";
import { BarChart3 } from "lucide-react";

export function AppShell({ title, description, action, children }) {
  return (
    <main className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="panel p-6 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-brand-400">
                <BarChart3 className="h-4 w-4" />
                Spendly
              </Link>
              <h1 className="mt-4 font-[var(--font-space-grotesk)] text-4xl font-bold tracking-tight text-white">
                {title}
              </h1>
              <p className="mt-3 max-w-2xl text-sm text-slate-400 sm:text-base">{description}</p>
            </div>
            {action}
          </div>
        </header>
        {children}
      </div>
    </main>
  );
}
