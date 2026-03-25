import ApplyForm from "@/components/apply/ApplyForm";

export default function ApplyPage() {
  return (
    <div className="relative min-h-screen overflow-hidden pt-[calc(5.5rem+env(safe-area-inset-top,0px))] pb-24">
      <div className="pointer-events-none absolute -right-20 top-24 h-96 w-96 rounded-full bg-accent/15 blur-[120px]" />
      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl">Apply to ASN</h1>
        <p className="mt-4 text-sm text-white/65 sm:text-base">
          Tell us who you are, what you offer, and how you want to monetize. This opens athlete
          onboarding—verification, services, and publishing follow.
        </p>
        <div className="mt-10">
          <ApplyForm />
        </div>
      </div>
    </div>
  );
}
