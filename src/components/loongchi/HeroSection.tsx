import Link from "next/link";

export function HeroSection() {
  return (
    <section
      className="relative flex min-h-[85vh] flex-col items-center justify-center overflow-hidden text-center"
      style={{ backgroundColor: "var(--lc-surface)" }}
    >
      {/* 背景紋理疊層 */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, var(--lc-border) 0px, var(--lc-border) 1px, transparent 1px, transparent 40px)",
        }}
      />

      <div className="relative z-10 px-6">
        <p
          className="mb-4 text-sm uppercase tracking-[0.3em]"
          style={{ color: "var(--lc-muted)" }}
        >
          Since 1986 — 歐洲進口磁磚
        </p>
        <h1
          className="mb-6 text-5xl font-light leading-tight md:text-7xl"
          style={{ color: "var(--lc-text)", letterSpacing: "-0.02em" }}
        >
          驕傲源於
          <br />
          <span style={{ color: "var(--lc-accent)" }}>自信</span>
        </h1>
        <p
          className="mx-auto mb-10 max-w-md text-base leading-relaxed"
          style={{ color: "var(--lc-muted)" }}
        >
          精選義大利、西班牙頂級磁磚，
          為您的生活空間帶來無與倫比的質感體驗。
        </p>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/loongchi/products"
            className="rounded-none px-8 py-3 text-sm tracking-widest transition-opacity hover:opacity-80"
            style={{
              backgroundColor: "var(--lc-accent)",
              color: "#fff",
            }}
          >
            瀏覽產品
          </Link>
          <Link
            href="/loongchi/contact"
            className="rounded-none border px-8 py-3 text-sm tracking-widest transition-opacity hover:opacity-70"
            style={{
              borderColor: "var(--lc-accent)",
              color: "var(--lc-accent)",
            }}
          >
            設計諮詢
          </Link>
        </div>
      </div>
    </section>
  );
}
