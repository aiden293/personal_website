import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import './App.css'
import { SOCIAL_LINKS } from './lib/socialLinks'

type Project = {
  name: string
  company?: string
  description: string
  role: string
  problem: string
  responsibilities: string[]
  impact: string
  stack: string[]
  link?: string
}

type Lens = 'All' | 'Product' | 'Solutions' | 'Data'

const projectMeta = [
  { lens: 'Solutions' as Lens, period: 'May — Jul 2026', image: '/images/projects/12 (1).png', tone: 'mint' },
  { lens: 'Product' as Lens, period: 'Jan — May 2026', image: '/images/projects/TileTalk_main.png', tone: 'blue' },
  { lens: 'Solutions' as Lens, period: '2026', image: '', tone: 'violet' },
  { lens: 'Product' as Lens, period: 'Sep — Dec 2025', image: '', tone: 'coral' },
  { lens: 'Product' as Lens, period: 'Sep — Dec 2024', image: '/images/projects/museek-overview.png', tone: 'dark' },
  { lens: 'Data' as Lens, period: 'Jun — Aug 2025', image: '/images/projects/halal_road_main.png', tone: 'sand' },
]

const experience = [
  { period: 'Sep 2026 — now', org: 'BU Spark × BU Newsroom', role: 'Product & Data Analyst', lens: 'Data' },
  { period: 'May — Jul 2026', org: 'AdaptX', role: 'Software Developer Intern', lens: 'Solutions' },
  { period: 'Jan — May 2026', org: 'Hack4Impact @ BU', role: 'Product Manager', lens: 'Product' },
  { period: 'Sep — Dec 2025', org: 'Ate!', role: 'PM & Backend Developer', lens: 'Product' },
  { period: 'Jun — Aug 2025', org: 'Halal Road · Seoul', role: 'Business Data Analytics Intern', lens: 'Data' },
  { period: '2021 — 2023', org: 'Korea Real Estate Board', role: 'Public Service Agent', lens: 'Operations' },
]

const skillGroups = [
  { title: 'Product', skills: ['Roadmapping', 'Prioritization', 'User research', 'Agile delivery'] },
  { title: 'Data', skills: ['SQL', 'BigQuery', 'Python / NumPy', 'Tableau', 'Excel'] },
  { title: 'Engineering', skills: ['TypeScript', 'React', 'Node', 'Django', 'REST', 'MongoDB'] },
  { title: 'Tools', skills: ['Jira', 'Notion', 'Figma', 'Git / GitHub', 'PlantUML'] },
]

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M5 15 15 5M7 5h8v8" />
    </svg>
  )
}

function ProjectVisual({ project, index, compact = false }: { project: Project; index: number; compact?: boolean }) {
  const meta = projectMeta[index]
  return (
    <div className={`project-visual project-visual--${meta.tone} ${compact ? 'project-visual--compact' : ''}`}>
      <div className="browser-bar" aria-hidden="true">
        <span /><span /><span />
        <small>{project.company ?? project.name}</small>
      </div>
      {meta.image ? (
        <img src={meta.image} alt={`${project.name} project preview`} loading="lazy" />
      ) : (
        <div className="project-visual__abstract" aria-hidden="true">
          <span>{String(index + 1).padStart(2, '0')}</span>
          <strong>{project.name}</strong>
          <i />
        </div>
      )}
    </div>
  )
}

function App() {
  const { t, i18n } = useTranslation()
  const [lens, setLens] = useState<Lens>('All')
  const [selected, setSelected] = useState<number | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const projects = t('projects.items', { returnObjects: true }) as Project[]

  const filtered = useMemo(
    () => projects.map((project, index) => ({ project, index })).filter(({ index }) => lens === 'All' || projectMeta[index].lens === lens),
    [lens, projects],
  )

  useEffect(() => {
    document.body.style.overflow = selected === null ? '' : 'hidden'
    const close = (event: KeyboardEvent) => event.key === 'Escape' && setSelected(null)
    window.addEventListener('keydown', close)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', close)
    }
  }, [selected])

  useEffect(() => {
    if (!window.location.hash) return
    window.requestAnimationFrame(() => {
      document.querySelector(window.location.hash)?.scrollIntoView()
    })
  }, [])

  const language = i18n.language.startsWith('ko') ? 'ko' : 'en'
  const copy = language === 'ko'
    ? {
        eyebrow: '프로덕트 · 데이터 · 엔지니어링',
        headline: '복잡한 시스템을, 사람들이 실제로 쓰는 제품으로.',
        intro: '문제를 구조화하고, 제품을 설계하고, 직접 구현합니다. 비영리 단체의 데이터 파이프라인부터 AI 워크플로우와 소비자 앱까지 다룹니다.',
        cta: '프로젝트 보기',
        status: '새로운 기회를 찾고 있어요',
        workTitle: '직접 만들고 출시한 시스템과 앱',
        workIntro: '실제 사용자를 위한 프로덕션 도구와 플랫폼 — 데이터 통합, AI 워크플로우, 헬스케어, 풀스택 제품까지.',
        experience: '경험',
        capabilities: '일하는 방식과 도구',
        contactTitle: '좋은 문제를 함께 풀어볼까요?',
        contactBody: '제품 전략, 데이터, 엔지니어링이 만나는 지점의 일을 좋아합니다.',
        close: '닫기',
        role: '역할',
        challenge: '문제',
        contribution: '기여',
        outcome: '결과',
      }
    : {
        eyebrow: 'Product · Data · Engineering',
        headline: 'I turn messy systems into products people can actually use.',
        intro: 'I structure the problem, shape the product, and help build it—across nonprofit data pipelines, AI workflows, and consumer apps.',
        cta: 'Explore my work',
        status: 'Open to new opportunities',
        workTitle: "Systems & apps I've built and shipped",
        workIntro: 'Production tools and platforms made for real users—from data integrations and AI workflows to healthcare and full-stack products.',
        experience: 'Experience',
        capabilities: 'How I work & what I use',
        contactTitle: 'Have a useful problem to solve?',
        contactBody: 'I’m interested in work where product thinking, data, and engineering meet.',
        close: 'Close',
        role: 'Role',
        challenge: 'Challenge',
        contribution: 'Contribution',
        outcome: 'Outcome',
      }

  const selectedProject = selected === null ? null : projects[selected]

  return (
    <>
      <header className="site-header">
        <a className="wordmark" href="#top" onClick={() => setMenuOpen(false)}>SHL<span>.</span></a>
        <button className="menu-button" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-label="Toggle navigation"><span /><span /></button>
        <nav className={menuOpen ? 'is-open' : ''} aria-label="Main navigation">
          <a href="#work" onClick={() => setMenuOpen(false)}>Work</a>
          <a href="#experience" onClick={() => setMenuOpen(false)}>Experience</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </nav>
        <button className="language-button" onClick={() => i18n.changeLanguage(language === 'en' ? 'ko' : 'en')}>{language === 'en' ? 'KR' : 'EN'}</button>
      </header>

      <main id="top">
        <section className="hero section-shell">
          <div className="hero__copy">
            <p className="eyebrow"><span />{copy.eyebrow}</p>
            <h1>{copy.headline}</h1>
            <p className="hero__intro">{copy.intro}</p>
            <div className="hero__actions">
              <a className="button button--primary" href="#work">{copy.cta}<ArrowIcon /></a>
              <a className="text-link" href={`mailto:${t('about.email')}`}>{t('about.email')}</a>
            </div>
          </div>
          <div className="hero__portrait-wrap">
            <div className="hero__portrait">
              <img src="/images/profile.jpg" alt={t('about.name')} />
              <div className="hero__portrait-label"><span>{t('about.name')}</span><small>Boston ↔ Seoul</small></div>
            </div>
            <div className="availability"><span />{copy.status}</div>
          </div>
          <div className="hero__proof">
            <div><strong>10K+</strong><span>records unified</span></div>
            <div><strong>6</strong><span>products & systems</span></div>
            <div><strong>3</strong><span>disciplines connected</span></div>
          </div>
        </section>

        <section className="work-section" id="work">
          <div className="section-shell">
            <div className="section-heading">
              <div><p className="section-number">01 / Selected work</p><h2>{copy.workTitle}</h2></div>
              <p>{copy.workIntro}</p>
            </div>
            <div className="filters" aria-label="Filter projects">
              {(['All', 'Product', 'Solutions', 'Data'] as Lens[]).map((item) => (
                <button key={item} className={lens === item ? 'is-active' : ''} onClick={() => setLens(item)}>{item}<span>{item === 'All' ? projects.length : projectMeta.filter((meta) => meta.lens === item).length}</span></button>
              ))}
            </div>
            <div className="projects-grid">
              {filtered.map(({ project, index }) => (
                <article className={`project-card ${index < 2 ? 'project-card--featured' : ''}`} key={project.name}>
                  <button className="project-card__open" onClick={() => setSelected(index)} aria-label={`View ${project.name} case study`}>
                    <ProjectVisual project={project} index={index} compact={index >= 2} />
                    <div className="project-card__body">
                      <div className="project-card__meta"><span className={`lens lens--${projectMeta[index].lens.toLowerCase()}`}>{projectMeta[index].lens}</span><span>{projectMeta[index].period}</span></div>
                      <h3>{project.name}</h3><p>{project.description}</p>
                      <span className="project-card__link">View case study <ArrowIcon /></span>
                    </div>
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="experience-section section-shell" id="experience">
          <div className="section-kicker"><p className="section-number">02 / {copy.experience}</p><h2>{copy.experience}</h2></div>
          <div className="experience-list">
            {experience.map((item) => (
              <div className="experience-row" key={`${item.org}-${item.period}`}><span>{item.period}</span><strong>{item.org}</strong><p>{item.role}</p><em>{item.lens}</em></div>
            ))}
          </div>
        </section>

        <section className="about-section" id="about">
          <div className="section-shell about-grid">
            <div className="section-kicker"><p className="section-number">03 / About</p><h2>{copy.capabilities}</h2><p className="about-copy">{t('about.bio')}</p></div>
            <div className="skill-grid">
              {skillGroups.map((group, index) => (
                <div className="skill-group" key={group.title}><span>0{index + 1}</span><h3>{group.title}</h3><ul>{group.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul></div>
              ))}
            </div>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="section-shell contact-grid">
            <p className="section-number">04 / Contact</p>
            <div><h2>{copy.contactTitle}</h2><p>{copy.contactBody}</p></div>
            <div className="contact-links">
              <a className="button button--light" href={`mailto:${t('about.email')}`}>Start a conversation <ArrowIcon /></a>
              <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowIcon /></a>
              <a href={SOCIAL_LINKS.github} target="_blank" rel="noreferrer">GitHub <ArrowIcon /></a>
            </div>
          </div>
          <div className="footer-marquee" aria-hidden="true">PRODUCT · DATA · ENGINEERING · PRODUCT · DATA · ENGINEERING</div>
          <footer className="section-shell"><span>© 2026 SangHyup Lee</span><a href="#top">Back to top ↑</a></footer>
        </section>
      </main>

      {selectedProject && selected !== null && (
        <div className="case-overlay" role="dialog" aria-modal="true" aria-labelledby="case-title" onMouseDown={(event) => event.target === event.currentTarget && setSelected(null)}>
          <article className="case-study">
            <button className="case-study__close" onClick={() => setSelected(null)} aria-label={copy.close}>×</button>
            <div className={`case-hero case-hero--${projectMeta[selected].tone}`}>
              <div><p>{selectedProject.role} · {projectMeta[selected].period}</p><h2 id="case-title">{selectedProject.name}</h2><p>{selectedProject.description}</p></div>
              <ProjectVisual project={selectedProject} index={selected} compact />
            </div>
            <div className="case-content">
              <aside>
                <span>{copy.role}</span><strong>{selectedProject.role}</strong>
                {selectedProject.company && <><span>Organization</span><strong>{selectedProject.company}</strong></>}
                <span>Tools</span><div className="case-tags">{selectedProject.stack.map((tool) => <i key={tool}>{tool}</i>)}</div>
              </aside>
              <div className="case-narrative">
                <section><span>01</span><div><h3>{copy.challenge}</h3><p>{selectedProject.problem}</p></div></section>
                <section><span>02</span><div><h3>{copy.contribution}</h3><ul>{selectedProject.responsibilities.map((item) => <li key={item}>{item}</li>)}</ul></div></section>
                <section><span>03</span><div><h3>{copy.outcome}</h3><p>{selectedProject.impact}</p></div></section>
                {selected === 1 && (
                  <video
                    className="case-video"
                    controls
                    playsInline
                    preload="metadata"
                  >
                    <source src="/videos/tiletalk-demo.mp4" type="video/mp4" />
                    Your browser does not support video playback.
                  </video>
                )}
                {selected === 1 && <img className="case-extra" src="/images/projects/hack4impact-process.png" alt="Hack4Impact workflow and process" />}
                {selected === 4 && <img className="case-extra" src="/images/projects/museek-research.png" alt="MuSeek research and competitive analysis" />}
                {selectedProject.link && <a className="button button--primary" href={selectedProject.link} target="_blank" rel="noreferrer">Open project <ArrowIcon /></a>}
              </div>
            </div>
          </article>
        </div>
      )}
    </>
  )
}

export default App
