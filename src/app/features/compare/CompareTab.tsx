import { useState } from 'react';
import type { ThemeDef, ThemeColors } from '../../../imports/themes';
import { ScreenPreview } from '../../components/ScreenPreview';
import { computeTokenDiff } from '../../lib/theme-diff';
import { mono } from '../../../imports/shared';

interface CompareTabProps {
  allThemes: Record<string, ThemeDef>;
  themeNames: string[];
  screen: string;
  onScreenChange: (screen: string) => void;
  screens: string[];
  families: string[];
}

export function CompareTab({ allThemes, themeNames, screen, onScreenChange, screens, families }: CompareTabProps) {
  const [compareA, setCompareA] = useState(themeNames[0]);
  const [compareB, setCompareB] = useState(themeNames[8] || themeNames[1]);
  const [showOnlyDifferent, setShowOnlyDifferent] = useState(false);

  const themeA = allThemes[compareA];
  const themeB = allThemes[compareB];
  const diffs = computeTokenDiff(themeA.colors, themeB.colors);
  const displayedDiffs = showOnlyDifferent ? diffs.filter(d => d.changed) : diffs;

  const quickCompare = (family: string, mode: 'light' | 'dark') => {
    const cur = themeNames.find(n => allThemes[n].family === family && allThemes[n].source === 'current' && allThemes[n].mode === mode);
    const pro = themeNames.find(n => allThemes[n].family === family && allThemes[n].source === 'proposed' && allThemes[n].mode === mode);
    if (cur && pro) {
      setCompareA(cur);
      setCompareB(pro);
    }
  };

  return (
    <div>
      {/* Controls */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 16, flexWrap: 'wrap' }}>
        <div>
          <div style={{ fontSize: 11, color: '#71717a', marginBottom: 4 }}>Left (A)</div>
          <select
            value={compareA}
            onChange={e => setCompareA(e.target.value)}
            style={{
              background: '#18181b',
              color: '#fafafa',
              border: '1px solid #27272a',
              padding: '6px 10px',
              fontSize: 12,
              fontFamily: 'inherit'
            }}
          >
            {themeNames.map(n => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>
        <div>
          <div style={{ fontSize: 11, color: '#71717a', marginBottom: 4 }}>Right (B)</div>
          <select
            value={compareB}
            onChange={e => setCompareB(e.target.value)}
            style={{
              background: '#18181b',
              color: '#fafafa',
              border: '1px solid #27272a',
              padding: '6px 10px',
              fontSize: 12,
              fontFamily: 'inherit'
            }}
          >
            {themeNames.map(n => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>

        {/* Quick compare shortcuts */}
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 4, alignItems: 'flex-end', flexWrap: 'wrap' }}>
          <span style={{ fontSize: 10, color: '#52525b', alignSelf: 'center' }}>Quick:</span>
          {families.map(f => (
            <button
              key={f}
              onClick={() => quickCompare(f, 'dark')}
              style={{
                padding: '4px 8px',
                fontSize: 10,
                background: '#27272a',
                color: '#a1a1aa',
                border: '1px solid #3f3f46',
                cursor: 'pointer',
                fontFamily: 'inherit'
              }}
            >
              {f} (dark)
            </button>
          ))}
        </div>
      </div>

      {/* Screen selector */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 12, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 11, color: '#52525b', alignSelf: 'center', marginRight: 4 }}>Screen:</span>
        {screens.map(s => (
          <button
            key={s}
            onClick={() => onScreenChange(s)}
            style={{
              padding: '4px 10px',
              fontSize: 11,
              cursor: 'pointer',
              fontFamily: 'inherit',
              background: screen === s ? '#a78bfa' : 'transparent',
              color: screen === s ? '#09090b' : '#71717a',
              border: `1px solid ${screen === s ? '#a78bfa' : '#27272a'}`,
              fontWeight: screen === s ? 600 : 400
            }}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Side-by-side previews */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
        {[{ name: compareA, theme: themeA }, { name: compareB, theme: themeB }].map(({ name, theme }) => (
          <div key={name} style={{ border: '2px solid #27272a', overflow: 'hidden' }}>
            <div style={{ padding: '8px 12px', background: '#18181b', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 10, height: 10, background: theme.colors.pri }} />
                <span style={{ fontSize: 12, fontWeight: 600, color: '#fafafa' }}>{name}</span>
              </div>
              <span style={{ fontSize: 10, color: '#52525b' }}>{theme.gray} + {theme.accent}</span>
            </div>
            <ScreenPreview colors={theme.colors} screen={screen} radius={theme.radius ?? 0} />
            
            {/* Color swatches */}
            <div style={{ padding: '8px 12px', background: '#111', display: 'flex', gap: 3, flexWrap: 'wrap' }}>
              {(['bg', 'bgSec', 'bgTer', 'bgEl', 'text', 'textSec', 'textMut', 'pri', 'suc', 'warn', 'dan', 'border', 'ch1', 'ch2', 'ch3', 'ch4', 'ch5', 'ch6'] as (keyof ThemeColors)[]).map(k => (
                <div
                  key={k}
                  title={`${k}: ${theme.colors[k]}`}
                  style={{
                    width: 18,
                    height: 18,
                    background: theme.colors[k],
                    border: '1px solid #27272a'
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Token diff table */}
      <div style={{ background: '#09090b', border: '1px solid #27272a', padding: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#fafafa' }}>Token Differences</div>
          <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#a1a1aa', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={showOnlyDifferent}
              onChange={e => setShowOnlyDifferent(e.target.checked)}
              style={{ cursor: 'pointer' }}
            />
            Show only different
          </label>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #27272a' }}>
                <th style={{ ...mono, textAlign: 'left', padding: 8, color: '#71717a', fontSize: 11 }}>Token</th>
                <th style={{ textAlign: 'left', padding: 8, color: '#71717a', fontSize: 11 }}>A: {compareA}</th>
                <th style={{ textAlign: 'left', padding: 8, color: '#71717a', fontSize: 11 }}>B: {compareB}</th>
                <th style={{ textAlign: 'center', padding: 8, color: '#71717a', fontSize: 11 }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {displayedDiffs.map(({ token, valueA, valueB, changed }) => (
                <tr key={token} style={{ borderBottom: '1px solid #1a1a1a' }}>
                  <td style={{ ...mono, padding: 8, color: '#a1a1aa', fontSize: 11 }}>{token}</td>
                  <td style={{ padding: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 20, height: 20, background: valueA, border: '1px solid #3f3f46' }} />
                      <span style={{ ...mono, fontSize: 11, color: '#a1a1aa' }}>{valueA}</span>
                    </div>
                  </td>
                  <td style={{ padding: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 20, height: 20, background: valueB, border: '1px solid #3f3f46' }} />
                      <span style={{ ...mono, fontSize: 11, color: '#a1a1aa' }}>{valueB}</span>
                    </div>
                  </td>
                  <td style={{ textAlign: 'center', padding: 8 }}>
                    {changed ? (
                      <span style={{ ...mono, fontSize: 9, padding: '2px 6px', background: '#b45309', color: '#fbbf24', fontWeight: 600 }}>
                        CHANGED
                      </span>
                    ) : (
                      <span style={{ ...mono, fontSize: 9, padding: '2px 6px', background: '#14532d', color: '#86efac' }}>
                        SAME
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showOnlyDifferent && displayedDiffs.length === 0 && (
          <div style={{ textAlign: 'center', padding: 32, color: '#52525b', fontSize: 13 }}>
            No differences found between these themes
          </div>
        )}
      </div>
    </div>
  );
}