import { useState } from 'react';
import { Heart, Mail, Music, Image, FileText, Code, User, Globe, Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import Profile from './components/Profile';
import Portfolio from './components/Portfolio';
import Skills from './components/Skills';
import Blog from './components/Blog';
import Gallery from './components/Gallery';
import MusicPlayer from './components/MusicPlayer';
import Contact from './components/Contact';

type Section = 'profile' | 'portfolio' | 'skills' | 'blog' | 'gallery' | 'music' | 'contact';
type Language = 'ko' | 'en';

const translations = {
  ko: {
    title: '✨ 내 미니홈피 ✨',
    subtitle: '포트폴리오 & 일상의 공간',
    profile: '프로필',
    portfolio: '포트폴리오',
    skills: '스킬',
    blog: '블로그',
    gallery: '갤러리',
    music: '음악',
    contact: '연락',
    quickMenu: '📍 빠른 메뉴',
    info: '💬 정보',
    editProfile: '프로필 수정',
    decorateRoom: '방 꾸미기',
    notice: '공지사항',
    help: '도움말',
    footer: '💝 이 미니홈피는 React + Vite로 만들었습니다 💝'
  },
  en: {
    title: '✨ My Mini Homepage ✨',
    subtitle: 'Portfolio & Daily Space',
    profile: 'Profile',
    portfolio: 'Portfolio',
    skills: 'Skills',
    blog: 'Blog',
    gallery: 'Gallery',
    music: 'Music',
    contact: 'Contact',
    quickMenu: '📍 Quick Menu',
    info: '💬 Info',
    editProfile: 'Edit Profile',
    decorateRoom: 'Decorate Room',
    notice: 'Notice',
    help: 'Help',
    footer: '💝 Made with React + Vite 💝'
  }
};

const playlist = [
  { id: 1, title: 'Beautiful Morning', artist: 'Indie Artists' },
  { id: 2, title: 'Sunset Dreams', artist: 'Lo-Fi Beats' },
  { id: 3, title: 'Digital Love', artist: 'Synthwave Band' },
  { id: 4, title: 'Forest Walk', artist: 'Nature Sounds' },
  { id: 5, title: 'City Lights', artist: 'Jazz Trio' },
  { id: 6, title: 'Ocean Waves', artist: 'Ambient Music' },
];

function App() {
  const [activeSection, setActiveSection] = useState<Section>('profile');
  const [language, setLanguage] = useState<Language>('ko');
  const t = translations[language];

  // Music player state
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handlePrevious = () => {
    setCurrentTrack(prev => (prev === 0 ? playlist.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentTrack(prev => (prev === playlist.length - 1 ? 0 : prev + 1));
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return <Profile language={language} />;
      case 'portfolio':
        return <Portfolio language={language} />;
      case 'skills':
        return <Skills language={language} />;
      case 'blog':
        return <Blog language={language} />;
      case 'gallery':
        return <Gallery language={language} />;
      case 'music':
        return <MusicPlayer language={language} musicState={{ isPlaying, currentTrack, playlist }} musicControls={{ setIsPlaying, setCurrentTrack }} />;
      case 'contact':
        return <Contact language={language} />;
      default:
        return <Profile language={language} />;
    }
  };

  return (
    <div className="miniroom">
      <header className="header">
        <button 
          onClick={() => setLanguage(language === 'ko' ? 'en' : 'ko')}
          style={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            background: 'rgba(255, 255, 255, 0.3)',
            border: '2px solid white',
            color: 'white',
            padding: '6px 12px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
          }}
        >
          <Globe size={14} />
          {language === 'ko' ? 'EN' : '한'}
        </button>
        <h1>{t.title}</h1>
        <p>{t.subtitle}</p>
      </header>

      {/* Mini Music Player */}
      <div style={{
        background: '#f0f8ff',
        borderBottom: '2px solid #0066cc',
        padding: '8px 15px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '15px'
      }}>
        {/* Now Playing Info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: '11px', color: '#0066cc', fontWeight: 'bold', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            🎵 {playlist[currentTrack].title}
          </div>
          <div style={{ fontSize: '10px', color: '#666', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {playlist[currentTrack].artist}
          </div>
        </div>

        {/* Player Controls */}
        <div style={{
          display: 'flex',
          gap: '4px'
        }}>
          <button
            onClick={handlePrevious}
            style={{
              background: '#0066cc',
              color: 'white',
              border: 'none',
              padding: '5px 8px',
              borderRadius: '3px',
              cursor: 'pointer',
              fontSize: '11px',
              display: 'flex',
              alignItems: 'center',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#3399ff'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = '#0066cc'; }}
            title={language === 'ko' ? '이전곡' : 'Previous'}
          >
            <SkipBack size={12} />
          </button>

          <button
            onClick={handlePlayPause}
            style={{
              background: isPlaying ? '#3399ff' : '#0066cc',
              color: 'white',
              border: 'none',
              padding: '5px 8px',
              borderRadius: '3px',
              cursor: 'pointer',
              fontSize: '11px',
              display: 'flex',
              alignItems: 'center',
              minWidth: '30px',
              justifyContent: 'center',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.8'; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
            title={isPlaying ? (language === 'ko' ? '일시정지' : 'Pause') : (language === 'ko' ? '재생' : 'Play')}
          >
            {isPlaying ? <Pause size={12} /> : <Play size={12} />}
          </button>

          <button
            onClick={handleNext}
            style={{
              background: '#0066cc',
              color: 'white',
              border: 'none',
              padding: '5px 8px',
              borderRadius: '3px',
              cursor: 'pointer',
              fontSize: '11px',
              display: 'flex',
              alignItems: 'center',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#3399ff'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = '#0066cc'; }}
            title={language === 'ko' ? '다음곡' : 'Next'}
          >
            <SkipForward size={12} />
          </button>
        </div>

        {/* Status */}
        <div style={{
          fontSize: '11px',
          color: isPlaying ? '#0066cc' : '#999',
          fontWeight: 'bold',
          minWidth: '50px',
          textAlign: 'right'
        }}>
          {isPlaying ? '▶' : '⏸'}
        </div>
      </div>

      <nav className="nav">
        <button
          className={activeSection === 'profile' ? 'active' : ''}
          onClick={() => setActiveSection('profile')}
        >
          <User size={16} style={{ display: 'inline', marginRight: '4px' }} />
          {t.profile}
        </button>
        <button
          className={activeSection === 'portfolio' ? 'active' : ''}
          onClick={() => setActiveSection('portfolio')}
        >
          <Code size={16} style={{ display: 'inline', marginRight: '4px' }} />
          {t.portfolio}
        </button>
        <button
          className={activeSection === 'skills' ? 'active' : ''}
          onClick={() => setActiveSection('skills')}
        >
          <Heart size={16} style={{ display: 'inline', marginRight: '4px' }} />
          {t.skills}
        </button>
        <button
          className={activeSection === 'blog' ? 'active' : ''}
          onClick={() => setActiveSection('blog')}
        >
          <FileText size={16} style={{ display: 'inline', marginRight: '4px' }} />
          {t.blog}
        </button>
        <button
          className={activeSection === 'gallery' ? 'active' : ''}
          onClick={() => setActiveSection('gallery')}
        >
          <Image size={16} style={{ display: 'inline', marginRight: '4px' }} />
          {t.gallery}
        </button>
        <button
          className={activeSection === 'contact' ? 'active' : ''}
          onClick={() => setActiveSection('contact')}
        >
          <Mail size={16} style={{ display: 'inline', marginRight: '4px' }} />
          {t.contact}
        </button>
        <button
          className={activeSection === 'music' ? 'active' : ''}
          onClick={() => setActiveSection('music')}
        >
          <Music size={16} style={{ display: 'inline', marginRight: '4px' }} />
          {t.music}
        </button>
      </nav>

      <div className="content">
        <aside className="sidebar">
          <h3>{t.quickMenu}</h3>
          <ul>
            <li><a onClick={() => setActiveSection('profile')}>{t.profile}</a></li>
            <li><a onClick={() => setActiveSection('portfolio')}>{t.portfolio}</a></li>
            <li><a onClick={() => setActiveSection('skills')}>{t.skills}</a></li>
            <li><a onClick={() => setActiveSection('blog')}>{t.blog}</a></li>
          </ul>
          
          <h3 style={{ marginTop: '25px' }}>{t.info}</h3>
          <ul>
            <li><a>{t.editProfile}</a></li>
            <li><a>{t.decorateRoom}</a></li>
            <li><a>{t.notice}</a></li>
            <li><a>{t.help}</a></li>
          </ul>
        </aside>

        <main className="main-panel">
          {renderContent()}
        </main>
      </div>

      <footer className="footer">
        <div style={{ textAlign: 'center', marginTop: '10px' }}>
          <p style={{ margin: '4px 0' }}>{t.footer}</p>
          <p style={{ margin: '4px 0' }}>© 2026 All rights reserved</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
