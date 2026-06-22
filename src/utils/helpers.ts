/**
 * Helper utilities for formatting and financial calculations
 * tailored to CuantoCuestaRD market needs.
 */

/**
 * Formats a numeric value into Dominican Pesos (RD$)
 * Rounds to the nearest integer.
 */
export function formatRD(amount: number): string {
  const rounded = Math.round(amount || 0);
  return `RD$ ${rounded.toLocaleString('en-US')}`;
}

/**
 * Formats a numeric value into US Dollars (US$)
 * Shows exactly 2 decimal places.
 */
export function formatUSD(amount: number): string {
  const value = amount || 0;
  return `US$ ${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

/**
 * Formats a numeric value to a standard percentage format (%)
 */
export function formatPercent(value: number): string {
  const pct = value || 0;
  return `${pct.toLocaleString('en-US', { maximumFractionDigits: 2 })}%`;
}

/**
 * Safely parses an input string into a number.
 * Returns default if parsed value is negative or NaN.
 */
export function parseInputNumber(value: string, defaultValue = 0): number {
  const num = parseFloat(value);
  if (isNaN(num) || num < 0) {
    return defaultValue;
  }
  return num;
}

/**
 * Prevents negative values.
 */
export function preventNegative(value: number): number {
  return Math.max(0, value || 0);
}

/**
 * Standard PMT Amortization formula to calculate monthly payments.
 * Handles 0% interest rate scenarios gracefully.
 */
export function calculatePMT(principal: number, annualRatePercent: number, termMonths: number): number {
  const p = Math.max(0, principal || 0);
  const n = Math.max(1, termMonths || 1);
  const rate = Math.max(0, annualRatePercent || 0);

  if (p === 0) return 0;

  if (rate === 0) {
    return p / n;
  }

  const r = (rate / 100) / 12; // monthly interest rate
  return p * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

/**
 * Converts US Dollars (US$) to Dominican Pesos (RD$)
 */
export function convertUsdToRd(amountUsd: number, dollarRate: number): number {
  return (amountUsd || 0) * (dollarRate || 0);
}

/**
 * Converts Dominican Pesos (RD$) to US Dollars (US$)
 */
export function convertRdToUsd(amountRd: number, dollarRate: number): number {
  if (!dollarRate || dollarRate <= 0) return 0;
  return (amountRd || 0) / dollarRate;
}

/**
 * Normalizes an amount (which could be in USD or RD) to USD
 */
export function normalizeAmountToUSD(amount: number, inputCurrency: 'USD' | 'RD', dollarRate: number): number {
  return inputCurrency === 'USD' ? amount : convertRdToUsd(amount, dollarRate);
}

/**
 * Normalizes an amount (which could be in USD or RD) to RD
 */
export function normalizeAmountToRD(amount: number, inputCurrency: 'USD' | 'RD', dollarRate: number): number {
  return inputCurrency === 'RD' ? amount : convertUsdToRd(amount, dollarRate);
}

/**
 * Formats a currency dynamically based on selected mode
 */
export function formatCurrencyByMode(amount: number, currency: 'USD' | 'RD'): string {
  return currency === 'USD' ? formatUSD(amount) : formatRD(amount);
}
