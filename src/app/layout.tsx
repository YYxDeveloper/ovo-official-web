import type { Metadata } from "next";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { CompareBar } from "@/components/compare/CompareBar";
import { SITE } from "@/lib/constants";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} — 官方網站`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW" className="h-full antialiased">
      <body className="flex min-h-full flex-col bg-ovo-black text-ovo-text">
        <NuqsAdapter>
          <SiteHeader />
          <main className="flex-1 pt-12 md:pt-14">{children}</main>
          <SiteFooter />
          <CompareBar />
        </NuqsAdapter>
      </body>
    </html>
  );
}
