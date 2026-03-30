import type { ThemeColors } from "./themes";
import { textOn } from "./themes";
import { PageHeader, MetricStrip, MetricCard, SectionHeader, Badge, StateBlock, Surface, SplitWorkspace, cardS, mono, display, sans, btnS } from "./shared";

const FILES = [
  { name: "resume_v3.pdf", date: "Mar 28, 2026" },
  { name: "resume_v2.pdf", date: "Mar 15, 2026" },
  { name: "resume_backend.pdf", date: "Feb 22, 2026" },
];

export function MockVault({ c, r = 0 }: { c: ThemeColors; r?: number }) {
  const tabs = ["Resumes", "Cover Letters"];
  return (
    <div style={{ ...sans, padding: 16, background: c.bg, minHeight: "100%" }}>
      <PageHeader c={c} r={r} eyebrow="Prepare" title="Document Vault" description="Store, preview, and manage resumes and cover letters." />
      <MetricStrip>
        <MetricCard c={c} r={r} label="Resumes" value="3" />
        <MetricCard c={c} r={r} label="Cover letters" value="5" />
        <MetricCard c={c} r={r} label="Editor" value="Idle" />
        <MetricCard c={c} r={r} label="Upload" value="Ready" />
      </MetricStrip>
      <div style={{ display: "flex", gap: 4, marginBottom: 12 }}>
        {tabs.map((t, i) => (
          <button key={t} style={{ ...btnS(c, r, i === 0), padding: "6px 14px", fontSize: 11, ...(i === 0 ? { background: c.pri, color: textOn(c.pri) } : {}) }}>{t}</button>
        ))}
      </div>
      <SplitWorkspace>
        <div style={{ flex: 2, display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ border: `2px dashed ${c.border}`, borderRadius: r, padding: 24, textAlign: "center", background: c.bgTer }}>
            <div style={{ fontSize: 24, color: c.textMut, marginBottom: 4 }}>\u2191</div>
            <div style={{ fontSize: 12, color: c.textSec }}>Drop files or click to upload</div>
            <div style={{ fontSize: 10, color: c.textMut, marginTop: 2 }}>PDF or DOCX</div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
            {FILES.map(f => (
              <div key={f.name} style={cardS(c, r)}>
                <div style={{ fontSize: 24, color: c.textMut, marginBottom: 6 }}>\ud83d\udcc4</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: c.text }}>{f.name}</div>
                <div style={{ ...mono, fontSize: 10, color: c.textMut, marginTop: 2 }}>{f.date}</div>
                <div style={{ display: "flex", gap: 4, marginTop: 8 }}>
                  <button style={{ ...btnS(c, r), padding: "3px 8px", fontSize: 9 }}>Preview</button>
                  <button style={{ ...btnS(c, r), padding: "3px 8px", fontSize: 9 }}>Edit</button>
                  <button style={{ ...btnS(c, r), padding: "3px 8px", fontSize: 9, color: c.dan, borderColor: c.dan }}>\u2715</button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
          <StateBlock c={c} r={r} title="3 resumes stored" description="Latest: resume_v3.pdf, uploaded 2h ago." />
        </div>
      </SplitWorkspace>
    </div>
  );
}
