# 🌿 UBF Grants Intelligence Platform

**Uganda Biodiversity Fund — Grants Management and AI Intelligence System**

> *For now and the future*

---

## What This Is

A web application that helps the Uganda Biodiversity Fund (UBF) team track, manage and discover grant opportunities. It includes:

- **Grant Tracker** — add, update and manage all grant opportunities
- **AI Grants Agent** — search for new grants and get strategic advice using AI
- **Pipeline Calendar** — view all deadlines organised by urgency
- **Team Dashboard** — see who is assigned to what and track urgent items
- **Staff User Guide** — built-in step-by-step guide for non-technical staff

---

## Built With

| Layer | Technology |
|---|---|
| Frontend | React 18 + Vite |
| Styling | Plain CSS + inline styles |
| AI Agent | Anthropic Claude API (claude-sonnet-4-6) with streaming |
| Data Storage | Browser localStorage (Phase 1) → Supabase (Phase 2) |
| Hosting | Cloudflare Pages |

---

## Getting Started (Local Development)

### Prerequisites
- Node.js version 18 or higher
- npm version 8 or higher

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/ubf-grants-platform.git
cd ubf-grants-platform

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev

# 4. Open in your browser
# http://localhost:5173
```

---

## Deploying to Cloudflare Pages

This is the recommended way to deploy for all UBF staff to access.

### Step 1 — Push to GitHub

```bash
git init
git add .
git commit -m "Initial UBF Grants Platform"
git remote add origin https://github.com/YOUR_USERNAME/ubf-grants-platform.git
git push -u origin main
```

### Step 2 — Connect to Cloudflare Pages

1. Go to [https://pages.cloudflare.com](https://pages.cloudflare.com)
2. Sign in or create a free Cloudflare account
3. Click **"Create a project"**
4. Click **"Connect to Git"**
5. Select your GitHub repository: `ubf-grants-platform`
6. Set build settings:
   - **Framework preset:** Vite
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
7. Click **"Save and Deploy"**
8. Cloudflare will build and deploy — takes about 2 minutes
9. Your platform will be live at: `https://ubf-grants-platform.pages.dev`

### Step 3 — Set a Custom Domain (Optional)

In Cloudflare Pages settings, you can add a custom domain such as `grants.ugandabiodiversityfund.org`

---

## Project Structure

```
ubf-grants-platform/
├── index.html                    # App entry point
├── package.json                  # Dependencies
├── vite.config.js                # Build configuration
├── src/
│   ├── main.jsx                  # React root
│   ├── App.jsx                   # Main app shell
│   ├── index.css                 # Global styles
│   ├── lib/
│   │   ├── constants.js          # Team, themes, KBAs, agent prompt
│   │   ├── helpers.js            # Utility functions
│   │   └── logo_b64.js           # UBF logo (base64 embedded)
│   ├── hooks/
│   │   ├── useGrants.js          # Grant state and localStorage
│   │   └── useAgent.js           # AI agent streaming
│   ├── components/
│   │   ├── Sidebar.jsx           # Navigation sidebar
│   │   └── Notification.jsx      # Toast notifications
│   └── pages/
│       ├── LoginPage.jsx         # Staff sign-in
│       ├── Dashboard.jsx         # KPI overview
│       ├── GrantTracker.jsx      # Grant management
│       ├── AgentPage.jsx         # AI agent chat
│       ├── PipelinePage.jsx      # Deadline calendar
│       ├── TeamPage.jsx          # Team view
│       └── UserGuide.jsx         # Staff user guide
└── README.md
```

---

## Phase 2 — Supabase Cloud Database

In Phase 1, data is stored in each user's browser. In Phase 2, we connect to Supabase so all staff share the same live data across devices.

### Supabase Setup

1. Create a free account at [https://supabase.com](https://supabase.com)
2. Create a new project called `ubf-grants`
3. Run this SQL in the Supabase SQL editor:

```sql
-- Grants table
CREATE TABLE grants (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  donor       TEXT,
  deadline    DATE,
  size        TEXT,
  high_usd    NUMERIC,
  low_usd     NUMERIC,
  batch       INTEGER,
  status      TEXT DEFAULT 'Not Started',
  geo         TEXT,
  themes      TEXT[],
  link        TEXT,
  priority    TEXT DEFAULT 'medium',
  assignee    TEXT,
  notes       TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE grants;
```

4. Get your Supabase URL and anon key from Project Settings → API
5. Add to Cloudflare Pages environment variables:
   - `VITE_SUPABASE_URL` = your project URL
   - `VITE_SUPABASE_ANON_KEY` = your anon key

---

## AI Agent Configuration

The AI agent uses the Anthropic Claude API. The API is called directly from the browser.

To use your own API key in production, add it as a Cloudflare Pages environment variable:
- Variable name: `VITE_ANTHROPIC_API_KEY`
- Then update `useAgent.js` to use: `import.meta.env.VITE_ANTHROPIC_API_KEY`

---

## UBF Thematic Priorities

The platform is built around UBF's Biodiversity Funding Program V4 (January 2026):

1. **Reducing Degradation of Biodiversity** — KBA restoration, wildlife, wetlands, circular economy
2. **Climate Change Resilience and Adaptation** — SLM, agroforestry, nature-based solutions, carbon markets
3. **Community Livelihoods and Inclusion** — eco-tourism, beekeeping, non-timber products, women and youth

**Program Windows:** Nature Finance and Markets | Resilient Landscapes and Catchments | Nature-Positive Food Systems | Circular Economy and Green Cities | One Health and Bioeconomy

---

## Grants Team

| Name | Role | Email |
|---|---|---|
| I. Amani | Executive Director | i.amani@ugandabiodiversityfund.org |
| W. Nabatanzi | Finance and Admin Manager | w.nabatanzi@ugandabiodiversityfund.org |
| P. Musiime | Programs Officer | p.musiime@ugandabiodiversityfund.org |
| D. Okullu | M&E Officer | d.okullu@ugandabiodiversityfund.org |
| O. Atuhaire | Project Officer | o.atuhaire@ugandabiodiversityfund.org |
| S. Abonyo | Administration Officer | s.abonyo@ugandabiodiversityfund.org |
| T. Otieno | Office Assistant | t.otieno@biodiversityfund.org |

---

## Support

For platform questions, contact **T. Otieno** — t.otieno@biodiversityfund.org

---

*Uganda Biodiversity Fund — For now and the future*
