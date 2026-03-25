/**
 * Subscription / entitlements — structure only (no payments).
 * Wire to Stripe or similar when ready.
 */
export type SubscriptionTier = "free" | "pro" | "enterprise";

export type SubscriptionState = {
  tier: SubscriptionTier;
  /** ISO date when current period ends */
  currentPeriodEnd: string | null;
  isActive: boolean;
};

export const DEFAULT_SUBSCRIPTION: SubscriptionState = {
  tier: "free",
  currentPeriodEnd: null,
  isActive: false,
};

export function canAccessPremium(
  sub: SubscriptionState,
  isPremiumContent: boolean
): boolean {
  if (!isPremiumContent) return true;
  return sub.isActive && sub.tier !== "free";
}
