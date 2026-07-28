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

interface HeroStageValue {
  stage: Stage
  locked: boolean
  projectsOpen: boolean
  goHome: () => void
  goAbout: () => void
  goContact: () => void
  openProjects: () => void
  closeProjects: () => void
}

const HeroStageContext = createContext<HeroStageValue | null>(null)

// Keep in sync with --curtain-duration in index.css.
const TRANSITION_MS = 900
const WHEEL_THRESHOLD = 4
const TOUCH_THRESHOLD = 40

export function HeroStageProvider({ children }: { children: ReactNode }) {
  const [stage, setStage] = useState<Stage>('welcome')
  const [locked, setLocked] = useState(true)
  const [projectsOpen, setProjectsOpen] = useState(false)

  const stageRef = useRef<Stage>('welcome')
  const lockedRef = useRef(true)
  const busyRef = useRef(false)
  const projectsOpenRef = useRef(false)

  const openProjects = () => {
    projectsOpenRef.current = true
    setProjectsOpen(true)
  }

  const closeProjects = () => {
    projectsOpenRef.current = false
    setProjectsOpen(false)
  }

  const animateTo = (next: Stage) => {
    busyRef.current = true
    stageRef.current = next
    setStage(next)
    window.setTimeout(() => {
      busyRef.current = false
    }, TRANSITION_MS)
  }

  const setLockedBoth = (value: boolean) => {
    lockedRef.current = value
    // Applied synchronously (not just via the effect below) so that when a
    // wheel event releases the lock without calling preventDefault, the
    // browser's native scroll for that same event already sees the
    // updated overflow — React's state-driven re-render would land one
    // frame too late for that event's default action.
    document.body.style.overflow = value ? 'hidden' : ''
    setLocked(value)
  }

  // useLayoutEffect so the lock is applied before paint — avoids a flash of
  // native scrollability on first mount.
  useLayoutEffect(() => {
    document.body.style.overflow = locked ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [locked])

  useEffect(() => {
    // Single wheel-gesture step: while locked, one wheel-down advances the
    // curtain; a second wheel-down (once fully revealed) releases the lock
    // and nudges the page into normal scrolling. Wheel-up at the very top
    // after release re-locks and reverses the curtain.
    const handleDelta = (deltaY: number, event: Event) => {
      if (Math.abs(deltaY) < WHEEL_THRESHOLD) return
      // While the projects panel is open, let it scroll its own content
      // natively — the hero curtain shouldn't react to this gesture.
      if (projectsOpenRef.current) return

      if (busyRef.current) {
        if (lockedRef.current) event.preventDefault()
        return
      }

      if (lockedRef.current) {
        if (deltaY > 0) {
          event.preventDefault()
          if (stageRef.current === 'welcome') {
            animateTo('about')
          } else {
            // The browser resolves the wheel-scroll target via hit-testing
            // before dispatch, so un-hiding overflow mid-event doesn't let
            // this same event fall through natively — nudge it ourselves.
            setLockedBoth(false)
            window.scrollBy({ top: deltaY, behavior: 'auto' })
          }
        } else {
          event.preventDefault()
          if (stageRef.current === 'about') {
            animateTo('welcome')
          }
        }
        return
      }

      if (deltaY < 0 && window.scrollY <= 0) {
        event.preventDefault()
        setLockedBoth(true)
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
    window.scrollTo({ top: 0, behavior: 'auto' })
    setLockedBoth(true)
    if (stageRef.current !== 'welcome') animateTo('welcome')
  }

  const goAbout = () => {
    window.scrollTo({ top: 0, behavior: 'auto' })
    setLockedBoth(true)
    if (stageRef.current !== 'about') animateTo('about')
  }

  const goContact = () => {
    closeProjects()
    stageRef.current = 'about'
    setStage('about')
    setLockedBoth(false)
    requestAnimationFrame(() => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
    })
  }

  return (
    <HeroStageContext.Provider
      value={{
        stage,
        locked,
        projectsOpen,
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
