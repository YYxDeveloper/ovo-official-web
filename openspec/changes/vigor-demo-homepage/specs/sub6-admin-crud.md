# Sub-issue 6: Admin CRUD

## Scope

建立 Vigor 管理後台：6 個 Admin 元件 + 12 個 Admin route pages + 修改 sidebar 導航。

## Dependencies

- Sub-issue #3（Server Actions — Admin forms 需要 actions）

## Files Created — Components

| 元件 | 參考模式 | 說明 |
|------|---------|------|
| `src/components/admin/vigor/SlideTable.tsx` | `ProductTable.tsx` | 輪播列表，含排序/啟用狀態切換 |
| `src/components/admin/vigor/SlideForm.tsx` | `ProductForm.tsx`（簡化版） | 輪播表單：title, subtitle, imageUrl, linkUrl, sortOrder, active |
| `src/components/admin/vigor/ServiceTable.tsx` | `ProductTable.tsx` | 服務列表，含分類 badge |
| `src/components/admin/vigor/ServiceForm.tsx` | `ProductForm.tsx`（簡化版） | 服務表單：name, description, imageUrl, linkUrl, category, sortOrder, active |
| `src/components/admin/vigor/PartnerTable.tsx` | `ProductTable.tsx` | 夥伴列表 |
| `src/components/admin/vigor/PartnerForm.tsx` | `ProductForm.tsx`（簡化版） | 夥伴表單：name, logoUrl, websiteUrl, sortOrder, active |

## Files Created — Routes

```
src/app/(admin)/admin/vigor/
  slides/
    page.tsx                 — SlideTable 列表
    new/page.tsx             — SlideForm + createSlideAction
    [id]/page.tsx            — SlideForm + updateSlideAction
    [id]/delete/page.tsx     — 刪除確認
  services/
    page.tsx, new/page.tsx, [id]/page.tsx, [id]/delete/page.tsx
  partners/
    page.tsx, new/page.tsx, [id]/page.tsx, [id]/delete/page.tsx
```

## Files Changed

| 檔案 | 動作 | 說明 |
|------|------|------|
| `src/app/(admin)/layout.tsx` | 修改 | sidebar 新增 Vigor 管理連結（輪播/服務/夥伴） |

## Acceptance Criteria

- [ ] `/admin/vigor/slides` — 列表 + 新增 + 編輯 + 刪除功能正常
- [ ] `/admin/vigor/services` — 同上
- [ ] `/admin/vigor/partners` — 同上
- [ ] Admin sidebar 顯示 Vigor 管理連結
- [ ] 所有表單含 `useActionState` + 錯誤顯示
- [ ] 未授權存取被正確拒絕
- [ ] 新增 Playwright E2E：Admin Vigor CRUD 流程（登入 → 列表 → 新增 → 編輯 → 刪除）
