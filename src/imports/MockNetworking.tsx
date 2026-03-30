import type { ThemeColors } from "./themes";
import { textOn } from "./themes";
import {
  PageHeader, MetricStrip, MetricCard, SectionHeader, Badge,
  StateBlock, Surface, cardS, mono, display, sans, btnS,
} from "./shared";

const CONTACTS = [
  { name: "Sarah Chen", title: "Engineering Manager", co: "Stripe", email: "sarah@stripe.com", str: 4, days: 3, active: true },
  { name: "James Park", title: "Staff Engineer", co: "Linear", email: "james@linear.app", str: 5, days: 1, active: false },
  { name: "Priya Sharma", title: "VP Engineering", co: "Supabase", email: "priya@supabase.io", str: 3, days: 7, active: false },
  { name: "Alex Rivera", title: "Recruiter", co: "Notion", email: "alex@notion.so", str: 4, days: 5, active: false },
  { name: "Dana Kim", title: "CTO", co: "Vercel", email: "dana@vercel.com", str: 2, days: 14, active: false },
  { name: "Marcus Lee", title: "Senior SWE", co: "Figma", email: "marcus@figma.com", str: 3, days: 10, active: false },
];

const FIELDS = [
  { label: "Name", val: "Sarah Chen" }, { label: "Strength", val: "4/5" },
  { label: "Company", val: "Stripe" }, { label: "Role", val: "Engineering Manager" },
  { label: "Email", val: "sarah@stripe.com" }, { label: "LinkedIn", val: "linkedin.com/in/schen" },
];

export function MockNetworking({ c, r = 0 }: { c: ThemeColors; r?: number }) {
  const sh = (extra = {}) => cardS(c, r, extra);
  const input = (val: string): React.CSSProperties => ({
    border: `2px solid ${c.border}`, borderRadius: r > 0 ? r * 0.5 : 0,
    padding: "6px 10px", fontSize: 11, color: c.text, background: c.bgEl,
    width: "100%", fontFamily: "inherit", boxSizing: "border-box" as const,
  });

  return (
    <div style={{ ...sans, padding: 16, background: c.bg, minHeight: "100%" }}>
      <PageHeader c={c} r={r} eyebrow="Execute" title="Networking"
        description="Track contacts, build referral queues, and generate outreach."
        badges={[
          <Badge key="a" bg={`${c.pri}22`} color={c.pri} r={r}>47 contacts</Badge>,
          <Badge key="b" bg={c.bgTer} color={c.textSec} border={c.border} r={r}>3 drafts</Badge>,
          <Badge key="c" bg={`${c.suc}22`} color={c.suc} r={r}>Active</Badge>,
        ]} />
      <MetricStrip>
        <MetricCard c={c} r={r} label="Contacts" value="47" />
        <MetricCard c={c} r={r} label="Avg strength" value="3.8" color={c.suc} />
        <MetricCard c={c} r={r} label="Referral queue" value="3" color={c.warn} />
        <MetricCard c={c} r={r} label="Outreach sent" value="12" />
      </MetricStrip>

      {/* Two-column layout */}
      <div style={{ display: "grid", gridTemplateColumns: "0.95fr 1.05fr", gap: 12 }}>
        {/* Left: Contact list */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <SectionHeader c={c} title="Contacts"
            action={<button style={{ ...btnS(c, r, true), padding: "4px 12px", fontSize: 10 }}>New</button>} />
          <div style={{
            border: `2px solid ${c.border}`, borderRadius: r > 0 ? r * 0.5 : 0,
            padding: "6px 10px", fontSize: 11, color: c.textMut, background: c.bgEl,
          }}>{"\u2315"} Search contacts...</div>

          <div style={{
            border: `2px solid ${c.border}`, borderRadius: r, background: c.bgEl,
            overflow: "hidden", maxHeight: 340,
          }}>
            {CONTACTS.map((ct, i) => (
              <div key={ct.name} style={{
                padding: "8px 10px", borderBottom: i < CONTACTS.length - 1 ? `1px solid ${c.border}` : "none",
                background: ct.active ? c.bgHov : "transparent",
                borderLeft: ct.active ? `3px solid ${c.pri}` : "3px solid transparent",
                display: "flex", justifyContent: "space-between", alignItems: "flex-start",
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: c.text, textTransform: "uppercase" }}>{ct.name}</div>
                  <div style={{ fontSize: 10, color: c.textSec }}>{ct.title} {"\u2014"} {ct.co}</div>
                  <div style={{ ...mono, fontSize: 10, color: c.textMut }}>{ct.email}</div>
                  <div style={{ ...mono, fontSize: 9, color: c.textMut, marginTop: 2 }}>Last: {ct.days} days ago</div>
                </div>
                <Badge bg={`${c.suc}22`} color={c.suc} r={r}>{ct.str}/5</Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Editor + mini panels */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <SectionHeader c={c} title="Editor"
            action={<button style={{ ...btnS(c, r), padding: "4px 10px", fontSize: 10, color: c.dan, borderColor: c.dan }}>Delete</button>} />

          <Surface c={c} r={r} style={{ padding: 12 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {FIELDS.map(f => (
                <div key={f.label}>
                  <div style={{ ...mono, fontSize: 9, color: c.textMut, textTransform: "uppercase", marginBottom: 2 }}>{f.label}</div>
                  {f.label === "Strength" ? (
                    <select style={input(f.val)}>
                      <option>{f.val}</option>
                    </select>
                  ) : (
                    <div style={input(f.val)}>{f.val}</div>
                  )}
                </div>
              ))}
            </div>
            <div style={{ marginTop: 8 }}>
              <div style={{ ...mono, fontSize: 9, color: c.textMut, textTransform: "uppercase", marginBottom: 2 }}>Notes</div>
              <textarea style={{
                ...input(""), minHeight: 50, resize: "vertical",
              }} defaultValue="Met at React Conf 2025. Interested in referral for senior role." />
            </div>
            <div style={{ display: "flex", gap: 6, marginTop: 10, justifyContent: "flex-end" }}>
              <button style={{ ...btnS(c, r), padding: "6px 14px", fontSize: 11 }}>Reset</button>
              <button style={{ ...btnS(c, r, true), padding: "6px 14px", fontSize: 11 }}>Save</button>
            </div>
          </Surface>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            <Surface c={c} r={r} style={{ padding: 10 }}>
              <div style={{ ...mono, fontSize: 9, color: c.textMut, textTransform: "uppercase", marginBottom: 4 }}>Company scan</div>
              <div style={{ fontSize: 11, fontWeight: 600, color: c.text }}>Stripe</div>
              <div style={{ fontSize: 10, color: c.textSec, marginTop: 2 }}>Series H {"\u00B7"} 8,000+ employees {"\u00B7"} Fintech</div>
            </Surface>
            <Surface c={c} r={r} style={{ padding: 10 }}>
              <div style={{ ...mono, fontSize: 9, color: c.textMut, textTransform: "uppercase", marginBottom: 4 }}>Referral desk</div>
              <div style={{ fontSize: 11, fontWeight: 600, color: c.text }}>3 pending</div>
              <div style={{ fontSize: 10, color: c.textSec, marginTop: 2 }}>Next follow-up: Sarah Chen (2d)</div>
            </Surface>
          </div>
        </div>
      </div>
    </div>
  );
}