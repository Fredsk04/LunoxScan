import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicPaths = ["/", "/auth", "/manga", "/premium", "/novels", "/originals", "/community", "/api/public"];
const ipRequests: Record<string, number[]> = {};
const MAX_REQUESTS = 30;
const WINDOW_MS = 30_000;

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Rate limiter
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
  ipRequests[ip] = ipRequests[ip]?.filter(t => t > Date.now() - WINDOW_MS) || [];
  ipRequests[ip].push(Date.now());
  if (ipRequests[ip].length > MAX_REQUESTS) return new NextResponse("Too many requests", { status: 429 });

  // Auth - only redirect if not a public path
  const isPublicPath = publicPaths.some(path => pathname === path || (path !== "/" && pathname.startsWith(path)));

  if (!isPublicPath) {
    const token = req.cookies.get("token")?.value;
    if (!token) {
      const url = req.nextUrl.clone();
      url.pathname = "/auth";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|favicon.ico).*)"],
};
