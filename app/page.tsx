import Hero from "@/src/components/sections/hero-motion";
import ProductCatalog from "@/src/components/sections/product-catalog";
import TrustSection from "@/src/components/sections/trust-section";
import DeepDiveSection from "@/src/components/sections/deep-dive/deep-dive-section";
import LifestyleExperience from "@/src/components/sections/lifestyle/lifestyle-experience";
import ConversionSection from "@/src/components/sections/conversion/conversion-section";
import StoresSection from "@/src/components/sections/stores-section";
import SiteHeader from "@/src/components/sections/site-header";
import ModelTextureGallery from "@/src/components/sections/model-texture-gallery";
import { ProductSelectionProvider } from "@/src/components/sections/product-selection-context";
import { Zap } from "lucide-react";
import Container from "@/src/components/ui/container";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-transparent selection:bg-cyan-500/30">
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <ProductSelectionProvider>
          <ProductCatalog />
          <ModelTextureGallery />
          <DeepDiveSection />
          <LifestyleExperience />
          <TrustSection />
          <StoresSection />
          <ConversionSection />
        </ProductSelectionProvider>
      </main>

      <footer className="relative z-10 border-t border-white/5 py-6">
        <Container className="flex items-center justify-between text-[10px] font-bold tracking-[0.2em] text-zinc-600 uppercase">
          <div className="flex items-center gap-2">
            <Zap className="size-3 text-cyan-500" fill="currentColor" />
          </div>
          <div>AVX Motors</div>
        </Container>
      </footer>
    </div>
  );
}
