# SafeHand — Product Requirements Document
### Hermes Agent Working Context | OH&S Co-Pilot for Small Employers
**Version:** 1.0  
**Status:** Active — Agenthon Submission + Build Reference  
**Last Updated:** 2026-05-14  
**Owner:** User (referred to as "the Owner" throughout)

---

> **Note to Hermes:** This is your primary working context file for the SafeHand project. Load this at session start whenever the Owner references SafeHand, OH&S, safety management, or this hackathon. Cross-reference with `user.md` and `memory.md` for Owner-specific preferences. When in doubt about scope, refer back to this file before asking.

---

## 1. Project Identity

| Field | Value |
|---|---|
| **Product Name** | SafeHand |
| **Tagline** | OH&S Co-Pilot for Small Employers |
| **Platform** | Hermes Agent (Telegram-first interface) |
| **Standard Alignment** | ISO 45001-aligned, not certified |
| **Target Market** | Small employers, 5–12 employees |
| **Primary Industries** | Construction, trades, agriculture, food production, logistics, field services |
| **Submission Context** | Agenthon Hackathon — agent-powered innovation category |
| **Core Differentiator** | Safety program builds itself passively from real work conversations — no forms, no templates, no dedicated setup time |

---

## 2. The Problem This Solves

### 2.1 Root Problem

Small employers carry **identical legal liability** to large corporations when a worker is injured — same fines, same regulatory exposure, same potential for director/owner criminal liability (e.g., Canada Bill C-45) — but operate with:

- No dedicated safety officer or compliance budget
- An owner already wearing every operational hat
- High annual staff turnover — safety knowledge walks out with every departing worker
- Seasonal workforce — onboarding restarts from zero every cycle
- Majority foreign workers — classroom training and written English procedures are ineffective
- Safety culture that is **reactive only** — triggered by incidents, failed client audits, or regulator visits
- No capacity for additional administrative tasks on top of daily operations

### 2.2 Business Consequence

Without a functioning OH&S program, small employers face:

1. **Lost revenue** — larger clients and government contracts increasingly require proof of OH&S compliance before awarding work
2. **Insurance exposure** — no documented program = higher premiums, weaker claim position
3. **Regulatory fines** — non-compliance penalties from WorkSafeBC, OSHA, or equivalent jurisdiction bodies
4. **Catastrophic business risk** — one serious incident triggers investigation, downtime, legal costs, reputational damage
5. **Personal liability** — owner/director faces criminal exposure in serious injury or fatality cases

### 2.3 Why Existing Tools Fail This Market

| Tool Type | Why It Fails |
|---|---|
| Form-based SaaS (Alcumus, Workhub, Safesite) | Requires owner to build the program manually — adds work, not removes it |
| Consultant-led implementation | $10K–$20K cost, 6–12 month timeline, no ongoing maintenance |
| Generic chatbot | Resets every session, no memory of business context, no scheduled execution |
| Paper binder systems | Never updated, no audit trail, fails inspection immediately |

**SafeHand's wedge:** *Existing tools digitize the paperwork. SafeHand eliminates it.*

---

## 3. Users

### 3.1 Primary User — The Owner/GM

- Wears the safety hat between actual revenue-generating work
- On a job site, in a truck, or on a shop floor — not at a desk
- Communicates by voice, not by filling in forms
- Needs a tool that fits into existing work conversations, not one that creates new administrative routines
- Likely has tried and abandoned compliance tools before due to complexity
- Motivated by: winning contracts, avoiding fines, protecting crew, not getting sued

**How Hermes serves this user:** Telegram voice notes, immediate responses, no login portals, no dashboards to learn, outputs they can forward directly to clients or inspectors.

### 3.2 Secondary Users — Workers

- Mix of seasonal, foreign, and long-term workers
- Varying English literacy — written policies are ineffective
- Familiar with phone-based communication
- Need safety information delivered conversationally, not in binders
- High turnover means onboarding must be fast, repeatable, and language-flexible

**How Hermes serves this user:** Toolbox talks delivered via Telegram in plain language; onboarding via five-minute conversation; training records maintained automatically regardless of who leaves.

### 3.3 Tertiary Users — Clients, Inspectors, Insurers

- Require documented proof of OH&S program
- Audit hazard registers, training matrices, incident logs, SOPs
- Do not care how the documentation was generated — only that it exists and is current

**How Hermes serves this user:** Generates submission-ready documents on demand; maintains audit trail automatically.

---

## 4. Core Features

> **Hermes instruction:** Map each feature below to a skill. If a skill does not yet exist, flag it to the Owner and offer to build it. If a skill exists in the community hub that covers this use case, install it rather than rebuilding.

### 4.1 Conversational Hazard Capture
- Owner or supervisor reports hazards, near-misses, or incidents by voice or text via Telegram
- Agent transcribes, classifies, logs to hazard register, and generates corrective action
- **Trigger phrases:** "we had a near miss", "something almost happened", "X is a hazard", "incident today"
- **Output:** Updated hazard register entry + suggested control measure + flagged action item

### 4.2 Automatic SOP Generation
- Owner mentions equipment, task, or process → agent generates draft SOP
- SOP follows ISO 45001 structure: purpose, scope, responsibilities, procedure, hazards, controls
- **Trigger phrases:** "we use X", "new equipment arrived", "can you make a procedure for"
- **Output:** Draft SOP saved to project files + cron scheduled for periodic review

### 4.3 Worker Onboarding via Conversation
- New worker joins → Owner tells agent → agent runs onboarding sequence
- Delivers safety orientation in plain language via Telegram
- Records completion in training matrix
- Language note: flag to Owner if worker's primary language is known — adapt delivery accordingly
- **Trigger phrases:** "new worker starting", "hired someone", "onboard X"
- **Output:** Training record entry + orientation checklist + gap identification

### 4.4 Toolbox Talk Generator
- Generates weekly safety briefings relevant to current work and recent hazard log
- Pulls from hazard register to make talks contextually relevant, not generic
- **Trigger phrases:** "generate a toolbox talk", "what should we cover this week", automatic weekly cron
- **Output:** Plain-language briefing formatted for verbal delivery or printed handout

### 4.5 Inspection Scheduler and Logger
- Scheduled equipment and site inspections based on industry norms and jurisdiction requirements
- Owner completes inspection via voice checklist in Telegram
- Findings logged, deficiencies flagged, corrective actions tracked
- **Trigger phrases:** "inspection due", "checked X today", "equipment issue"
- **Output:** Completed inspection record + deficiency action items

### 4.6 Incident and Accident Investigation
- Structured investigation triggered when incident reported
- Collects: what happened, who was involved, what was the cause, what controls failed, what corrective action is required
- Generates investigation report in jurisdiction-appropriate format
- **Trigger phrases:** "incident happened", "worker was hurt", "accident today", "injury"
- **Output:** Investigation report + corrective action plan + regulator notification checklist if required

### 4.7 Training Matrix Management
- Tracks certifications, training completion, and expiry dates per worker
- Sends renewal reminders via scheduled cron before expiry
- Flags gaps when new roles, tasks, or equipment introduced
- **Trigger phrases:** "X got certified", "training expired", "who needs training"
- **Output:** Current training matrix + upcoming expiry alerts + gap report

### 4.8 Weekly Compliance Summary
- Every Friday: automated summary of the week's safety activity
- Includes: hazards logged, inspections completed, training completed, open action items, upcoming deadlines
- Delivered to Owner via Telegram
- **Cron:** Weekly, Friday 4:00 PM local time
- **Output:** Summary message + any urgent flags requiring Owner attention

### 4.9 On-Demand Client Documentation Package
- Owner requests proof of OH&S program for bid or audit
- Agent compiles: policy statement, hazard register summary, training matrix, recent inspection records, incident log
- **Trigger phrases:** "I need to submit our safety program", "client wants proof", "audit tomorrow"
- **Output:** Compiled document package ready to forward

---

## 5. Management System Elements (Scope)

These nine elements form the backbone of the SafeHand management system. Every feature in Section 4 maps to one or more of these elements. Hermes should track coverage across all nine and flag gaps to the Owner.

| # | Element | Primary Feature(s) | Status |
|---|---|---|---|
| 1 | Management Commitment | Soul file + Owner onboarding conversation | Build in onboarding |
| 2 | Policy and Procedures | SOP Generator (4.2) | Skill required |
| 3 | Training, Education, Certification | Worker Onboarding (4.3) + Training Matrix (4.7) | Skill required |
| 4 | Hazard and Risk Identification, Assessment, and Control | Hazard Capture (4.1) | Skill required |
| 5 | Inspections | Inspection Scheduler (4.5) | Skill required + cron |
| 6 | Incident / Accident Investigation | Incident Investigation (4.6) | Skill required |
| 7 | Program Administration | Weekly Summary (4.8) + GitHub backup cron | Cron required |
| 8 | Action Plan | All features — action items tracked centrally | Memory + skill |
| 9 | Contract Systems | Client Documentation Package (4.9) | Skill required |

---

## 6. Skills to Build

> **Hermes instruction:** Build these skills in priority order. After each skill is built and tested, update this section with the skill filename and confirm YAML front matter triggers are accurate.

### Priority 1 — Core Safety Operations

```yaml
# Skill: safehand-hazard-capture.md
triggers:
  - near miss
  - hazard reported
  - incident today
  - something almost happened
  - close call
  - unsafe condition
```

```yaml
# Skill: safehand-incident-investigation.md
triggers:
  - incident happened
  - worker was hurt
  - injury
  - accident today
  - someone got hurt
```

```yaml
# Skill: safehand-sop-generator.md
triggers:
  - new equipment
  - make a procedure
  - SOP for
  - we use X
  - procedure needed
```

### Priority 2 — People and Training

```yaml
# Skill: safehand-worker-onboarding.md
triggers:
  - new worker
  - hired someone
  - onboard
  - starting Monday
  - new hire
```

```yaml
# Skill: safehand-training-matrix.md
triggers:
  - training expired
  - who needs training
  - certification due
  - got certified
  - training matrix
```

### Priority 3 — Scheduled and Reporting

```yaml
# Skill: safehand-toolbox-talk.md
triggers:
  - toolbox talk
  - safety briefing
  - what should we cover
  - weekly safety
```

```yaml
# Skill: safehand-inspection.md
triggers:
  - inspection due
  - equipment check
  - site inspection
  - checked X today
```

```yaml
# Skill: safehand-client-package.md
triggers:
  - client wants proof
  - safety submission
  - audit tomorrow
  - need our safety program
  - bid requires
```

---

## 7. Crons to Schedule

| Cron Name | Frequency | Trigger Time | Action |
|---|---|---|---|
| `weekly-safety-summary` | Weekly | Friday 4:00 PM (Owner local time) | Generate and send weekly compliance summary |
| `training-expiry-check` | Weekly | Monday 8:00 AM | Scan training matrix, flag expiries within 30 days |
| `inspection-reminder` | Monthly | 1st of month, 9:00 AM | List inspections due this month |
| `toolbox-talk-prompt` | Weekly | Monday 7:00 AM | Prompt Owner: "Ready to generate this week's toolbox talk?" |
| `github-backup` | Daily | Midnight (Owner local time) | Push all project files to private GitHub repo |
| `action-item-review` | Weekly | Wednesday 9:00 AM | List all open action items with age and priority |

> **Hermes instruction:** Confirm Owner's local timezone before scheduling any cron. Default assumption is Central Time (CT) based on known Owner location. Confirm before deploying.

---

## 8. Memory the Agent Should Maintain

> **Hermes instruction:** Actively build and update the following memory entries as the Owner provides information. Do not wait to be asked — extract and save after relevant conversations.

### Business Context (save to memory.md)
- Business name and type of operations
- Number of workers and typical crew composition
- Primary equipment and tasks performed
- Primary hazards relevant to the industry
- Jurisdiction (province/state) — determines regulatory body and specific compliance requirements
- Client types and whether they require OH&S documentation for contracts
- Past incidents or near-misses the Owner mentions

### Worker Registry (maintain as structured list)
- Worker names (or IDs if Owner prefers anonymity)
- Start date
- Training completed and expiry dates
- Certifications held
- Language / communication preferences if mentioned

### Open Action Items (maintain as live list)
- Source event (hazard, inspection, incident)
- Action required
- Assigned to (Owner or specific worker)
- Due date
- Status

### Program State Tracker
- Which of the 9 management system elements have active coverage
- Which skills have been built and are functioning
- Which crons are active
- Last date each program element was updated

---

## 9. Privacy and Data Constraints

These are non-negotiable. Hermes must enforce these without being asked.

1. **No worker recording** — Workers are never recorded or monitored. The Owner narrates to the agent. Workers interact only when the Owner initiates an onboarding or training delivery sequence, and only through direct Telegram message to the agent.

2. **No secrets in conversation history** — API keys, passwords, and credentials go into the `.env` file via `hermes config set`, never pasted into Telegram or the CLI chat window.

3. **Private GitHub repo only** — The backup cron pushes to a private repo. Confirm this before every push. Never push to a public repo.

4. **No `.env` committed to GitHub** — The `.gitignore` must exclude all `.env` files. Confirm this is in place before the first backup cron runs.

5. **Jurisdiction-specific compliance** — Before generating any regulatory notification (e.g., serious incident reporting), confirm the Owner's jurisdiction. Regulatory bodies, forms, and timelines differ significantly between BC, Alberta, Ontario, federal, and US states.

6. **No guaranteed compliance claims** — SafeHand is ISO 45001-*aligned*, not certified. Never tell the Owner they are "fully compliant" or "certified." Use language like "your program aligns with ISO 45001 principles" and "this documentation supports your compliance position."

---

## 10. The Journey — Implementation Phases

Use this as the milestone map for tracking project progress. Hermes should know which phase the Owner is currently in and orient suggestions accordingly.

### Phase 1 — Week 1: First Conversation
**Goal:** Baseline hazard register, first three crons live, GitHub backup running.

Checklist:
- [ ] Owner onboarding conversation complete (business type, crew, equipment, past incidents)
- [ ] First hazard register draft generated
- [ ] Jurisdiction confirmed
- [ ] Three baseline crons scheduled: weekly summary, training check, inspection reminder
- [ ] GitHub private repo created and backup cron active
- [ ] `memory.md` populated with business context

### Phase 2 — Weeks 2–3: Program Takes Shape
**Goal:** First skills built and tested, real incidents and hazards feeding the system.

Checklist:
- [ ] At least one real hazard or near-miss logged via voice note
- [ ] First SOP generated for primary equipment or task
- [ ] Worker registry started
- [ ] At least one toolbox talk generated from hazard register
- [ ] Owner has corrected the agent at least once — skill updated from feedback

### Phase 3 — Week 4: First Real Output
**Goal:** Owner has a document package they could hand to a client or inspector today.

Checklist:
- [ ] Weekly summary delivered and reviewed by Owner
- [ ] Training matrix exists with at least partial data
- [ ] Client documentation package skill tested end-to-end
- [ ] Owner can describe what the system is doing without prompting

### Phase 4 — Month 2–3: Living System
**Goal:** Program runs without Owner initiation. New workers onboard through the agent. Owner bids on and wins a compliance-required contract.

Checklist:
- [ ] All 9 management system elements have active skill coverage
- [ ] All crons running without manual intervention
- [ ] At least one new worker onboarded entirely through the agent
- [ ] Owner has submitted OH&S documentation to a client or regulator
- [ ] Agent has self-updated at least two skills based on Owner feedback

---

## 11. Success Criteria

> **Hermes instruction:** Self-check against these criteria at the end of each session and surface gaps to the Owner unprompted.

| Criterion | How to Measure |
|---|---|
| Program runs without Owner initiation | All crons active, no manual prompts required for scheduled tasks |
| Hazard register is current | Last entry within 7 days OR Owner confirmed no new hazards |
| Training matrix is complete | All current workers have entries; no expiries overdue |
| At least one SOP per primary task | Count SOPs vs. Owner-confirmed task list |
| Client package can be generated in under 5 minutes | Test on demand |
| Owner can describe the safety program without looking anything up | Qualitative — ask Owner periodically |
| Zero secrets in conversation history | Audit `.env` vs. chat history on request |
| GitHub backup current | Confirm last commit timestamp within 24 hours |

---

## 12. Open Questions for the Owner

> **Hermes instruction:** Surface these questions across the first two weeks of use. Do not ask all at once. One or two per session, woven into natural conversation. Mark as resolved in memory once answered.

- [ ] What jurisdiction are you operating in? (Province/state — determines regulatory body)
- [ ] Have you ever lost a contract because you couldn't show proof of an OH&S program?
- [ ] What are your three highest-risk tasks or pieces of equipment?
- [ ] Do any of your workers have certifications that expire? (First Aid, WHMIS, forklift, etc.)
- [ ] Has there been a serious incident or near-miss in the last two years I should know about?
- [ ] Do your clients ever ask for your safety program documentation? Who are they?
- [ ] What language(s) do your workers primarily communicate in?
- [ ] Do you have any existing policies, procedures, or safety documents I should import?
- [ ] Are you currently paying for any safety software, consultants, or training providers?
- [ ] When a worker gets hurt or almost gets hurt — what actually happens next in your business right now?

---

## 13. Competitive Context

> **Hermes instruction:** If the Owner asks how SafeHand compares to other tools, use this section. Do not volunteer comparisons unprompted.

| Competitor | Type | Weakness SafeHand Exploits |
|---|---|---|
| Alcumus / SafetySync | Form-based SaaS | Owner still builds the program manually |
| Workhub | Form-based SaaS | Designed for companies with a dedicated safety person |
| Safesite | Mobile-first SaaS | Incident-focused only, not full management system |
| OH&S Consultant | Human service | $10K–$20K upfront, no ongoing execution, no memory |
| Generic LLM / ChatGPT | Stateless chatbot | Resets every session, no crons, no persistent memory |

**SafeHand's defensible position:** The only OH&S solution where the management system builds itself from real operations, runs scheduled maintenance autonomously, and requires no dedicated safety expertise to operate — delivered through a channel (Telegram) the Owner already uses.

---

## 14. Hackathon Demo Script

> **Hermes instruction:** If the Owner asks to prepare for a demo, use this script as the baseline. Practice this loop until it runs in under 90 seconds.

**The 90-Second Demo Loop:**

1. Owner sends voice note: *"Hey, one of my guys almost got hit by a forklift today in the loading bay."*
2. Agent transcribes → classifies as near-miss → logs to hazard register → generates corrective action (spotter required, exclusion zone, signage)
3. Agent schedules follow-up inspection cron for loading bay
4. Agent generates toolbox talk: *"Loading Bay Safety — Forklift Exclusion Zones"*
5. Agent shows updated training matrix: flags workers without forklift awareness training

**What this demonstrates to judges:**
- Voice → structured output (no form filled)
- One input → five outputs (why an agent, not a SaaS)
- Memory: agent knows this is a loading bay (business context retained)
- Cron: follow-up scheduled without being asked
- Hermes-native: skills + memory + crons all working together

**Have a pre-recorded fallback ready.** If the live demo breaks at step 2, play the recording. Never skip the demo entirely.

---

## 15. Version History

| Version | Date | Changes |
|---|---|---|
| 1.0 | 2026-05-14 | Initial PRD — assembled from 4-step Agenthon activity + stress test |

---

*SafeHand PRD — For Hermes Agent Use | Private and Confidential*
