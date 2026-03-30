import { useState, useCallback, useMemo } from "react";
import { ALL_THEMES, THEME_NAMES, FAMILIES, contrastRatio, textOn, type ThemeColors, type ThemeDef } from "./themes";
import { mono, display, sans } from "./shared";
import { MockShell } from "./Shell";
import { MockDashboard } from "./MockDashboard";
import { MockJobs } from "./MockJobs";
import { MockPipeline } from "./MockPipeline";
import { MockAnalytics } from "./MockAnalytics";
import { MockCopilot } from "./MockCopilot";
import { MockSettings } from "./MockSettings";
import { MockLogin } from "./MockLogin";
import { MockVault } from "./MockVault";
import { MockNetworking } from "./MockNetworking";
import { MockCompanies } from "./MockCompanies";

const SCREENS = ["Dashboard", "Jobs", "Pipeline", "Analytics", "Copilot", "Settings", "Login", "Vault", "Networking", "Companies"];

function FullMockScreen({ c, screen, r = 0 }: { c: ThemeColors; screen: string; r?: number }) {
  if (screen === "Login") {
    return <div style={{ height: 420, overflow: "hidden", ...sans }}><MockLogin c={c} r={r} /></div>;
  }
  const screenMap: Record<string, React.FC<{ c: ThemeColors; r?: number }>> = {
    Dashboard: MockDashboard, Jobs: MockJobs, Pipeline: MockPipeline, Analytics: MockAnalytics,
    Copilot: MockCopilot, Settings: MockSettings, Vault: MockVault, Networking: MockNetworking, Companies: MockCompanies,
  };
  const Screen = screenMap[screen] || MockDashboard;
  return <div style={{ height: 420, overflow: "hidden", ...sans }}><MockShell c={c} r={r} activeRoute={screen}><Screen c={c} r={r} /></MockShell></div>;
}

function ContrastBadge({ fg, bg }: { fg: string; bg: string }) {
  const ratio = contrastRatio(fg, bg);
  const pass = ratio >= 7 ? "AAA" : ratio >= 4.5 ? "AA" : "FAIL";
  const badgeBg = pass === "AAA" ? "#065f46" : pass === "AA" ? "#1e3a5f" : "#7f1d1d";
  const badgeColor = pass === "AAA" ? "#6ee7b7" : pass === "AA" ? "#7dd3fc" : "#fca5a5";
  return <span style={{ ...mono, fontSize: 9, padding: "1px 5px", background: badgeBg, color: badgeColor, fontWeight: 600 }}>{pass} {ratio.toFixed(1)}</span>;
}

type Tab = "browse" | "compare" | "arena" | "audit";

export default function App() {
  const [tab, setTab] = useState<Tab>("browse");
  const [screen, setScreen] = useState("Dashboard");
  const [filterSource, setFilterSource] = useState<"all" | "current" | "proposed" | "shadcn" | "refero" | "research">("all");
  const [filterMode, setFilterMode] = useState<"all" | "light" | "dark">("all");
  const [filterFamily, setFilterFamily] = useState<string>("all");
  const [scores, setScores] = useState<Record<string, number>>(() => Object.fromEntries(THEME_NAMES.map(n => [n, 0])));
  const [arenaFamily, setArenaFamily] = useState("Default");
  const [arenaScreen, setArenaScreen] = useState("Dashboard");
  const [compareA, setCompareA] = useState(THEME_NAMES[0]);
  const [compareB, setCompareB] = useState(THEME_NAMES[8]);

  const filtered = useMemo(() => THEME_NAMES.filter(n => {
    const t = ALL_THEMES[n];
    if (filterSource !== "all" && t.source !== filterSource) return false;
    if (filterMode !== "all" && t.mode !== filterMode) return false;
    if (filterFamily !== "all" && t.family !== filterFamily) return false;
    return true;
  }), [filterSource, filterMode, filterFamily]);

  const arenaThemes = useMemo(() => THEME_NAMES.filter(n => ALL_THEMES[n].family === arenaFamily), [arenaFamily]);
  const vote = useCallback((name: string) => { setScores(s => ({ ...s, [name]: s[name] + 1 })); }, []);
  const ranking = useMemo(() => [...THEME_NAMES].sort((a, b) => scores[b] - scores[a]).filter(n => scores[n] > 0), [scores]);

  const tabBtn = (id: Tab, label: string) => (
    <button key={id} onClick={() => setTab(id)} style={{ padding: "8px 16px", fontSize: 13, fontWeight: tab === id ? 600 : 400, cursor: "pointer", background: tab === id ? "#fafafa" : "transparent", color: tab === id ? "#09090b" : "#71717a", border: tab === id ? "2px solid #09090b" : "2px solid #27272a", fontFamily: "inherit", boxShadow: tab === id ? "2px 2px 0 0 #09090b" : "none" }}>{label}</button>
  );
  const filterBtn = (value: string, current: string, setter: (v: any) => void, label: string) => (
    <button key={label} onClick={() => setter(value)} style={{ padding: "4px 10px", fontSize: 11, cursor: "pointer", fontFamily: "inherit", background: current === value ? "#3f3f46" : "transparent", color: current === value ? "#fafafa" : "#71717a", border: `1px solid ${current === value ? "#3f3f46" : "#27272a"}` }}>{label}</button>
  );

  return (
    <div style={{ ...sans, maxWidth: 1400, margin: "0 auto", padding: 20, color: "#e5e5e5" }}>
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ ...display, fontSize: 24, fontWeight: 800, color: "#fafafa", marginBottom: 4, letterSpacing: -0.5 }}>JobRadar Theme Arena</h1>
        <p style={{ fontSize: 13, color: "#71717a", marginBottom: 16 }}>{THEME_NAMES.length} theme variants across 5 sources · 10 mock screens · side-by-side comparison · A/B voting</p>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {tabBtn("browse", "Browse All")}{tabBtn("compare", "Side-by-Side")}{tabBtn("arena", "Arena (A/B)")}{tabBtn("audit", "Contrast Audit")}
        </div>
      </div>

      {(tab === "browse" || tab === "compare") && (
        <div style={{ display: "flex", gap: 4, marginBottom: 12, flexWrap: "wrap" }}>
          <span style={{ fontSize: 11, color: "#52525b", alignSelf: "center", marginRight: 4 }}>Screen:</span>
          {SCREENS.map(s => <button key={s} onClick={() => setScreen(s)} style={{ padding: "4px 10px", fontSize: 11, cursor: "pointer", fontFamily: "inherit", background: screen === s ? "#a78bfa" : "transparent", color: screen === s ? "#09090b" : "#71717a", border: `1px solid ${screen === s ? "#a78bfa" : "#27272a"}`, fontWeight: screen === s ? 600 : 400 }}>{s}</button>)}
        </div>
      )}

      {tab === "browse" && (
        <div>
          <div style={{ display: "flex", gap: 4, marginBottom: 16, flexWrap: "wrap" }}>
            <span style={{ fontSize: 11, color: "#52525b", alignSelf: "center", marginRight: 4 }}>Filter:</span>
            {filterBtn("all", filterSource, setFilterSource, "All")}{filterBtn("current", filterSource, setFilterSource, "Current")}{filterBtn("proposed", filterSource, setFilterSource, "Proposed")}{filterBtn("shadcn", filterSource, setFilterSource, "Shadcn")}{filterBtn("refero", filterSource, setFilterSource, "Refero")}{filterBtn("research", filterSource, setFilterSource, "Research")}
            <span style={{ width: 1, background: "#27272a", margin: "0 4px" }} />
            {filterBtn("all", filterMode, setFilterMode, "Both modes")}{filterBtn("light", filterMode, setFilterMode, "Light")}{filterBtn("dark", filterMode, setFilterMode, "Dark")}
            <span style={{ width: 1, background: "#27272a", margin: "0 4px" }} />
            {filterBtn("all", filterFamily, setFilterFamily, "All families")}{FAMILIES.map(f => filterBtn(f, filterFamily, setFilterFamily, f))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(580px, 1fr))", gap: 16 }}>
            {filtered.map(name => {
              const t = ALL_THEMES[name];
              return (
                <div key={name} style={{ border: "2px solid #27272a", overflow: "hidden" }}>
                  <div style={{ padding: "8px 12px", background: "#18181b", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}><div style={{ width: 12, height: 12, background: t.colors.pri }} /><span style={{ fontSize: 13, fontWeight: 600, color: "#fafafa" }}>{name}</span><span style={{ fontSize: 10, color: "#52525b" }}>{t.gray} + {t.accent}</span></div>
                    <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                      <span style={{ fontSize: 10, padding: "2px 6px", background: { current: "#1e293b", proposed: "#1a2e05", shadcn: "#2e1a05", refero: "#1a052e", research: "#052e1a" }[t.source], color: { current: "#94a3b8", proposed: "#86efac", shadcn: "#fbbf24", refero: "#c084fc", research: "#67e8f9" }[t.source] }}>{t.source}</span>
                      <span style={{ fontSize: 10, padding: "2px 6px", background: t.mode === "light" ? "#fef3c7" : "#1e293b", color: t.mode === "light" ? "#92400e" : "#94a3b8" }}>{t.mode}</span>
                    </div>
                  </div>
                  <FullMockScreen c={t.colors} screen={screen} r={t.radius ?? 0} />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {tab === "compare" && (
        <div>
          <div style={{ display: "flex", gap: 16, marginBottom: 16 }}>
            <div><div style={{ fontSize: 11, color: "#71717a", marginBottom: 4 }}>Left (A)</div><select value={compareA} onChange={e => setCompareA(e.target.value)} style={{ background: "#18181b", color: "#fafafa", border: "1px solid #27272a", padding: "6px 10px", fontSize: 12, fontFamily: "inherit" }}>{THEME_NAMES.map(n => <option key={n} value={n}>{n}</option>)}</select></div>
            <div><div style={{ fontSize: 11, color: "#71717a", marginBottom: 4 }}>Right (B)</div><select value={compareB} onChange={e => setCompareB(e.target.value)} style={{ background: "#18181b", color: "#fafafa", border: "1px solid #27272a", padding: "6px 10px", fontSize: 12, fontFamily: "inherit" }}>{THEME_NAMES.map(n => <option key={n} value={n}>{n}</option>)}</select></div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {[compareA, compareB].map(name => {
              const t = ALL_THEMES[name];
              return (
                <div key={name} style={{ border: "2px solid #27272a", overflow: "hidden" }}>
                  <div style={{ padding: "8px 12px", background: "#18181b", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}><div style={{ width: 10, height: 10, background: t.colors.pri }} /><span style={{ fontSize: 12, fontWeight: 600, color: "#fafafa" }}>{name}</span></div>
                    <span style={{ fontSize: 10, color: "#52525b" }}>{t.gray} + {t.accent}</span>
                  </div>
                  <FullMockScreen c={t.colors} screen={screen} r={t.radius ?? 0} />
                  <div style={{ padding: "8px 12px", background: "#111", display: "flex", gap: 3, flexWrap: "wrap" }}>
                    {(["bg","bgSec","bgTer","bgEl","text","textSec","textMut","pri","suc","warn","dan","border","ch1","ch2","ch3","ch4","ch5","ch6"] as (keyof ThemeColors)[]).map(k => <div key={k} title={`${k}: ${t.colors[k]}`} style={{ width: 18, height: 18, background: t.colors[k], border: "1px solid #27272a" }} />)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {tab === "arena" && (
        <div>
          <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap", alignItems: "center" }}>
            <span style={{ fontSize: 11, color: "#52525b" }}>Family:</span>
            {FAMILIES.map(f => <button key={f} onClick={() => setArenaFamily(f)} style={{ padding: "4px 12px", fontSize: 11, cursor: "pointer", fontFamily: "inherit", background: arenaFamily === f ? "#a78bfa" : "transparent", color: arenaFamily === f ? "#09090b" : "#71717a", border: `1px solid ${arenaFamily === f ? "#a78bfa" : "#27272a"}`, fontWeight: arenaFamily === f ? 600 : 400 }}>{f}</button>)}
            <span style={{ width: 1, background: "#27272a", margin: "0 8px", height: 20 }} />
            <span style={{ fontSize: 11, color: "#52525b" }}>Screen:</span>
            {SCREENS.map(s => <button key={s} onClick={() => setArenaScreen(s)} style={{ padding: "4px 10px", fontSize: 11, cursor: "pointer", fontFamily: "inherit", background: arenaScreen === s ? "#3f3f46" : "transparent", color: arenaScreen === s ? "#fafafa" : "#52525b", border: `1px solid ${arenaScreen === s ? "#3f3f46" : "#27272a"}` }}>{s}</button>)}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {arenaThemes.map(name => {
              const t = ALL_THEMES[name];
              return (
                <div key={name} style={{ border: "2px solid #27272a", overflow: "hidden" }}>
                  <div style={{ padding: "6px 10px", background: "#18181b", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}><div style={{ width: 10, height: 10, background: t.colors.pri }} /><span style={{ fontSize: 12, fontWeight: 600, color: "#fafafa" }}>{name}</span></div>
                  </div>
                  <FullMockScreen c={t.colors} screen={arenaScreen} r={t.radius ?? 0} />
                  <div style={{ padding: 8, background: "#111", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ ...mono, fontSize: 12, color: "#52525b" }}>Score: {scores[name]}</span>
                    <button onClick={() => vote(name)} style={{ background: t.colors.pri, color: textOn(t.colors.pri), border: "2px solid #27272a", padding: "5px 16px", fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Vote</button>
                  </div>
                </div>
              );
            })}
          </div>
          {ranking.length > 0 && (
            <div style={{ marginTop: 20, background: "#18181b", padding: 16, border: "1px solid #27272a" }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#fafafa", marginBottom: 10 }}>Leaderboard</div>
              {ranking.map((name, i) => {
                const t = ALL_THEMES[name];
                const maxScore = Math.max(...Object.values(scores), 1);
                return (
                  <div key={name} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4, padding: "4px 0" }}>
                    <span style={{ ...mono, fontSize: 14, fontWeight: 800, color: i === 0 ? "#fbbf24" : "#52525b", width: 20 }}>{i + 1}</span>
                    <div style={{ width: 14, height: 14, background: t.colors.pri }} />
                    <span style={{ fontSize: 12, fontWeight: 500, color: "#fafafa", width: 200 }}>{name}</span>
                    <div style={{ flex: 1, height: 4, background: "#27272a" }}><div style={{ height: "100%", background: t.colors.pri, width: `${(scores[name] / maxScore) * 100}%`, transition: "width 0.3s" }} /></div>
                    <span style={{ ...mono, fontSize: 12, fontWeight: 700, color: "#fafafa", width: 24, textAlign: "right" }}>{scores[name]}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {tab === "audit" && <div style={{ fontSize: 13, color: "#71717a" }}>Contrast audit view - see the full workbench app for the complete implementation.</div>}
    </div>
  );
}
