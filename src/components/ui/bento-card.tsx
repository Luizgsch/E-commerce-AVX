import type { ComponentProps } from "react";

type BentoCardProps = ComponentProps<"div">;

export default function BentoCard({ className = "", children, ...props }: BentoCardProps) {
  return (
    <div
      className={`rounded-3xl border border-zinc-800 bg-zinc-950/50 backdrop-blur-xl ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
