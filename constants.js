// ─── UBF TEAM ────────────────────────────────────────────────────────────────
export const TEAM = [
  {
    id: 1, name: "I. Amani", fullName: "I. Amani",
    role: "Executive Director", shortRole: "ED",
    email: "i.amani@ugandabiodiversityfund.org",
    access: "admin", avatar: "IA", color: "#1B5E20",
    canSee: ["all"],
    description: "Strategic oversight, Batch 3 ($1M+) grants, donor relations"
  },
  {
    id: 2, name: "W. Nabatanzi", fullName: "W. Nabatanzi",
    role: "Finance & Admin Manager", shortRole: "FAM",
    email: "w.nabatanzi@ugandabiodiversityfund.org",
    access: "finance", avatar: "WN", color: "#0D47A1",
    canSee: ["all"],
    description: "Budget, financial compliance, audits, financial reporting"
  },
  {
    id: 3, name: "P. Musiime", fullName: "P. Musiime",
    role: "Programs Officer", shortRole: "PO",
    email: "p.musiime@ugandabiodiversityfund.org",
    access: "programs", avatar: "PM", color: "#4A148C",
    canSee: ["grants", "agent", "pipeline"],
    description: "Technical proposals, Batch 1 and 2 grants, programme alignment"
  },
  {
    id: 4, name: "D. Okullu", fullName: "D. Okullu",
    role: "M&E Officer", shortRole: "M&E",
    email: "d.okullu@ugandabiodiversityfund.org",
    access: "me", avatar: "DO", color: "#E65100",
    canSee: ["grants", "pipeline"],
    description: "Monitoring frameworks, results reporting, donor progress reports"
  },
  {
    id: 5, name: "O. Atuhaire", fullName: "O. Atuhaire",
    role: "Project Officer", shortRole: "PJO",
    email: "o.atuhaire@ugandabiodiversityfund.org",
    access: "programs", avatar: "OA", color: "#880E4F",
    canSee: ["grants", "agent", "pipeline"],
    description: "Implementation planning, field activities, community engagement"
  },
  {
    id: 6, name: "S. Abonyo", fullName: "S. Abonyo",
    role: "Administration Officer", shortRole: "AO",
    email: "s.abonyo@ugandabiodiversityfund.org",
    access: "admin", avatar: "SA", color: "#37474F",
    canSee: ["grants", "pipeline", "team"],
    description: "Office administration, document management, logistics"
  },
  {
    id: 7, name: "T. Otieno", fullName: "T. Otieno",
    role: "Office Assistant", shortRole: "OA",
    email: "t.otieno@biodiversityfund.org",
    access: "viewer", avatar: "TO", color: "#1565C0",
    canSee: ["all"],
    description: "Grant research, tracking, document preparation, coordination"
  },
]

// ─── UBF THEMATIC PRIORITIES (BFP V4 January 2026) ──────────────────────────
export const UBF_THEMES = [
  "Biodiversity Conservation",
  "Forest Restoration",
  "Wetlands and Water",
  "Climate Change Resilience",
  "Ecosystem Restoration",
  "Agroforestry",
  "Community Livelihoods",
  "Nature Finance and Markets",
  "Carbon Markets",
  "Sustainable Land Management",
  "Wildlife Conservation",
  "Key Biodiversity Areas",
  "Nature-Positive Food Systems",
  "Circular Economy",
  "One Health and Bioeconomy",
  "Youth and Women Inclusion",
  "Refugee Hosting Landscapes",
  "Sustainable Agriculture",
  "Eco-tourism",
  "Capacity Building",
]

// ─── UBF PROGRAM WINDOWS ─────────────────────────────────────────────────────
export const PROGRAM_WINDOWS = [
  "Nature Finance and Markets",
  "Resilient Landscapes and Catchments",
  "Nature-Positive Food Systems",
  "Circular Economy and Green Cities",
  "One Health and Bioeconomy",
]

// ─── UBF KEY BIODIVERSITY AREAS ──────────────────────────────────────────────
export const UBF_KBAS = [
  "Bwindi Impenetrable NP", "Kibale National Park", "Queen Elizabeth NP",
  "Murchison Falls NP", "Ruwenzori Mountains NP", "Kidepo Valley NP",
  "Semuliki NP", "Mount Elgon NP", "Budongo Forest Reserve",
  "Bugoma Forest Reserve", "Mabira Forest Reserve", "Nabugabo Wetland",
  "Lake Mburo NP", "Sango Bay Area", "Albertine Rift", "Karamoja",
  "Eastern Uganda", "Lake Victoria Basin", "Rwenzori Landscape",
  "West Nile Region",
]

// ─── GRANT STATUSES ───────────────────────────────────────────────────────────
export const STATUSES = [
  "Not Started",
  "In Progress",
  "Documents Gathering",
  "Under Review",
  "Submitted",
  "Awarded",
  "Rejected",
]

// ─── BATCH DEFINITIONS ───────────────────────────────────────────────────────
export const BATCHES = {
  1: { label: "Batch 1 ($1K–$100K)",   color: "#E65100", bg: "#FFF3E0", short: "B1" },
  2: { label: "Batch 2 ($100K–$1M)",   color: "#1565C0", bg: "#E3F2FD", short: "B2" },
  3: { label: "Batch 3 ($1M+)",        color: "#2E7D32", bg: "#E8F5E9", short: "B3" },
}

// ─── AI AGENT SYSTEM PROMPT ──────────────────────────────────────────────────
export const AGENT_SYSTEM_PROMPT = `You are the UBF Grants Intelligence Agent for Uganda Biodiversity Fund (UBF).

UBF MISSION: Mobilize and channel resources for biodiversity conservation across Uganda — for now and the future.

THEMATIC PRIORITIES (Biodiversity Funding Program V4, January 2026):
1. REDUCING DEGRADATION OF BIODIVERSITY
   - Restoration of Key Biodiversity Areas (KBAs), ecosystem restoration
   - Wildlife conservation, wetlands, circular economy, biodiversity offsets
   - Habitat connectivity, landscape-level conservation

2. CLIMATE CHANGE RESILIENCE AND ADAPTATION  
   - Sustainable Land Management (SLM), agroforestry, climate-smart agriculture
   - Nature-based solutions, carbon markets, Payment for Ecosystem Services
   - Resilient landscapes, catchment management, water security

3. COMMUNITY LIVELIHOODS AND INCLUSION
   - Eco-tourism, beekeeping, non-timber forest products, sustainable fisheries
   - Agrobiodiversity, youth and women inclusion, human-wildlife conflict mitigation
   - Refugee-hosting landscape programming

PROGRAM WINDOWS:
- Nature Finance and Markets
- Resilient Landscapes and Catchments  
- Nature-Positive Food Systems
- Circular Economy and Green Cities
- One Health and Bioeconomy

KEY GEOGRAPHY: Uganda's 45 Key Biodiversity Areas including Bwindi Impenetrable NP, Kibale NP, Queen Elizabeth NP, Murchison Falls NP, Albertine Rift, Karamoja, Lake Victoria Basin, refugee-hosting districts.

GRANTS TEAM AND ROLES:
- ED — i.amani: Strategic decisions, Batch 3 ($1M+) grants, donor relationships
- Finance Manager — w.nabatanzi: Budget compliance, financial reporting
- Programs Officer — p.musiime: Technical proposals, Batch 1 and 2 applications
- M&E Officer — d.okullu: Monitoring frameworks, results reporting
- Project Officer — o.atuhaire: Implementation planning, field coordination
- Admin Officer — s.abonyo: Document management, logistics
- Office Assistant — t.otieno: Grant research, tracking, coordination

GRANT CLASSIFICATION:
- Batch 1: $1,000 to $100,000
- Batch 2: $100,001 to $1,000,000  
- Batch 3: $1,000,001 and above

When responding:
- Be specific, practical and actionable for a Uganda-based NGO team
- Always classify grants by batch when discussing funding amounts
- Recommend the specific team member who should lead each application
- Flag urgent deadlines prominently
- Check alignment with UBF's 3 core thematic priorities before recommending any grant
- Use plain language — the team includes non-technical staff
- When searching for grants, focus on biodiversity, conservation, climate, community livelihoods`
