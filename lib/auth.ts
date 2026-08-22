import { NextRequest, NextResponse } from "next/server";
import { SignJWT, jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "bgvm2027-dev-secret-change-in-production"
);

const COOKIE_NAME = "bgvm_admin_token";

export async function signToken(payload: { adminId: string; email: string; role: string }) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("8h")
    .sign(JWT_SECRET);
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as { adminId: string; email: string; role: string };
  } catch {
    return null;
  }
}

export function getTokenFromRequest(req: NextRequest): string | null {
  // Check Authorization header first (Bearer token)
  const authHeader = req.headers.get("authorization");
  if (authHeader?.startsWith("Bearer ")) {
    return authHeader.slice(7);
  }
  // Fall back to cookie
  return req.cookies.get(COOKIE_NAME)?.value ?? null;
}

export async function requireAdmin(req: NextRequest): Promise<
  | { admin: { adminId: string; email: string; role: string }; error: null }
  | { admin: null; error: NextResponse }
> {
  const token = getTokenFromRequest(req);
  if (!token) {
    return {
      admin: null,
      error: NextResponse.json({ message: "Unauthorized" }, { status: 401 }),
    };
  }

  const payload = await verifyToken(token);
  if (!payload) {
    return {
      admin: null,
      error: NextResponse.json({ message: "Invalid or expired token" }, { status: 401 }),
    };
  }

  return { admin: payload, error: null };
}

export function setAuthCookie(res: NextResponse, token: string) {
  res.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 8, // 8 hours
    path: "/",
  });
}

export function clearAuthCookie(res: NextResponse) {
  res.cookies.set(COOKIE_NAME, "", { maxAge: 0, path: "/" });
}
