/** ALL editable content lives here: brand, contact, services, projects, testimonials, blog, jobs, FAQs. */
export const BRAND = { name: 'MOLANDE', tagline: "Building Zimbabwe's Future, Solidly." };

export const CONTACT = {
  phoneDisplay: '+263 714 832 480',
  phoneTel: '+263714832480',
  whatsapp: '263714832480',          // wa.me format, no "+"
  email: 'info@molande.co.zw',       // PLACEHOLDER: replace with a real address
  address: 'Harare, Zimbabwe',
  hours: 'Mon–Fri 7:30–17:00 · Sat 8:00–13:00',
};

/**
 * Image helper. Local paths ('/img/x.jpg', files live in public/img/) and full URLs pass through untouched;
 * anything else is treated as an Unsplash photo id.
 */
export const img = (id: string, w = 900) =>
  id.startsWith('/') || id.startsWith('http')
    ? id
    : `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=70`;

/** Put your files in public/img/ and keep these file names (or rename them here). */
export const IMG = {
  site: '/img/con1.jpeg',     crane: '/img/con5.jpeg',
  frame: '/img/con2.jpeg',   tower: '/img/con6.jpeg',
  crew: '/img/con3.jpeg',     house: '/img/con7.jpeg',
  house2: '/img/con4.jpeg', kitchen: '/img/con8.webp',
};

export interface Service { slug: string; title: string; icon: string; short: string; features: string[]; }
export const SERVICES: Service[] = [
  { slug: 'general-construction', title: 'General Construction', icon: '🏗️', short: 'End-to-end building works delivered on time and to specification.', features: ['Foundations to finishes', 'Council-approved plans', 'Quality-controlled materials'] },
  { slug: 'residential-building', title: 'Residential Building', icon: '🏠', short: 'Family homes, cluster developments and townhouses built to last.', features: ['Custom and standard plans', 'Stage-by-stage payment plans', 'Warranty on workmanship'] },
  { slug: 'commercial-construction', title: 'Commercial Construction', icon: '🏢', short: 'Offices, retail units, warehouses and industrial premises.', features: ['Fast-track programmes', 'Tenant fit-out coordination', 'Safety-first sites'] },
  { slug: 'renovations-remodelling', title: 'Renovations & Remodelling', icon: '🔨', short: 'Breathe new life into existing homes and commercial spaces.', features: ['Extensions and conversions', 'Structural alterations', 'Minimal disruption'] },
  { slug: 'kitchen-interior-fitouts', title: 'Kitchen & Interior Fit-outs', icon: '🍳', short: 'Built-in cupboards, kitchens, ceilings, tiling and finishes.', features: ['Made-to-measure joinery', 'Granite and quartz tops', 'Ceilings and partitions'] },
  { slug: 'roofing', title: 'Roofing', icon: '🛠️', short: 'New roofs, re-roofing, waterproofing and repairs.', features: ['IBR, tiles and trusses', 'Leak diagnosis and repair', 'Gutters and insulation'] },
  { slug: 'plumbing-electrical', title: 'Plumbing & Electrical', icon: '⚡', short: 'Certified installations for new builds and upgrades.', features: ['Reticulation and DB boards', 'Solar and backup power ready', 'Compliance certificates'] },
  { slug: 'civil-road-works', title: 'Civil & Road Works', icon: '🛣️', short: 'Roads, driveways, drainage, paving and site development.', features: ['Earthworks and grading', 'Stormwater drainage', 'Paving and kerbing'] },
  { slug: 'project-management', title: 'Project Management', icon: '📋', short: 'Independent oversight of your budget, programme and quality.', features: ['Cost control and reporting', 'Contractor coordination', 'Snagging and handover'] },
  { slug: 'architectural-design-planning', title: 'Architectural Design & Planning', icon: '📐', short: 'Concept sketches to council-ready drawings and BOQs.', features: ['3D concepts', 'Council submissions', 'Bills of quantities'] },
];

export interface Project { title: string; category: 'Residential' | 'Commercial' | 'Renovation' | 'Civil'; location: string; year: number; image: string; }
export const PROJECT_CATEGORIES = ['All', 'Residential', 'Commercial', 'Renovation', 'Civil'] as const;
export const PROJECTS: Project[] = [
  { title: 'Borrowdale Family Residence', category: 'Residential', location: 'Borrowdale, Harare', year: 2025, image: IMG.house },
  { title: 'Avondale Office Block', category: 'Commercial', location: 'Avondale, Harare', year: 2024, image: IMG.tower },
  { title: 'Mount Pleasant Villa Refurb', category: 'Renovation', location: 'Mount Pleasant, Harare', year: 2025, image: IMG.house2 },
  { title: 'Msasa Warehouse Complex', category: 'Commercial', location: 'Msasa, Harare', year: 2023, image: IMG.crane },
  { title: 'Chitungwiza Cluster Homes', category: 'Residential', location: 'Chitungwiza', year: 2024, image: IMG.frame },
  { title: 'Highlands Kitchen Remodel', category: 'Renovation', location: 'Highlands, Harare', year: 2025, image: IMG.kitchen },
  { title: 'Ruwa Access Road & Drainage', category: 'Civil', location: 'Ruwa', year: 2023, image: IMG.site },
  { title: 'Belvedere Retail Centre', category: 'Commercial', location: 'Belvedere, Harare', year: 2022, image: IMG.crew },
];

export const TESTIMONIALS = [
  { name: 'Tendai Moyo', role: 'Homeowner, Borrowdale', rating: 5, photo: 'https://i.pravatar.cc/120?img=12', quote: 'MOLANDE delivered our home on schedule and the finishing is flawless. Communication was excellent from day one.' },
  { name: 'Rudo Chikwanha', role: 'Director, Avondale Holdings', rating: 5, photo: 'https://i.pravatar.cc/120?img=47', quote: 'Professional, transparent and safety-conscious. Our office block was handed over exactly as promised.' },
  { name: 'Farai Ndlovu', role: 'Landlord, Mount Pleasant', rating: 5, photo: 'https://i.pravatar.cc/120?img=33', quote: 'They transformed an ageing property into something we are proud of. Budget was respected throughout.' },
  { name: 'Chipo Sibanda', role: 'Homeowner, Highlands', rating: 4, photo: 'https://i.pravatar.cc/120?img=45', quote: 'Beautiful kitchen and very tidy team. Would happily recommend to friends and family.' },
];

export const POSTS = [
  { title: '5 Things to Check Before Building in Harare', date: '12 Oct 2026', tag: 'Guides', image: IMG.frame, excerpt: 'Title deeds, council approvals, soil conditions and more: the checklist every first-time builder needs.' },
  { title: 'Choosing Roofing Materials for the Rainy Season', date: '28 Sep 2026', tag: 'Roofing', image: IMG.house2, excerpt: 'IBR sheets, concrete tiles or clay: how to match material, pitch and budget.' },
  { title: 'How to Budget for a Home Renovation', date: '05 Sep 2026', tag: 'Renovation', image: IMG.kitchen, excerpt: 'Where costs hide, how much contingency to keep, and what to prioritise first.' },
];

export const JOBS = [
  { title: 'Site Foreman', type: 'Full-time', place: 'Harare', blurb: '5+ years supervising residential or commercial sites.' },
  { title: 'Quantity Surveyor', type: 'Full-time', place: 'Harare', blurb: 'BOQs, valuations and cost reporting for active projects.' },
  { title: 'Bricklayer / Plasterer', type: 'Contract', place: 'Harare & Chitungwiza', blurb: 'Skilled tradespeople with verifiable references.' },
  { title: 'Civil Engineering Intern', type: 'Internship', place: 'Harare', blurb: 'Final-year students looking for hands-on site exposure.' },
];

export const FAQS = [
  { q: 'Do you handle council approvals?', a: 'Yes. Our design team prepares and submits plans to the relevant council and follows up until approval is granted.' },
  { q: 'How long does a typical house take to build?', a: 'A standard 3-bedroom home usually takes 4–7 months depending on design, weather and payment milestones.' },
  { q: 'Can I pay in stages?', a: 'Yes. We agree milestone-based payments tied to completed stages (foundation, walling, roofing, finishes).' },
  { q: 'Do you offer a warranty?', a: 'All workmanship carries a defects-liability period, and we will return to fix covered issues at no charge.' },
  { q: 'Which areas do you cover?', a: 'Harare and surrounding towns including Chitungwiza, Ruwa, Norton and Epworth. Further afield by arrangement.' },
];

export const PARTNERS = ['Msasa Developers', 'Borrowdale Estates', 'Avon Properties', 'Highfield Co-op', 'Chitown Builders', 'Westgate Trust', 'Belvedere Group'];

export const STEPS = [
  { t: 'Consultation', d: 'We visit your site, listen and scope the work.' },
  { t: 'Design', d: 'Drawings, 3D concepts and a clear BOQ.' },
  { t: 'Approval', d: 'Council submissions and your sign-off.' },
  { t: 'Construction', d: 'Supervised build with weekly progress updates.' },
  { t: 'Handover', d: 'Snagging, certificates and keys in hand.' },
];
