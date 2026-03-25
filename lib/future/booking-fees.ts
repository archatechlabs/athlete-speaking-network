/**
 * Booking fee logic — placeholder percentages / caps for later billing.
 */
export type BookingFeeConfig = {
  platformFeePercent: number;
  processingFeePercent: number;
  minFeeUsd: number;
};

export const DEFAULT_BOOKING_FEE_CONFIG: BookingFeeConfig = {
  platformFeePercent: 12,
  processingFeePercent: 2.9,
  minFeeUsd: 250,
};

export function estimatePlatformFeeUsd(
  budgetUsd: number,
  config: BookingFeeConfig = DEFAULT_BOOKING_FEE_CONFIG
): number {
  const raw = (budgetUsd * config.platformFeePercent) / 100;
  return Math.max(config.minFeeUsd, Math.round(raw));
}
