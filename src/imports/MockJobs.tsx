import { textOn, type ThemeColors } from "./themes";
import {
  PageHeader, MetricStrip, MetricCard, SectionHeader, Badge,
  StateBlock, Surface, SplitWorkspace, cardS, btnS, mono, display, sans,
} from "./shared";

const JOBS = [
  { title: "Senior Software Engineer", company: "Stripe", source: "LINKEDIN", match: 95, fresh: "2h", tags: ["Remote", "Full-time", "Senior", "Python"] },
  { title: "Staff Frontend Engineer", company: "Vercel", source: "GREENHOUSE", match: 88, fresh: "6h", tags: ["Hybrid", "Full-time", "Staff", "React"] },
  { title: "Platform Engineer", company: "Cloudflare", source: "LEVER", match: 82, fresh: "1d", tags: ["Remote", "Full-time", "Mid", "Go"] },
  { title: "Backend Engineer", company: "Linear", source: "ASHBY", match: 79, fresh: "2d", tags: ["Remote", "Full-time", "Senior", "TypeScript"] },
  { title: "Full Stack Developer", company: "Supabase", source: "LINKEDIN", match: 74, fresh: "3d", tags: ["Remote", "Contract", "Mid", "Postgres"] },
];

const SKILLS_REQ = ["Python", "Distributed Systems", "AWS", "PostgreSQL"];
const SKILLS_NICE = ["Kubernetes", "gRPC", "Rust"];

export function MockJobs({ c, r = 0 }: { c: ThemeColors; r?: number }) {
  return (
    <div style={{ ...sans, flex: 1, padding: 16, overflow: "hidden" }}>
      <PageHeader c={c} r={r} eyebrow="Discover" title="Jobs"
        description="Search, filter, and inspect the feed."
        badges={[
          <Badge key="r" bg={`${c.pri}22`} color={c.pri} r={r}>2,847 results</Badge>,
          <Badge key="f" bg={c.bgTer} color={c.textSec} r={r}>3 active filters</Badge>,
        ]}
        actions={[
          <button key="e" style={{ ...btnS(c, r), padding: "6px 12px", fontSize: 11 }}>Exact</button>,
          <button key="s" style={{ ...btnS(c, r), padding: "6px 12px", fontSize: 11, background: c.bgAct }}>Semantic</button>,
          <button key="fl" style={{ ...btnS(c, r), padding: "6px 12px", fontSize: 11 }}>Filters</button>,
        ]}
      />

      <MetricStrip>
        <MetricCard c={c} r={r} label="Mode" value="Semantic" />
        <MetricCard c={c} r={r} label="Results" value="2,847" color={c.pri} />
        <MetricCard c={c} r={r} label="Page" value={"\u2014"} />
        <MetricCard c={c} r={r} label="Filters" value="3" color={c.warn} />
      </MetricStrip>

      {/* Filter bar */}
      <Surface c={c} r={r} style={{ padding: 10, marginBottom: 12 }}>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 6, border: `2px solid ${c.border}`, padding: "6px 10px", borderRadius: r * 0.5, background: c.bg }}>
            <span style={{ fontSize: 12, color: c.textMut }}>{"\u2315"}</span>
            <span style={{ ...mono, fontSize: 11, color: c.textMut }}>Describe your ideal role...</span>
          </div>
          {["Source", "Remote", "Experience"].map(f => (
            <div key={f} style={{ width: 120, border: `2px solid ${c.border}`, padding: "6px 8px", fontSize: 10, color: c.textSec, borderRadius: r * 0.5, background: c.bg, ...mono }}>{f} {"\u25BE"}</div>
          ))}
        </div>
      </Surface>

      <SplitWorkspace>
        {/* Primary: results */}
        <div style={{ flex: 3, minWidth: 0 }}>
          <SectionHeader c={c} title="Results" description="Matches" badge={<span style={{ ...mono, fontSize: 10, color: c.textMut }}>2,847 total</span>} />
          {JOBS.map((j, i) => (
            <Surface key={i} c={c} r={r} style={{ padding: 10, marginBottom: 6, cursor: "pointer" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div style={{ ...mono, fontSize: 10, color: c.textMut }}>{j.source}</div>
                  <div style={{ ...display, fontSize: 14, fontWeight: 700, color: c.text, textTransform: "uppercase" }}>{j.title}</div>
                  <div style={{ fontSize: 11, color: c.textSec, marginTop: 1 }}>{j.company}</div>
                </div>
                <div style={{ display: "flex", gap: 4 }}>
                  <Badge bg={c.pri} color={textOn(c.pri)} r={r}>{j.match}%</Badge>
                  <Badge bg={c.bgTer} color={c.textSec} r={r}>{j.fresh}</Badge>
                </div>
              </div>
              <div style={{ display: "flex", gap: 4, marginTop: 6 }}>
                {j.tags.map(t => <Badge key={t} bg={c.bgTer} color={c.textSec} r={r}>{t}</Badge>)}
              </div>
            </Surface>
          ))}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
            <span style={{ ...mono, fontSize: 10, color: c.textMut }}>Page 1 / 57</span>
            <div style={{ display: "flex", gap: 4 }}>
              <button style={{ ...btnS(c, r), padding: "4px 10px", fontSize: 10 }}>Prev</button>
              <button style={{ ...btnS(c, r), padding: "4px 10px", fontSize: 10 }}>Next</button>
            </div>
          </div>
        </div>

        {/* Secondary: detail */}
        <div style={{ flex: 2, minWidth: 0 }}>
          <Surface c={c} r={r} style={{ position: "sticky", top: 0 }}>
            {/* Header */}
            <div style={{ background: c.bgTer, borderBottom: `2px solid ${c.border}`, padding: 12, display: "flex", gap: 10, alignItems: "center" }}>
              <div style={{ width: 48, height: 48, border: `2px solid ${c.border}`, background: c.bgEl, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: r * 0.5 }}>
                <span style={{ ...display, fontSize: 16, fontWeight: 700, color: c.textMut }}>S</span>
              </div>
              <div>
                <Badge bg={`${c.pri}22`} color={c.pri} r={r}>LINKEDIN</Badge>
                <div style={{ ...display, fontSize: 16, fontWeight: 700, color: c.text, marginTop: 2 }}>Senior Software Engineer</div>
                <div style={{ fontSize: 11, color: c.textSec }}>Stripe {"\u00B7"} San Francisco, CA</div>
              </div>
            </div>
            {/* Content */}
            <div style={{ padding: 12, display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ display: "flex", gap: 4 }}>
                <Badge bg={c.bgTer} color={c.textSec} r={r}>Senior</Badge>
                <Badge bg={c.bgTer} color={c.textSec} r={r}>5+ years</Badge>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                {[
                  { l: "Match", v: "95%", cl: c.pri }, { l: "TF-IDF", v: "0.87", cl: c.text },
                  { l: "Fresh", v: "2h", cl: c.suc }, { l: "Salary", v: "$180k\u2013$240k", cl: c.warn },
                ].map(m => (
                  <div key={m.l} style={cardS(c, r, { padding: 8 })}>
                    <div style={{ ...mono, fontSize: 9, color: c.textMut, textTransform: "uppercase" }}>{m.l}</div>
                    <div style={{ ...mono, fontSize: 16, fontWeight: 700, color: m.cl }}>{m.v}</div>
                  </div>
                ))}
              </div>
              <StateBlock c={c} r={r} title="AI Summary" description="Strong match for distributed systems role. Culture fit indicators high based on open-source contributions and async-first team." tone="muted" />
              <div>
                <div style={{ ...mono, fontSize: 9, color: c.textMut, textTransform: "uppercase", marginBottom: 4 }}>Required</div>
                <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                  {SKILLS_REQ.map(s => <Badge key={s} bg={c.bgTer} color={c.textSec} r={r}>{s}</Badge>)}
                </div>
                <div style={{ ...mono, fontSize: 9, color: c.textMut, textTransform: "uppercase", marginTop: 6, marginBottom: 4 }}>Nice to have</div>
                <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                  {SKILLS_NICE.map(s => <Badge key={s} bg="transparent" color={c.textMut} border={c.border} r={r}>{s}</Badge>)}
                </div>
              </div>
              <StateBlock c={c} r={r} title="Green Flags" description={"Remote-first culture with async communication.\nStrong engineering blog and open-source presence."} tone="success" />
              <StateBlock c={c} r={r} title="Red Flags" description="Glassdoor reports long on-call rotations." tone="warn" />
            </div>
            {/* Footer */}
            <div style={{ background: c.bgTer, borderTop: `2px solid ${c.border}`, padding: 10, display: "flex", gap: 6 }}>
              <button style={{ ...btnS(c, r, true), padding: "6px 14px", fontSize: 11, flex: 1 }}>Apply</button>
              <button style={{ ...btnS(c, r), padding: "6px 14px", fontSize: 11 }}>Original {"\u2197"}</button>
            </div>
          </Surface>
        </div>
      </SplitWorkspace>
    </div>
  );
}