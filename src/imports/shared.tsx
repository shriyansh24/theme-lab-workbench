import type { CSSProperties, ReactNode } from "react";
import { textOn, type ThemeColors } from "./themes";

export const mono: CSSProperties = { fontFamily: "'JetBrains Mono', monospace" };
export const display: CSSProperties = { fontFamily: "'Space Grotesk', sans-serif" };
export const sans: CSSProperties = { fontFamily: "'Inter', system-ui, sans-serif" };

export function cardS(c: ThemeColors, r: number, extra?: CSSProperties): CSSProperties {
  return {
    background: c.bgEl, border: `2px solid ${c.border}`, padding: 12,
    boxShadow: r > 0 ? `0 1px 3px ${c.shadow}22` : `2px 2px 0 0 ${c.shadow}`,
    borderRadius: r, ...extra,
  };
}

export function btnS(c: ThemeColors, r: number, primary?: boolean): CSSProperties {
  return {
    background: primary ? c.pri : c.bgEl,
    color: primary ? textOn(c.pri) : c.textSec,
    border: `2px solid ${c.border}`, fontWeight: 600, fontFamily: "inherit",
    cursor: "pointer", borderRadius: r > 0 ? r * 0.5 : 0,
  };
}

export function Badge({ bg, color, children, border, r = 0 }: {
  bg: string; color: string; children: ReactNode; border?: string; r?: number;
}) {
  return (
    <span style={{
      background: bg, color, fontSize: 10, fontWeight: 600, padding: "2px 8px",
      border: border ? `1px solid ${border}` : "none",
      borderRadius: r > 0 ? 999 : 0, whiteSpace: "nowrap",
    }}>{children}</span>
  );
}

export function PageHeader({ c, r = 0, eyebrow, title, description, badges, actions }: {
  c: ThemeColors; r?: number; eyebrow: string; title: string;
  description: string; badges?: ReactNode[]; actions?: ReactNode[];
}) {
  return (
    <div style={{ border: `2px solid ${c.border}`, background: c.bgSec, padding: 16, borderRadius: r, marginBottom: 16 }}>
      <div style={{ ...mono, fontSize: 10, fontWeight: 600, color: c.textMut, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>{eyebrow}</div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
        <div>
          <div style={{ ...display, fontSize: 24, fontWeight: 900, color: c.text, textTransform: "uppercase", lineHeight: 1.1 }}>{title}</div>
          <div style={{ fontSize: 12, color: c.textSec, marginTop: 4 }}>{description}</div>
          {badges && badges.length > 0 && <div style={{ display: "flex", gap: 6, marginTop: 8 }}>{badges}</div>}
        </div>
        {actions && actions.length > 0 && <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>{actions}</div>}
      </div>
    </div>
  );
}

export function MetricCard({ c, r = 0, label, value, hint, color }: {
  c: ThemeColors; r?: number; label: string; value: string; hint?: string; color?: string;
}) {
  return (
    <div style={cardS(c, r)}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ ...mono, fontSize: 10, fontWeight: 600, color: c.textMut, textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</div>
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: color || c.pri, display: "inline-block" }} />
      </div>
      <div style={{ ...mono, fontSize: 24, fontWeight: 700, color: color || c.text, marginTop: 4 }}>{value}</div>
      {hint && <div style={{ fontSize: 10, color: c.textSec, marginTop: 2 }}>{hint}</div>}
    </div>
  );
}

export function MetricStrip({ children }: { children: ReactNode }) {
  return <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 8, marginBottom: 16 }}>{children}</div>;
}

export function SectionHeader({ c, title, description, action, badge }: {
  c: ThemeColors; title: string; description?: string; action?: ReactNode; badge?: ReactNode;
}) {
  return (
    <div style={{ borderBottom: `2px solid ${c.border}`, paddingBottom: 8, marginBottom: 10, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ ...display, fontSize: 16, fontWeight: 700, color: c.text, textTransform: "uppercase" }}>{title}</span>
          {badge}
        </div>
        {description && <div style={{ fontSize: 11, color: c.textSec, marginTop: 2 }}>{description}</div>}
      </div>
      {action}
    </div>
  );
}

export function StateBlock({ c, r = 0, title, description, tone }: {
  c: ThemeColors; r?: number; title: string; description: string; tone?: "muted" | "warn" | "success";
}) {
  const bg = tone === "warn" ? `${c.warn}18` : tone === "success" ? `${c.suc}18` : c.bgTer;
  return (
    <div style={{ border: `2px solid ${c.border}`, padding: 10, borderRadius: r, background: bg, flex: 1 }}>
      <div style={{ ...mono, fontSize: 11, fontWeight: 700, color: c.text, textTransform: "uppercase" }}>{title}</div>
      <div style={{ fontSize: 10, color: c.textSec, marginTop: 2 }}>{description}</div>
    </div>
  );
}

export function Surface({ c, r = 0, children, style }: {
  c: ThemeColors; r?: number; children: ReactNode; style?: CSSProperties;
}) {
  return <div style={{ border: `2px solid ${c.border}`, background: c.bgEl, overflow: "hidden", borderRadius: r, ...style }}>{children}</div>;
}

export function SplitWorkspace({ children }: { children: ReactNode }) {
  return <div style={{ display: "flex", gap: 12 }}>{children}</div>;
}
