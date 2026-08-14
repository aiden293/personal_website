import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useHeroStage } from '../context/HeroStageContext'
import { ExternalLinkIcon } from './icons'
import { PhotoIcon } from './skillIcons'

interface CurrentItem {
  name: string
  status: string
  description: string
  link: string
  images: string[]
}

export default function Contact() {
  const { t } = useTranslation()
  const { panelIndex } = useHeroStage()
  const isOpen = panelIndex >= 2
  const [lightbox, setLightbox] = useState<string | null>(null)

  const items = t('current.items', { returnObjects: true }) as CurrentItem[]

  return (
    <section
      id="contact"
      className={`contact-panel ${isOpen ? 'is-open' : ''}`}
      aria-hidden={!isOpen}
    >
      <div className="contact__content">
        <p className="about__eyebrow">{t('current.eyebrow')}</p>
        <h2>{t('current.title')}</h2>

        <div className="current-list">
          {items.map((item) => (
            <div className="current-card" key={item.name}>
              <div className="current-card__head">
                <p className="current-card__title">{item.name}</p>
                <span className="current-card__status">{item.status}</span>
              </div>
              <p className="current-card__desc">{item.description}</p>

              <div className="current-card__shots">
                {item.images.length > 0 ? (
                  item.images.map((src) => (
                    <button
                      type="button"
                      key={src}
                      className="current-card__shot"
                      onClick={() => setLightbox(src)}
                    >
                      <img src={src} alt={item.name} loading="lazy" />
                    </button>
                  ))
                ) : (
                  <div className="current-card__shot current-card__shot--empty">
                    <PhotoIcon />
                  </div>
                )}
              </div>

              <a className="current-card__link" href={item.link} target="_blank" rel="noreferrer">
                <ExternalLinkIcon />
                {t('projects.viewRepo')}
              </a>
            </div>
          ))}
        </div>
      </div>

      {lightbox && (
        <button
          type="button"
          className="lightbox"
          onClick={() => setLightbox(null)}
          aria-label={t('projects.close')}
        >
          <img src={lightbox} alt="" />
        </button>
      )}
    </section>
  )
}
