import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2";
  id?: string;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  as: Tag = "h2",
  id,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <p className="mb-3 text-xs font-semibold tracking-[0.22em] text-bark-600 uppercase">{eyebrow}</p>
      )}
      <Tag id={id} className="text-4xl leading-[1.08] sm:text-5xl">
        {title}
      </Tag>
      {intro && <div className="mt-5 text-lg leading-relaxed text-ink-muted">{intro}</div>}
    </div>
  );
}
