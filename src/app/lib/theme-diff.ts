import type { ThemeColors } from '../../imports/themes';

export interface TokenDiff {
  token: keyof ThemeColors;
  valueA: string;
  valueB: string;
  changed: boolean;
}

export function computeTokenDiff(colorsA: ThemeColors, colorsB: ThemeColors): TokenDiff[] {
  const keys = Object.keys(colorsA) as (keyof ThemeColors)[];
  return keys.map(token => ({
    token,
    valueA: colorsA[token],
    valueB: colorsB[token],
    changed: colorsA[token] !== colorsB[token]
  }));
}

export function getDiffCount(colorsA: ThemeColors, colorsB: ThemeColors): number {
  return computeTokenDiff(colorsA, colorsB).filter(d => d.changed).length;
}