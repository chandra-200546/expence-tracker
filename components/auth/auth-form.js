"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, LoaderCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export function AuthForm({ mode }) {
  const isLogin = mode === "login";
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");
    setMessage("");

    startTransition(async () => {
      const supabase = createClient();
      const action = isLogin
        ? supabase.auth.signInWithPassword({
            email: formData.email,
            password: formData.password
          })
        : supabase.auth.signUp({
            email: formData.email,
            password: formData.password
          });

      const { data, error: authError } = await action;

      if (authError) {
        setError(authError.message);
        return;
      }

      if (!isLogin && !data.session) {
        setMessage("Account created. Check your email to confirm your signup before logging in.");
        return;
      }

      router.push("/dashboard");
      router.refresh();
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="email" className="label">
          Email address
        </label>
        <input
          id="email"
          type="email"
          required
          autoComplete="email"
          className="input"
          placeholder="you@example.com"
          value={formData.email}
          onChange={(event) => setFormData((current) => ({ ...current, email: event.target.value }))}
        />
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <label htmlFor="password" className="label mb-0">
            Password
          </label>
          {isLogin ? (
            <span className="text-xs text-slate-500">Use at least 6 characters.</span>
          ) : null}
        </div>
        <input
          id="password"
          type="password"
          required
          minLength={6}
          autoComplete={isLogin ? "current-password" : "new-password"}
          className="input"
          placeholder="Enter your password"
          value={formData.password}
          onChange={(event) =>
            setFormData((current) => ({ ...current, password: event.target.value }))
          }
        />
      </div>

      {error ? (
        <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          <div className="flex items-start gap-2">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        </div>
      ) : null}

      {message ? (
        <div className="rounded-2xl border border-brand-500/30 bg-brand-500/10 px-4 py-3 text-sm text-brand-100">
          {message}
        </div>
      ) : null}

      <button type="submit" disabled={isPending} className="button-primary w-full">
        {isPending ? <LoaderCircle className="mr-2 h-4 w-4 animate-spin" /> : null}
        {isLogin ? "Log In" : "Create Account"}
      </button>

      <p className="text-xs text-slate-500">
        By continuing, you agree to manage only your own data with secure Supabase authentication.
      </p>

      {!isLogin ? (
        <p className="text-sm text-slate-400">
          Looking for the sign-in page?{" "}
          <Link href="/login" className="font-semibold text-brand-500 hover:text-brand-400">
            Go to login
          </Link>
        </p>
      ) : null}
    </form>
  );
}
