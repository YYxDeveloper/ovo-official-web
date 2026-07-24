const highlights = [
  { label: "成立年份", value: "1986", desc: "近四十年的專業積累" },
  { label: "合作品牌", value: "30+", desc: "義大利、西班牙頂尖廠商" },
  { label: "完成案例", value: "2,000+", desc: "住宅、商辦、酒店工程" },
];

export function AboutPreview() {
  return (
    <section className="py-20 px-6" style={{ backgroundColor: "var(--lc-surface)" }}>
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          <div>
            <p
              className="mb-3 text-xs uppercase tracking-[0.25em]"
              style={{ color: "var(--lc-muted)" }}
            >
              關於隆記
            </p>
            <h2
              className="mb-6 text-3xl font-light leading-snug"
              style={{ color: "var(--lc-text)" }}
            >
              品質，是我們
              <br />
              唯一的標準
            </h2>
            <p
              className="mb-4 text-sm leading-relaxed"
              style={{ color: "var(--lc-muted)" }}
            >
              隆記企業自 1986 年創立，深耕磁磚進口領域逾三十八年。
              我們直接與義大利、西班牙頂尖製造商合作，嚴選符合歐盟品質標準的產品，
              讓每一片磁磚都能承載家居美學的初衷。
            </p>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "var(--lc-muted)" }}
            >
              無論是住宅改建、商辦空間或精品酒店，我們的設計顧問團隊
              能為您量身規劃最適合的磁磚搭配方案。
            </p>
          </div>

          <div className="grid grid-cols-3 gap-6 self-center">
            {highlights.map(({ label, value, desc }) => (
              <div key={label} className="text-center">
                <p
                  className="mb-1 text-3xl font-light"
                  style={{ color: "var(--lc-accent)" }}
                >
                  {value}
                </p>
                <p
                  className="mb-1 text-xs font-medium tracking-wide"
                  style={{ color: "var(--lc-text)" }}
                >
                  {label}
                </p>
                <p className="text-xs" style={{ color: "var(--lc-muted)" }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
