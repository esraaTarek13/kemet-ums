import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

// Role → dashboard route
const ROLE_HOME: Record<string, string> = {
  student: "/student/dashboard",
  faculty: "/faculty/dashboard",
  admin: "/admin/dashboard",
  super_admin: "/super-admin/dashboard",
};

// Protected portal prefixes with their required role
const PROTECTED_PORTALS = [
  { prefix: "/student", role: "student" },
  { prefix: "/faculty", role: "faculty" },
  { prefix: "/admin", role: "admin" },
  { prefix: "/super-admin", role: "super_admin" },
] as const;

// No auth needed for these
const PUBLIC_ROUTES = [
  "/login",
  "/register",
  "/forgot-password",
  "/verify-otp",
  "/reset-password",
];

// Allowed mid-reset even if authenticated
const RESET_FLOW_ROUTES = ["/verify-otp", "/reset-password"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  let response = NextResponse.next({ request });

  // Sync cookies between request and response
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isPublicRoute = PUBLIC_ROUTES.some((r) => pathname.startsWith(r));

  // Not logged in → allow public, redirect others to login
  if (!user) {
    if (isPublicRoute) return response;
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Get user role
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  const userRole: string = profile?.role ?? "";

  // No role → kick to login
  if (!userRole) {
    if (isPublicRoute) return response;
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const home = ROLE_HOME[userRole] ?? "/login";

  const isResetVerified =
    request.cookies.get("password-reset-verified")?.value === "true";

  // Logged-in users shouldn't be on public routes or "/"
  if (isPublicRoute || pathname === "/") {
    if (
      isResetVerified &&
      RESET_FLOW_ROUTES.some((r) => pathname.startsWith(r))
    ) {
      return response; // Mid-reset, let them through
    }
    return NextResponse.redirect(new URL(home, request.url));
  }

  // Wrong role for this portal → redirect to their home
  const matchedPortal = PROTECTED_PORTALS.find(({ prefix }) =>
    pathname.startsWith(prefix),
  );

  if (matchedPortal && userRole !== matchedPortal.role) {
    return NextResponse.redirect(new URL(home, request.url));
  }

  return response;
}

// Skip static files
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
