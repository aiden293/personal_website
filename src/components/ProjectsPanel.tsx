import { useTranslation } from 'react-i18next'
import { useHeroStage } from '../context/HeroStageContext'
import { FolderIcon } from './icons'

export default function ProjectsPanel() {
  const { t } = useTranslation()
  const { stage, panelIndex, projectsOpen, openProjects, closeProjects } = useHeroStage()

  // Always mounted (not gated by stage) so the peek is already sitting
  // there — hidden underneath the Welcome curtain via z-index — instead of
  // popping into existence the moment the "about" stage is reached.
  const canOpen = stage === 'about' && panelIndex === 0 && !projectsOpen
  // Once Skills or Contact slides into view, the peek/split has no reason
  // to linger there — whichever panel is open should be the only thing on
  // screen.
  const showPeek = (stage === 'about' && panelIndex === 0) || projectsOpen

  return (
    <>
      <button
        className={`hero-peek ${projectsOpen ? 'is-visible' : ''}`}
        onClick={closeProjects}
        aria-label={t('projects.close')}
      />

      <div
        className={`projects-panel ${projectsOpen ? 'is-open' : ''} ${showPeek ? '' : 'projects-panel--offscreen'}`}
        onClick={canOpen ? openProjects : undefined}
      >
        <div className="projects-panel__peek-icon">
          <FolderIcon />
        </div>
      </div>
    </>
  )
}
