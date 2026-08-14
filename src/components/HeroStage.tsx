import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useHeroStage } from '../context/HeroStageContext'
import { EmailIcon, GitHubIcon, LinkedInIcon } from './icons'
import { PhotoIcon } from './skillIcons'
import { SOCIAL_LINKS } from '../lib/socialLinks'
import bostonImg from '../assets/boston.jpg'
import seoulImg from '../assets/seoul.jpg'

const HERO_IMAGES = [bostonImg, seoulImg]
const SLIDE_INTERVAL_MS = 15000
// Drop your own photo at public/images/profile.jpg — no code change needed,
// this path just needs a file to exist at it.
const PROFILE_PHOTO = '/images/profile.jpg'

function HeroBackground({ activeIndex }: { activeIndex: number }) {
  return (
    <div className="hero-bg" aria-hidden="true">
      {HERO_IMAGES.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          className={`hero-bg__img ${i === activeIndex ? 'is-active' : ''}`}
        />
      ))}
    </div>
  )
}

export default function HeroStage() {
  const { t } = useTranslation()
  const { stage, textHidden, projectsOpen } = useHeroStage()
  const isOpen = stage === 'about'

  const [slideIndex, setSlideIndex] = useState(0)
  const [photoFailed, setPhotoFailed] = useState(false)

  useEffect(() => {
    const id = window.setInterval(() => {
      setSlideIndex((i) => (i + 1) % HERO_IMAGES.length)
    }, SLIDE_INTERVAL_MS)
    return () => window.clearInterval(id)
  }, [])

  return (
    <div id="hero-stage" className={`hero-stage ${projectsOpen ? 'hero-stage--pushed' : ''}`}>
      <div className="hero-stage__about">
        <div className="about__row">
          <div className="about__photo">
            {photoFailed ? (
              <PhotoIcon />
            ) : (
              <img
                src={PROFILE_PHOTO}
                alt={t('about.name')}
                onError={() => setPhotoFailed(true)}
              />
            )}
          </div>

          <div className="about__content">
            <p className="about__eyebrow">{t('about.title')}</p>
            <h2>{t('about.name')}</h2>
            <p className="about__role">{t('about.role')}</p>
            <p className="about__bio">{t('about.bio')}</p>
            <div className="about__socials">
              <a
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
              >
                <GitHubIcon />
              </a>
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
              >
                <LinkedInIcon />
              </a>
              <a href={`mailto:${t('about.email')}`} aria-label="Email">
                <EmailIcon />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`hero-stage__curtain hero-stage__curtain--top ${isOpen ? 'is-open' : ''}`}
      >
        <HeroBackground activeIndex={slideIndex} />
      </div>

      <div
        className={`hero-stage__curtain hero-stage__curtain--bottom ${isOpen ? 'is-open' : ''}`}
      >
        <HeroBackground activeIndex={slideIndex} />
      </div>

      <div className={`hero-stage__text ${textHidden ? 'is-hidden' : ''}`}>
        <div className="hero__content">
          <h1>{t('hero.greeting')}</h1>
        </div>
      </div>

      <div className={`hero-stage__scroll ${textHidden ? 'hero-stage__scroll--hidden' : ''}`}>
        <span>{t('hero.scroll')}</span>
        <div className="mouse-icon">
          <div className="mouse-icon__wheel" />
        </div>
      </div>
    </div>
  )
}
