export function LoongchiFooter() {
  return (
    <footer
      className="border-t py-10"
      style={{
        backgroundColor: "var(--lc-surface)",
        borderColor: "var(--lc-border)",
        color: "var(--lc-muted)",
      }}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <p
              className="mb-2 text-base font-semibold tracking-widest"
              style={{ color: "var(--lc-accent)" }}
            >
              隆記企業
            </p>
            <p className="text-sm leading-relaxed">
              自 1986 年起，專注於引進歐洲頂級磁磚，
              <br />
              為台灣家居注入質感與品味。
            </p>
          </div>
          <div>
            <p className="mb-2 text-sm font-medium" style={{ color: "var(--lc-text)" }}>
              快速連結
            </p>
            <ul className="space-y-1 text-sm">
              <li><a href="/loongchi/products" className="hover:underline">產品目錄</a></li>
              <li><a href="/loongchi/about" className="hover:underline">關於我們</a></li>
              <li><a href="/loongchi/contact" className="hover:underline">聯絡我們</a></li>
            </ul>
          </div>
          <div>
            <p className="mb-2 text-sm font-medium" style={{ color: "var(--lc-text)" }}>
              聯絡資訊
            </p>
            <ul className="space-y-1 text-sm">
              <li>台北市中山區建國北路一段 88 號</li>
              <li>Tel: (02) 2555-8888</li>
              <li>service@loongchi.example.com</li>
            </ul>
          </div>
        </div>
        <p className="mt-8 text-center text-xs" style={{ color: "var(--lc-muted)" }}>
          © 2024 隆記企業股份有限公司 — 展示用途，非真實商業網站
        </p>
      </div>
    </footer>
  );
}
