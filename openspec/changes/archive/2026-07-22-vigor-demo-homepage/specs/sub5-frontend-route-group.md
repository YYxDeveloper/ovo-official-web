# Sub-issue 5: Frontend Route Group + Components

## Scope

建立 `(vigor)` route group（獨立 layout + page）和 7 個前端元件，含無障礙修正和動畫。

## Dependencies

- Sub-issue #2（DAL + Types — 元件需要型別定義和資料）
- Sub-issue #4（CSS Theme Variables — 元件使用 `--vigor-*` 變數）

## Files Created

| 檔案 | 類型 | 說明 |
|------|------|------|
| `src/app/(vigor)/layout.tsx` | Server | 獨立 `<html>/<body>`，載入 VigorHeader + VigorFooter，淺色主題 |
| `src/app/(vigor)/vigor/page.tsx` | Server | fetch slides/services/partners → 傳入子元件 |
| `src/components/vigor/VigorHeader.tsx` | Client | Logo + 搜尋 + LINE + 7 項導航，響應式漢堡選單 |
| `src/components/vigor/VigorHeroCarousel.tsx` | Client | Framer Motion slides 切換，鍵盤導航，dot 指示器 |
| `src/components/vigor/VigorServiceGrid.tsx` | Client | 4x4 響應式 grid，reuse `staggerContainer` + `fadeUpItem` |
| `src/components/vigor/VigorServiceCard.tsx` | Client | 圖片 + 文字標題 + 獨特 alt text |
| `src/components/vigor/VigorDownloadSection.tsx` | Server | PDF 手冊 + APP 下載連結 |
| `src/components/vigor/VigorFooter.tsx` | Server | Logo + 簡介 + 聯絡 + 版權 |
| `src/components/vigor/VigorPartnerMarquee.tsx` | Client | 水平無限捲動，hover 暫停 |

## Accessibility Requirements（修正原站問題）

- 每張圖片有獨特描述性 `alt`（非通用文字）
- 頁面有 `<h1>`，段落用 `<h2>`
- Carousel: `aria-live="polite"`, `aria-current` on active dot
- Nav: `aria-label="主導覽"`, `aria-current="page"` on active item
- 所有互動元素可鍵盤操作（Tab / Enter / Arrow keys）
- Carousel 自動播放必須提供暫停/停止控制（WCAG 2.2.2），hover / focus 時暫停自動播放

## Theme Override Note

`(vigor)/layout.tsx` 的 `<html>` 需設 `color-scheme: light` 並覆蓋 body 背景/文字色 — `globals.css` 全域 base style 為深色（`color-scheme: dark` + `bg-ovo-black`），不覆蓋會導致表單控件與捲軸呈現深色。

## Demo 範圍界定

- Header 搜尋框為**視覺 demo**（不實作搜尋功能），需有 `aria-label`，submit 時導向 `/vigor` 或顯示提示，不可為無回應的死按鈕
- `VigorDownloadSection` 的 PDF 手冊 / APP 下載連結為 demo placeholder（`href="#"` 或指向官方頁面），不實作實際下載

## Animation（reuse 現有）

```typescript
import { staggerContainer, fadeUpItem, scaleOnHover } from "@/lib/animations";
```

## Acceptance Criteria

- [ ] `http://localhost:3000/vigor` 首頁完整呈現（carousel + grid + marquee + footer）
- [ ] Lighthouse Accessibility audit ≥ 90 分
- [ ] 鍵盤 Tab 導航所有互動元素可達
- [ ] 響應式：手機 / 平板 / 桌面斷點正確
- [ ] Carousel 自動播放 + 手動切換 + 鍵盤操作
- [ ] Carousel 提供暫停/停止控制，hover / focus 時暫停自動播放
- [ ] 新增 Playwright E2E：`/vigor` 首頁載入 + 響應式斷點（手機 / 平板 / 桌面）
