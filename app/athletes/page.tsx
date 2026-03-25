import { Suspense } from "react";
import AthletesMarketplaceClient from "@/components/athletes/AthletesMarketplaceClient";

export default function AthletesPage() {
  return (
    <div className="relative min-h-screen overflow-hidden pt-[calc(5.5rem+env(safe-area-inset-top,0px))] pb-20">
      <div className="pointer-events-none absolute -left-32 top-24 h-80 w-80 rounded-full bg-accent/15 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-20 right-0 h-96 w-96 rounded-full bg-accent/10 blur-[120px]" />
      <Suspense
        fallback={
          <div className="mx-auto max-w-7xl px-4 py-20 text-white/60 sm:px-6 lg:px-8">
            Loading marketplace…
          </div>
        }
      >
        <AthletesMarketplaceClient />
      </Suspense>
    </div>
  );
}
