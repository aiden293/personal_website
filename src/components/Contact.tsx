import { useTranslation } from 'react-i18next'
import { useHeroStage } from '../context/HeroStageContext'
import { SOCIAL_LINKS } from '../lib/socialLinks'

export default function Contact() {
  const { t } = useTranslation()
  const { panelIndex } = useHeroStage()
  const isOpen = panelIndex >= 2

  return (
    <section
      id="contact"
      className={`contact-panel ${isOpen ? 'is-open' : ''}`}
      aria-hidden={!isOpen}
    >
      <div className="contact__content">
        <h2>{t('contact.title')}</h2>
        <p>{t('contact.subtitle')}</p>
        <a className="contact__email" href={`mailto:${t('contact.email')}`}>
          {t('contact.email')}
        </a>
        <div className="contact__links">
          <a href={SOCIAL_LINKS.github} target="_blank" rel="noreferrer">
            {t('contact.github')}
          </a>
          <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noreferrer">
            {t('contact.linkedin')}
          </a>
        </div>
      </div>
    </section>
  )
}
