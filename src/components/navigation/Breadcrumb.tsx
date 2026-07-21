import Link from "next/link";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav className={cn("mb-6 text-xs text-ovo-muted", className)}>
      {items.map((item, i) => (
        <span key={item.href ?? item.label}>
          {i > 0 && <span className="mx-2">/</span>}
          {item.href ? (
            <Link href={item.href} className="hover:text-ovo-text">
              {item.label}
            </Link>
          ) : (
            <span className="text-ovo-text">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
