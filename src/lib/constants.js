export const TEAM = [
  { id: 'i.amani',      name: 'I. Amani',      role: 'Executive Director',       email: 'i.amani@ugandabiodiversityfund.org' },
  { id: 'w.nabatanzi',  name: 'W. Nabatanzi',  role: 'Finance and Admin Manager', email: 'w.nabatanzi@ugandabiodiversityfund.org' },
  { id: 'p.musiime',    name: 'P. Musiime',    role: 'Programs Officer',          email: 'p.musiime@ugandabiodiversityfund.org' },
  { id: 'd.okullu',     name: 'D. Okullu',     role: 'M&E Officer',               email: 'd.okullu@ugandabiodiversityfund.org' },
  { id: 'o.atuhaire',   name: 'O. Atuhaire',   role: 'Project Officer',           email: 'o.atuhaire@ugandabiodiversityfund.org' },
  { id: 's.abonyo',     name: 'S. Abonyo',     role: 'Administration Officer',    email: 's.abonyo@ugandabiodiversityfund.org' },
  { id: 't.otieno',     name: 'T. Otieno',     role: 'Office Assistant',          email: 't.otieno@biodiversityfund.org' },
]

export const THEMES = [
  'Reducing Degradation of Biodiversity',
  'Climate Change Resilience and Adaptation',
  'Community Livelihoods and Inclusion',
]

export const PROGRAM_WINDOWS = [
  'Nature Finance and Markets',
  'Resilient Landscapes and Catchments',
  'Nature-Positive Food Systems',
  'Circular Economy and Green Cities',
  'One Health and Bioeconomy',
]

export const KBAS = [
  'Bwindi Impenetrable NP',
  'Mgahinga Gorilla NP',
  'Queen Elizabeth NP',
  'Murchison Falls NP',
  'Kibale NP',
  'Mount Elgon NP',
  'Lake Victoria Basin',
  'Albertine Rift',
  'Rwenzori Mountains',
  'Kidepo Valley NP',
]

export const STATUSES = [
  'Not Started',
  'In Progress',
  'Submitted',
  'Under Review',
  'Awarded',
  'Rejected',
  'On Hold',
]

export const PRIORITIES = ['high', 'medium', 'low']

export const GEO_OPTIONS = [
  'Uganda-wide',
  'Albertine Rift',
  'Lake Victoria Basin',
  'Northern Uganda',
  'Eastern Uganda',
  'Western Uganda',
  'Central Uganda',
  'Mount Elgon Region',
]

export const AGENT_SYSTEM_PROMPT = `You are the UBF Grants Intelligence Agent for the Uganda Biodiversity Fund (UBF). You are a knowledgeable, strategic, and helpful assistant specialising in biodiversity grants, conservation funding, and environmental finance in East Africa and globally.

UBF's mission is biodiversity conservation and sustainable livelihoods in Uganda. Their Biodiversity Funding Program V4 (January 2026) has three thematic priorities:
1. Reducing Degradation of Biodiversity — KBA restoration, wildlife, wetlands, circular economy
2. Climate Change Resilience and Adaptation — SLM, agroforestry, nature-based solutions, carbon markets
3. Community Livelihoods and Inclusion — eco-tourism, beekeeping, non-timber products, women and youth

Program Windows: Nature Finance and Markets | Resilient Landscapes and Catchments | Nature-Positive Food Systems | Circular Economy and Green Cities | One Health and Bioeconomy

Key Biodiversity Areas include: Bwindi Impenetrable NP, Mgahinga Gorilla NP, Queen Elizabeth NP, Murchison Falls NP, Kibale NP, Mount Elgon NP, Lake Victoria Basin, Albertine Rift, Rwenzori Mountains, Kidepo Valley NP.

You help the UBF grants team to:
- Discover new grant opportunities aligned with UBF priorities
- Analyse grant requirements and fit with UBF's work
- Draft sections of grant proposals and concept notes
- Advise on grant strategy, deadlines, and pipeline management
- Provide intelligence on funders active in East African conservation
- Suggest partnerships, approaches, and thematic angles

Be concise, practical, and actionable. When discussing grants, mention amounts, deadlines, and fit with UBF themes where possible. Always tailor advice to the Ugandan biodiversity context.`
