import { useState, useCallback, useEffect } from 'react';
import '../styles/index.css';
import { ALL_THEMES, THEME_NAMES, FAMILIES } from '../imports/themes';
import type { ThemeDef } from '../imports/themes';
import { sans, display } from '../imports/shared';
import { storage } from './lib/storage';
import { BrowseTab } from './features/browse/BrowseTab';
import { CompareTab } from './features/compare/CompareTab';
import { ArenaTab } from './features/arena/ArenaTab';
import { AuditTab } from './features/audit/AuditTab';
import { LabTab } from './features/lab/LabTab';
import { ExportTab } from './features/export/ExportTab';

const SCREENS = ['Dashboard', 'Jobs', 'Pipeline', 'Analytics', 'Copilot', 'Settings', 'Login', 'Vault', 'Networking', 'Companies'];
type Tab = 'browse' | 'compare' | 'lab' | 'arena' | 'audit' | 'export';

export default function App() {
  const [tab, setTab] = useState<Tab>('browse');
  const [screen, setScreen] = useState('Dashboard');
  const [scores, setScores] = useState<Record<string, number>>(() => Object.fromEntries(THEME_NAMES.map(n => [n, 0])));
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [filterSource, setFilterSource] = useState<'all' | 'current' | 'proposed' | 'shadcn' | 'refero' | 'research'>('all');
  const [filterMode, setFilterMode] = useState<'all' | 'light' | 'dark'>('all');
  const [filterFamily, setFilterFamily] = useState<string>('all');
  const [arenaFamily, setArenaFamily] = useState('Default');
  const [arenaScreen, setArenaScreen] = useState('Dashboard');
  const [labTheme, setLabTheme] = useState(THEME_NAMES[0]);
  const [exportTheme, setExportTheme] = useState(THEME_NAMES[0]);

  useEffect(() => storage.set('TAB', tab), [tab]);
  useEffect(() => storage.set('SCREEN', screen), [screen]);
  useEffect(() => storage.set('ARENA_SCORES', scores), [scores]);
  useEffect(() => storage.set('FAVORITES', Array.from(favorites)), [favorites]);

  const vote = useCallback((name: string) => { setScores(s => ({ ...s, [name]: s[name] + 1 })); }, []);
  const toggleFavorite = useCallback((name: string) => {
    setFavorites(prev => { const next = new Set(prev); if (next.has(name)) { next.delete(name); } else { next.add(name); } return next; });
  }, []);

  const tabBtn = (id: Tab, label: string) => (
    <button key={id} onClick={() => setTab(id)}
      style={{ padding: '8px 16px', fontSize: 13, fontWeight: tab === id ? 600 : 400, cursor: 'pointer',
        background: tab === id ? '#fafafa' : 'transparent', color: tab === id ? '#09090b' : '#71717a',
        border: tab === id ? '2px solid #09090b' : '2px solid #27272a', fontFamily: 'inherit',
        boxShadow: tab === id ? '2px 2px 0 0 #09090b' : 'none' }}>
      {label}
    </button>
  );

  return (
    <div style={{ ...sans, maxWidth: 1400, margin: '0 auto', padding: 20, color: '#e5e5e5', background: '#09090b', minHeight: '100vh' }}>
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ ...display, fontSize: 24, fontWeight: 800, color: '#fafafa', marginBottom: 4, letterSpacing: -0.5 }}>JobRadar Theme Lab</h1>
        <p style={{ fontSize: 13, color: '#71717a', marginBottom: 16 }}>
          {THEME_NAMES.length} theme variants across 5 sources \u00b7 10 mock screens \u00b7 compare, edit, audit, and export
        </p>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {tabBtn('browse', 'Browse')}
          {tabBtn('compare', 'Compare')}
          {tabBtn('lab', 'Lab')}
          {tabBtn('arena', 'Arena')}
          {tabBtn('audit', 'Audit')}
          {tabBtn('export', 'Export')}
        </div>
      </div>
      {tab === 'browse' && <BrowseTab allThemes={ALL_THEMES} themeNames={THEME_NAMES} screen={screen} onScreenChange={setScreen} screens={SCREENS} filterSource={filterSource} onFilterSourceChange={setFilterSource} filterMode={filterMode} onFilterModeChange={setFilterMode} filterFamily={filterFamily} onFilterFamilyChange={setFilterFamily} families={FAMILIES} favorites={favorites} onToggleFavorite={toggleFavorite} />}
      {tab === 'compare' && <CompareTab allThemes={ALL_THEMES} themeNames={THEME_NAMES} screen={screen} onScreenChange={setScreen} screens={SCREENS} families={FAMILIES} />}
      {tab === 'lab' && <LabTab initialTheme={{ colors: ALL_THEMES[labTheme].colors, radius: ALL_THEMES[labTheme].radius ?? 0 }} themeName={labTheme} allThemeNames={THEME_NAMES} onThemeChange={setLabTheme} screen={screen} screens={SCREENS} onScreenChange={setScreen} />}
      {tab === 'arena' && <ArenaTab allThemes={ALL_THEMES} themeNames={THEME_NAMES} scores={scores} onVote={vote} arenaFamily={arenaFamily} onArenaFamilyChange={setArenaFamily} arenaScreen={arenaScreen} onArenaScreenChange={setArenaScreen} families={FAMILIES} screens={SCREENS} />}
      {tab === 'audit' && <AuditTab allThemes={ALL_THEMES} themeNames={THEME_NAMES} />}
      {tab === 'export' && (
        <div>
          <div style={{ display: 'flex', gap: 16, marginBottom: 16, alignItems: 'center' }}>
            <div>
              <label style={{ fontSize: 11, color: '#71717a', marginBottom: 4, display: 'block' }}>Select Theme:</label>
              <select value={exportTheme} onChange={e => setExportTheme(e.target.value)}
                style={{ background: '#18181b', color: '#fafafa', border: '1px solid #27272a', padding: '6px 10px', fontSize: 12, fontFamily: 'inherit' }}>
                {THEME_NAMES.map(n => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>
          </div>
          <ExportTab selectedTheme={exportTheme} theme={ALL_THEMES[exportTheme]} allThemes={ALL_THEMES} />
        </div>
      )}
    </div>
  );
}
