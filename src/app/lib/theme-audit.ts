// Contrast ratio calculation utilities

function hexToRGB(hex: string): [number, number, number] {
  const clean = hex.replace('#', '');
  const r = parseInt(clean.substr(0, 2), 16);
  const g = parseInt(clean.substr(2, 2), 16);
  const b = parseInt(clean.substr(4, 2), 16);
  return [r, g, b];
}

function luminance(hex: string): number {
  const [r, g, b] = hexToRGB(hex);
  const [rs, gs, bs] = [r, g, b].map(c => {
    const val = c / 255;
    return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

export function contrastRatio(fg: string, bg: string): number {
  const l1 = luminance(fg);
  const l2 = luminance(bg);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

export function textOn(bg: string): string {
  return luminance(bg) > 0.5 ? '#000000' : '#ffffff';
}

export type ContrastLevel = 'AAA' | 'AA' | 'AA-lg' | 'FAIL';

export function getContrastLevel(ratio: number): ContrastLevel {
  if (ratio >= 7) return 'AAA';
  if (ratio >= 4.5) return 'AA';
  if (ratio >= 3) return 'AA-lg';
  return 'FAIL';
}

export interface ContrastCheck {
  passes: boolean;
  ratio: number;
  level: ContrastLevel;
}

export function checkContrast(fg: string, bg: string, minRequired: number): ContrastCheck {
  const ratio = contrastRatio(fg, bg);
  const level = getContrastLevel(ratio);
  const passes = minRequired === 0 || ratio >= minRequired;
  return { passes, ratio, level };
}