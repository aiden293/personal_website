import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useHeroStage } from '../context/HeroStageContext'

type Section = 'home' | 'about' | 'contact'
const SECTIONS: Section[] = ['home', 'about', 'contact']

const LANGUAGES = [
  { code: 'en', label: 'EN' },
  { code: 'ko', label: '한국어' },
]

export default function Navbar() {
  const { t, i18n } = useTranslation()
  const { stage, panelIndex, goHome, goAbout, goContact } = useHeroStage()
  const [langMenuOpen, setLangMenuOpen] = useState(false)
  const langRef = useRef<HTMLDivElement>(null)

  // Nothing here scrolls anymore — Welcome/About/Skills/Contact are all
  // fixed overlays swapped via transform, so "scrolled" and "active" are
  // both derived straight from that state instead of a scroll listener.
  const scrolled = stage === 'about'
  const active: Section = panelIndex >= 2 ? 'contact' : stage === 'welcome' ? 'home' : 'about'
  const currentLanguage = LANGUAGES.find((lang) => lang.code === i18n.language) ?? LANGUAGES[0]

  useEffect(() => {
    if (!langMenuOpen) return
    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setLangMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [langMenuOpen])

  const selectLanguage = (code: string) => {
    i18n.changeLanguage(code)
    setLangMenuOpen(false)
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
      <div className="navbar__lang" ref={langRef}>
        <button
          className="navbar__lang-trigger"
          onClick={() => setLangMenuOpen((open) => !open)}
          aria-haspopup="listbox"
          aria-expanded={langMenuOpen}
        >
          {currentLanguage.label}
        </button>
        {langMenuOpen && (
          <ul className="navbar__lang-menu" role="listbox">
            {LANGUAGES.map((lang) => (
              <li key={lang.code}>
                <button
                  role="option"
                  aria-selected={lang.code === currentLanguage.code}
                  className={lang.code === currentLanguage.code ? 'is-selected' : ''}
                  onClick={() => selectLanguage(lang.code)}
                >
                  {lang.label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </nav>
  )
}
