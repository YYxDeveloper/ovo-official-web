export function formatPrice(amount: number): string {
  return `NT$${amount.toLocaleString("zh-TW")}`;
}
