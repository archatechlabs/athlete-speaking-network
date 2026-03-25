/**
 * Athlete onboarding flow — step keys for a future wizard.
 * No UI implementation yet; use for routing/state when building onboarding.
 */
export const ATHLETE_ONBOARDING_STEPS = [
  "profile",
  "topics_pricing",
  "media",
  "availability",
  "payouts_placeholder",
] as const;

export type AthleteOnboardingStep = (typeof ATHLETE_ONBOARDING_STEPS)[number];
