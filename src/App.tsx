import './App.css'
import { HeroStageProvider } from './context/HeroStageContext'
import Navbar from './components/Navbar'
import HeroStage from './components/HeroStage'
import ProjectsPanel from './components/ProjectsPanel'
import Skills from './components/Skills'
import Contact from './components/Contact'

function App() {
  return (
    <HeroStageProvider>
      <Navbar />
      <HeroStage />
      {/* Rendered outside #hero-stage so its own position:fixed slide isn't
          affected by the containing-block quirk that a transform on an
          ancestor would create (hero-stage gets pushed left when this
          panel opens — see .hero-stage--pushed in App.css). */}
      <ProjectsPanel />
      <Skills />
      <Contact />
    </HeroStageProvider>
  )
}

export default App
