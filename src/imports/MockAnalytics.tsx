import type { ThemeColors } from "./themes";
import { textOn } from "./themes";
import {
  PageHeader, MetricStrip, MetricCard, SectionHeader, Badge,
  StateBlock, Surface, SplitWorkspace, cardS, mono, display, sans,
  btnS,
} from "./shared";

export function MockAnalytics({ c, r = 0 }: { c: ThemeColors; r?: number }) {
  const sh = (extra = {}) => cardS(c, r, extra);
  const chartH = [70, 55, 60, 80, 65, 90, 75, 85, 60, 72, 88, 78];
  const funnel = [
    { label: "Applied", v: 24, h: "100%", color: c.ch1 },
    { label: "Screen", v: 8, h: "42%", color: c.ch2 },
    { label: "Interview", v: 3, h: "18%", color: c.ch3 },
    { label: "Offer", v: 1, h: "8%", color: c.ch4 },
  ];
  const sources = [
    { name: "LinkedIn", pct: 40, color: c.ch1 },
    { name: "Indeed", pct: 25, color: c.ch2 },
    { name: "Direct", pct: 15, color: c.ch3 },
    { name: "Referral", pct: 12, color: c.ch4 },
    { name: "Other", pct: 8, color: c.ch5 },
  ];
  const skills = ["React", "Python", "TypeScript", "AWS", "SQL"];
  const skillW = [90, 75, 70, 55, 45];
  const patterns = [
    { l: "Best company size", v: "Series B\u2013C" },
    { l: "Response time", v: "3.2 days avg" },
    { l: "Best day", v: "Tuesday" },
    { l: "Ghosting watch", v: "6 pending > 7d", warn: true },
  ];
  const tbl = [
    ["LinkedIn", "1,200", "92%", "45%"], ["Indeed", "800", "78%", "32%"],
    ["Greenhouse", "400", "95%", "67%"], ["AngelList", "300", "65%", "28%"],
    ["Direct", "147", "88%", "54%"],
  ];
  const pulse = ["React", "TypeScript", "Python", "Node.js", "AWS", "PostgreSQL", "Docker", "Kubernetes"];

  return (
    <div style={{ ...sans, padding: 16, background: c.bg, minHeight: "100%" }}>
      <PageHeader c={c} r={r} eyebrow="Intelligence" title="Analytics"
        description="Track discovery volume, application outcomes, and response patterns."
        badges={[
          <Badge key="a" bg={`${c.pri}22`} color={c.pri} r={r}>Live charts</Badge>,
          <Badge key="b" bg={c.bgTer} color={c.textSec} border={c.border} r={r}>Source feed</Badge>,
          <Badge key="c" bg={c.bgTer} color={c.textSec} border={c.border} r={r}>30 day window</Badge>,
        ]} />
      <MetricStrip>
        <MetricCard c={c} r={r} label="Jobs" value="2,847" />
        <MetricCard c={c} r={r} label="Applications" value="24" />
        <MetricCard c={c} r={r} label="Response rate" value="34%" color={c.suc} />
        <MetricCard c={c} r={r} label="Avg days" value="4.2" />
      </MetricStrip>

      <SplitWorkspace>
        {/* Primary */}
        <div style={{ flex: 2, display: "flex", flexDirection: "column", gap: 16 }}>
          <SectionHeader c={c} title="Trend" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {/* Line chart */}
            <div style={sh()}>
              <div style={{ ...mono, fontSize: 10, color: c.textMut, marginBottom: 8 }}>JOBS SCRAPED (LAST 30 DAYS)</div>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 60 }}>
                {chartH.map((h, i) => (
                  <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: c.pri, marginBottom: `${100 - h}%` }} />
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", ...mono, fontSize: 8, color: c.textMut, marginTop: 4 }}>
                {["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].map(m => <span key={m}>{m}</span>)}
              </div>
            </div>
            {/* Funnel */}
            <div style={sh()}>
              <div style={{ ...mono, fontSize: 10, color: c.textMut, marginBottom: 8 }}>APPLICATION FUNNEL</div>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 60 }}>
                {funnel.map(f => (
                  <div key={f.label} style={{ flex: 1, textAlign: "center" }}>
                    <div style={{ height: f.h, minHeight: 4, background: f.color, borderRadius: r > 0 ? 2 : 0 }} />
                    <div style={{ ...mono, fontSize: 8, color: c.textMut, marginTop: 2 }}>{f.label}</div>
                  </div>
                ))}
              </div>
            </div>
            {/* Pie (stacked bar) */}
            <div style={sh()}>
              <div style={{ ...mono, fontSize: 10, color: c.textMut, marginBottom: 8 }}>JOBS BY SOURCE</div>
              <div style={{ display: "flex", height: 16, borderRadius: r > 0 ? 4 : 0, overflow: "hidden" }}>
                {sources.map(s => <div key={s.name} style={{ width: `${s.pct}%`, background: s.color }} />)}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 6 }}>
                {sources.map(s => (
                  <span key={s.name} style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 9, color: c.textSec }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: s.color, display: "inline-block" }} />{s.name} {s.pct}%
                  </span>
                ))}
              </div>
            </div>
            {/* Skills bar */}
            <div style={sh()}>
              <div style={{ ...mono, fontSize: 10, color: c.textMut, marginBottom: 8 }}>TOP SKILLS REQUESTED</div>
              {skills.map((s, i) => (
                <div key={s} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                  <span style={{ ...mono, fontSize: 9, color: c.textSec, width: 60 }}>{s}</span>
                  <div style={{ flex: 1, height: 8, background: c.bgTer, borderRadius: r > 0 ? 2 : 0 }}>
                    <div style={{ width: `${skillW[i]}%`, height: "100%", background: c.pri, borderRadius: r > 0 ? 2 : 0 }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <SectionHeader c={c} title="Application patterns" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 8 }}>
            {patterns.map(p => (
              <div key={p.l} style={sh({ background: p.warn ? `${c.warn}18` : c.bgEl })}>
                <div style={{ ...mono, fontSize: 9, color: c.textMut, textTransform: "uppercase" }}>{p.l}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: p.warn ? c.warn : c.text, marginTop: 2 }}>{p.v}</div>
              </div>
            ))}
          </div>

          <SectionHeader c={c} title="Skills pulse" />
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {pulse.map(s => <Badge key={s} bg={`${c.pri}18`} color={c.pri} r={r}>{s}</Badge>)}
          </div>
        </div>

        {/* Secondary */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={sh({ background: `${c.suc}18` })}>
            <div style={{ ...mono, fontSize: 9, color: c.textMut, textTransform: "uppercase" }}>Interviews</div>
            <div style={{ ...mono, fontSize: 22, fontWeight: 700, color: c.suc }}>3</div>
          </div>
          <div style={sh({ background: `${c.warn}18` })}>
            <div style={{ ...mono, fontSize: 9, color: c.textMut, textTransform: "uppercase" }}>Offers</div>
            <div style={{ ...mono, fontSize: 22, fontWeight: 700, color: c.warn }}>1</div>
          </div>

          <SectionHeader c={c} title="Source quality" />
          <Surface c={c} r={r}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 10 }}>
              <thead>
                <tr style={{ borderBottom: `2px solid ${c.border}` }}>
                  {["Source", "Jobs", "Quality", "Match"].map(h => (
                    <th key={h} style={{ ...mono, fontSize: 9, color: c.textMut, textAlign: "left", padding: "4px 6px", fontWeight: 600, textTransform: "uppercase" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tbl.map((row, i) => (
                  <tr key={i} style={{ borderBottom: `1px solid ${c.border}` }}>
                    {row.map((cell, j) => (
                      <td key={j} style={{ padding: "4px 6px", color: j === 0 ? c.text : c.textSec, fontWeight: j === 0 ? 600 : 400, ...(j > 0 ? mono : {}) }}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </Surface>
        </div>
      </SplitWorkspace>
    </div>
  );
}