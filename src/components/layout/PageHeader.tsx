import { cn } from "@/lib/utils";

interface PageHeaderProps {
  label: string;
  title: string;
  description?: string;
  className?: string;
  children?: React.ReactNode;
}

export function PageHeader({
  label,
  title,
  description,
  className,
  children,
}: PageHeaderProps) {
  return (
    <header className={cn("mb-10", className)}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-ovo-muted">
            {label}
          </p>
          <h1 className="text-section font-semibold text-ovo-text">{title}</h1>
          {description && (
            <p className="mt-2 max-w-xl text-sm text-ovo-muted">
              {description}
            </p>
          )}
        </div>
        {children}
      </div>
    </header>
  );
}
