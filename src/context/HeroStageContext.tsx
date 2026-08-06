import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'

type Stage = 'welcome' | 'about'

// Screens stacked after About, each sliding up to cover the previous one:
// 0 = About (base), 1 = Skills, 2 = Contact. Add another screen by bumping
// MAX_PANEL and giving it panelIndex 3 in its own component.
const MAX_PANEL = 2

interface HeroStageValue {
  stage: Stage
  textHidden: boolean
  projectsOpen: boolean
  panelIndex: number
  goHome: () => void
  goAbout: () => void
  goContact: () => void
  openProjects: () => void
  closeProjects: () => void
}

const HeroStageContext = createContext<HeroStageValue | null>(null)

// Keep in sync with --curtain-duration in index.css.
const CURTAIN_DURATION_MS = 900
// Keep in sync with --hero-text-duration in index.css.
const TEXT_FADE_MS = 400
// Keep in sync with --panel-duration in index.css.
const PANEL_DURATION_MS = 800
const WHEEL_THRESHOLD = 4
const TOUCH_THRESHOLD = 40

export function HeroStageProvider({ children }: { children: ReactNode }) {
  const [stage, setStage] = useState<Stage>('welcome')
  const [textHidden, setTextHidden] = useState(false)
  const [projectsOpen, setProjectsOpen] = useState(false)
  const [panelIndex, setPanelIndex] = useState(0)

  const stageRef = useRef<Stage>('welcome')
  const busyRef = useRef(false)
  const textHiddenRef = useRef(false)
  const projectsOpenRef = useRef(false)
  const panelIndexRef = useRef(0)

  const openProjects = () => {
    projectsOpenRef.current = true
    setProjectsOpen(true)
  }

  const closeProjects = () => {
    projectsOpenRef.current = false
    setProjectsOpen(false)
  }

  const setPanelIndexBoth = (value: number) => {
    panelIndexRef.current = value
    setPanelIndex(value)
  }

  const setTextHiddenBoth = (value: boolean) => {
    textHiddenRef.current = value
    setTextHidden(value)
  }

  // Opening (welcome -> about): the text slides down/fades out first, then
  // — once it's clear — the curtain splits underneath it. Closing (about ->
  // welcome) runs the reverse in the mirrored order: the curtain closes
  // first, then the text fades back in on top of it.
  const animateTo = (next: Stage) => {
    busyRef.current = true
    if (next === 'about') {
      setTextHiddenBoth(true)
      window.setTimeout(() => {
        stageRef.current = next
        setStage(next)
      }, TEXT_FADE_MS)
      window.setTimeout(() => {
        busyRef.current = false
      }, TEXT_FADE_MS + CURTAIN_DURATION_MS)
    } else {
      stageRef.current = next
      setStage(next)
      window.setTimeout(() => {
        setTextHiddenBoth(false)
      }, CURTAIN_DURATION_MS)
      window.setTimeout(() => {
        busyRef.current = false
      }, CURTAIN_DURATION_MS + TEXT_FADE_MS)
    }
  }

  const stepPanel = (delta: 1 | -1) => {
    busyRef.current = true
    setPanelIndexBoth(panelIndexRef.current + delta)
    window.setTimeout(() => {
      busyRef.current = false
    }, PANEL_DURATION_MS)
  }

  // Body scroll is locked for the site's whole lifetime — Welcome, About,
  // Skills, Contact and Projects are all fixed-position overlays driven by
  // transform, not by real document scroll, so there's never anything to
  // scroll (and never a native scrollbar to show).
  useLayoutEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  useEffect(() => {
    // Single wheel-gesture step, always locked: on Welcome, wheel-down
    // opens the curtain to About. From About onward, wheel-down steps
    // forward one panel at a time (About -> Skills -> Contact), each
    // sliding up to cover the previous; wheel-up steps back the same way,
    // and wheel-up from About closes the curtain to Welcome.
    const handleDelta = (deltaY: number, event: Event) => {
      if (Math.abs(deltaY) < WHEEL_THRESHOLD) return
      // While the projects panel is open, let it scroll its own content
      // natively — the hero curtain shouldn't react to this gesture.
      if (projectsOpenRef.current) return

      event.preventDefault()
      if (busyRef.current) return

      if (deltaY > 0) {
        if (stageRef.current === 'welcome') {
          animateTo('about')
        } else if (panelIndexRef.current < MAX_PANEL) {
          stepPanel(1)
        }
      } else if (panelIndexRef.current > 0) {
        stepPanel(-1)
      } else if (stageRef.current === 'about') {
        animateTo('welcome')
      }
    }

    const onWheel = (e: WheelEvent) => handleDelta(e.deltaY, e)

    let touchStartY = 0
    let touchConsumed = false
    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY
      touchConsumed = false
    }
    const onTouchMove = (e: TouchEvent) => {
      if (touchConsumed) return
      const delta = touchStartY - e.touches[0].clientY
      if (Math.abs(delta) < TOUCH_THRESHOLD) return
      touchConsumed = true
      handleDelta(delta, e)
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && projectsOpenRef.current) closeProjects()
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: false })
    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  const goHome = () => {
    closeProjects()
    setPanelIndexBoth(0)
    if (stageRef.current !== 'welcome') animateTo('welcome')
  }

  const goAbout = () => {
    setPanelIndexBoth(0)
    if (stageRef.current !== 'about') animateTo('about')
  }

  const goContact = () => {
    closeProjects()
    if (stageRef.current !== 'about') {
      stageRef.current = 'about'
      setStage('about')
      setTextHiddenBoth(true)
    }
    setPanelIndexBoth(MAX_PANEL)
  }

  return (
    <HeroStageContext.Provider
      value={{
        stage,
        textHidden,
        projectsOpen,
        panelIndex,
        goHome,
        goAbout,
        goContact,
        openProjects,
        closeProjects,
      }}
    >
      {children}
    </HeroStageContext.Provider>
  )
}

export function useHeroStage() {
  const ctx = useContext(HeroStageContext)
  if (!ctx) throw new Error('useHeroStage must be used within HeroStageProvider')
  return ctx
}
