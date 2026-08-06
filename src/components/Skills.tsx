import type { ComponentType, SVGProps } from 'react'
import { useTranslation } from 'react-i18next'
import { useHeroStage } from '../context/HeroStageContext'
import {
  CloudIcon,
  ContainerIcon,
  DatabaseIcon,
  GitBranchIcon,
  NodeIcon,
  PythonIcon,
  ReactIcon,
  TypeScriptIcon,
} from './skillIcons'

interface TimelineItem {
  year: string
  label: string
}

const SKILL_ICONS: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  TypeScript: TypeScriptIcon,
  React: ReactIcon,
  'Node.js': NodeIcon,
  Python: PythonIcon,
  PostgreSQL: DatabaseIcon,
  Docker: ContainerIcon,
  AWS: CloudIcon,
  Git: GitBranchIcon,
}

export default function Skills() {
  const { t } = useTranslation()
  const { panelIndex } = useHeroStage()
  const isOpen = panelIndex >= 1

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
            {timeline.map((entry) => (
              <div key={entry.year} className="timeline__item">
                <span className="timeline__year">{entry.year}</span>
                <span className="timeline__dot" />
                <span className="timeline__label">{entry.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
