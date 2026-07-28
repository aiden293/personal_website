import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useHeroStage } from '../context/HeroStageContext'

type Section = 'home' | 'about' | 'contact'
const SECTIONS: Section[] = ['home', 'about', 'contact']

export default function Navbar() {
  const { t, i18n } = useTranslation()
  const { stage, locked, goHome, goAbout, goContact } = useHeroStage()
  const [scrolled, setScrolled] = useState(false)
  const [pastHero, setPastHero] = useState(false)

  useEffect(() => {
    let ticking = false
    const compute = () => {
      setScrolled(window.scrollY > 40)
      const contact = document.getElementById('contact')
      setPastHero(!!contact && contact.getBoundingClientRect().top < window.innerHeight * 0.5)
      ticking = false
    }
    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(compute)
      }
    }
    compute()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const active: Section = !locked && pastHero ? 'contact' : stage === 'welcome' ? 'home' : 'about'

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'ko' : 'en')
  }

  const goTo = (section: Section) => {
    if (section === 'home') goHome()
    else if (section === 'about') goAbout()
    else goContact()
  }

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <button className="navbar__brand" onClick={() => goTo('home')}>
        {t('about.name')}
      </button>
      <ul className="navbar__links">
        {SECTIONS.map((id) => (
          <li key={id}>
            <button
              className={active === id ? 'active' : ''}
              onClick={() => goTo(id)}
            >
              {t(`nav.${id}`)}
            </button>
          </li>
        ))}
      </ul>
      <button className="navbar__lang" onClick={toggleLanguage}>
        {i18n.language === 'en' ? '한국어' : 'EN'}
      </button>
    </nav>
  )
}
