# Vishal Singh — The Engineer's Road

A production-quality personal portfolio for **Vishal Singh**, Software Engineer with 4.5 years of experience in enterprise platforms, fintech, backend architecture, full-stack systems, and production troubleshooting.

Built as an understated engineering publication combined with a continuous 3D road journey. A minimal 3D vehicle tracks scroll progress through career milestones, culminating in a finish line and a hidden, optional 3D Indian road survival mini-game: **"Survive the Commute"**.

---

## Architecture & Visual Hierarchy

1. **Monochromatic Editorial Design**: Restrained palette (`#111111`, `#191919`, `#242424`, `#F2F2F2`, `#B0B0B0`, `#333333`), Inter typography, 8px layout grid, thin dividers, and high-contrast readability.
2. **Priority 1 — Professional Identity & Content**:
   - **01 Intro / Hero**: Immediate clarity of identity, 4.5 YOE, summary, actions.
   - **02 Professional Experience**: Senior Software Engineer @ Yodaplus Technologies, Software Engineer @ Knight Fintech, Junior Software Engineer @ Uneecops Technologies.
   - **03 Engineering Capabilities**: Backend & System Design, Full-Stack Engineering, Database Engineering & Performance, Cloud & Production Engineering.
   - **04 Engineering Approach**: Four-stage incident remediation (Investigate, Isolate, Resolve, Validate).
   - **05 Applied AI & Grounded LLMs**: RAG, vector search (Milvus/pgvector), LangChain & LangGraph agent orchestration, guardrails.
   - **06 Projects & Engineering Lab**: Detailed architecture case studies and extensible technical lab notes.
   - **07 Contact & Finish Line**: Professional closing, contact channels, direct verified resume download, and milestone checkpoint.
3. **Priority 3 — Continuous 3D Road Scene**:
   - Persistent Three.js canvas tracking document scroll without scroll-jacking or snapping.
   - Minimalist low-poly vehicle gliding across dark asphalt with lane stripes and 7 checkpoint milestones.
   - Graceful fallback for non-WebGL environments.
4. **Priority 4 — Hidden Mini-Game: "Survive the Commute"**:
   - Optional 3D low-poly Indian road survival game revealed only upon reaching the finish line.
   - Procedural fair obstacles: Potholes, Auto-Rickshaws, Cargo Trucks, Cows, Buffaloes, and Dogs.
   - 3 lanes, keyboard (A/D or Arrows) and mobile touch buttons, 3 lives, distance counter to 1000m target, and fictional finish-line reward (1L ethanol-blended petrol with explicit disclaimer).

---

## Data Structure & Maintainability

All professional information is decoupled from the UI inside `src/data/`:

| File | Purpose |
| :--- | :--- |
| `src/data/profile.ts` | Name, title, contact details, social links, hero headlines, education, and resume path. |
| `src/data/experience.ts` | Chronological employment history, company summaries, and bullet points. |
| `src/data/skills.ts` | Core technical competencies, categorized cleanly by what they accomplish. |
| `src/data/approach.ts` | Four-stage engineering methodology and applied production rigor. |
| `src/data/appliedAi.ts` | Practical enterprise AI systems (RAG, agent graphs, guardrails). |
| `src/data/projects.ts` | In-depth case studies with problem statements, architecture, decisions, trade-offs, and engineering lab notes. |

### How to Add New Projects
Open `src/data/projects.ts` and add an object to the `projectsData` array:
```typescript
{
  id: "your-project-id",
  title: "Platform Name",
  category: "Distributed Systems",
  timeline: "2026",
  status: "Production Platform",
  summary: "Brief overview...",
  problemStatement: "The business or engineering constraint...",
  architecture: ["Component A", "Component B"],
  keyDecisions: ["Decision 1", "Decision 2"],
  tradeoffsAndChallenges: ["Trade-off details"],
  technologies: ["Go", "Kafka", "PostgreSQL"]
}
```
The page automatically renders the new case study with collapsible deep-dive sections without requiring any layout or template changes.

### How to Update Resume PDF
Place the updated PDF file in `public/Vishal_Singh_Resume.pdf`. The download buttons in the navigation, hero, and contact sections link directly to this file.

---

## Development & Production Build

### Prerequisites
- Node.js 18+ (tested on v24.11.0)
- npm 9+

### Commands
```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Run TypeScript check and production build
npm run build

# Preview the production build locally
npm run preview
```

### Production Bundle Optimization
- Code-split into modular chunks (`three.js`, `vendor.js`, `index.js`).
- Game module is lazy-loaded with `React.lazy` and `React.Suspense`, ensuring the primary portfolio loads instantly before loading game assets.
