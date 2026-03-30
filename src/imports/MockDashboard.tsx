import { textOn, type ThemeColors } from "./themes";
import {
  mono, display, cardS, btnS,
  Badge, PageHeader, MetricCard, MetricStrip,
  SectionHeader, StateBlock, SplitWorkspace,
} from "./shared";

const JOBS = [
  { title: "Senior SWE @ Stripe", meta: "Remote \u00b7 Full-time \u00b7 2h ago", match: 95 },
  { title: "Staff FE @ Vercel", meta: "San Francisco \u00b7 Full-time \u00b7 4h ago", match: 88 },
  { title: "Platform Eng @ Cloudflare", meta: "Austin, TX \u00b7 Full-time \u00b7 6h ago", match: 82 },
  { title: "Backend Eng @ Linear", meta: "Remote \u00b7 Full-time \u00b7 8h ago", match: 79 },
  { title: "Full Stack @ Supabase", meta: "Remote \u00b7 Contract \u00b7 12h ago", match: 74 },
];

export function MockDashboard({ c, r = 0 }: { c: ThemeColors; r?: number }) {
  return (
    <div style={{ padding: 16, overflow: "hidden" }}>
      <PageHeader c={c} r={r}
        eyebrow="Home" title="Command Center"
        description="Job feed, pipeline, and next actions."
        badges={[
          <Badge key="s" bg={c.bgTer} color={c.textSec} r={r}>847 scraped today</Badge>,
          <Badge key="r" bg={c.bgTer} color={c.textSec} r={r}>34% response rate</Badge>,
        ]}
        actions={[
          <button key="b" style={{ ...btnS(c, r, true), padding: "6px 14px", fontSize: 11, ...mono }}>Browse jobs</button>,
          <button key="a" style={{ ...btnS(c, r), padding: "6px 14px", fontSize: 11, ...mono }}>+ Add application</button>,
        ]}
      />

      <MetricStrip>
        <MetricCard c={c} r={r} label="Total Jobs" value="2,847" hint="Across 12 sources" color={c.pri} />
        <MetricCard c={c} r={r} label="Applications" value="24" hint="8 responses received" color={c.suc} />
        <MetricCard c={c} r={r} label="Interviews" value="3" hint="Next: Tue 10am" color={c.warn} />
        <MetricCard c={c} r={r} label="Offers" value="1" hint="Pending decision" color={c.suc} />
      </MetricStrip>

      <SplitWorkspace>
        {/* Primary column */}
        <div style={{ flex: 1.25 }}>
          {/* Pipeline section */}
          <div style={{ ...cardS(c, r), marginBottom: 12, padding: 14 }}>
            <SectionHeader c={c} title="Pipeline" description="Stage mix" />
            {/* Stacked bar */}
            <div style={{ display: "flex", height: 18, borderRadius: r > 0 ? r * 0.5 : 0, overflow: "hidden", marginBottom: 10 }}>
              <div style={{ width: "55%", background: c.textMut }} />
              <div style={{ width: "30%", background: c.pri }} />
              <div style={{ width: "15%", background: c.suc }} />
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              <StateBlock c={c} r={r} title="Top of funnel" description="12 saved, 24 applied" tone="muted" />
              <StateBlock c={c} r={r} title="Late stage" description="3 interviews this week" tone="warn" />
              <StateBlock c={c} r={r} title="Offers" description="1 pending decision" tone="success" />
            </div>
          </div>

          {/* Feed section */}
          <div style={{ ...cardS(c, r), padding: 14 }}>
            <SectionHeader c={c} title="Feed" description="Recent jobs"
              badge={<Badge bg={c.suc} color={textOn(c.suc)} r={r}>Live</Badge>}
            />
            {JOBS.map((job, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "7px 0", borderBottom: i < JOBS.length - 1 ? `1px solid ${c.bgTer}` : "none",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: c.pri, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: c.text }}>{job.title}</div>
                    <div style={{ ...mono, fontSize: 10, color: c.textMut }}>{job.meta}</div>
                  </div>
                </div>
                <Badge bg={c.bgTer} color={c.textSec} r={r}>{job.match}%</Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Secondary column */}
        <div style={{ flex: 0.95 }}>
          <div style={{ ...cardS(c, r), padding: 14 }}>
            <SectionHeader c={c} title="Next" description="Queue" />
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <StateBlock c={c} r={r} title="Urgent follow-up" description="Stripe screen expires in 48h" tone="warn" />
              <StateBlock c={c} r={r} title="Newest posting" description="Linear Backend Eng posted 2h ago" tone="success" />
              <StateBlock c={c} r={r} title="Queue status" description="6 items pending review" tone="muted" />
            </div>
          </div>
        </div>
      </SplitWorkspace>
    </div>
  );
}