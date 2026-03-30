import { contrastRatio, getContrastLevel, type ContrastLevel } from '../lib/theme-audit';
import { mono } from '../../imports/shared';

interface ContrastPillProps {
  fg: string;
  bg: string;
  showRatio?: boolean;
}

const LEVEL_STYLES: Record<ContrastLevel, { bg: string; color: string }> = {
  AAA: { bg: '#065f46', color: '#6ee7b7' },
  AA: { bg: '#1e3a5f', color: '#7dd3fc' },
  'AA-lg': { bg: '#14532d', color: '#86efac' },
  FAIL: { bg: '#7f1d1d', color: '#fca5a5' }
};

export function ContrastPill({ fg, bg, showRatio = true }: ContrastPillProps) {
  const ratio = contrastRatio(fg, bg);
  const level = getContrastLevel(ratio);
  const style = LEVEL_STYLES[level];

  return (
    <span
      style={{
        ...mono,
        fontSize: 9,
        padding: '1px 5px',
        background: style.bg,
        color: style.color,
        fontWeight: 600,
        borderRadius: 2
      }}
    >
      {level} {showRatio && ratio.toFixed(1)}
    </span>
  );
}