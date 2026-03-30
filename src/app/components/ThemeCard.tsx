import type { ThemeDef } from '../../imports/themes';
import { ScreenPreview } from './ScreenPreview';

interface ThemeCardProps {
  name: string;
  theme: ThemeDef;
  screen: string;
  onVote?: () => void;
  score?: number;
  onFavorite?: () => void;
  isFavorite?: boolean;
}

const SOURCE_COLORS = {
  current: { bg: '#1e293b', color: '#94a3b8' },
  proposed: { bg: '#1a2e05', color: '#86efac' },
  shadcn: { bg: '#2e1a05', color: '#fbbf24' },
  refero: { bg: '#1a052e', color: '#c084fc' },
  research: { bg: '#052e1a', color: '#67e8f9' }
};

export function ThemeCard({ name, theme, screen, onVote, score, onFavorite, isFavorite }: ThemeCardProps) {
  const sourceStyle = SOURCE_COLORS[theme.source];
  const modeStyle = theme.mode === 'light'
    ? { bg: '#fef3c7', color: '#92400e' }
    : { bg: '#1e293b', color: '#94a3b8' };

  return (
    <div style={{ border: '2px solid #27272a', overflow: 'hidden' }}>
      <div style={{ padding: '8px 12px', background: '#18181b', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 12, height: 12, background: theme.colors.pri }} />
          <span style={{ fontSize: 13, fontWeight: 600, color: '#fafafa' }}>{name}</span>
          <span style={{ fontSize: 10, color: '#52525b' }}>{theme.gray} + {theme.accent}</span>
        </div>
        <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
          {onFavorite && (
            <button
              onClick={onFavorite}
              style={{ fontSize: 14, background: 'transparent', border: 'none', cursor: 'pointer', padding: '2px 6px' }}
              title={isFavorite ? 'Unfavorite' : 'Favorite'}
            >
              {isFavorite ? '\u2605' : '\u2606'}
            </button>
          )}
          <span style={{ fontSize: 10, padding: '2px 6px', background: sourceStyle.bg, color: sourceStyle.color }}>
            {theme.source}
          </span>
          <span style={{ fontSize: 10, padding: '2px 6px', background: modeStyle.bg, color: modeStyle.color }}>
            {theme.mode}
          </span>
        </div>
      </div>
      <ScreenPreview colors={theme.colors} screen={screen} radius={theme.radius} />
      {onVote !== undefined && (
        <div style={{ padding: 8, background: '#111', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontFamily: 'monospace', fontSize: 12, color: '#52525b' }}>Score: {score ?? 0}</span>
          <button
            onClick={onVote}
            style={{ background: theme.colors.pri, color: '#fff', border: '2px solid #27272a', padding: '5px 16px', fontSize: 11, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}
          >
            Vote
          </button>
        </div>
      )}
    </div>
  );
}