import { useState, useMemo, useRef } from 'react';
import type { ThemeColors } from '../../../imports/themes';
import { ScreenPreview } from '../../components/ScreenPreview';
import { ContrastPill } from '../../components/ContrastPill';
import { mono } from '../../../imports/shared';
import chroma from 'chroma-js';
import { Dices, SunMoon, Wand2, Image as ImageIcon, RefreshCw } from 'lucide-react';

interface LabTabProps {
  initialTheme: { colors: ThemeColors; radius: number };
  themeName: string;
  allThemeNames: string[];
  onThemeChange: (name: string) => void;
  screen: string;
  screens: string[];
  onScreenChange: (screen: string) => void;
}

const TOKEN_GROUPS = {
  Surfaces: ['bg', 'bgSec', 'bgTer', 'bgEl', 'bgHov', 'bgAct'] as const,
  Text: ['text', 'textSec', 'textMut'] as const,
  'Brand / Intent': ['pri', 'priHov', 'suc', 'warn', 'dan'] as const,
  Structure: ['border', 'shadow', 'sideABg', 'sideATxt'] as const,
  Charts: ['ch1', 'ch2', 'ch3', 'ch4', 'ch5', 'ch6'] as const
};

export function LabTab({ initialTheme, themeName, allThemeNames, onThemeChange, screen, screens, onScreenChange }: LabTabProps) {
  const [colors, setColors] = useState<ThemeColors>(initialTheme.colors);
  const [radius, setRadius] = useState(initialTheme.radius);
  const [lockedTokens, setLockedTokens] = useState<Set<keyof ThemeColors>>(new Set());
  const fileInputRef = useRef<HTMLInputElement>(null);

  const updateColor = (token: keyof ThemeColors, value: string) => { setColors(prev => ({ ...prev, [token]: value })); };
  const resetToken = (token: keyof ThemeColors) => { setColors(prev => ({ ...prev, [token]: initialTheme.colors[token] })); };
  const resetAll = () => { setColors(initialTheme.colors); setRadius(initialTheme.radius); setLockedTokens(new Set()); };

  const randomizeTheme = () => {
    const isDark = Math.random() > 0.5;
    const baseHue = Math.random() * 360;
    const baseSat = 0.1 + Math.random() * 0.4;
    const next: Partial<ThemeColors> = {};
    next.bg = chroma.hsl(baseHue, baseSat, isDark ? 0.05 : 0.98).hex();
    next.bgSec = chroma.hsl(baseHue, baseSat, isDark ? 0.08 : 0.95).hex();
    next.bgTer = chroma.hsl(baseHue, baseSat, isDark ? 0.12 : 0.90).hex();
    next.bgEl = chroma.hsl(baseHue, baseSat, isDark ? 0.15 : 0.85).hex();
    next.bgHov = chroma.hsl(baseHue, baseSat, isDark ? 0.20 : 0.80).hex();
    next.bgAct = chroma.hsl(baseHue, baseSat, isDark ? 0.25 : 0.75).hex();
    next.text = chroma.hsl(baseHue, baseSat * 0.5, isDark ? 0.95 : 0.10).hex();
    next.textSec = chroma.hsl(baseHue, baseSat * 0.5, isDark ? 0.70 : 0.35).hex();
    next.textMut = chroma.hsl(baseHue, baseSat * 0.5, isDark ? 0.50 : 0.55).hex();
    const priHue = (baseHue + (Math.random() * 120 - 60)) % 360;
    next.pri = chroma.hsl(priHue, 0.8, 0.5).hex();
    next.priHov = chroma.hsl(priHue, 0.8, 0.4).hex();
    next.border = chroma.hsl(baseHue, baseSat, isDark ? 0.2 : 0.85).hex();
    next.shadow = isDark ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.1)';
    next.sideABg = next.bgSec;
    next.sideATxt = next.textSec;
    next.suc = chroma.hsl(140, 0.7, 0.4).hex();
    next.warn = chroma.hsl(40, 0.9, 0.5).hex();
    next.dan = chroma.hsl(0, 0.8, 0.5).hex();
    for (let i = 1; i <= 6; i++) {
      const chKey = `ch${i}` as keyof ThemeColors;
      if (!lockedTokens.has(chKey)) { next[chKey] = chroma.hsl((baseHue + i * 60) % 360, 0.7, 0.6).hex(); }
    }
    setColors(prev => {
      const updated = { ...prev };
      for (const k in next) { const key = k as keyof ThemeColors; if (!lockedTokens.has(key)) { updated[key] = next[key]!; } }
      return updated;
    });
  };

  const invertTheme = () => {
    setColors(prev => {
      const next = { ...prev };
      for (const k in next) {
        const key = k as keyof ThemeColors;
        if (!lockedTokens.has(key)) {
          try { const c = chroma(prev[key]); const [h, s, l] = c.hsl(); next[key] = chroma.hsl(h, s, 1 - l).hex(); } catch {}
        }
      }
      const isNowDark = chroma(next.bg).luminance() < 0.5;
      if (!lockedTokens.has('text')) next.text = isNowDark ? '#ffffff' : '#000000';
      if (!lockedTokens.has('shadow')) next.shadow = isNowDark ? 'rgba(0,0,0,0.8)' : 'rgba(0,0,0,0.1)';
      return next;
    });
  };

  const generateFromPrimary = () => {
    try {
      const priColor = chroma(colors.pri);
      const [h, s] = priColor.hsl();
      const isDark = chroma(colors.bg).luminance() < 0.5;
      const next: Partial<ThemeColors> = {};
      const bgSat = Math.min(s, 0.15);
      next.bg = chroma.hsl(h, bgSat, isDark ? 0.06 : 0.98).hex();
      next.bgSec = chroma.hsl(h, bgSat, isDark ? 0.10 : 0.95).hex();
      next.bgTer = chroma.hsl(h, bgSat, isDark ? 0.14 : 0.90).hex();
      next.bgEl = chroma.hsl(h, bgSat, isDark ? 0.18 : 0.85).hex();
      next.bgHov = chroma.hsl(h, bgSat, isDark ? 0.22 : 0.80).hex();
      next.bgAct = chroma.hsl(h, bgSat, isDark ? 0.26 : 0.75).hex();
      next.text = chroma.hsl(h, bgSat, isDark ? 0.95 : 0.10).hex();
      next.textSec = chroma.hsl(h, bgSat, isDark ? 0.70 : 0.40).hex();
      next.textMut = chroma.hsl(h, bgSat, isDark ? 0.50 : 0.55).hex();
      next.border = chroma.hsl(h, bgSat, isDark ? 0.25 : 0.85).hex();
      setColors(prev => {
        const updated = { ...prev };
        for (const k in next) { const key = k as keyof ThemeColors; if (!lockedTokens.has(key)) { updated[key] = next[key]!; } }
        return updated;
      });
    } catch {}
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        canvas.width = 100; canvas.height = 100;
        ctx.drawImage(img, 0, 0, 100, 100);
        const imageData = ctx.getImageData(0, 0, 100, 100).data;
        let r = 0, g = 0, b = 0, count = 0;
        for (let i = 0; i < imageData.length; i += 4 * 10) { r += imageData[i]; g += imageData[i+1]; b += imageData[i+2]; count++; }
        const avgColor = chroma([r/count, g/count, b/count]);
        const [h, s] = avgColor.hsl();
        const isDark = Math.random() > 0.5;
        const next: Partial<ThemeColors> = {};
        next.pri = avgColor.saturate(1).hex();
        next.priHov = avgColor.darken(0.5).hex();
        const bgSat = Math.min(s, 0.2);
        next.bg = chroma.hsl(h, bgSat, isDark ? 0.05 : 0.98).hex();
        next.bgSec = chroma.hsl(h, bgSat, isDark ? 0.08 : 0.95).hex();
        next.text = chroma.hsl(h, bgSat, isDark ? 0.95 : 0.10).hex();
        setColors(prev => ({ ...prev, ...next }));
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const toggleLock = (token: keyof ThemeColors) => {
    setLockedTokens(prev => { const next = new Set(prev); if (next.has(token)) { next.delete(token); } else { next.add(token); } return next; });
  };

  const hasChanges = useMemo(() => {
    return Object.keys(colors).some(k => colors[k as keyof ThemeColors] !== initialTheme.colors[k as keyof ThemeColors]) || radius !== initialTheme.radius;
  }, [colors, radius, initialTheme]);

  return (
    <div>
      <div style={{ display: 'flex', gap: 16, marginBottom: 16, padding: 12, background: '#18181b', border: '1px solid #27272a', alignItems: 'center', flexWrap: 'wrap' }}>
        <div>
          <div style={{ fontSize: 11, color: '#71717a', marginBottom: 4 }}>Base Theme</div>
          <select value={themeName} onChange={e => onThemeChange(e.target.value)}
            style={{ background: '#09090b', color: '#fafafa', border: '1px solid #3f3f46', padding: '6px 10px', fontSize: 12, fontFamily: 'inherit', cursor: 'pointer' }}>
            {allThemeNames.map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>
        <div>
          <div style={{ fontSize: 11, color: '#71717a', marginBottom: 4 }}>Radius (px)</div>
          <input type="number" value={radius} onChange={e => setRadius(Number(e.target.value))} min="0" max="20"
            style={{ background: '#09090b', color: '#fafafa', border: '1px solid #3f3f46', padding: '6px 10px', fontSize: 12, fontFamily: 'monospace', width: 60 }} />
        </div>
        <div style={{ display: 'flex', gap: 8, paddingLeft: 16, borderLeft: '1px solid #3f3f46', height: 40, alignItems: 'center' }}>
          <button onClick={randomizeTheme} title="Randomize" style={{ background: '#27272a', color: '#fafafa', border: '1px solid #3f3f46', padding: '6px 10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontSize: 11 }}>
            <Dices size={14} /> Random
          </button>
          <button onClick={invertTheme} title="Invert Light/Dark" style={{ background: '#27272a', color: '#fafafa', border: '1px solid #3f3f46', padding: '6px 10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontSize: 11 }}>
            <SunMoon size={14} /> Invert
          </button>
          <button onClick={generateFromPrimary} title="Generate scheme from Primary" style={{ background: '#27272a', color: '#fafafa', border: '1px solid #3f3f46', padding: '6px 10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontSize: 11 }}>
            <Wand2 size={14} /> Auto-scheme
          </button>
          <button onClick={() => fileInputRef.current?.click()} title="Extract palette from Image" style={{ background: '#27272a', color: '#fafafa', border: '1px solid #3f3f46', padding: '6px 10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontSize: 11 }}>
            <ImageIcon size={14} /> Image
          </button>
          <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageUpload} style={{ display: 'none' }} />
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
          {hasChanges && (
            <button onClick={resetAll} style={{ background: '#27272a', color: '#fafafa', border: '1px solid #3f3f46', padding: '6px 12px', fontSize: 11, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 6 }}>
              <RefreshCw size={12} /> Reset
            </button>
          )}
          <span style={{ fontSize: 11, color: '#71717a', alignSelf: 'center' }}>{hasChanges ? '\u25cf Modified' : '\u25cb No changes'}</span>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 4, marginBottom: 12, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 11, color: '#52525b', alignSelf: 'center', marginRight: 4 }}>Preview:</span>
        {screens.map(s => (
          <button key={s} onClick={() => onScreenChange(s)}
            style={{ padding: '4px 10px', fontSize: 11, cursor: 'pointer', fontFamily: 'inherit',
              background: screen === s ? '#a78bfa' : 'transparent', color: screen === s ? '#09090b' : '#71717a',
              border: `1px solid ${screen === s ? '#a78bfa' : '#27272a'}`, fontWeight: screen === s ? 600 : 400 }}>
            {s}
          </button>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16 }}>
        <div style={{ border: '2px solid #27272a', overflow: 'hidden' }}>
          <div style={{ padding: '8px 12px', background: '#18181b' }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#fafafa' }}>Live Preview</span>
          </div>
          <ScreenPreview colors={colors} screen={screen} radius={radius} height={600} />
        </div>
        <div style={{ border: '1px solid #27272a', background: '#09090b', padding: 16, maxHeight: 800, overflowY: 'auto' }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#fafafa', marginBottom: 16 }}>Token Editor</div>
          {Object.entries(TOKEN_GROUPS).map(([groupName, tokens]) => (
            <div key={groupName} style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#a1a1aa', marginBottom: 8, borderBottom: '1px solid #27272a', paddingBottom: 4 }}>{groupName}</div>
              {tokens.map(token => {
                const value = colors[token];
                const isLocked = lockedTokens.has(token);
                const isChanged = value !== initialTheme.colors[token];
                return (
                  <div key={token} style={{ marginBottom: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                      <span style={{ ...mono, fontSize: 11, color: '#71717a', width: 70 }}>{token}</span>
                      <button onClick={() => toggleLock(token)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: 12, padding: 0, color: isLocked ? '#fbbf24' : '#3f3f46' }} title={isLocked ? 'Locked' : 'Unlocked'}>
                        {isLocked ? '\ud83d\udd12' : '\ud83d\udd13'}
                      </button>
                      {isChanged && (
                        <button onClick={() => resetToken(token)} style={{ background: '#27272a', border: '1px solid #3f3f46', color: '#a1a1aa', fontSize: 9, padding: '2px 6px', cursor: 'pointer' }}>Reset</button>
                      )}
                    </div>
                    <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                      <input type="color" value={value.startsWith('#') && value.length === 7 ? value : '#000000'} onChange={e => updateColor(token, e.target.value)} disabled={isLocked}
                        style={{ width: 24, height: 24, padding: 0, border: '1px solid #3f3f46', cursor: isLocked ? 'not-allowed' : 'pointer', background: 'none' }} title={value} />
                      <input type="text" value={value} onChange={e => updateColor(token, e.target.value)} disabled={isLocked}
                        style={{ ...mono, flex: 1, background: isLocked ? '#18181b' : '#09090b', color: isLocked ? '#52525b' : '#fafafa', border: '1px solid #3f3f46', padding: '4px 6px', fontSize: 11 }} />
                    </div>
                    {(token === 'text' || token === 'textSec' || token === 'textMut') && (
                      <div style={{ display: 'flex', gap: 4, marginTop: 4 }}>
                        <ContrastPill fg={value} bg={colors.bg} />
                        <ContrastPill fg={value} bg={colors.bgEl} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
