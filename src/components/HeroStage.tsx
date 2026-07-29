import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useHeroStage } from '../context/HeroStageContext'
import ProjectsPanel from './ProjectsPanel'
import bostonImg from '../assets/boston.jpg'
import seoulImg from '../assets/seoul.jpg'

const HERO_IMAGES = [bostonImg, seoulImg]
const SLIDE_INTERVAL_MS = 15000

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
  const { stage, textHidden } = useHeroStage()
  const isOpen = stage === 'about'
  const highlights = t('about.highlights', { returnObjects: true }) as string[]

  const [slideIndex, setSlideIndex] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => {
      setSlideIndex((i) => (i + 1) % HERO_IMAGES.length)
    }, SLIDE_INTERVAL_MS)
    return () => window.clearInterval(id)
  }, [])

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
