import type { IconType } from 'react-icons'
import { FaExchangeAlt, FaFileExcel, FaFilePowerpoint, FaJava } from 'react-icons/fa'
import {
  SiCss,
  SiDjango,
  SiFigma,
  SiGooglesheets,
  SiGoogleslides,
  SiHtml5,
  SiJavascript,
  SiJira,
  SiMongodb,
  SiMysql,
  SiNodedotjs,
  SiNotion,
  SiNumpy,
  SiPython,
  SiReact,
  SiSqlite,
  SiTypescript,
  SiUml,
} from 'react-icons/si'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useHeroStage } from '../context/HeroStageContext'
import { PhotoIcon } from './skillIcons'

interface TimelineItem {
  year: string
  label: string
  description: string
}

// Real brand marks via react-icons (Simple Icons / Font Awesome), not
// hand-drawn — keeps trademarked logos accurate instead of approximated.
const SKILL_ICONS: Record<string, IconType> = {
  Python: SiPython,
  MySQL: SiMysql,
  Java: FaJava,
  'HTML-5': SiHtml5,
  CSS: SiCss,
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  'React.js': SiReact,
  'Node.js': SiNodedotjs,
  NumPy: SiNumpy,
  Django: SiDjango,
  REST: FaExchangeAlt,
  MongoDB: SiMongodb,
  SQLite: SiSqlite,
  'Microsoft Excel': FaFileExcel,
  PowerPoint: FaFilePowerpoint,
  'Google Spreadsheets': SiGooglesheets,
  'Google Slides': SiGoogleslides,
  Figma: SiFigma,
  PlantUML: SiUml,
  Jira: SiJira,
  Notion: SiNotion,
}

export default function Skills() {
  const { t } = useTranslation()
  const { panelIndex } = useHeroStage()
  const isOpen = panelIndex >= 1
  const [expandedYear, setExpandedYear] = useState<string | null>(null)

  const items = t('skills.items', { returnObjects: true }) as string[]
  const timeline = t('skills.timeline', { returnObjects: true }) as TimelineItem[]

  return (
    <section className={`skills-panel ${isOpen ? 'is-open' : ''}`} aria-hidden={!isOpen}>
      <div className="skills-panel__content">
        <p className="about__eyebrow">{t('skills.eyebrow')}</p>
        <h2>{t('skills.title')}</h2>

        <div className="skills-marquee">
          <div className="skills-marquee__track">
            {[...items, ...items].map((item, i) => {
              const Icon = SKILL_ICONS[item]
              return (
                <span key={`${item}-${i}`} className="skills-marquee__item">
                  {Icon && <Icon className="skills-marquee__icon" />}
                  {item}
                </span>
              )
            })}
          </div>
        </div>

        <div className="timeline">
          <div className="timeline__row">
            {timeline.map((entry, i) => {
              const isUp = i % 2 === 0
              const expanded = expandedYear === entry.year
              const toggle = () => setExpandedYear(expanded ? null : entry.year)

              return (
                <div key={entry.year} className={`timeline__item ${expanded ? 'is-expanded' : ''}`}>
                  <div
                    className={`timeline__image-slot ${isUp ? 'timeline__image-slot--up' : 'timeline__image-slot--down'}`}
                    style={{ gridRow: isUp ? 1 : 4 }}
                  >
                    <button
                      type="button"
                      className="timeline__image"
                      onClick={toggle}
                      aria-expanded={expanded}
                    >
                      <PhotoIcon />
                    </button>
                    <p className="timeline__caption">{entry.label}</p>
                    <p className="timeline__description">{entry.description}</p>
                    <span className="timeline__connector" aria-hidden="true" />
                  </div>
                  <span className="timeline__year" style={{ gridRow: 2 }}>
                    {entry.year}
                  </span>
                  <span className="timeline__dot" style={{ gridRow: 3 }} />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
