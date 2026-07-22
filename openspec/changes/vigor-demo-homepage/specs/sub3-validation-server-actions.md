# Sub-issue 3: Validation + Server Actions

## Scope

建立 Zod v4 驗證 schema 和 Server Actions（含授權檢查），遵循 `product-schema.ts` + `product-actions.ts` 模式。

## Dependencies

- Sub-issue #1（DB Schema）
- Sub-issue #2（DAL functions）

## Files Created

| 檔案 | 參考模式 | 說明 |
|------|---------|------|
| `src/lib/validations/vigor-schemas.ts` | `src/lib/validations/product-schema.ts` | Zod v4 schemas: `vigorSlideSchema`, `vigorServiceSchema`, `vigorPartnerSchema` |
| `src/lib/actions/vigor-slide-actions.ts` | `src/lib/actions/product-actions.ts` | `createSlideAction`, `updateSlideAction`, `deleteSlideAction`, `toggleSlideActiveAction` |
| `src/lib/actions/vigor-service-actions.ts` | 同上 | `createServiceAction`, `updateServiceAction`, `deleteServiceAction`, `toggleServiceActiveAction` |
| `src/lib/actions/vigor-partner-actions.ts` | 同上 | `createPartnerAction`, `updatePartnerAction`, `deletePartnerAction`, `togglePartnerActiveAction` |

## Key Patterns

- `"use server"` directive
- 每個 mutating action 先 `verifySession()`，未授權回傳 `{ error: "未授權" }`
- `(prev: ActionState, formData: FormData)` 簽名，搭配 `useActionState`
- Zod `safeParse` → 失敗回傳 `fieldErrors`
- 成功後 `revalidatePath("/vigor")` + `revalidatePath("/admin/vigor", "layout")` + `redirect`（注意：`revalidatePath` 不支援 `/admin/vigor/*` wildcard 語法）
- `import { z } from "zod/v4"`

## Acceptance Criteria

- [ ] 4 個檔案建立完成，無 TypeScript 錯誤
- [ ] 未授權呼叫 action 回傳 `{ error: "未授權" }`
- [ ] Zod 驗證失敗回傳 `fieldErrors`
- [ ] CRUD 操作成功後正確 revalidate 路徑
