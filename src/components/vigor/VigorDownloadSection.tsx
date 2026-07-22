export function VigorDownloadSection() {
  return (
    <section
      aria-labelledby="vigor-download-heading"
      className="bg-vigor-bg py-12 md:py-16"
    >
      <div className="mx-auto max-w-4xl px-4 text-center md:px-6">
        <h2
          id="vigor-download-heading"
          className="text-2xl font-bold text-vigor-heading md:text-3xl"
        >
          下載資源
        </h2>
        <p className="mt-2 text-base text-vigor-muted md:text-lg">
          隨時取得 Vigor 服務手冊與 APP
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#"
            className="inline-flex w-full max-w-xs items-center justify-center gap-2 rounded-md bg-vigor-primary px-6 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-vigor-primary-hover focus:outline-none focus:ring-2 focus:ring-vigor-primary/40 sm:w-auto"
          >
            <span aria-hidden="true">📄</span>
            下載服務手冊（PDF）
          </a>
          <a
            href="#"
            className="inline-flex w-full max-w-xs items-center justify-center gap-2 rounded-md border-2 border-vigor-primary bg-vigor-surface px-6 py-3 text-base font-semibold text-vigor-primary transition-colors hover:bg-vigor-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-vigor-primary/40 sm:w-auto"
          >
            <span aria-hidden="true">📱</span>
            下載 Vigor APP
          </a>
        </div>

        <p className="mt-4 text-xs text-vigor-muted">
          上述連結為 demo placeholder
        </p>
      </div>
    </section>
  );
}
