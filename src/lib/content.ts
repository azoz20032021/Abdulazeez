export const person = {
  name: 'Abdulazeez Alagele',
  role: 'Full-Stack Engineer',
  location: 'Istanbul, Türkiye',
  email: 'drydb3483@gmail.com',
  phone: '+90 551 076 2104',
  github: 'https://github.com/azoz20032021',
  linkedin: 'https://linkedin.com/in/abdul-aziz-874455225',
  site: 'https://abdulazeezdoman.tech',
  cv: '/Abdulazeez-Alagele-CV.pdf',
};

export const intro = {
  headline: ['I build systems', 'people depend on', 'every day.'],
  lede: 'Full-stack engineer in Istanbul. I design the data model, the API and the interface — then I make them survive real traffic, real money and real people.',
};

export const metrics = [
  { value: 300, suffix: '+', label: 'Daily users in production' },
  { value: 116, suffix: '', label: 'REST endpoints shipped' },
  { value: 123, suffix: '', label: 'Tests running in CI' },
  { value: 60, suffix: '×', label: 'Fewer reads on the busiest poll' },
];

export type ProjectView = {
  id: string;
  label: string;
  caption: string;
  bar?: string;
} & (
  | { kind: 'desktop' | 'phone'; src: string; alt: string }
  | { kind: 'code'; lines: { text: string; tone?: 'dim' | 'accent' }[] }
);

export type Project = {
  id: string;
  title: string;
  kind: string;
  year: string;
  summary: string;
  highlights: string[];
  stack: string[];
  views: ProjectView[];
  /** Three or four figures pulled out of the write-up, shown as a strip under the copy. */
  facts: { value: string; label: string }[];
  live?: { label: string; href: string };
  source?: { label: string; href: string };
  note?: string;
};

export const projects: Project[] = [
  {
    id: 'school-erp',
    title: 'School ERP',
    kind: 'Production system · Al-Ma’ali Private Secondary School',
    year: '2026',
    summary:
      'A five-role school ERP in daily use by students, teachers, parents and office staff — the real system runs the school. 116 REST endpoints over 22 Firestore collections, 25 React screens, ~23k lines of TypeScript, full Arabic RTL and English, offline-capable PWA. A public demo runs the same frontend entirely in the browser so anyone can walk through it.',
    highlights: [
      '~60× fewer database reads on the highest-traffic poll — denormalised per-student fee totals, server-side count aggregations, a TTL cache with prefix invalidation, and a notification badge that polls one integer instead of a list.',
      'In-browser face recognition for the entrance tablet: 128-dimension descriptors computed client-side, no image ever stored, with a runner-up margin check that refuses ambiguous matches between siblings.',
      'Permission checks cost zero database reads — role and dependants travel in a signed session token, with scrypt hashing and per-account rate limiting.',
    ],
    stack: [
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Node.js',
      'Express',
      'Firestore',
      'Firebase Functions',
      'Firebase Hosting',
      'Workbox PWA',
      'Vite',
    ],
    views: [
      {
        id: 'production',
        label: 'Production',
        kind: 'desktop',
        src: '/shots/school-login.jpg',
        alt: 'The production sign-in screen: school name in Arabic, UID and password fields',
        caption: 'Production sign-in — staff, students and parents reach the live system here',
        bar: 'Al-Ma’ali Private Secondary School — production',
      },
      {
        id: 'admin',
        label: 'Administrator',
        kind: 'desktop',
        src: '/shots/school-admin.jpg',
        alt: 'Administrator dashboard: student totals, absences, class list and the school-day menu',
        caption: 'Administrator — classes, absences, finance and the gate tablet behind one menu',
        bar: 'Public demo — invented people, no real records',
      },
      {
        id: 'student',
        label: 'Student · phone',
        kind: 'phone',
        src: '/shots/school-student.jpg',
        alt: 'Student view on a phone: average, attendance, fees due and the QR card for the gate',
        caption: 'Student on a phone — marks, attendance, fees in IQD and the QR card the gate reads',
      },
    ],
    facts: [
      { value: '116', label: 'REST endpoints' },
      { value: '22', label: 'Firestore collections' },
      { value: '25', label: 'React screens' },
      { value: '~23k', label: 'Lines of TypeScript' },
    ],
    live: { label: 'abdulazeezdoman.tech', href: 'https://abdulazeezdoman.tech' },
    source: { label: 'SchoolDemo', href: 'https://github.com/azoz20032021/SchoolDemo' },
    note: 'Demo: four one-click roles, no credentials to type.',
  },
  {
    id: 'letmessage',
    title: 'LetMessage',
    kind: 'Real-time chat platform',
    year: '2025',
    summary:
      'WebSocket messaging with typing indicators, multi-device presence, read receipts, and direct + group rooms. Messages render optimistically and reconcile against the server acknowledgement.',
    highlights: [
      'Unread counts derived from a per-member read cursor rather than an incrementing counter, so badges stay correct across devices even when a realtime event drops.',
      '62 Jest tests over the realtime layer with live Socket.IO clients against an in-memory MongoDB, running on GitHub Actions.',
      'Shipped in English, Arabic (full RTL) and Turkish.',
    ],
    stack: ['React', 'TypeScript', 'Node.js', 'Socket.IO', 'MongoDB', 'Docker', 'Jest'],
    views: [
      {
        id: 'dark',
        label: 'Dark',
        kind: 'desktop',
        src: '/shots/letmessage-dark.jpg',
        alt: 'Group conversation in dark mode with presence dots, unread badges and read receipts',
        caption: 'A group room in dark mode — presence dots, unread badges, delivery ticks',
        bar: 'letmessege-client.vercel.app',
      },
      {
        id: 'light',
        label: 'Light',
        kind: 'desktop',
        src: '/shots/letmessage-light.jpg',
        alt: 'The same conversation in light mode',
        caption: 'The same room in light mode — one token set, both themes',
        bar: 'letmessege-client.vercel.app',
      },
      {
        id: 'rtl',
        label: 'Arabic · RTL',
        kind: 'desktop',
        src: '/shots/letmessage-rtl.jpg',
        alt: 'The same conversation in Arabic with the whole layout mirrored right to left',
        caption: 'Arabic mirrors the whole layout, not just the text — sidebar, ticks and input all flip',
        bar: 'letmessege-client.vercel.app',
      },
      {
        id: 'phone',
        label: 'Phone',
        kind: 'phone',
        src: '/shots/letmessage-mobile.jpg',
        alt: 'The conversation view on a phone',
        caption: 'On a phone the list and the room become two screens instead of two panes',
      },
    ],
    facts: [
      { value: '62', label: 'Realtime tests' },
      { value: '3', label: 'Languages' },
      { value: 'RTL', label: 'Fully mirrored' },
    ],
    live: { label: 'letmessege-client.vercel.app', href: 'https://letmessege-client.vercel.app' },
    note: 'Demo login: demo@test.com / 123456',
  },
  {
    id: 'eventpulse',
    title: 'EventPulse',
    kind: 'Webhook delivery & event API',
    year: '2025',
    summary:
      'A distributed webhook delivery API. Register destinations, publish events, and let it handle signing, retries and dead-lettering — with an ingestion path that stays correct when clients retry and infrastructure fails.',
    highlights: [
      'Two-tier idempotency — an atomic Redis lock backed by a UNIQUE index in MySQL — so a client retrying after a network blip never ingests the same event twice.',
      'An exponential backoff ladder with jitter, and a dead-letter state that records the full error and response alongside a manual retry endpoint.',
      'HMAC-SHA256 over timestamp.body with a replay window and zero-downtime secret rotation, so a receiver can tell a real webhook from a forged one.',
    ],
    stack: ['Node.js', 'Express', 'MySQL', 'Redis', 'BullMQ', 'Docker'],
    views: [
      {
        id: 'api',
        label: 'Delivery contract',
        kind: 'code',
        bar: 'EventPulse — delivery guarantees',
        caption: 'The five production edge cases a webhook sender runs into, and what answers each',
        lines: [
          { text: 'POST /events', tone: 'accent' },
          { text: 'Idempotency-Key: 6b1f…      →  202 Accepted' },
          { text: '' },
          { text: 'ingest      Redis lock + UNIQUE index in MySQL', tone: 'dim' },
          { text: 'retry       5s → 30s → 5m → 30m → 2h  (+ jitter)', tone: 'dim' },
          { text: 'sign        HMAC-SHA256(timestamp.body)', tone: 'dim' },
          { text: 'replay      window check + secret rotation', tone: 'dim' },
          { text: 'give up     dead letter, full response kept', tone: 'dim' },
        ],
      },
    ],
    facts: [
      { value: '2', label: 'Idempotency tiers' },
      { value: '5', label: 'Retry steps' },
      { value: 'HMAC', label: 'Signed deliveries' },
    ],
    source: { label: 'EventPulse', href: 'https://github.com/azoz20032021/EventPulse' },
    note: 'Backend only — no interface to screenshot.',
  },
  {
    id: 'critter-clash',
    title: 'Critter Clash',
    kind: 'Game · Idle monster battler',
    year: '2026',
    summary:
      'An endless idle/tap monster battler in Arabic and English — pure JavaScript with no framework, no build step and no art assets. Every creature, background and icon is drawn procedurally by the game’s own canvas renderer, and it ships to Android and iOS through Capacitor.',
    highlights: [
      'A custom big-number layer keeps the progression maths working far past what a JavaScript number can hold — stage 25,000 and damage figures near 10^4000 — with an endless-play test that runs nine full prestige cycles.',
      'Depth built from data rather than assets: 17 hand-authored critter tiers with endless generation, 30 sprite archetypes, and a Mutation Lab of 5 rarities × 12 traits × 4 elements, plus fusion and prestige with eternal relics.',
      'An asynchronous PvP arena with real players, generated rivals, friend codes and live duels. 122 automated checks cover balance, saves, UI and the arena, and GitHub Actions builds the Android APK and AAB.',
    ],
    stack: ['JavaScript', 'HTML5 Canvas', 'Firebase', 'Capacitor', 'GitHub Actions', 'Vercel'],
    views: [
      {
        id: 'battle',
        label: 'Battle',
        kind: 'phone',
        src: '/shots/critter-battle.jpg',
        alt: 'Boss fight at stage 38 with damage numbers, a boss health bar and the seven skill buttons',
        caption: 'Battle — a timed boss at stage 38, with the seven active skills along the bottom',
      },
      {
        id: 'mutation',
        label: 'Mutation Lab',
        kind: 'phone',
        src: '/shots/critter-mutation.jpg',
        alt: 'The Mutation Lab dialog showing a Mythic fire critter and the gem cost to mutate it',
        caption: 'Mutation Lab — a critter is rewritten into a new rarity, trait and element that survives prestige',
      },
      {
        id: 'arena',
        label: 'Arena',
        kind: 'phone',
        src: '/shots/critter-arena.jpg',
        alt: 'The Arena screen with trophies, team power, a friend code and a list of rivals to fight',
        caption: 'Arena — team power, friend codes, a defence log and rivals to fight for trophies and gems',
      },
      {
        id: 'duel',
        label: 'Live duel',
        kind: 'phone',
        src: '/shots/critter-duel.jpg',
        alt: 'Two teams of five critters fighting head to head in a PvP duel',
        caption: 'Live duel — two teams of five fight it out, and a tap on the enemy adds extra damage',
      },
    ],
    facts: [
      { value: '122', label: 'Automated checks' },
      { value: '0', label: 'Image assets' },
      { value: '17', label: 'Critter tiers' },
      { value: '30', label: 'Sprite archetypes' },
    ],
    live: { label: 'critter-clash-peach.vercel.app', href: 'https://critter-clash-peach.vercel.app' },
    source: { label: 'critter-clash', href: 'https://github.com/azoz20032021/critter-clash' },
    note: 'Playable in the browser, in Arabic or English.',
  },
];

export const about = {
  body: [
    'I ship systems people depend on daily. The school ERP I designed and delivered end to end now runs a whole school — from the data model and a 116-endpoint API to five role-specific interfaces in Arabic and English.',
    'Most of my work sits where the interesting trade-offs are: what a read costs on a metered database, how a feature behaves when the network drops, what stays on the device and what never leaves it at all. I am comfortable reverse-engineering undocumented systems and making those calls deliberately.',
  ],
  facts: [
    { label: 'Based in', value: 'Istanbul, Türkiye' },
    { label: 'Education', value: 'BSc Software Engineering, Altınbaş University · 2026' },
    { label: 'Languages', value: 'Arabic (native) · English (professional) · Turkish (professional)' },
  ],
};

export const experience = [
  {
    role: 'Full-Stack Engineer',
    org: 'Al-Ma’ali Private Secondary School',
    period: 'Contract · 2026',
    bullets: [
      'Built a five-role system end to end: 116 REST endpoints over 22 Firestore collections, 25 React screens, ~23k lines of TypeScript and 123 tests in CI.',
      'Kept 7 MB of face-recognition models out of the service-worker precache, so only the door tablet downloads them and every student’s phone stays under 900 KB.',
      'Made paginated queries survive missing composite indexes via an offset-cursor fallback — turning a hard failure into a slower path.',
    ],
  },
  {
    role: 'Backend Engineer',
    org: 'Freelance',
    period: 'Contract',
    bullets: [
      'Reverse-engineered an undocumented production MySQL database and built a secure REST API layer over it.',
      'Reduced query latency by 40% through schema and index optimisation.',
      'Built a webhook delivery system with HMAC signatures and idempotency keys for safe retries.',
    ],
  },
];

export const stack = [
  {
    group: 'Frontend',
    items: ['React', 'TypeScript', 'React Native', 'Tailwind CSS', 'Vite', 'i18n / RTL', 'PWA & Workbox'],
  },
  { group: 'Backend', items: ['Node.js', 'Express', 'Fastify', 'Socket.IO', 'REST APIs', 'Webhooks', 'JWT', 'Rate limiting'] },
  { group: 'Databases', items: ['MySQL', 'PostgreSQL', 'MongoDB', 'Firebase / Firestore'] },
  { group: 'Real-time', items: ['WebSockets', 'Server-Sent Events', 'Presence', 'Pub/sub patterns'] },
  { group: 'Testing', items: ['Jest', 'Supertest', 'node:test', 'Realtime integration tests', 'GitHub Actions'] },
  {
    group: 'DevOps',
    items: [
      'Docker',
      'CI/CD',
      'Vercel',
      'Firebase Hosting & Functions',
      'Microsoft Azure',
      'Render',
      'Windows Server / IIS',
      'OpenAPI',
    ],
  },
  { group: 'Languages', items: ['JavaScript (ES6+)', 'TypeScript', 'Python', 'Java', 'SQL', 'C'] },
];

export const sectionCopy = {
  work: 'Four builds, from a school’s daily operations to a webhook engine — with the trade-offs behind each one.',
  approach: 'Four habits that show up in every system I ship, and where each of them shows.',
  about: 'The short version of who is behind the work.',
  stack: 'What I have shipped with, grouped by where it sits in the system.',
  contact: 'Available in Istanbul or remote. Tell me what you are building and I will reply myself.',
};

/** Each principle is drawn from a figure or decision already in the case studies. */
export const approach = [
  {
    title: 'Count the cost of every read.',
    body: 'On a metered database a busy screen is a bill. Denormalised totals, server-side aggregations, a TTL cache and a badge that polls one integer cut the busiest poll by about 60×.',
    proof: '60×',
    proofLabel: 'fewer reads',
    seen: 'School ERP',
  },
  {
    title: 'Design for the network dropping.',
    body: 'Messages render optimistically and reconcile on acknowledgement; unread counts come from a read cursor, not a counter; paginated queries fall back to an offset cursor instead of failing.',
    proof: 'PWA',
    proofLabel: 'works offline',
    seen: 'LetMessage · School ERP',
  },
  {
    title: 'Keep private data on the device.',
    body: 'Face recognition for the gate tablet runs in the browser: descriptors are computed client-side, no image is ever stored, and ambiguous matches between siblings are refused.',
    proof: '0',
    proofLabel: 'images stored',
    seen: 'School ERP',
  },
  {
    title: 'Prove it before it ships.',
    body: 'Live Socket.IO clients against an in-memory MongoDB, integration tests over the API, all of it running on GitHub Actions before anything merges.',
    proof: '123',
    proofLabel: 'tests in CI',
    seen: 'School ERP · LetMessage',
  },
];
