import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const key = new TextEncoder().encode(process.env.SESSION_SECRET);
const COOKIE_NAME = "admin-session";

type SessionPayload = {
  role: "admin";
  expiresAt: Date;
};

export async function encrypt(payload: SessionPayload) {
  return new SignJWT({ ...payload, expiresAt: payload.expiresAt.toISOString() })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(payload.expiresAt)
    .sign(key);
}

export async function decrypt(session: string | undefined = "") {
  if (!session) return null;
  try {
    const { payload } = await jwtVerify(session, key, {
      algorithms: ["HS256"],
    });
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}

export async function createSession() {
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const session = await encrypt({ role: "admin", expiresAt });
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  });
}

export async function verifySession() {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(COOKIE_NAME)?.value;
  const session = await decrypt(cookie);
  if (!session) return null;
  return session;
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}
