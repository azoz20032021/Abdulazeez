export const person = {
  name: 'Abdulazeez Alagele',
  role: 'Full-Stack Engineer',
  location: 'Istanbul, Türkiye',
  email: 'drydb3483@gmail.com',
  phone: '+90 551 076 2104',
  github: 'https://github.com/azoz20032021',
  linkedin: 'https://linkedin.com/in/abdul-aziz-874455225',
  site: 'https://abdulazeezdoman.tech',
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
    source: { label: 'EventPulse', href: 'https://github.com/azoz20032021/EventPulse' },
    note: 'Backend only — no interface to screenshot.',
  },
  {
    id: 'cineluxe',
    title: 'Cineluxe',
    kind: 'Movie platform',
    year: '2025',
    summary:
      'A high-performance React SPA over large trending and top-rated datasets from an external API, tuned for fast first paint and smooth list rendering.',
    highlights: [],
    stack: ['React', 'TypeScript', 'REST API', 'Vercel'],
    views: [
      {
        id: 'home',
        label: 'Home',
        kind: 'desktop',
        src: '/shots/cineluxe.jpg',
        alt: 'Cineluxe home screen with a featured film and a carousel of posters',
        caption: 'Home — featured title and trending carousel over a live external catalogue',
        bar: 'cine-luxe.vercel.app',
      },
    ],
    live: { label: 'cine-luxe.vercel.app', href: 'https://cine-luxe.vercel.app' },
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
