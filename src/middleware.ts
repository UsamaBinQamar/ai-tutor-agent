import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    // Detailed session logging
    console.log("🚀 ~ middleware ~ session:", session);
    console.log("👤 ~ user metadata:", session?.user?.user_metadata);
    console.log("🎭 ~ user role:", session?.user?.user_metadata?.role);
    console.log("📧 ~ user email:", session?.user?.email);

    const userRole = session?.user?.user_metadata?.role;

    // Protected routes with role-based access
    if (req.nextUrl.pathname.startsWith("/dashboard")) {
      // Only admin can access dashboard
      if (!session || userRole !== "admin") {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }

    if (req.nextUrl.pathname.startsWith("/prompt")) {
      // Only regular users can access prompt
      if (!session || userRole !== "user") {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }

    // Auth routes (login, signup, forgot-password)
    if (
      ["/login", "/signup", "/forgot-password"].includes(req.nextUrl.pathname)
    ) {
      if (session) {
        // Redirect based on user role
        if (userRole === "admin") {
          return NextResponse.redirect(new URL("/dashboard", req.url));
        } else {
          return NextResponse.redirect(new URL("/", req.url));
        }
      }
    }

    return res;
  } catch (error) {
    console.error("Middleware error:", error);
    return res;
  }
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/prompt/:path*",
    "/login",
    "/signup",
    "/forgot-password",
  ],
};
