import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useHeroStage } from '../context/HeroStageContext'
import { ArrowLeftIcon, ExternalLinkIcon, FolderIcon } from './icons'
import { PhotoIcon } from './skillIcons'

interface ProjectItem {
  name: string
  description: string
  role: string
  problem: string
  responsibilities: string[]
  impact: string
  stack: string[]
  link: string
}

export default function ProjectsPanel() {
  const { t } = useTranslation()
  const { stage, panelIndex, projectsOpen, openProjects, closeProjects } = useHeroStage()
  const [selected, setSelected] = useState<number | null>(null)

  const items = t('projects.items', { returnObjects: true }) as ProjectItem[]

  // Always mounted (not gated by stage) so the peek is already sitting
  // there — hidden underneath the Welcome curtain via z-index — instead of
  // popping into existence the moment the "about" stage is reached.
  const canOpen = stage === 'about' && panelIndex === 0 && !projectsOpen
  // Once Skills or Contact slides into view, the peek/split has no reason
  // to linger there — whichever panel is open should be the only thing on
  // screen.
  const showPeek = (stage === 'about' && panelIndex === 0) || projectsOpen

  const handleClose = () => {
    closeProjects()
    setSelected(null)
  }

  return (
    <>
      <button
        className={`hero-peek ${projectsOpen ? 'is-visible' : ''}`}
        onClick={handleClose}
        aria-label={t('projects.close')}
      />

      <div
        className={`projects-panel ${projectsOpen ? 'is-open' : ''} ${showPeek ? '' : 'projects-panel--offscreen'}`}
        onClick={canOpen ? openProjects : undefined}
      >
        <div className="projects-panel__peek-icon">
          <FolderIcon />
        </div>

        <div className="projects-panel__content">
          <h2>{t('projects.title')}</h2>

          {selected === null ? (
            <div className="projects-grid">
              {items.map((item, i) => (
                <button
                  type="button"
                  key={item.name}
                  className="project-card"
                  onClick={() => setSelected(i)}
                >
                  <div className="project-card__thumb">
                    <PhotoIcon />
                  </div>
                  <div className="project-card__body">
                    <p className="project-card__title">{item.name}</p>
                    <p className="project-card__summary">{item.description}</p>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="project-detail">
              <button
                type="button"
                className="project-detail__back"
                onClick={() => setSelected(null)}
              >
                <ArrowLeftIcon />
                {t('projects.backToList')}
              </button>

              <div className="project-detail__thumb">
                <PhotoIcon />
              </div>

              <h3>{items[selected].name}</h3>
              <p className="project-detail__role">{items[selected].role}</p>

              <p className="project-detail__section-title">{t('projects.problem')}</p>
              <p className="project-detail__text">{items[selected].problem}</p>

              <p className="project-detail__section-title">{t('projects.responsibilities')}</p>
              <ul className="project-detail__list">
                {items[selected].responsibilities.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <p className="project-detail__section-title">{t('projects.impact')}</p>
              <p className="project-detail__text">{items[selected].impact}</p>

              <p className="project-detail__section-title">{t('projects.tools')}</p>
              <div className="project-detail__stack">
                {items[selected].stack.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>

              <a
                className="project-detail__link"
                href={items[selected].link}
                target="_blank"
                rel="noreferrer"
              >
                <ExternalLinkIcon />
                {t('projects.viewRepo')}
              </a>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
