import { Suspense } from "react";
import BookingWizard from "@/components/book/BookingWizard";

export default function BookPage() {
  return (
    <div className="relative min-h-screen overflow-hidden pt-[calc(5.5rem+env(safe-area-inset-top,0px))] pb-24">
      <div className="pointer-events-none absolute -right-24 top-40 h-80 w-80 rounded-full bg-accent/12 blur-[110px]" />
      <div className="relative mx-auto max-w-7xl pt-4">
        <div className="px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white sm:text-4xl">Request a booking</h1>
          <p className="mt-3 max-w-2xl text-sm text-white/65 sm:text-base">
            Three quick steps: pick an athlete, share event details, confirm. Bookings and
            content stay linked so athletes can reinvest in new talks.
          </p>
        </div>
        <div className="mt-10">
          <Suspense
            fallback={
              <div className="px-4 text-white/60 sm:px-6 lg:px-8">Loading booking flow…</div>
            }
          >
            <BookingWizard />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
