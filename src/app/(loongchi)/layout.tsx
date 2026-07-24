import type { Metadata } from "next";
import { LoongchiHeader } from "@/components/loongchi/LoongchiHeader";
import { LoongchiFooter } from "@/components/loongchi/LoongchiFooter";
import "../globals.css";

export const metadata: Metadata = {
  title: {
    default: "隆記企業 — 歐洲進口磁磚",
    template: "%s | 隆記企業",
  },
  description: "自 1986 年起，專注引進歐洲頂級磁磚，驕傲源於自信。",
};

export default function LoongchiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-TW">
      <body
        style={{
          backgroundColor: "var(--lc-bg)",
          color: "var(--lc-text)",
          fontFamily: "system-ui, -apple-system, sans-serif",
          margin: 0,
        }}
      >
        <LoongchiHeader />
        <main>{children}</main>
        <LoongchiFooter />
      </body>
    </html>
  );
}
