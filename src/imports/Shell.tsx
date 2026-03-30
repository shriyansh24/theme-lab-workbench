import type { ReactNode } from "react";
import type { ThemeColors } from "./themes";
import { mono, display, sans, btnS } from "./shared";

const NAV_SECTIONS = [
  { label: "Home", items: ["Dashboard"] },
  { label: "Discover", items: ["Jobs", "Companies"] },
  { label: "Execute", items: ["Pipeline", "Auto-Apply", "Networking"] },
  { label: "Prepare", items: ["Copilot", "Resume", "Interview"] },
  { label: "Intelligence", items: ["Analytics", "Salary"] },
  { label: "Operations", items: ["Settings", "Sources", "Admin"] },
] as const;

export function MockShell({ c, r = 0, activeRoute, children }: {
  c: ThemeColors; r?: number; activeRoute: string; children: ReactNode;
}) {
  return (
    <div style={{ ...sans, background: c.bg, display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }}>
      <div style={{ height: 64, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 16px", borderBottom: `2px solid ${c.border}`, background: c.bgEl, flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ ...mono, fontSize: 16, color: c.textMut, cursor: "pointer" }}>\u2261</span>
          <span style={{ width: 10, height: 10, background: c.pri, display: "inline-flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 8, fontWeight: 700, borderRadius: 1 }}>JR</span>
          <span style={{ ...display, fontSize: 14, fontWeight: 700, color: c.text, textTransform: "uppercase", letterSpacing: "-0.02em" }}>JOBRADAR</span>
          <span style={{ ...mono, fontSize: 10, background: c.bgTer, color: c.textMut, padding: "2px 8px", borderRadius: r > 0 ? 999 : 0 }}>{activeRoute}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 14, color: c.textMut, cursor: "pointer" }}>\u25CB</span>
          <span style={{ fontSize: 14, color: c.textMut, cursor: "pointer" }}>\u25CB</span>
          <div style={{ textAlign: "right", marginLeft: 6 }}>
            <div style={{ ...mono, fontSize: 9, color: c.textMut, textTransform: "uppercase" }}>Active operator</div>
            <div style={{ fontSize: 11, fontWeight: 700, color: c.text }}>Shriyansh</div>
          </div>
          <button style={{ ...btnS(c, r), ...mono, background: c.text, color: c.bg, fontSize: 10, padding: "4px 10px", textTransform: "uppercase" }}>Logout</button>
        </div>
      </div>
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <div style={{ width: 180, background: c.bgSec, borderRight: `2px solid ${c.border}`, padding: "12px 8px", display: "flex", flexDirection: "column", gap: 14, flexShrink: 0, overflowY: "auto" }}>
          {NAV_SECTIONS.map(section => (
            <div key={section.label}>
              <div style={{ ...mono, fontSize: 9, fontWeight: 600, color: c.textMut, textTransform: "uppercase", letterSpacing: "0.15em", padding: "0 10px", marginBottom: 4 }}>{section.label}</div>
              {section.items.map(item => {
                const isActive = item === activeRoute;
                return (
                  <div key={item} style={{ ...mono, fontSize: 11, textTransform: "uppercase", padding: "6px 10px", background: isActive ? c.sideABg : "transparent", color: isActive ? c.sideATxt : c.textSec, borderLeft: isActive ? `3px solid ${c.pri}` : "3px solid transparent", fontWeight: isActive ? 700 : 400, cursor: "pointer" }}>{item}</div>
                );
              })}
            </div>
          ))}
        </div>
        <div style={{ flex: 1, overflow: "hidden" }}>{children}</div>
      </div>
    </div>
  );
}
