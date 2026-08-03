import { useTranslation } from 'react-i18next'
import { useHeroStage } from '../context/HeroStageContext'
import { FolderIcon } from './icons'

export default function ProjectsPanel() {
  const { t } = useTranslation()
  const { stage, projectsOpen, openProjects, closeProjects } = useHeroStage()

  if (stage !== 'about') return null

  return (
    <>
      <button
        className={`hero-peek ${projectsOpen ? 'is-visible' : ''}`}
        onClick={closeProjects}
        aria-label={t('projects.close')}
      />

      <div
        className={`projects-panel ${projectsOpen ? 'is-open' : ''}`}
        onClick={projectsOpen ? undefined : openProjects}
      >
        <div className="projects-panel__peek-icon">
          <FolderIcon />
        </div>
      </div>
    </>
  )
}
