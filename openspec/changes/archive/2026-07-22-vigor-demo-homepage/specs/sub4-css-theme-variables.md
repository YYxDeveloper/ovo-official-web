# Sub-issue 4: CSS Theme Variables

## Scope

在 `src/app/globals.css` 的 `@theme inline` 區塊新增 `--vigor-*` CSS 變數，建立 Vigor 品牌的暖色系、高對比、適合長者的淺色主題。

## Dependencies

- 無（可平行開發）

## Files Changed

| 檔案 | 動作 | 說明 |
|------|------|------|
| `src/app/globals.css` | 修改 | 在 `@theme inline` 區塊新增 `--color-vigor-*` 變數 |

## CSS Variables

```css
--color-vigor-bg: #faf7f2;
--color-vigor-surface: #ffffff;
--color-vigor-text: #2d2d2d;
--color-vigor-heading: #1a1a1a;
--color-vigor-muted: #6b7280;
--color-vigor-primary: #e8432a;       /* Vigor 品牌紅 */
--color-vigor-primary-hover: #cc3722;
--color-vigor-secondary: #f59e0b;     /* 暖橘輔色 */
--color-vigor-border: #e5e1db;
--color-vigor-nav-bg: #ffffff;
--color-vigor-footer-bg: #2d2d2d;
--color-vigor-footer-text: #d4d4d4;
```

## Design Constraints

- 淺色主題（非暗色模式）
- 對比度分級约束：主要文字 ≥ 7:1（WCAG AAA；`--color-vigor-text` / `--color-vigor-heading` 已達標）、輔助文字 ≥ 4.5:1（WCAG AA）、互動元件 ≥ 3:1
- 注意：`--color-vigor-primary` (#e8432a) 配白字僅約 4.0:1，不可用於小字按鈕文字；大文字（≥ 18pt）或圖示元件方可使用
- 不影響既有 `--color-ovo-*` 變數

## Acceptance Criteria

- [ ] `--color-vigor-*` 變數在 Tailwind CSS 4 中可用（如 `bg-vigor-primary`）
- [ ] 不影響既有頁面樣式
- [ ] `bun run build` 無 CSS 錯誤
