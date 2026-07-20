import "dotenv/config";
import { test, expect } from "@playwright/test";
import { SignJWT } from "jose";

test.use({ baseURL: "http://localhost:3001" });

// Mint a valid admin JWT (same shape as src/lib/auth/session.ts) so the upload route
// accepts the request — this test focuses on the file-handling fix, not auth.
const SECRET = new TextEncoder().encode(process.env.SESSION_SECRET ?? "");
if (process.env.SESSION_SECRET) {
  // sanity: must be set or every request will 401
  expect(SECRET.byteLength).toBeGreaterThan(0);
}

async function mintAdminJwt(): Promise<string> {
  return new SignJWT({ role: "admin", expiresAt: new Date(Date.now() + 3600_000).toISOString() })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(SECRET);
}

// Minimal buffer whose first 3 bytes are the JPEG SOI signature (FF D8 FF).
// Sufficient to pass the magic-byte check; the rest can be anything under 5MB.
const JPEG_MAGIC_BUFFER = Buffer.from([0xff, 0xd8, 0xff, 0xe0, 0x00, 0x10, ...Buffer.alloc(32)]);
const NOT_AN_IMAGE_BUFFER = Buffer.from("this is plainly not an image body", "utf8");

test("H3 — spoofed filename extension stores whitelist extension (.jpg, not .html)", async ({ request }) => {
  const jwt = await mintAdminJwt();
  const res = await request.post("/api/upload", {
    multipart: {
      file: { name: "evil.html", mimeType: "image/jpeg", buffer: JPEG_MAGIC_BUFFER },
    },
    headers: { cookie: `admin-session=${jwt}` },
  });
  expect(res.status()).toBe(200);
  const body = (await res.json()) as { url?: string };
  expect(body.url).toBeDefined();
  expect(body.url).toMatch(/\.jpg$/);
  expect(body.url).not.toMatch(/\.html$/);
});

test("H3 — buffer with wrong magic bytes returns 400", async ({ request }) => {
  const jwt = await mintAdminJwt();
  const res = await request.post("/api/upload", {
    multipart: {
      file: { name: "photo.jpg", mimeType: "image/jpeg", buffer: NOT_AN_IMAGE_BUFFER },
    },
    headers: { cookie: `admin-session=${jwt}` },
  });
  expect(res.status()).toBe(400);
});

test("H3 — valid jpeg with honest filename uploads and stores as .jpg", async ({ request }) => {
  const jwt = await mintAdminJwt();
  const res = await request.post("/api/upload", {
    multipart: {
      file: { name: "photo.jpg", mimeType: "image/jpeg", buffer: JPEG_MAGIC_BUFFER },
    },
    headers: { cookie: `admin-session=${jwt}` },
  });
  expect(res.status()).toBe(200);
  const body = (await res.json()) as { url?: string };
  expect(body.url).toMatch(/\.jpg$/);
});
