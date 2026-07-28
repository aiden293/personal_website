import './App.css'
import { HeroStageProvider } from './context/HeroStageContext'
import Navbar from './components/Navbar'
import HeroStage from './components/HeroStage'
import Contact from './components/Contact'

function App() {
  return (
    <HeroStageProvider>
      <Navbar />
      <HeroStage />
      <Contact />
    </HeroStageProvider>
  )
}

export default App
