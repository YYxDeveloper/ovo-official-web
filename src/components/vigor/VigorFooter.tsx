export function VigorFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-vigor-footer-bg text-vigor-footer-text">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-3 md:px-6">
        <div>
          <div className="text-xl font-bold text-white">Vigor 躍齡</div>
          <p className="mt-2 text-sm">
            陪伴每一位長者的數位生活入口，整合健康、學習、社群、生活四大類服務。
          </p>
        </div>

        <nav aria-label="次要導覽">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white/80">
            快速連結
          </h3>
          <ul className="mt-2 space-y-1 text-sm">
            <li>
              <a href="/vigor" className="hover:text-white">
                首頁
              </a>
            </li>
            <li>
              <a href="/vigor?category=health" className="hover:text-white">
                健康樂活
              </a>
            </li>
            <li>
              <a href="/vigor?category=learning" className="hover:text-white">
                終身學習
              </a>
            </li>
            <li>
              <a href="/vigor?category=social" className="hover:text-white">
                社群連結
              </a>
            </li>
          </ul>
        </nav>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white/80">
            聯絡我們
          </h3>
          <ul className="mt-2 space-y-1 text-sm">
            <li>電話：02-1234-5678</li>
            <li>Email：hello@vigor.example.tw</li>
            <li>地址：台北市信義區示範路 1 號</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-4 text-xs text-vigor-footer-text md:px-6">
          © {year} Vigor 躍齡 demo. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
