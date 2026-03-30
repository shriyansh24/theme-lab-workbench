import type { ThemeDef, ThemeColors } from '../../../imports/themes';
import { contrastRatio } from '../../lib/theme-audit';
import { mono, display } from '../../../imports/shared';

interface AuditTabProps {
  allThemes: Record<string, ThemeDef>;
  themeNames: string[];
}

type Usage = 'text' | 'ui' | 'fill' | 'decorative';

const usageLabel: Record<Usage, string> = {
  text: 'Body text',
  ui: 'UI element',
  fill: 'Badge fill',
  decorative: 'Hint only'
};

const usageMinRatio: Record<Usage, number> = {
  text: 4.5,
  ui: 3.0,
  fill: 3.0,
  decorative: 0
};

const usageBg: Record<Usage, string> = {
  text: '#1e293b',
  ui: '#1a2e05',
  fill: '#2e1a05',
  decorative: '#1a1a2e'
};

const usageColor: Record<Usage, string> = {
  text: '#93c5fd',
  ui: '#86efac',
  fill: '#fbbf24',
  decorative: '#a78bfa'
};

const checks: { label: string; fg: keyof ThemeColors; bg: keyof ThemeColors; usage: Usage; note: string }[] = [
  { label: 'text / bg', fg: 'text', bg: 'bg', usage: 'text', note: 'Primary body text — must pass AA' },
  { label: 'textSec / bg', fg: 'textSec', bg: 'bg', usage: 'text', note: 'Secondary body text — must pass AA' },
  { label: 'textMut / bg', fg: 'textMut', bg: 'bg', usage: 'decorative', note: 'Timestamps, placeholders — decorative only, no minimum' },
  { label: 'pri / bg', fg: 'pri', bg: 'bg', usage: 'ui', note: 'Primary accent as text (links, stat numbers) — 3:1 min for large, 4.5:1 for small' },
  { label: 'suc / bg', fg: 'suc', bg: 'bg', usage: 'fill', note: 'Mainly used as badge fill (white text on suc), not as text color on bg' },
  { label: 'warn / bg', fg: 'warn', bg: 'bg', usage: 'fill', note: 'Mainly used as badge fill, not as text color on bg' },
  { label: 'dan / bg', fg: 'dan', bg: 'bg', usage: 'fill', note: 'Mainly used as badge fill or destructive button bg' },
  { label: 'text / bgEl', fg: 'text', bg: 'bgEl', usage: 'text', note: 'Body text on cards/panels — must pass AA' },
  { label: 'pri / bgEl', fg: 'pri', bg: 'bgEl', usage: 'ui', note: 'Accent on cards (buttons, links) — 3:1 min' },
  { label: 'sideATxt / sideABg', fg: 'sideATxt', bg: 'sideABg', usage: 'text', note: 'Sidebar active item label — must pass AA' },
  { label: 'textMut / bgEl', fg: 'textMut', bg: 'bgEl', usage: 'decorative', note: 'Muted text on cards (salary, date labels)' },
  { label: 'pri / bgTer', fg: 'pri', bg: 'bgTer', usage: 'ui', note: 'Progress bar fill contrast against tertiary bg' },
  { label: 'text / bgSec', fg: 'text', bg: 'bgSec', usage: 'text', note: 'Text in sidebar / secondary panels' }
];

const shortName = (n: string) =>
  n
    .replace('[Current] ', 'C:')
    .replace('[Proposed] ', 'P:')
    .replace('[Shadcn] ', 'S:')
    .replace('[Refero] ', 'R:')
    .replace('[Research] ', 'X:');

export function AuditTab({ allThemes, themeNames }: AuditTabProps) {
  return (
    <div>
      <p style={{ fontSize: 13, color: '#71717a', marginBottom: 8 }}>
        WCAG 2.1 contrast audit — {themeNames.length} themes. Minimum depends on how the token is actually used:
      </p>
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        {(['text', 'ui', 'fill', 'decorative'] as Usage[]).map(u => (
          <span key={u} style={{ ...mono, fontSize: 10, padding: '2px 8px', background: usageBg[u], color: usageColor[u] }}>
            {usageLabel[u]}: {usageMinRatio[u] > 0 ? `≥${usageMinRatio[u]}:1` : 'no min'}
          </span>
        ))}
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 11 }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #27272a' }}>
              <th
                style={{
                  textAlign: 'left',
                  padding: 8,
                  color: '#71717a',
                  position: 'sticky',
                  left: 0,
                  background: '#09090b',
                  zIndex: 2,
                  minWidth: 140
                }}
              >
                Check
              </th>
              <th
                style={{
                  textAlign: 'center',
                  padding: 8,
                  color: '#71717a',
                  position: 'sticky',
                  left: 140,
                  background: '#09090b',
                  zIndex: 2,
                  minWidth: 70
                }}
              >
                Usage
              </th>
              {themeNames.map(n => (
                <th key={n} style={{ padding: '8px 4px', color: '#52525b', fontSize: 8, textAlign: 'center', minWidth: 60 }}>
                  {shortName(n)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {checks.map(({ label, fg, bg, usage, note }) => (
              <tr key={label} style={{ borderBottom: '1px solid #1a1a1a' }} title={note}>
                <td
                  style={{
                    ...mono,
                    padding: 8,
                    color: '#a1a1aa',
                    position: 'sticky',
                    left: 0,
                    background: '#09090b',
                    zIndex: 1
                  }}
                >
                  {label}
                </td>
                <td
                  style={{
                    textAlign: 'center',
                    padding: 4,
                    position: 'sticky',
                    left: 140,
                    background: '#09090b',
                    zIndex: 1
                  }}
                >
                  <span
                    style={{
                      ...mono,
                      fontSize: 8,
                      padding: '1px 5px',
                      background: usageBg[usage],
                      color: usageColor[usage]
                    }}
                  >
                    {usageLabel[usage]}
                  </span>
                </td>
                {themeNames.map(n => {
                  const ratio = contrastRatio(allThemes[n].colors[fg], allThemes[n].colors[bg]);
                  const minRequired = usageMinRatio[usage];
                  const grade = ratio >= 7 ? 'AAA' : ratio >= 4.5 ? 'AA' : ratio >= 3 ? 'AA-lg' : 'FAIL';
                  const passes = minRequired === 0 || ratio >= minRequired;
                  const badgeBg = passes
                    ? ratio >= 7
                      ? '#065f46'
                      : ratio >= 4.5
                      ? '#1e3a5f'
                      : '#14532d'
                    : '#7f1d1d';
                  const badgeColor = passes
                    ? ratio >= 7
                      ? '#6ee7b7'
                      : ratio >= 4.5
                      ? '#7dd3fc'
                      : '#86efac'
                    : '#fca5a5';
                  return (
                    <td key={n} style={{ textAlign: 'center', padding: 4 }}>
                      <span
                        style={{
                          ...mono,
                          fontSize: 9,
                          padding: '1px 5px',
                          background: badgeBg,
                          color: badgeColor,
                          fontWeight: 600
                        }}
                      >
                        {grade} {ratio.toFixed(1)}
                      </span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Token usage guide */}
      <div style={{ marginTop: 24, background: '#111', border: '2px solid #27272a', padding: 16 }}>
        <div style={{ ...display, fontSize: 14, fontWeight: 700, color: '#fafafa', marginBottom: 12 }}>
          Token Usage Map
        </div>
        <div style={{ fontSize: 12, color: '#71717a', marginBottom: 12 }}>
          How each color token is actually used in the UI — determines whether a contrast failure is a real bug or acceptable.
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {[
            { token: 'text', where: 'Headings, body paragraphs, table cells', verdict: 'Must pass AA (4.5:1)' },
            { token: 'textSec', where: 'Subtitles, descriptions, sidebar labels', verdict: 'Must pass AA (4.5:1)' },
            {
              token: 'textMut',
              where: 'Timestamps, placeholders, axis labels, salary ranges',
              verdict: 'Decorative — no hard minimum, but ≥3:1 is nice'
            },
            {
              token: 'pri',
              where: 'Stat numbers (large), links (small), button bg',
              verdict: '≥3:1 as large text/icon, ≥4.5:1 as small text'
            },
            {
              token: 'suc / warn / dan',
              where: 'Badge fills (text is white/black via textOn), toast accents',
              verdict: 'Contrast matters for textOn(fill), not fill-on-bg'
            },
            {
              token: 'sideATxt / sideABg',
              where: 'Active sidebar nav item',
              verdict: 'Must pass AA (4.5:1) — this is readable text'
            },
            {
              token: 'ch1–ch6',
              where: 'Chart bars, pie segments, legend dots',
              verdict: 'Decorative / adjacent-color distinguishability'
            },
            {
              token: 'border / shadow',
              where: 'Card borders, hard-offset shadows',
              verdict: 'Visual separation only, no text contrast needed'
            }
          ].map(row => (
            <div
              key={row.token}
              style={{
                background: '#18181b',
                padding: 10,
                borderLeft: '3px solid #a78bfa'
              }}
            >
              <div style={{ ...mono, fontSize: 11, fontWeight: 700, color: '#a78bfa', marginBottom: 4 }}>
                {row.token}
              </div>
              <div style={{ fontSize: 11, color: '#a1a1aa', marginBottom: 4 }}>{row.where}</div>
              <div style={{ fontSize: 10, color: '#71717a' }}>{row.verdict}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}