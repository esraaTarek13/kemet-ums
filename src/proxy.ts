import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

const ROLE_HOME: Record<string, string> = {
  student: "/student/dashboard",
  faculty: "/faculty/dashboard",
  admin: "/admin/dashboard",
  super_admin: "/super-admin/dashboard",
};

const PROTECTED_PORTALS = [
  { prefix: "/student", role: "student" },
  { prefix: "/faculty", role: "faculty" },
  { prefix: "/admin", role: "admin" },
  { prefix: "/super-admin", role: "super_admin" },
] as const;

const PUBLIC_ROUTES = [
  "/login",
  "/register",
  "/forgot-password",
  "/verify-otp",
  "/reset-password",
];

const RESET_FLOW_ROUTES = ["/verify-otp", "/reset-password"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  let response = NextResponse.next({ request });

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

  if (!user) {
    if (isPublicRoute) return response;
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(loginUrl);
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  const userRole: string = profile?.role ?? "";

  if (!userRole) {
    if (isPublicRoute) return response;
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const home = ROLE_HOME[userRole] ?? "/login";

  const isResetVerified =
    request.cookies.get("password-reset-verified")?.value === "true";

  if (isPublicRoute || pathname === "/") {
    if (
      isResetVerified &&
      RESET_FLOW_ROUTES.some((r) => pathname.startsWith(r))
    ) {
      return response;
    }
    return NextResponse.redirect(new URL(home, request.url));
  }

  const matchedPortal = PROTECTED_PORTALS.find(({ prefix }) =>
    pathname.startsWith(prefix),
  );

  if (matchedPortal && userRole !== matchedPortal.role) {
    return NextResponse.redirect(new URL(home, request.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
