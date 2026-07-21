import type { Metadata } from "next";

export const metadata: Metadata = { title: "關於我們" };

const timeline = [
  { year: "1986", event: "隆記企業於台北成立，首批自義大利進口磁磚抵台" },
  { year: "1995", event: "與西班牙三大磁磚品牌簽訂長期代理合約，產品線大幅擴充" },
  { year: "2010", event: "開設 800 坪旗艦展示中心，提供一站式設計顧問服務" },
  { year: "2024", event: "連續五年榮獲優良進口商認證，旗下代理品牌超過 30 個" },
];

const values = [
  {
    icon: "◆",
    title: "品質堅持",
    desc: "每批進口磁磚均通過獨立第三方實驗室抗滑、抗污、耐磨等多項測試，確保符合歐盟 EN 標準。",
  },
  {
    icon: "◈",
    title: "設計美學",
    desc: "專業設計顧問團隊持續追蹤國際趨勢，協助客戶打造符合品味且經久耐看的空間。",
  },
  {
    icon: "◉",
    title: "完善服務",
    desc: "從選材、丈量到施工後追蹤，全程一對一陪伴，讓每個案件都能完美落地。",
  },
];

const certifications = [
  "防滑等級 R10+",
  "ISO 13006 認證",
  "歐盟 CE 標章",
  "防污四級處理",
  "低甲醛無毒釉面",
  "耐凍融測試通過",
];

export default function LoongchiAboutPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--lc-bg)" }}>
      {/* Hero */}
      <section
        className="py-24 px-6 text-center"
        style={{ backgroundColor: "var(--lc-surface)" }}
      >
        <p
          className="mb-3 text-xs uppercase tracking-[0.3em]"
          style={{ color: "var(--lc-muted)" }}
        >
          Since 1986
        </p>
        <h1
          className="mb-4 text-5xl font-light"
          style={{ color: "var(--lc-text)" }}
        >
          關於隆記企業
        </h1>
        <p
          className="mx-auto max-w-xl text-sm leading-relaxed"
          style={{ color: "var(--lc-muted)" }}
        >
          近四十年來，我們以磁磚為媒介，在台灣各個角落留下美麗的印記。
        </p>
      </section>

      {/* Timeline */}
      <section className="py-20 px-6">
        <div className="mx-auto max-w-3xl">
          <h2
            className="mb-12 text-2xl font-light tracking-wide"
            style={{ color: "var(--lc-text)" }}
          >
            品牌歷程
          </h2>
          <div className="relative">
            <div
              className="absolute left-0 top-0 h-full w-px"
              style={{ backgroundColor: "var(--lc-border)" }}
            />
            <div className="space-y-10 pl-8">
              {timeline.map(({ year, event }) => (
                <div key={year} className="relative">
                  <div
                    className="absolute -left-8 top-1 h-3 w-3 rounded-full border-2"
                    style={{
                      borderColor: "var(--lc-accent)",
                      backgroundColor: "var(--lc-bg)",
                    }}
                  />
                  <p
                    className="mb-1 text-lg font-medium"
                    style={{ color: "var(--lc-accent)" }}
                  >
                    {year}
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--lc-muted)" }}>
                    {event}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section
        className="py-20 px-6"
        style={{ backgroundColor: "var(--lc-surface)" }}
      >
        <div className="mx-auto max-w-7xl">
          <h2
            className="mb-12 text-center text-2xl font-light tracking-wide"
            style={{ color: "var(--lc-text)" }}
          >
            核心價值
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {values.map(({ icon, title, desc }) => (
              <div key={title} className="text-center">
                <span
                  className="mb-4 block text-3xl"
                  style={{ color: "var(--lc-primary)" }}
                >
                  {icon}
                </span>
                <h3
                  className="mb-3 text-lg font-medium"
                  style={{ color: "var(--lc-text)" }}
                >
                  {title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--lc-muted)" }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 px-6">
        <div className="mx-auto max-w-7xl">
          <h2
            className="mb-10 text-center text-2xl font-light tracking-wide"
            style={{ color: "var(--lc-text)" }}
          >
            品質認證
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {certifications.map((cert) => (
              <div
                key={cert}
                className="px-6 py-3 text-sm tracking-wide"
                style={{
                  border: "1px solid var(--lc-border)",
                  color: "var(--lc-accent)",
                  backgroundColor: "var(--lc-surface)",
                }}
              >
                {cert}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
