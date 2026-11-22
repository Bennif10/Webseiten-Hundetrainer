import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

const control =
  "block w-full rounded-2xl border bg-cream-50 px-4 py-3 text-base text-ink placeholder:text-ink-muted/60 transition-colors duration-200 focus:border-sage-600 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-sage-600/40";

interface FieldProps {
  id: string;
  label: string;
  error?: string;
  hint?: ReactNode;
  optional?: boolean;
  className?: string;
}

function FieldShell({ id, label, error, hint, optional, className, children }: FieldProps & { children: ReactNode }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 flex items-baseline justify-between gap-2 text-sm font-medium text-sage-900">
        {label}
        {optional && <span className="text-xs font-normal text-ink-muted">optional</span>}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-ink-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-red-800" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

const describedBy = (id: string, error?: string, hint?: ReactNode) =>
  error ? `${id}-error` : hint ? `${id}-hint` : undefined;

export function InputField({
  id,
  label,
  error,
  hint,
  optional,
  className,
  ...props
}: FieldProps & Omit<ComponentProps<"input">, "id" | "className">) {
  return (
    <FieldShell id={id} label={label} error={error} hint={hint} optional={optional} className={className}>
      <input
        id={id}
        name={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        required={!optional}
        className={cn(control, error ? "border-red-700" : "border-sage-900/15")}
        {...props}
      />
    </FieldShell>
  );
}

export function TextareaField({
  id,
  label,
  error,
  hint,
  optional,
  className,
  ...props
}: FieldProps & Omit<ComponentProps<"textarea">, "id" | "className">) {
  return (
    <FieldShell id={id} label={label} error={error} hint={hint} optional={optional} className={className}>
      <textarea
        id={id}
        name={id}
        rows={5}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        required={!optional}
        className={cn(control, "resize-y", error ? "border-red-700" : "border-sage-900/15")}
        {...props}
      />
    </FieldShell>
  );
}

export function ConsentCheckbox({
  id,
  checked,
  onChange,
  error,
  children,
}: {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <div className="flex gap-3">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className="mt-0.5 size-5 shrink-0 cursor-pointer rounded accent-sage-700"
        />
        <label htmlFor={id} className="cursor-pointer text-sm leading-relaxed text-ink-muted">
          {children}
        </label>
      </div>
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-red-800" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
