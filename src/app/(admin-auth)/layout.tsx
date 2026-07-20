import "../globals.css";

export default function AdminAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-TW" className="h-full antialiased">
      <body className="min-h-full bg-zinc-950 text-zinc-100">
        {children}
      </body>
    </html>
  );
}
