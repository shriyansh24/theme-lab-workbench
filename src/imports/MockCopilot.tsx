import type { ThemeColors } from "./themes";
import { textOn } from "./themes";
import {
  PageHeader, MetricStrip, MetricCard, SectionHeader, Badge,
  StateBlock, Surface, SplitWorkspace, cardS, mono, display, sans,
  btnS,
} from "./shared";

export function MockCopilot({ c, r = 0 }: { c: ThemeColors; r?: number }) {
  const tabs = ["Assistant", "History", "Letters"];
  const messages: { role: "user" | "ai"; text: string }[] = [
    { role: "user", text: "Find me remote senior engineer roles at Series B+ startups" },
    { role: "ai", text: "I found 12 roles matching your criteria. The top 3 by match score:" },
    { role: "ai", text: "1. Stripe \u2014 Senior SWE (95%)\n2. Linear \u2014 Backend (79%)\n3. Supabase \u2014 Full Stack (74%)" },
    { role: "user", text: "Apply to the Stripe role and draft a cover letter" },
  ];
  const quickPrompts = ["Best targets", "Follow-up plan", "Skill gaps"];

  return (
    <div style={{ ...sans, padding: 16, background: c.bg, minHeight: "100%" }}>
      <PageHeader c={c} r={r} eyebrow="Prepare" title="Copilot"
        description="Chat, history, and cover letters." />
      <MetricStrip>
        <MetricCard c={c} r={r} label="Jobs" value="2,847" />
        <MetricCard c={c} r={r} label="Messages" value="12" color={c.warn} />
        <MetricCard c={c} r={r} label="Mode" value="Assistant" />
        <MetricCard c={c} r={r} label="Draft" value="Ready" color={c.suc} />
      </MetricStrip>

      {/* Tab bar */}
      <div style={{ display: "flex", gap: 4, marginBottom: 12 }}>
        {tabs.map((t, i) => (
          <button key={t} style={{
            ...btnS(c, r, i === 0),
            padding: "6px 14px", fontSize: 11,
            ...(i === 0 ? { background: c.pri, color: textOn(c.pri) } : {}),
          }}>{t}</button>
        ))}
      </div>

      <SplitWorkspace>
        {/* Primary: Chat */}
        <div style={{ flex: 2, display: "flex", flexDirection: "column", gap: 10 }}>
          <SectionHeader c={c} title="Chat" description="Choose a job and send prompts." />

          {/* Job selector */}
          <div style={{
            border: `2px solid ${c.border}`, borderRadius: r > 0 ? r * 0.5 : 0,
            padding: "8px 12px", fontSize: 12, color: c.text, background: c.bgEl,
          }}>
            Senior SWE @ Stripe (95% match) <span style={{ float: "right", color: c.textMut }}>{"\u25BE"}</span>
          </div>

          {/* Chat viewport */}
          <div style={{
            border: `2px solid ${c.border}`, borderRadius: r, background: c.bg,
            padding: 14, minHeight: 200, display: "flex", flexDirection: "column", gap: 8,
          }}>
            {messages.map((m, i) => (
              <div key={i} style={{
                alignSelf: m.role === "user" ? "flex-end" : "flex-start",
                maxWidth: "80%", padding: "10px 14px", fontSize: 11,
                borderRadius: r > 0 ? r * 0.75 : 0, lineHeight: 1.5,
                whiteSpace: "pre-line",
                background: m.role === "user" ? c.bgTer : c.bgSec,
                border: m.role === "ai" ? `2px solid ${c.border}` : "none",
                color: c.text,
              }}>{m.text}</div>
            ))}
          </div>

          {/* Divider */}
          <div style={{ height: 2, background: c.border }} />

          {/* Quick prompts */}
          <div style={{ display: "flex", gap: 6 }}>
            {quickPrompts.map(p => (
              <button key={p} style={{ ...btnS(c, r), padding: "4px 10px", fontSize: 10 }}>{p}</button>
            ))}
          </div>

          {/* Textarea */}
          <textarea style={{
            border: `2px solid ${c.border}`, borderRadius: r > 0 ? r * 0.5 : 0,
            background: c.bgEl, color: c.text, padding: 10, fontSize: 11,
            minHeight: 80, resize: "vertical", fontFamily: "inherit",
          }} placeholder="Ask anything about your job search..." />

          {/* Send button */}
          <button style={{ ...btnS(c, r, true), padding: "8px 18px", fontSize: 12, alignSelf: "flex-end" }}>
            Send {"\u2726"}
          </button>
        </div>

        {/* Secondary: Context */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
          <SectionHeader c={c} title="Context" description="Selected job" />
          <StateBlock c={c} r={r} title="Senior Software Engineer"
            description="Stripe \u00B7 Remote \u00B7 $180k\u2013$240k" />
          <Badge bg={`${c.suc}22`} color={c.suc} r={r}>95%</Badge>
          <div style={{
            fontSize: 11, color: c.textSec, lineHeight: 1.6, padding: 10,
            border: `2px solid ${c.border}`, borderRadius: r, background: c.bgEl,
          }}>
            Strong match based on your React and TypeScript experience.
            The role emphasizes distributed systems design and API architecture,
            which aligns with your recent project history.
          </div>
        </div>
      </SplitWorkspace>
    </div>
  );
}