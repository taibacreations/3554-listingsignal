export function formatCurrency(value: number): string {
  return `$${Math.round(value).toLocaleString("en-US")}`;
}

export function formatCurrencyShort(value: number): string {
  if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  }
  if (value >= 1_000) {
    return `$${Math.round(value / 1000)}K`;
  }
  return `$${Math.round(value)}`;
}

export function estimateConfidence(price: number, rangeLow: number, rangeHigh: number): number {
  if (!price) return 0;
  const spreadPct = ((rangeHigh - rangeLow) / price) * 100;

  // spreadPct of 15% -> ~95% confidence, 70%+ -> ~30% confidence (floor)
  const confidence = 95 - ((spreadPct - 15) / (70 - 15)) * (95 - 30);
  return Math.max(30, Math.min(95, Math.round(confidence * 10) / 10));
}

export type ConfidenceLabel = "Low" | "Medium" | "High";

export function confidenceLabel(confidencePct: number): ConfidenceLabel {
  if (confidencePct >= 80) return "High";
  if (confidencePct >= 65) return "Medium";
  return "Low";
}

/** Matches the client's reference PDF format: "82.0% (Medium)" */
export function formatConfidence(confidencePct: number): string {
  return `${confidencePct.toFixed(1)}% (${confidenceLabel(confidencePct)})`;
}