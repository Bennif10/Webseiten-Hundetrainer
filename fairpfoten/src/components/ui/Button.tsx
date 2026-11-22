import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "inverse" | "inverse-outline";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 ease-out disabled:cursor-not-allowed disabled:opacity-50 min-h-11";

const variants: Record<Variant, string> = {
  primary:
    "bg-sage-700 text-cream-50 shadow-soft hover:bg-sage-800 hover:shadow-lift hover:-translate-y-0.5 active:translate-y-0",
  secondary:
    "border border-sage-700/30 bg-cream-50/70 text-sage-800 backdrop-blur hover:border-sage-700 hover:bg-cream-50 hover:-translate-y-0.5 active:translate-y-0",
  ghost: "text-sage-800 underline-offset-4 hover:text-sage-900 hover:underline",
  /** Für dunkle Hintergründe */
  inverse: "bg-cream-50 text-sage-800 shadow-soft hover:bg-white hover:-translate-y-0.5 active:translate-y-0",
  "inverse-outline":
    "border border-cream-50/40 text-cream-50 hover:border-cream-50 hover:bg-cream-50/10 hover:-translate-y-0.5 active:translate-y-0",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "md", className?: string) {
  return cn(base, variants[variant], variant !== "ghost" && sizes[size], className);
}

interface ButtonLinkProps extends Omit<ComponentProps<typeof Link>, "className"> {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

export function ButtonLink({ variant, size, className, children, ...props }: ButtonLinkProps) {
  return (
    <Link className={buttonClasses(variant, size, className)} {...props}>
      {children}
    </Link>
  );
}

interface ButtonProps extends ComponentProps<"button"> {
  variant?: Variant;
  size?: Size;
}

export function Button({ variant, size, className, type = "button", ...props }: ButtonProps) {
  return <button type={type} className={buttonClasses(variant, size, className)} {...props} />;
}
