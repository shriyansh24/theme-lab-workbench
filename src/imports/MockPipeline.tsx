import { textOn, type ThemeColors } from "./themes";
import { PageHeader, MetricStrip, MetricCard, SectionHeader, Badge, StateBlock, Surface, SplitWorkspace, cardS, btnS, mono, display, sans } from "./shared";

const STAGES = [
  { name: "Saved", count: 5, show: 2, color: "textMut" as const, cards: [
    { title: "DevOps Engineer", co: "Datadog", status: "New", time: "3d" },
    { title: "SRE", co: "PlanetScale", status: "Saved", time: "4d" },
  ]},
  { name: "Applied", count: 8, show: 3, color: "pri" as const, cards: [
    { title: "Senior SWE", co: "Stripe", status: "Sent", time: "1d" },
    { title: "Staff FE", co: "Vercel", status: "Sent", time: "2d" },
    { title: "Platform Eng", co: "Cloudflare", status: "Sent", time: "3d" },
  ]},
  { name: "Screening", count: 4, show: 2, color: "pri" as const, cards: [
    { title: "Backend Eng", co: "Linear", status: "Phone", time: "1d" },
    { title: "Full Stack", co: "Supabase", status: "Take-home", time: "2d" },
  ]},
  { name: "Interview", count: 3, show: 2, color: "warn" as const, cards: [
    { title: "Senior SWE", co: "Stripe", status: "Onsite", time: "6h" },
    { title: "Staff FE", co: "Vercel", status: "Virtual", time: "1d" },
  ]},
  { name: "Offer", count: 1, show: 1, color: "suc" as const, cards: [
    { title: "Platform Eng", co: "Notion", status: "Pending", time: "12h" },
  ]},
  { name: "Rejected", count: 3, show: 1, color: "dan" as const, cards: [
    { title: "ML Engineer", co: "Figma", status: "Closed", time: "5d" },
  ]},
];

function stageColor(c: ThemeColors, key: typeof STAGES[number]["color"]): string {
  return key === "textMut" ? c.textMut : c[key];
}

export function MockPipeline({ c, r = 0 }: { c: ThemeColors; r?: number }) {
  return (
    <div style={{ ...sans, flex: 1, padding: 16, overflow: "hidden" }}>
      <PageHeader c={c} r={r} eyebrow="Execute" title="Pipeline" description="Track applications by stage."
        badges={[
          <Badge key="t" bg={`${c.pri}22`} color={c.pri} r={r}>24 tracked</Badge>,
          <Badge key="l" bg={`${c.warn}22`} color={c.warn} r={r}>3 late-stage</Badge>,
        ]}
        actions={[
          <button key="a" style={{ ...btnS(c, r), padding: "6px 12px", fontSize: 11 }}>Auto-apply</button>,
          <button key="cp" style={{ ...btnS(c, r, true), padding: "6px 12px", fontSize: 11 }}>Copilot</button>,
        ]} />
      <MetricStrip>
        <MetricCard c={c} r={r} label="Applications" value="24" color={c.pri} />
        <MetricCard c={c} r={r} label="Follow-up" value="2" color={c.warn} />
        <MetricCard c={c} r={r} label="Late stage" value="3" color={c.suc} />
        <MetricCard c={c} r={r} label="Selected" value="\u2014" />
      </MetricStrip>
      <SplitWorkspace>
        <div style={{ flex: 3, minWidth: 0 }}>
          <SectionHeader c={c} title="Pipeline" description="Stages" />
          <div style={{ display: "flex", gap: 6, overflowX: "auto", paddingBottom: 4 }}>
            {STAGES.map(stage => {
              const sc = stageColor(c, stage.color);
              return (
                <div key={stage.name} style={{ width: 140, flexShrink: 0, display: "flex", flexDirection: "column", gap: 4 }}>
                  <div style={{ height: 2, background: sc, borderRadius: 1 }} />
                  <div style={{ display: "flex", alignItems: "center", gap: 4, padding: "2px 0" }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: sc, display: "inline-block" }} />
                    <span style={{ ...mono, fontSize: 10, fontWeight: 700, color: c.text, textTransform: "uppercase" }}>{stage.name}</span>
                    <Badge bg={c.bgTer} color={c.textSec} r={r}>{stage.count}</Badge>
                  </div>
                  {stage.cards.map((card, ci) => (
                    <Surface key={ci} c={c} r={r} style={{ padding: 8 }}>
                      <div style={{ ...display, fontSize: 12, fontWeight: 700, color: c.text }}>{card.title}</div>
                      <div style={{ fontSize: 10, color: c.textSec, marginTop: 1 }}>{card.co}</div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 4 }}>
                        <Badge bg={`${sc}22`} color={sc} r={r}>{card.status}</Badge>
                        <span style={{ ...mono, fontSize: 9, color: c.textMut }}>{card.time}</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 4 }}>
                        <button style={{ ...btnS(c, r), padding: "2px 8px", fontSize: 9 }}>\u2192</button>
                      </div>
                    </Surface>
                  ))}
                  {stage.count > stage.show && (
                    <div style={{ ...mono, fontSize: 9, color: c.textMut, textAlign: "center", padding: 2 }}>+{stage.count - stage.show} more</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div style={{ flex: 2, minWidth: 0 }}>
          <SectionHeader c={c} title="Selected" description="Details" />
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <StateBlock c={c} r={r} title="Applied" description="Senior SWE \u2014 Stripe" tone="muted" />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
              <StateBlock c={c} r={r} title="Source" description="LinkedIn" />
              <StateBlock c={c} r={r} title="Salary" description="$180k\u2013$240k" />
            </div>
            <StateBlock c={c} r={r} title="Notes" description="Strong distributed systems match. Recruiter replied within 24h. Onsite scheduled for next week." tone="muted" />
            <div style={{ display: "flex", gap: 6 }}>
              <button style={{ ...btnS(c, r, true), padding: "6px 14px", fontSize: 11, flex: 1 }}>Advance \u2192</button>
              <button style={{ ...btnS(c, r), padding: "6px 12px", fontSize: 10 }}>Move to Screen</button>
              <button style={{ ...btnS(c, r), padding: "6px 12px", fontSize: 10, color: c.dan }}>Withdraw</button>
            </div>
          </div>
        </div>
      </SplitWorkspace>
    </div>
  );
}
