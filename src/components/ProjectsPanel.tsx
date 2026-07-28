import { useTranslation } from 'react-i18next'
import { useHeroStage } from '../context/HeroStageContext'

interface ProjectItem {
  name: string
  description: string
  link: string
}

export default function ProjectsPanel() {
  const { t } = useTranslation()
  const { stage, projectsOpen, openProjects, closeProjects } = useHeroStage()
  const items = t('projects.items', { returnObjects: true }) as ProjectItem[]

  if (stage !== 'about') return null

  return (
    <>
      <button
        className={`projects-tab ${projectsOpen ? 'projects-tab--hidden' : ''}`}
        onClick={openProjects}
      >
        <span>{t('projects.tabLabel')}</span>
      </button>

      <div
        className={`projects-panel ${projectsOpen ? 'is-open' : ''}`}
        aria-hidden={!projectsOpen}
      >
        <button className="projects-panel__close" onClick={closeProjects}>
          <span aria-hidden="true">×</span>
          <span className="sr-only">{t('projects.close')}</span>
        </button>
        <div className="projects-panel__inner">
          <p className="about__eyebrow">{t('projects.title')}</p>
          <ul className="projects-panel__list">
            {items.map((item) => (
              <li key={item.name} className="projects-panel__item">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <a href={item.link} target="_blank" rel="noreferrer">
                  GitHub ↗
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}
