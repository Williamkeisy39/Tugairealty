export function formatCurrency(value: number, currency = 'KES') {
  if (!Number.isFinite(value) || value <= 0) {
    return 'Inquire';
  }

  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0
  }).format(value);
}

export function range(start: number, end: number) {
  return Array.from({ length: end - start + 1 }, (_, idx) => start + idx);
}

export function cn(...classes: (string | undefined | false | null)[]) {
  return classes.filter(Boolean).join(' ');
}

export function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export function splitList(input: string) {
  return input
    .split(/\r?\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);
}
