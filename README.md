# Expense Tracker SaaS

A production-ready expense tracker built with Next.js App Router, Tailwind CSS, and Supabase Auth/PostgreSQL.

## Features

- Email/password signup and login with Supabase Auth
- Protected dashboard with persistent sessions
- Expense CRUD with Row Level Security
- Monthly spending chart
- Responsive dark UI with reusable components

## Tech Stack

- Next.js 15
- React 19
- Tailwind CSS
- Supabase Auth + PostgreSQL
- Recharts

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy the environment file:

   ```bash
   copy .env.example .env.local
   ```

3. Add your Supabase project values to `.env.local`.

4. Run the SQL in [`supabase/schema.sql`](./supabase/schema.sql) inside the Supabase SQL editor.

5. Start the app:

   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

## Folder Structure

```text
app/
components/
hooks/
lib/
services/
supabase/
```

## Production Notes

- RLS policies ensure users can only access their own expenses.
- Middleware keeps auth sessions fresh and protects private routes.
- Public keys are read from environment variables, and signup uses the server-side service role key to create confirmed users without requiring email confirmation.
