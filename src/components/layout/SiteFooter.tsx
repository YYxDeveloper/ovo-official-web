import Link from "next/link";

const FOOTER_LINKS = [
  {
    title: "Products",
    items: [
      { label: "Phone", href: "/products/phone" },
      { label: "Watch", href: "/products/watch" },
      { label: "Buds", href: "/products/buds" },
    ],
  },
  {
    title: "Support",
    items: [
      { label: "聯絡我們", href: "#" },
      { label: "維修服務", href: "#" },
      { label: "保固資訊", href: "#" },
    ],
  },
  {
    title: "About ovo",
    items: [
      { label: "品牌故事", href: "#" },
      { label: "新聞中心", href: "#" },
      { label: "招募人才", href: "#" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-ovo-border bg-ovo-darkgray text-ovo-muted">
      <div className="mx-auto max-w-[1024px] px-4 py-12 md:px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="text-lg font-semibold text-ovo-text">
              ovo
            </Link>
            <p className="mt-3 text-sm leading-relaxed">
              為日常生活而生的科技 —
              <br />
              速度、設計與純粹的平衡。
            </p>
          </div>

          {FOOTER_LINKS.map((section) => (
            <div key={section.title}>
              <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-ovo-text">
                {section.title}
              </h4>
              <ul className="space-y-2 text-sm">
                {section.items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="transition hover:text-ovo-text"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-ovo-border pt-6 text-xs md:flex-row md:items-center">
          <p>Copyright © {new Date().getFullYear()} ovo Inc. 保留所有權利。</p>
          <ul className="flex gap-4">
            <li>
              <Link href="#" className="hover:text-ovo-text">
                隱私權
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-ovo-text">
                使用條款
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-ovo-text">
                法律聲明
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
