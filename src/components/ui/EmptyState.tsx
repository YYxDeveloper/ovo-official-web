"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  title: string;
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  className?: string;
}

export function EmptyState({ title, action, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-lg)] border border-dashed border-ovo-border px-6 py-20 text-center",
        className,
      )}
    >
      <p className="text-sm text-ovo-muted">{title}</p>
      {action &&
        (action.href ? (
          <Button asChild className="mt-4" size="sm">
            <Link href={action.href}>{action.label}</Link>
          </Button>
        ) : (
          <Button className="mt-4" size="sm" onClick={action.onClick}>
            {action.label}
          </Button>
        ))}
    </div>
  );
}
