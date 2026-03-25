import TrainingMarketplaceClient from "@/components/training/TrainingMarketplaceClient";

export default function TrainingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden pt-[calc(5.5rem+env(safe-area-inset-top,0px))] pb-24">
      <div className="pointer-events-none absolute left-0 top-32 h-72 w-72 rounded-full bg-accent/10 blur-[100px]" />
      <div className="relative mx-auto max-w-7xl pt-4">
        <div className="px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            Training marketplace
          </h1>
          <p className="mt-4 max-w-3xl text-sm text-white/65 sm:text-base">
            Athlete-led drills, clinics, and virtual coaching—filtered by sport, age, format, and
            price. Every program links back to the athlete you can also book for speaking.
          </p>
        </div>
        <div className="mt-10">
          <TrainingMarketplaceClient />
        </div>
      </div>
    </div>
  );
}
