import { cn } from "@/lib/utils";

interface PageContainerProps {
  children: React.ReactNode;
  py?: "default" | "compact";
  className?: string;
}

export function PageContainer({
  children,
  py = "default",
  className,
}: PageContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto max-w-[1280px] px-4 md:px-6",
        py === "compact" ? "py-10 md:py-16" : "py-12 md:py-20",
        className,
      )}
    >
      {children}
    </div>
  );
}
