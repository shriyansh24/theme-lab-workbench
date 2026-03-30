import { textOn, type ThemeColors } from "./themes";
import { mono, display, sans, btnS, PageHeader, SectionHeader } from "./shared";

const TABS = ["Profile", "Appearance", "Workspace", "Security", "Integrations", "Searches", "Data"];
const ACTIVE_TAB = "Appearance";

const FAMILIES = [
  { name: "Default", dot: "#2563EB" },
  { name: "Terminal", dot: "#22d3ee" },
  { name: "Blueprint", dot: "#38bdf8" },
  { name: "Phosphor", dot: "#ea580c" },
];

export function MockSettings({ c, r = 0 }: { c: ThemeColors; r?: number }) {
  const tabBtnS = (active: boolean) => ({
    ...mono, fontSize: 11, fontWeight: 700, textTransform: "uppercase" as const,
    border: `2px solid ${c.border}`, width: "100%", textAlign: "left" as const,
    padding: "8px 12px", cursor: "pointer", fontFamily: "inherit",
    background: active ? c.pri : "transparent",
    color: active ? textOn(c.pri) : c.textSec,
    borderRadius: r > 0 ? r * 0.5 : 0, marginBottom: 4,
  });

  const optBtnS = (active: boolean) => ({
    ...mono, fontSize: 11, fontWeight: 600, textTransform: "uppercase" as const,
    border: `2px solid ${c.border}`, padding: "8px 12px", cursor: "pointer",
    fontFamily: "inherit", textAlign: "center" as const, flex: 1,
    background: active ? c.pri : c.bgEl,
    color: active ? textOn(c.pri) : c.textSec,
    borderRadius: r > 0 ? r * 0.5 : 0,
    display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
  });

  return (
    <div style={{ ...sans, padding: 16, overflow: "hidden" }}>
      <PageHeader c={c} r={r}
        eyebrow="Operations" title="Settings"
        description="Account, theme, integrations, and saved searches."
        actions={[
          <button key="s" style={{ ...btnS(c, r, true), padding: "6px 14px", fontSize: 11, ...mono }}>Save changes</button>,
        ]}
      />

      <div style={{ display: "flex", gap: 16 }}>
        {/* Left tab sidebar */}
        <div style={{ width: 160, flexShrink: 0 }}>
          {TABS.map(tab => (
            <button key={tab} style={tabBtnS(tab === ACTIVE_TAB)}>{tab}</button>
          ))}
        </div>

        {/* Right content */}
        <div style={{ flex: 1 }}>
          <SectionHeader c={c} title="Appearance" description="Choose mode and theme family." />

          {/* Mode */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ ...display, fontSize: 13, fontWeight: 700, color: c.text, textTransform: "uppercase", marginBottom: 8 }}>
              Mode
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              <button style={optBtnS(false)}>Light</button>
              <button style={optBtnS(true)}>Dark</button>
            </div>
          </div>

          {/* Theme family */}
          <div>
            <div style={{ ...display, fontSize: 13, fontWeight: 700, color: c.text, textTransform: "uppercase", marginBottom: 8 }}>
              Theme Family
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {FAMILIES.map((f, i) => (
                <button key={f.name} style={optBtnS(i === 0)}>
                  <span style={{
                    width: 8, height: 8, borderRadius: "50%", background: f.dot, display: "inline-block",
                  }} />
                  {f.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}