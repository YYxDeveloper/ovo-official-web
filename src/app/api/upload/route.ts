import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { verifySession } from "@/lib/auth/session";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");
const MAX_SIZE = 5 * 1024 * 1024;

// Map accepted MIME types to their canonical file extension.
// Extension is derived from the server-controlled MIME — the client's filename is ignored.
const MIME_TO_EXT = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
} as const;

type AcceptedMime = keyof typeof MIME_TO_EXT;

function matchesMagic(buf: Buffer, mime: AcceptedMime): boolean {
  if (mime === "image/jpeg") {
    return buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff;
  }
  if (mime === "image/png") {
    return (
      buf[0] === 0x89 &&
      buf[1] === 0x50 &&
      buf[2] === 0x4e &&
      buf[3] === 0x47 &&
      buf[4] === 0x0d &&
      buf[5] === 0x0a &&
      buf[6] === 0x1a &&
      buf[7] === 0x0a
    );
  }
  if (mime === "image/webp") {
    return (
      buf[0] === 0x52 && // R
      buf[1] === 0x49 && // I
      buf[2] === 0x46 && // F
      buf[3] === 0x46 && // F
      buf[8] === 0x57 && // W
      buf[9] === 0x45 && // E
      buf[10] === 0x42 && // B
      buf[11] === 0x50    // P
    );
  }
  return false;
}

export async function POST(request: NextRequest) {
  const session = await verifySession();
  if (!session) {
    return NextResponse.json({ error: "未授權" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "未提供檔案" }, { status: 400 });
  }

  const mime = file.type as AcceptedMime;
  if (!(mime in MIME_TO_EXT)) {
    return NextResponse.json(
      { error: "僅允許 JPG、PNG、WebP 格式" },
      { status: 400 },
    );
  }

  if (file.size > MAX_SIZE) {
    return NextResponse.json(
      { error: "檔案大小不可超過 5MB" },
      { status: 400 },
    );
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  if (!matchesMagic(buffer, mime)) {
    return NextResponse.json(
      { error: "檔案內容與副檔名不符" },
      { status: 400 },
    );
  }

  const ext = MIME_TO_EXT[mime];
  const fileName = `${crypto.randomUUID()}.${ext}`;

  await mkdir(UPLOAD_DIR, { recursive: true });
  await writeFile(path.join(UPLOAD_DIR, fileName), buffer);

  return NextResponse.json({ url: `/uploads/${fileName}` });
}
