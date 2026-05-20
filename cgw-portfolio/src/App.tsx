import { useState, useEffect, useRef } from 'react'
import {
  Shield, Code2, Brain, ArrowRight, Mail, Phone, Linkedin, Github,
  ChevronDown, ExternalLink, Award, Briefcase, GraduationCap, Star,
  Globe, Terminal, Layers, Cpu, Database, Zap, Menu, X
} from 'lucide-react'

// ─── Logo SVG ───────────────────────────────────────────────────────────────
function Logo({ size = 18, fill = 'currentColor' }: { size?: number; fill?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 256 256" fill="none">
      <path
        fill={fill}
        d="M 160 88 L 194 34 L 216 0 L 256 0 L 256 40 L 221.5 93.5 L 200 128 L 256 128 L 256 256 L 96 256 L 96 168 L 64.246 220 L 40 256 L 0 256 L 0 216 L 34 162 L 56 128 L 0 128 L 0 0 L 160 0 Z"
      />
    </svg>
  )
}

// ─── Types ──────────────────────────────────────────────────────────────────
type Page = 'home' | 'team' | 'about' | 'contact'

// ─── Team Data ──────────────────────────────────────────────────────────────
const members = [
  {
    id: 'moiz',
    name: 'Abdul Moiz',
    role: 'Cybersecurity Engineer',
    tagline: 'Breaking things to make them stronger.',
    email: 'abdulmoizkhan154@gmail.com',
    phone: '+923479679055',
    linkedin: 'https://www.linkedin.com/in/abdulmoixz',
    icon: Shield,
    accentColor: '#60a5fa',
    domain: 'Cybersecurity',
    summary:
      'Cybersecurity student at NUTECH and Google Cybersecurity Professional with hands-on penetration testing, API security, and bug bounty hunting experience. Currently interning at Cisco Academy UET Peshawar. Active CTF player and security researcher.',
    education: [
      { degree: 'BSc Cybersecurity', institution: 'National University of Technology, Islamabad', year: '2024 – Present' },
      { degree: 'Google Cybersecurity Professional Certificate', institution: 'Coursera · Google', year: '2025' },
      { degree: 'Cisco Certified Network Associate', institution: 'Cisco Academy', year: '2025' },
    ],
    experience: [
      {
        title: 'Bug Bounty & Security Researcher',
        org: 'Freelance',
        period: '2024 – Present',
        bullets: [
          'Identifying and reporting vulnerabilities in web apps, APIs, and mobile platforms.',
          'Specialized in API exploitation and authentication flaws.',
          'Active CTF competitor solving real-world security challenges.',
        ],
      },
      {
        title: 'Cybersecurity Intern',
        org: 'Cisco Networking Academy, UET Peshawar',
        period: 'Aug 2025 – Sept 2025',
        bullets: [
          'Network defense simulations and network security research.',
          'Hands-on exposure to firewalls, routers, and secure network design.',
          'Supported senior instructors and documented lab results.',
        ],
      },
      {
        title: 'Cybersecurity Intern',
        org: 'Microsoft Learn Student Ambassadors, UET Peshawar',
        period: 'July 2025 – Aug 2025',
        bullets: [
          'Projects on ethical hacking, network scanning, and information gathering.',
          'Explored session security, password cracking, and system security basics.',
          'Delivered project documentation and live demos.',
        ],
      },
    ],
    skills: [
      'Penetration Testing', 'Bug Bounty', 'API Security', 'Auth Flaws',
      'Burp Suite', 'Nmap', 'Wireshark', 'Metasploit', 'Nessus',
      'Kali Linux', 'SIEM', 'Python', 'Bash', 'SQL', 'C++',
      'IDS/IPS', 'Digital Forensics', 'CTFs',
    ],
    languages: ['Pashto (Native)', 'Urdu (Advanced)', 'English (Advanced)'],
  },
  {
    id: 'faisal',
    name: 'Rana Faisal Mustafa',
    role: 'Game & App Developer',
    tagline: 'Crafting experiences pixel by pixel.',
    email: 'faisalmustafa8686@gmail.com',
    phone: '0302-0071917',
    linkedin: 'https://github.com',
    icon: Code2,
    accentColor: '#a78bfa',
    domain: 'Software Development',
    summary:
      'Motivated CS student at NUTECH specialising in game and application development. Proficient in Python, Java, C#, and C++ with hands-on project experience spanning 2D games, custom data structures, and cross-platform app development. Self-driven learner who picks up new frameworks independently.',
    education: [
      { degree: 'BS Computer Science', institution: 'NUTECH University, Islamabad', year: '2024 – 2028 (Expected)' },
    ],
    experience: [
      {
        title: 'Freelance Video Editor & Website Moderator',
        org: 'Self-employed',
        period: '2019 – Present',
        bullets: [
          'Produced and edited promotional and YouTube videos for multiple clients.',
          'Managed full post-production workflows end-to-end.',
          'Moderated websites for content quality and user engagement.',
        ],
      },
    ],
    projects: [
      { name: 'JavaFX Fighting Game', tech: 'Java · JavaFX · OOP', desc: '2D turn-based fighting game with character classes, attack mechanics, and JavaFX UI built on OOP principles.' },
      { name: 'Python 2D Game', tech: 'Python · Pygame', desc: 'Interactive 2D game with sprite animations, collision detection, and event-driven gameplay logic.' },
      { name: 'NeoVim-Style Text Editor', tech: 'C++ · FLTK · Data Structures', desc: 'Feature-complete text editor from scratch — Gap Buffer for O(1) insertion, custom stack for unlimited undo/redo, Vim-style modal editing. Scored 105/100.' },
      { name: 'Pac-Man Clone', tech: 'C# · MonoGame', desc: 'Pac-Man recreation self-learning MonoGame. Clean architecture with Entities, Screens, and Systems. Targets .NET 9.' },
    ],
    skills: [
      'Python', 'Java', 'C#', 'C++', 'JavaScript',
      'Pygame', 'JavaFX', 'MonoGame', 'React Native',
      'OOP', 'Data Structures & Algorithms', 'Memory Management',
      'Git', 'GitHub', 'VS Code', 'IntelliJ IDEA', 'UI/UX',
    ],
    languages: ['English (Fluent)', 'Urdu (Native)'],
  },
  {
    id: 'rehan',
    name: 'Rehan Shahzad',
    role: 'AI & Web Developer',
    tagline: 'Teaching machines to understand the world.',
    email: 'rehanshahzad6018@gmail.com',
    phone: '0331-9658521',
    linkedin: 'https://github.com',
    icon: Brain,
    accentColor: '#f472b6',
    domain: 'AI / ML · Web Dev',
    summary:
      'CS student at NUTECH specialising in web and application development with a strong focus on machine learning and AI. Proficient in Python, Java, C++, SQL, PHP, and JavaScript with real-world project experience from attendance systems to fully deployed commercial websites and AI-powered applications.',
    education: [
      { degree: 'BS AI', institution: 'NUTECH University, Islamabad', year: '2024 – 2028 (Expected)' },
    ],
    experience: [
      {
        title: 'Web Developer',
        org: 'Techora (Web-Based Company)',
        period: 'During Studies',
        bullets: [
          'Designed and developed the company website (front-end + back-end).',
          'Collaborated with team to deliver production-ready product meeting client requirements.',
        ],
      },
      {
        title: 'Developer',
        org: 'Hooriya Departmental Store',
        period: 'During Studies',
        bullets: [
          'Built and deployed the store website and Windows desktop application from scratch.',
          'Integrated and managed product/inventory database for live business operations.',
        ],
      },
    ],
    projects: [
      { name: 'RAG System', tech: 'Python · Flask · ChromaDB · Claude API · SQLite', desc: 'Full-stack Retrieval-Augmented Generation app — upload PDFs, index them into vector DB, and ask natural language questions answered by Claude AI.' },
      { name: 'AI Image Classifier', tech: 'Python · Flask · Claude Vision API · SQLite', desc: 'Vision-powered image analysis tool using Claude API to classify images, extract text (OCR), identify elements, and answer custom questions.' },
      { name: 'Techora Website', tech: 'HTML · CSS · JavaScript · PHP', desc: 'Production-ready website for Techora covering front-end design and back-end functionality. techora.pk' },
      { name: 'Hooriya Store System', tech: 'JavaScript · SQL · Web · Desktop', desc: 'Full website and Windows desktop app for a departmental store with real-time inventory database integration.' },
      { name: 'Attendance Management System', tech: 'Python · Database', desc: 'Functional attendance tracking system with database integration for student/employee recording and reporting.' },
      { name: 'Flappy Bird (OOP/GUI)', tech: 'Java/Python · OOP · GUI', desc: 'Classic Flappy Bird recreation built using OOP principles with a graphical user interface.' },
    ],
    skills: [
      'Python', 'Java', 'C#', 'C++', 'JavaScript', 'PHP',
      'MySQL', 'SQLite', 'Machine Learning', 'Flask',
      'ChromaDB', 'Claude API', 'React Native', 'HTML', 'CSS',
      'Web Development', 'Desktop Apps', 'RAG Systems',
    ],
    languages: ['English (Fluent)', 'Urdu (Native)'],
  },
]

// ─── Nav ────────────────────────────────────────────────────────────────────
function Nav({ active, setPage }: { active: Page; setPage: (p: Page) => void }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const links: { label: string; page: Page }[] = [
    { label: 'Home', page: 'home' },
    { label: 'Team', page: 'team' },
    { label: 'About', page: 'about' },
    { label: 'Contact', page: 'contact' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center pt-4 sm:pt-6 px-4 sm:px-8 gap-2 sm:gap-3">
      {/* Logo pill */}
      <button
        onClick={() => setPage('home')}
        className="flex items-center justify-center rounded-full w-10 h-10 sm:w-11 sm:h-11 shrink-0 transition-opacity hover:opacity-80"
        style={{ backgroundColor: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)' }}
        aria-label="CGW Home"
      >
        <Logo size={18} fill="rgb(240,240,238)" />
      </button>

      {/* Desktop nav pill */}
      <div
        className="hidden sm:flex items-center gap-8 rounded-xl px-8 py-3"
        style={{ backgroundColor: '#1a1a1a', border: '1px solid rgba(255,255,255,0.08)' }}
      >
        {links.map(l => (
          <button
            key={l.page}
            onClick={() => setPage(l.page)}
            className={`nav-link text-[13px] font-medium transition-colors duration-200 ${
              active === l.page ? 'text-white' : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            {l.label}
          </button>
        ))}
      </div>

      {/* Mobile menu toggle */}
      <button
        className="sm:hidden flex items-center justify-center rounded-full w-10 h-10 shrink-0 text-gray-400"
        style={{ backgroundColor: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)' }}
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Menu"
      >
        {mobileOpen ? <X size={16} /> : <Menu size={16} />}
      </button>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div
          className="absolute top-[72px] left-4 right-4 rounded-xl p-4 flex flex-col gap-3"
          style={{ backgroundColor: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)' }}
        >
          {links.map(l => (
            <button
              key={l.page}
              onClick={() => { setPage(l.page); setMobileOpen(false) }}
              className={`text-left text-[14px] font-medium py-1 transition-colors ${
                active === l.page ? 'text-white' : 'text-gray-400'
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  )
}

// ─── Hero Page ───────────────────────────────────────────────────────────────
function HeroPage({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <div className="relative min-h-screen overflow-hidden" style={{ backgroundColor: '#0a0a0a' }}>
      {/* Video background */}
      <video
        autoPlay muted loop playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-40"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_215831_c6a8989c-d716-4d8d-8745-e972a2eec711.mp4"
      />
      {/* Gradient overlay */}
      <div className="video-overlay absolute inset-0" />

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Spacer for nav */}
        <div className="h-20" />

        {/* Hero bottom-left content */}
        <div className="flex-1 flex items-end pb-10 sm:pb-16 lg:pb-20 px-6 sm:px-12 md:px-20 lg:px-28">
          <div className="max-w-sm">
            {/* Badge */}
            <button
              onClick={() => setPage('about')}
              className="inline-flex items-center gap-1.5 text-[11.5px] font-medium text-blue-400 hover:text-blue-300 transition-colors mb-3 group animate-fadeUp"
            >
              Cyber · Code · Growth — Since 2024
              <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">→</span>
            </button>

            {/* Headline */}
            <h1 className="font-display text-[2.2rem] sm:text-[2.8rem] leading-[1.1] font-normal text-white tracking-tight mb-4 animate-fadeUp delay-100">
              Where Security meets Software &amp; Intelligence.
            </h1>

            {/* Sub */}
            <p className="text-[13px] text-gray-400 font-normal mb-5 animate-fadeUp delay-200">
              A three-person collective blending cybersecurity, game development, and AI engineering into one powerhouse team.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 animate-fadeUp delay-300">
              <button
                onClick={() => setPage('team')}
                className="inline-flex items-center gap-2 text-[13px] font-medium text-blue-400 border border-blue-500 rounded-full px-5 py-2.5 hover:bg-blue-500 hover:text-white hover:border-blue-500 transition-all duration-200 group"
              >
                Meet the team
                <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
              </button>
              <button
                onClick={() => setPage('contact')}
                className="inline-flex items-center gap-2 text-[13px] font-medium text-gray-400 border border-gray-700 rounded-full px-5 py-2.5 hover:border-gray-500 hover:text-gray-200 transition-all duration-200"
              >
                Get in touch
              </button>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="flex justify-center pb-6 animate-fadeIn delay-800">
          <ChevronDown size={18} className="text-gray-600 animate-float" />
        </div>
      </div>

      {/* Domain tags — bottom right */}
      <div className="absolute bottom-16 right-6 sm:right-12 lg:right-28 z-10 flex flex-col gap-2 items-end animate-fadeIn delay-500">
        {[
          { icon: Shield, label: 'Cybersecurity', color: '#60a5fa' },
          { icon: Code2, label: 'Software Dev', color: '#a78bfa' },
          { icon: Brain, label: 'AI & ML', color: '#f472b6' },
        ].map(({ icon: Icon, label, color }) => (
          <div
            key={label}
            className="flex items-center gap-2 text-[11px] font-medium px-3 py-1.5 rounded-full"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color }}
          >
            <Icon size={11} />
            {label}
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Team Page ──────────────────────────────────────────────────────────────
function MemberCard({ m, onClick }: { m: typeof members[0]; onClick: () => void }) {
  const Icon = m.icon
  return (
    <div
      className="card-glow cursor-pointer rounded-2xl p-6 flex flex-col gap-4"
      style={{ background: '#111', border: '1px solid rgba(255,255,255,0.07)' }}
      onClick={onClick}
    >
      <div className="accent-line rounded-full" />
      <div className="flex items-start justify-between">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center"
          style={{ background: `${m.accentColor}18` }}
        >
          <Icon size={20} style={{ color: m.accentColor }} />
        </div>
        <span
          className="text-[10px] font-medium px-2.5 py-1 rounded-full"
          style={{ background: `${m.accentColor}15`, color: m.accentColor, border: `1px solid ${m.accentColor}30` }}
        >
          {m.domain}
        </span>
      </div>

      <div>
        <div className="font-display text-[1.35rem] text-white leading-tight">{m.name}</div>
        <div className="text-[12px] text-gray-500 mt-0.5">{m.role}</div>
      </div>

      <p className="text-[13px] text-gray-400 leading-relaxed line-clamp-3">{m.summary}</p>

      <div className="flex flex-wrap gap-1.5 mt-auto">
        {m.skills.slice(0, 5).map(s => (
          <span key={s} className="skill-tag text-[10px] px-2 py-0.5 rounded-full text-gray-400">{s}</span>
        ))}
        {m.skills.length > 5 && (
          <span className="text-[10px] text-gray-600 px-2 py-0.5">+{m.skills.length - 5} more</span>
        )}
      </div>

      <div className="flex items-center gap-1.5 text-[12px] font-medium" style={{ color: m.accentColor }}>
        View profile
        <ArrowRight size={12} />
      </div>
    </div>
  )
}

function TeamPage({ setSelected }: { setSelected: (id: string) => void }) {
  return (
    <div className="min-h-screen pt-28 pb-20 px-6 sm:px-12 md:px-20 lg:px-28">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-14 animate-fadeUp">
          <div className="text-[11px] font-medium text-gray-600 uppercase tracking-widest mb-3">The Team</div>
          <h2 className="font-display text-[2.5rem] sm:text-[3.5rem] leading-[1.1] text-white mb-4">
            Three minds.<br />One collective.
          </h2>
          <p className="text-[14px] text-gray-500 max-w-lg leading-relaxed">
            CGW unites a cybersecurity researcher, a game & app developer, and an AI/web engineer — each exceptional in their domain, stronger together.
          </p>
        </div>

        <hr className="section-divider mb-14" />

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {members.map((m, i) => (
            <div key={m.id} className={`animate-fadeUp delay-${(i + 1) * 100 + 200}`}>
              <MemberCard m={m} onClick={() => setSelected(m.id)} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Member Profile Page ─────────────────────────────────────────────────────
function ProfilePage({ id, onBack }: { id: string; onBack: () => void }) {
  const m = members.find(x => x.id === id)!
  const Icon = m.icon
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => { scrollRef.current?.scrollTo({ top: 0 }) }, [id])

  return (
    <div ref={scrollRef} className="min-h-screen pt-28 pb-20 px-6 sm:px-12 md:px-20 lg:px-28">
      <div className="max-w-3xl mx-auto">
        {/* Back */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[12px] text-gray-500 hover:text-gray-300 transition-colors mb-10 animate-fadeUp"
        >
          ← Back to team
        </button>

        {/* Profile header */}
        <div className="flex flex-col sm:flex-row items-start gap-6 mb-10 animate-fadeUp delay-100">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0"
            style={{ background: `${m.accentColor}20`, border: `1px solid ${m.accentColor}30` }}
          >
            <Icon size={28} style={{ color: m.accentColor }} />
          </div>
          <div>
            <div className="font-display text-[2rem] sm:text-[2.5rem] text-white leading-tight">{m.name}</div>
            <div className="text-[13px] text-gray-500 mt-1">{m.role}</div>
            <div className="flex flex-wrap gap-3 mt-3">
              <a href={`mailto:${m.email}`} className="flex items-center gap-1.5 text-[11.5px] text-gray-500 hover:text-gray-300 transition-colors">
                <Mail size={11} /> {m.email}
              </a>
              <span className="flex items-center gap-1.5 text-[11.5px] text-gray-500">
                <Phone size={11} /> {m.phone}
              </span>
            </div>
          </div>
        </div>

        <div className="accent-line rounded-full mb-8" />

        {/* Summary */}
        <section className="mb-10 animate-fadeUp delay-200">
          <SectionLabel icon={Star} label="Summary" />
          <p className="text-[14px] text-gray-400 leading-relaxed">{m.summary}</p>
        </section>

        {/* Education */}
        <section className="mb-10 animate-fadeUp delay-300">
          <SectionLabel icon={GraduationCap} label="Education" />
          <div className="flex flex-col gap-4">
            {m.education.map((e, i) => (
              <div key={i} className="rounded-xl p-4" style={{ background: '#111', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="text-[14px] font-medium text-white">{e.degree}</div>
                <div className="text-[12px] text-gray-500 mt-0.5">{e.institution}</div>
                <div className="text-[11px] text-gray-600 mt-1">{e.year}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section className="mb-10 animate-fadeUp delay-400">
          <SectionLabel icon={Briefcase} label="Experience" />
          <div className="flex flex-col gap-5">
            {m.experience.map((e, i) => (
              <div key={i} className="rounded-xl p-4" style={{ background: '#111', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div>
                    <div className="text-[14px] font-medium text-white">{e.title}</div>
                    <div className="text-[12px] text-gray-500 mt-0.5">{e.org}</div>
                  </div>
                  <span className="text-[11px] text-gray-600 shrink-0">{e.period}</span>
                </div>
                <ul className="mt-3 flex flex-col gap-1.5">
                  {e.bullets.map((b, j) => (
                    <li key={j} className="flex items-start gap-2 text-[13px] text-gray-400">
                      <span className="mt-1.5 w-1 h-1 rounded-full shrink-0" style={{ background: m.accentColor }} />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Projects (if any) */}
        {'projects' in m && (
          <section className="mb-10 animate-fadeUp delay-500">
            <SectionLabel icon={Layers} label="Projects" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(m as any).projects.map((p: any, i: number) => (
                <div key={i} className="rounded-xl p-4 card-glow" style={{ background: '#111', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div className="text-[13px] font-medium text-white mb-1">{p.name}</div>
                  <div className="text-[10px] font-medium mb-2" style={{ color: m.accentColor }}>{p.tech}</div>
                  <p className="text-[12px] text-gray-500 leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        <section className="mb-10 animate-fadeUp delay-500">
          <SectionLabel icon={Zap} label="Skills" />
          <div className="flex flex-wrap gap-2">
            {m.skills.map(s => (
              <span key={s} className="skill-tag text-[11px] px-3 py-1 rounded-full text-gray-400">{s}</span>
            ))}
          </div>
        </section>

        {/* Languages */}
        <section className="animate-fadeUp delay-600">
          <SectionLabel icon={Globe} label="Languages" />
          <div className="flex flex-wrap gap-2">
            {m.languages.map(l => (
              <span key={l} className="text-[11px] px-3 py-1 rounded-full text-gray-400" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>{l}</span>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

function SectionLabel({ icon: Icon, label }: { icon: any; label: string }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <Icon size={13} className="text-gray-600" />
      <span className="text-[11px] font-medium text-gray-600 uppercase tracking-widest">{label}</span>
    </div>
  )
}

// ─── About Page ──────────────────────────────────────────────────────────────
function AboutPage() {
  const pillars = [
    { icon: Shield, color: '#60a5fa', title: 'Cybersecurity', desc: 'From penetration testing and bug bounty hunting to network defense and digital forensics — we think like attackers so we can defend like experts.' },
    { icon: Code2, color: '#a78bfa', title: 'Software Development', desc: 'Games, applications, editors — built from scratch with a love for data structures, clean architecture, and code that actually works.' },
    { icon: Brain, color: '#f472b6', title: 'Artificial Intelligence', desc: 'Machine learning, RAG systems, computer vision — deploying AI that solves real problems and integrates with the real world.' },
  ]

  return (
    <div className="min-h-screen pt-28 pb-20 px-6 sm:px-12 md:px-20 lg:px-28">
      <div className="max-w-4xl mx-auto">
        <div className="animate-fadeUp mb-14">
          <div className="text-[11px] font-medium text-gray-600 uppercase tracking-widest mb-3">About CGW</div>
          <h2 className="font-display text-[2.5rem] sm:text-[3.5rem] leading-[1.1] text-white mb-5">
            Built by students.<br />Thinking like professionals.
          </h2>
          <p className="text-[14px] text-gray-400 leading-relaxed max-w-xl">
            CGW is a student-led technology collective based in Islamabad, Pakistan. We started as three classmates at NUTECH University who realised our skills complemented each other perfectly — and decided to build something together.
          </p>
        </div>

        <hr className="section-divider mb-14" />

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
          {pillars.map(({ icon: Icon, color, title, desc }, i) => (
            <div
              key={title}
              className={`card-glow rounded-2xl p-6 animate-fadeUp delay-${(i + 1) * 100 + 200}`}
              style={{ background: '#111', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: `${color}18` }}>
                <Icon size={18} style={{ color }} />
              </div>
              <div className="text-[15px] font-medium text-white mb-2">{title}</div>
              <p className="text-[13px] text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div
          className="rounded-2xl p-8 animate-fadeUp delay-600"
          style={{ background: '#111', border: '1px solid rgba(255,255,255,0.07)' }}
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {[
              { value: '3', label: 'Core Members' },
              { value: '10+', label: 'Projects Shipped' },
              { value: '3+', label: 'Certifications' },
              { value: '2024', label: 'Founded' },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="font-display text-[2.5rem] text-white leading-tight">{value}</div>
                <div className="text-[11px] text-gray-600 mt-1 uppercase tracking-widest">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Mission */}
        <div className="mt-14 animate-fadeUp delay-700">
          <div className="text-[11px] font-medium text-gray-600 uppercase tracking-widest mb-4">Mission</div>
          <blockquote className="font-display text-[1.6rem] sm:text-[2rem] text-gray-300 leading-relaxed border-l-2 border-gray-700 pl-6">
            "We believe the best technology is secure, thoughtfully built, and intelligently designed. That's what we're here to create."
          </blockquote>
        </div>
      </div>
    </div>
  )
}

// ─── Contact Page ─────────────────────────────────────────────────────────────
function ContactPage() {
  return (
    <div className="min-h-screen pt-28 pb-20 px-6 sm:px-12 md:px-20 lg:px-28">
      <div className="max-w-3xl mx-auto">
        <div className="animate-fadeUp mb-14">
          <div className="text-[11px] font-medium text-gray-600 uppercase tracking-widest mb-3">Contact</div>
          <h2 className="font-display text-[2.5rem] sm:text-[3.5rem] leading-[1.1] text-white mb-4">
            Let's work<br />together.
          </h2>
          <p className="text-[14px] text-gray-500 leading-relaxed max-w-lg">
            Interested in collaborating, hiring, or just want to talk tech? Reach out to the team.
          </p>
        </div>

        <hr className="section-divider mb-14" />

        {/* Company contact */}
        <div
          className="rounded-2xl p-6 mb-8 animate-fadeUp delay-200"
          style={{ background: '#111', border: '1px solid rgba(255,255,255,0.07)' }}
        >
          <div className="flex items-center gap-3 mb-4">
            <Logo size={20} fill="rgb(240,240,238)" />
            <span className="font-display text-[1.2rem] text-white">CGW</span>
          </div>
          <div className="flex flex-col gap-3">
            <a
              href="mailto:cgwoffical@gmail.com"
              className="flex items-center gap-3 text-[13px] text-gray-400 hover:text-white transition-colors group"
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.06)' }}>
                <Mail size={13} className="text-gray-500 group-hover:text-blue-400 transition-colors" />
              </div>
              cgwoffical@gmail.com
            </a>
            <div className="flex items-center gap-3 text-[12px] text-gray-600">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.06)' }}>
                <Terminal size={13} className="text-gray-600" />
              </div>
              Islamabad, Pakistan
            </div>
          </div>
        </div>

        {/* Individual contacts */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {members.map((m, i) => {
            const Icon = m.icon
            return (
              <div
                key={m.id}
                className={`card-glow rounded-2xl p-5 animate-fadeUp delay-${(i + 3) * 100}`}
                style={{ background: '#111', border: '1px solid rgba(255,255,255,0.07)' }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${m.accentColor}18` }}>
                    <Icon size={14} style={{ color: m.accentColor }} />
                  </div>
                  <div>
                    <div className="text-[12px] font-medium text-white">{m.name.split(' ')[0]}</div>
                    <div className="text-[10px] text-gray-600">{m.role.split(' ')[0]}</div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <a
                    href={`mailto:${m.email}`}
                    className="flex items-center gap-1.5 text-[11px] text-gray-500 hover:text-gray-300 transition-colors"
                  >
                    <Mail size={10} /> {m.email.split('@')[0]}…
                  </a>
                  <span className="flex items-center gap-1.5 text-[11px] text-gray-600">
                    <Phone size={10} /> {m.phone}
                  </span>
                  <a
                    href={m.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-[11px] text-gray-500 hover:text-gray-300 transition-colors"
                  >
                    <ExternalLink size={10} /> LinkedIn / GitHub
                  </a>
                </div>
              </div>
            )
          })}
        </div>

        {/* CTA */}
        <div className="mt-14 text-center animate-fadeUp delay-700">
          <a
            href="mailto:cgwoffical@gmail.com"
            className="inline-flex items-center gap-2 text-[13px] font-medium text-blue-400 border border-blue-500 rounded-full px-7 py-3 hover:bg-blue-500 hover:text-white hover:border-blue-500 transition-all duration-200 group"
          >
            Send us an email
            <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
          </a>
        </div>
      </div>
    </div>
  )
}

// ─── Footer ──────────────────────────────────────────────────────────────────
function Footer({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <footer className="border-t px-6 sm:px-12 md:px-20 lg:px-28 py-10" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <Logo size={15} fill="rgb(100,100,100)" />
          <span className="text-[12px] text-gray-700">CGW · Islamabad, Pakistan</span>
        </div>
        <div className="flex items-center gap-6">
          {(['home', 'team', 'about', 'contact'] as Page[]).map(p => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className="text-[11px] text-gray-700 hover:text-gray-400 transition-colors capitalize"
            >
              {p}
            </button>
          ))}
        </div>
        <a
          href="mailto:cgwoffical@gmail.com"
          className="text-[11px] text-gray-700 hover:text-gray-400 transition-colors"
        >
          cgwoffical@gmail.com
        </a>
      </div>
    </footer>
  )
}

// ─── App ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState<Page>('home')
  const [selectedMember, setSelectedMember] = useState<string | null>(null)

  const handleSetPage = (p: Page) => {
    setSelectedMember(null)
    setPage(p)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSelectMember = (id: string) => {
    setSelectedMember(id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleBack = () => {
    setSelectedMember(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="grain">
      <Nav active={page} setPage={handleSetPage} />

      {page === 'home' && <HeroPage setPage={handleSetPage} />}

      {page === 'team' && (
        selectedMember
          ? <ProfilePage id={selectedMember} onBack={handleBack} />
          : <TeamPage setSelected={handleSelectMember} />
      )}

      {page === 'about' && <AboutPage />}
      {page === 'contact' && <ContactPage />}

      {page !== 'home' && <Footer setPage={handleSetPage} />}
    </div>
  )
}
