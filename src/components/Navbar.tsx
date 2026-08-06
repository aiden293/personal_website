import { useTranslation } from 'react-i18next'
import { useHeroStage } from '../context/HeroStageContext'

type Section = 'home' | 'about' | 'contact'
const SECTIONS: Section[] = ['home', 'about', 'contact']

export default function Navbar() {
  const { t, i18n } = useTranslation()
  const { stage, panelIndex, goHome, goAbout, goContact } = useHeroStage()

  // Nothing here scrolls anymore — Welcome/About/Skills/Contact are all
  // fixed overlays swapped via transform, so "scrolled" and "active" are
  // both derived straight from that state instead of a scroll listener.
  const scrolled = stage === 'about'
  const active: Section = panelIndex >= 2 ? 'contact' : stage === 'welcome' ? 'home' : 'about'

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
