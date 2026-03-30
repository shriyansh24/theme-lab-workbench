import { useMemo } from 'react';
import type { ThemeDef } from '../../../imports/themes';
import { ThemeCard } from '../../components/ThemeCard';

interface BrowseTabProps {
  allThemes: Record<string, ThemeDef>;
  themeNames: string[];
  screen: string;
  onScreenChange: (screen: string) => void;
  screens: string[];
  filterSource: 'all' | 'current' | 'proposed' | 'shadcn' | 'refero' | 'research';
  onFilterSourceChange: (source: any) => void;
  filterMode: 'all' | 'light' | 'dark';
  onFilterModeChange: (mode: any) => void;
  filterFamily: string;
  onFilterFamilyChange: (family: string) => void;
  families: string[];
  favorites: Set<string>;
  onToggleFavorite: (name: string) => void;
}

export function BrowseTab({
  allThemes,
  themeNames,
  screen,
  onScreenChange,
  screens,
  filterSource,
  onFilterSourceChange,
  filterMode,
  onFilterModeChange,
  filterFamily,
  onFilterFamilyChange,
  families,
  favorites,
  onToggleFavorite
}: BrowseTabProps) {
  const filtered = useMemo(() => {
    return themeNames.filter(n => {
      const t = allThemes[n];
      if (filterSource !== 'all' && t.source !== filterSource) return false;
      if (filterMode !== 'all' && t.mode !== filterMode) return false;
      if (filterFamily !== 'all' && t.family !== filterFamily) return false;
      return true;
    });
  }, [themeNames, allThemes, filterSource, filterMode, filterFamily]);

  const filterBtn = (value: string, current: string, setter: (v: any) => void, label: string) => (
    <button
      key={label}
      onClick={() => setter(value)}
      style={{
        padding: '4px 10px',
        fontSize: 11,
        cursor: 'pointer',
        fontFamily: 'inherit',
        background: current === value ? '#3f3f46' : 'transparent',
        color: current === value ? '#fafafa' : '#71717a',
        border: `1px solid ${current === value ? '#3f3f46' : '#27272a'}`
      }}
    >
      {label}
    </button>
  );

  return (
    <div>
      {/* Filters */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 16, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 11, color: '#52525b', alignSelf: 'center', marginRight: 4 }}>Filter:</span>
        {filterBtn('all', filterSource, onFilterSourceChange, 'All')}
        {filterBtn('current', filterSource, onFilterSourceChange, 'Current')}
        {filterBtn('proposed', filterSource, onFilterSourceChange, 'Proposed')}
        {filterBtn('shadcn', filterSource, onFilterSourceChange, 'Shadcn')}
        {filterBtn('refero', filterSource, onFilterSourceChange, 'Refero')}
        {filterBtn('research', filterSource, onFilterSourceChange, 'Research')}
        <span style={{ width: 1, background: '#27272a', margin: '0 4px' }} />
        {filterBtn('all', filterMode, onFilterModeChange, 'Both modes')}
        {filterBtn('light', filterMode, onFilterModeChange, 'Light')}
        {filterBtn('dark', filterMode, onFilterModeChange, 'Dark')}
        <span style={{ width: 1, background: '#27272a', margin: '0 4px' }} />
        {filterBtn('all', filterFamily, onFilterFamilyChange, 'All families')}
        {families.map(f => filterBtn(f, filterFamily, onFilterFamilyChange, f))}
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

      {/* Results count */}
      <div style={{ fontSize: 12, color: '#71717a', marginBottom: 12 }}>
        Showing {filtered.length} of {themeNames.length} themes
      </div>

      {/* Theme grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(580px, 1fr))', gap: 16 }}>
        {filtered.map(name => {
          const theme = allThemes[name];
          return (
            <ThemeCard
              key={name}
              name={name}
              theme={theme}
              screen={screen}
              onFavorite={() => onToggleFavorite(name)}
              isFavorite={favorites.has(name)}
            />
          );
        })}
      </div>
    </div>
  );
}