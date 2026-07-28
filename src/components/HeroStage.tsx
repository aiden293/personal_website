import { useTranslation } from 'react-i18next'
import { useHeroStage } from '../context/HeroStageContext'
import ProjectsPanel from './ProjectsPanel'

export default function HeroStage() {
  const { t } = useTranslation()
  const { stage } = useHeroStage()
  const isOpen = stage === 'about'
  const highlights = t('about.highlights', { returnObjects: true }) as string[]

  return (
    <div id="hero-stage" className="hero-stage">
      <ProjectsPanel />
      <div className="hero-stage__about">
        <div className="about__content">
          <p className="about__eyebrow">{t('about.title')}</p>
          <h2>{t('about.name')}</h2>
          <p className="about__role">{t('about.role')}</p>
          <p className="about__bio">{t('about.bio')}</p>
          <ul className="about__highlights">
            {highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div
        className={`hero-stage__curtain hero-stage__curtain--top ${isOpen ? 'is-open' : ''}`}
      >
        <div className="hero__content">
          <h1>{t('hero.greeting')}</h1>
        </div>
      </div>

      <div
        className={`hero-stage__curtain hero-stage__curtain--bottom ${isOpen ? 'is-open' : ''}`}
      >
        <div className="hero__content">
          <h1>{t('hero.greeting')}</h1>
        </div>
      </div>

      <div className={`hero-stage__scroll ${isOpen ? 'hero-stage__scroll--hidden' : ''}`}>
        <span>{t('hero.scroll')}</span>
        <div className="mouse-icon">
          <div className="mouse-icon__wheel" />
        </div>
      </div>
    </div>
  )
}
