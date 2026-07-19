import type { ProductSpec } from "@/data/types";

export function ProductSpecTable({ specs }: { specs: ProductSpec[] }) {
  return (
    <div className="overflow-hidden rounded-[var(--radius-lg)] border border-ovo-border">
      <table className="w-full text-left text-sm">
        <tbody>
          {specs.map((spec, i) => (
            <tr
              key={spec.label}
              className={i % 2 === 0 ? "bg-ovo-card/40" : "bg-transparent"}
            >
              <th className="w-1/3 px-4 py-3 font-medium text-ovo-muted">
                {spec.label}
              </th>
              <td className="px-4 py-3 text-ovo-text">{spec.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
