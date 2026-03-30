import { useMemo } from 'react';
import type { ThemeDef } from '../../../imports/themes';
import { ThemeCard } from '../../components/ThemeCard';
import { mono } from '../../../imports/shared';

interface ArenaTabProps {
  allThemes: Record<string, ThemeDef>;
  themeNames: string[];
  scores: Record<string, number>;
  onVote: (name: string) => void;
  arenaFamily: string;
  onArenaFamilyChange: (family: string) => void;
  arenaScreen: string;
  onArenaScreenChange: (screen: string) => void;
  families: string[];
  screens: string[];
}

export function ArenaTab({ allThemes, themeNames, scores, onVote, arenaFamily, onArenaFamilyChange, arenaScreen, onArenaScreenChange, families, screens }: ArenaTabProps) {
  const arenaThemes = useMemo(() => themeNames.filter(n => allThemes[n].family === arenaFamily), [themeNames, allThemes, arenaFamily]);
  const ranking = useMemo(() => [...themeNames].sort((a, b) => scores[b] - scores[a]).filter(n => scores[n] > 0), [themeNames, scores]);

  return (
    <div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap', alignItems: 'center' }}>
        <span style={{ fontSize: 11, color: '#52525b' }}>Family:</span>
        {families.map(f => (
          <button key={f} onClick={() => onArenaFamilyChange(f)}
            style={{ padding: '4px 12px', fontSize: 11, cursor: 'pointer', fontFamily: 'inherit',
              background: arenaFamily === f ? '#a78bfa' : 'transparent',
              color: arenaFamily === f ? '#09090b' : '#71717a',
              border: `1px solid ${arenaFamily === f ? '#a78bfa' : '#27272a'}`,
              fontWeight: arenaFamily === f ? 600 : 400 }}>
            {f}
          </button>
        ))}
        <span style={{ width: 1, background: '#27272a', margin: '0 8px', height: 20 }} />
        <span style={{ fontSize: 11, color: '#52525b' }}>Screen:</span>
        {screens.map(s => (
          <button key={s} onClick={() => onArenaScreenChange(s)}
            style={{ padding: '4px 10px', fontSize: 11, cursor: 'pointer', fontFamily: 'inherit',
              background: arenaScreen === s ? '#3f3f46' : 'transparent',
              color: arenaScreen === s ? '#fafafa' : '#52525b',
              border: `1px solid ${arenaScreen === s ? '#3f3f46' : '#27272a'}` }}>
            {s}
          </button>
        ))}
      </div>
      <div style={{ fontSize: 13, color: '#a1a1aa', marginBottom: 12 }}>
        Comparing <strong>{arenaFamily}</strong>: current vs proposed, light &amp; dark. Click &quot;Vote&quot; under your preference.
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {arenaThemes.map(name => {
          const theme = allThemes[name];
          return <ThemeCard key={name} name={name} theme={theme} screen={arenaScreen} onVote={() => onVote(name)} score={scores[name]} />;
        })}
      </div>
      {ranking.length > 0 && (
        <div style={{ marginTop: 20, background: '#18181b', padding: 16, border: '1px solid #27272a' }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#fafafa', marginBottom: 10 }}>Leaderboard</div>
          {ranking.map((name, i) => {
            const theme = allThemes[name];
            const maxScore = Math.max(...Object.values(scores), 1);
            return (
              <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, padding: '4px 0' }}>
                <span style={{ ...mono, fontSize: 14, fontWeight: 800, color: i === 0 ? '#fbbf24' : '#52525b', width: 20 }}>{i + 1}</span>
                <div style={{ width: 14, height: 14, background: theme.colors.pri }} />
                <span style={{ fontSize: 12, fontWeight: 500, color: '#fafafa', width: 200 }}>{name}</span>
                <div style={{ flex: 1, height: 4, background: '#27272a' }}>
                  <div style={{ height: '100%', background: theme.colors.pri, width: `${(scores[name] / maxScore) * 100}%`, transition: 'width 0.3s' }} />
                </div>
                <span style={{ ...mono, fontSize: 12, fontWeight: 700, color: '#fafafa', width: 24, textAlign: 'right' }}>{scores[name]}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
