import Link from "next/link";
import type { ComponentProps } from "react";

type Variant = "primary" | "secondary" | "ghost";

type ButtonProps = Omit<ComponentProps<"button">, "className"> & {
  variant?: Variant;
  className?: string;
};

type LinkButtonProps = Omit<ComponentProps<typeof Link>, "className"> & {
  variant?: Variant;
  className?: string;
};

const base =
  "inline-flex h-11 items-center justify-center gap-2 rounded-full px-6 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-black hover:bg-accent/90 focus-visible:outline-accent",
  secondary:
    "border border-border-subtle bg-transparent text-foreground hover:border-accent/50 hover:text-accent",
  ghost: "text-zinc-400 hover:text-accent",
};

function classFor(variant: Variant, className: string) {
  return `${base} ${variants[variant]} ${className}`;
}

export function ButtonLink({
  variant = "primary",
  className = "",
  children,
  ...props
}: LinkButtonProps) {
  return (
    <Link className={classFor(variant, className)} {...props}>
      {children}
    </Link>
  );
}

export default function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button type="button" className={classFor(variant, className)} {...props}>
      {children}
    </button>
  );
}
