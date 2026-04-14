import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="panel max-w-lg p-10 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-500">404</p>
        <h1 className="mt-4 font-[var(--font-space-grotesk)] text-3xl font-bold text-white">
          We could not find that expense.
        </h1>
        <p className="mt-3 text-sm text-slate-400">
          The item may have been deleted or the link may no longer be valid.
        </p>
        <Link href="/dashboard" className="button-primary mt-8">
          Back to dashboard
        </Link>
      </div>
    </main>
  );
}
