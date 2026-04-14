import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request) {
  return updateSession(request);
}

export const config = {
  matcher: ["/dashboard/:path*", "/add-expense/:path*", "/edit-expense/:path*", "/login", "/signup"]
};
