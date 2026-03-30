import { textOn, type ThemeColors } from "./themes";
import { mono, display, sans, btnS } from "./shared";

export function MockLogin({ c, r = 0 }: { c: ThemeColors; r?: number }) {
  const inputS = {
    border: `2px solid ${c.border}`, background: c.bg, color: c.text,
    fontSize: 12, padding: "8px 10px", width: "100%", boxSizing: "border-box" as const,
    borderRadius: r > 0 ? r * 0.5 : 0, fontFamily: "inherit", outline: "none",
  };
  return (
    <div style={{ ...sans, background: c.bg, width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
      <button style={{ position: "absolute", top: 16, right: 16, width: 32, height: 32, border: `2px solid ${c.border}`, background: c.bgEl, color: c.textMut, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", borderRadius: r > 0 ? r * 0.5 : 0, fontSize: 14 }}>\u2600</button>
      <div style={{ width: "100%", maxWidth: 400, border: `2px solid ${c.border}`, borderRadius: r, overflow: "hidden", boxShadow: r > 0 ? `0 1px 3px ${c.shadow}22` : `2px 2px 0 0 ${c.shadow}`, background: c.bgEl }}>
        <div style={{ borderBottom: `2px solid ${c.border}`, background: c.bgSec, padding: 20 }}>
          <div style={{ ...mono, fontSize: 10, fontWeight: 700, color: c.textMut, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>JobRadar</div>
          <div style={{ ...display, fontSize: 24, fontWeight: 900, color: c.text, textTransform: "uppercase" }}>Sign in</div>
          <div style={{ fontSize: 12, color: c.textSec, marginTop: 4 }}>Enter your email and password to open the workspace.</div>
        </div>
        <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label style={{ ...mono, fontSize: 10, fontWeight: 600, color: c.textMut, textTransform: "uppercase", display: "block", marginBottom: 4 }}>Email</label>
            <div style={inputS}>operator@jobradar.io</div>
          </div>
          <div>
            <label style={{ ...mono, fontSize: 10, fontWeight: 600, color: c.textMut, textTransform: "uppercase", display: "block", marginBottom: 4 }}>Password</label>
            <div style={inputS}>\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 14, height: 14, border: `2px solid ${c.border}`, background: c.bg, display: "inline-flex", alignItems: "center", justifyContent: "center", borderRadius: r > 0 ? 2 : 0, fontSize: 9, color: c.pri, fontWeight: 700 }}>\u2713</span>
            <span style={{ fontSize: 11, color: c.textSec }}>Keep session active</span>
          </div>
          <button style={{ ...btnS(c, r, true), ...mono, width: "100%", padding: "10px 0", fontSize: 12, fontWeight: 700, textTransform: "uppercase", color: textOn(c.pri) }}>Sign in \u2192</button>
        </div>
      </div>
    </div>
  );
}
