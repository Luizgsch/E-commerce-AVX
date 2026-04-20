import Image from "next/image";
import Link from "next/link";
import { Search, ShoppingCart } from "lucide-react";

import Container from "@/src/components/ui/container";

const nav = [
  { label: "MODELOS", href: "#modelos" },
  { label: "LOJAS", href: "#lojas" },
];

export default function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 py-6">
      <Container className="flex h-20 items-center justify-between gap-8">
        <Link
          href="/"
          className="relative block h-16 w-48 shrink-0 ml-4 sm:h-20 sm:w-60 md:h-24 md:w-72"
        >
          <Image
            src="/images/brand/logo-avx.png"
            alt="AVX Motors"
            fill
            className="object-contain object-left"
            sizes="(max-width: 768px) 300px, 400px"
            priority
          />
        </Link>

        <div className="hidden items-center justify-center md:flex lg:absolute lg:left-1/2 lg:-translate-x-1/2">
          <nav
            className="flex items-center gap-1 rounded-full border border-white/10 bg-black/40 px-6 py-2 backdrop-blur-xl"
            aria-label="Principal"
          >
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-1.5 text-[10px] font-bold tracking-[0.3em] transition-colors hover:text-accent ${
                  item.active ? "text-accent" : "text-zinc-400"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-5 pr-2 opacity-0 pointer-events-none" />
      </Container>
    </header>
  );
}
