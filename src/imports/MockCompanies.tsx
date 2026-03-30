import { textOn, type ThemeColors } from "./themes";
import { PageHeader, MetricStrip, MetricCard, SectionHeader, Badge, Surface, btnS, mono, display, sans } from "./shared";

const ROWS = [
  { name: "STRIPE", domain: "stripe.com", ats: "Greenhouse", status: "verified", jobs: "142", conf: "98%" },
  { name: "VERCEL", domain: "vercel.com", ats: "Greenhouse", status: "verified", jobs: "67", conf: "96%" },
  { name: "CLOUDFLARE", domain: "cloudflare.com", ats: "Greenhouse", status: "verified", jobs: "89", conf: "94%" },
  { name: "LINEAR", domain: "linear.app", ats: "Ashby", status: "verified", jobs: "34", conf: "92%" },
  { name: "SUPABASE", domain: "supabase.com", ats: "Lever", status: "unverified", jobs: "28", conf: "87%" },
  { name: "FIGMA", domain: "figma.com", ats: "Greenhouse", status: "verified", jobs: "51", conf: "95%" },
  { name: "NOTION", domain: "notion.so", ats: "\u2014", status: "unverified", jobs: "43", conf: "72%" },
  { name: "DATADOG", domain: "datadoghq.com", ats: "Lever", status: "invalid", jobs: "112", conf: "45%" },
];
const COLS = ["Company", "Domain", "ATS", "Status", "Jobs", "Confidence"];

function statusBadge(c: ThemeColors, s: string, r: number) {
  const map: Record<string, { bg: string; color: string }> = {
    verified: { bg: `${c.suc}22`, color: c.suc },
    unverified: { bg: `${c.warn}22`, color: c.warn },
    invalid: { bg: `${c.dan}22`, color: c.dan },
  };
  const m = map[s] || map.unverified;
  return <Badge bg={m.bg} color={m.color} r={r}>{s}</Badge>;
}

const FILTERS = ["All", "Verified", "Unverified", "Invalid"];

export function MockCompanies({ c, r = 0 }: { c: ThemeColors; r?: number }) {
  return (
    <div style={{ ...sans, flex: 1, padding: 16, overflow: "hidden" }}>
      <PageHeader c={c} r={r} eyebrow="Operations" title="Companies" description="Canonical company records, ATS fingerprints, and validation confidence."
        badges={[
          <Badge key="r" bg={`${c.pri}22`} color={c.pri} r={r}>1,247 records</Badge>,
          <Badge key="v" bg={c.bgTer} color={c.textSec} r={r}>892 verified</Badge>,
        ]}
        actions={FILTERS.map((f, i) => (
          <button key={f} style={{ ...btnS(c, r), padding: "6px 12px", fontSize: 11, ...(i === 0 ? { background: c.pri, color: textOn(c.pri) } : {}) }}>{f}</button>
        ))} />
      <MetricStrip>
        <MetricCard c={c} r={r} label="Registry" value="1,247" color={c.pri} />
        <MetricCard c={c} r={r} label="Verified" value="892" color={c.suc} />
        <MetricCard c={c} r={r} label="Visible" value="1,247" color={c.warn} />
        <MetricCard c={c} r={r} label="Invalid" value="18" color={c.dan} />
      </MetricStrip>
      <Surface c={c} r={r} style={{ overflow: "hidden" }}>
        <div style={{ padding: "10px 12px" }}>
          <SectionHeader c={c} title="Company Registry" description="Validation state, ATS routing, and confidence." badge={<span style={{ ...mono, fontSize: 10, color: c.textMut }}>1,247 shown</span>} />
        </div>
        <div style={{ width: "100%", borderCollapse: "collapse" } as React.CSSProperties}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1.2fr 1fr 1fr 0.6fr 0.8fr", background: c.bgTer, borderBottom: `2px solid ${c.border}`, padding: "8px 12px" }}>
            {COLS.map((col, i) => (
              <span key={col} style={{ ...mono, fontSize: 10, fontWeight: 600, color: c.textMut, textTransform: "uppercase", letterSpacing: "0.05em", textAlign: i >= 4 ? "right" : "left" }}>{col}</span>
            ))}
          </div>
          {ROWS.map((row, i) => (
            <div key={row.name} style={{ display: "grid", gridTemplateColumns: "2fr 1.2fr 1fr 1fr 0.6fr 0.8fr", padding: "8px 12px", borderBottom: `1px solid ${c.bgTer}`, background: i % 2 === 0 ? "transparent" : `${c.bgTer}44`, cursor: "pointer" }}>
              <span style={{ ...display, fontSize: 13, fontWeight: 700, color: c.text, textTransform: "uppercase" }}>{row.name}</span>
              <span style={{ fontSize: 11, color: c.textSec, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{row.domain}</span>
              <span style={{ fontSize: 11, color: c.textSec }}>{row.ats}</span>
              <span>{statusBadge(c, row.status, r)}</span>
              <span style={{ ...mono, fontSize: 11, color: c.text, textAlign: "right" }}>{row.jobs}</span>
              <span style={{ ...mono, fontSize: 11, color: c.text, textAlign: "right" }}>{row.conf}</span>
            </div>
          ))}
        </div>
      </Surface>
    </div>
  );
}
