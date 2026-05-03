const nzdFormatter = new Intl.NumberFormat('en-NZ', {
  style: 'currency',
  currency: 'NZD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export function fmt(value: number): string {
  return nzdFormatter.format(Math.round(value));
}

export function fmtRate(value: number, decimals = 2): string {
  return `${(value * 100).toFixed(decimals)}%`;
}
