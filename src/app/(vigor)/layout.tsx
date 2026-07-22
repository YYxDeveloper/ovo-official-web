import type { Metadata } from "next";
import { VigorHeader } from "@/components/vigor/VigorHeader";
import { VigorFooter } from "@/components/vigor/VigorFooter";
import { VIGOR_NAV_ITEMS } from "@/data/vigor";
import "../globals.css";

export const metadata: Metadata = {
  title: "Vigor 躍齡 — 樂齡生活平台",
  description: "陪伴每一位長者的數位生活入口",
};

export default function VigorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW" style={{ colorScheme: "light" }} className="h-full antialiased">
      <body className="flex min-h-full flex-col bg-vigor-bg text-vigor-text">
        <VigorHeader navItems={VIGOR_NAV_ITEMS} />
        <main className="flex-1">{children}</main>
        <VigorFooter />
      </body>
    </html>
  );
}
