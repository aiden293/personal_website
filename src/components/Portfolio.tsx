type Language = 'ko' | 'en';

const translations = {
  ko: {
    portfolio: '💼 포트폴리오',
    description: '완성한 프로젝트들을 소개합니다. 각 프로젝트는 저의 기술 성장 과정을 보여줍니다.',
    moreLink: '더보기'
  },
  en: {
    portfolio: '💼 Portfolio',
    description: 'Here are the projects I\'ve completed. Each project shows my technical growth.',
    moreLink: 'View More'
  }
};

export default function Portfolio({ language = 'ko' }: { language?: Language }) {
  const t = translations[language];
  const projects = [
    {
      id: 1,
      title: '소셜 미디어 앱',
      description: 'React + Firebase로 만든 실시간 채팅 앱',
      tech: 'React, Firebase, CSS'
    },
    {
      id: 2,
      title: '할일 관리 앱',
      description: 'TypeScript와 Zustand로 상태 관리',
      tech: 'React, TypeScript, Zustand'
    },
    {
      id: 3,
      title: '날씨 대시보드',
      description: 'OpenWeather API를 활용한 날씨 앱',
      tech: 'React, API, Chart.js'
    },
    {
      id: 4,
      title: '포트폴리오 사이트',
      description: '반응형 개인 포트폴리오 웹사이트',
      tech: 'React, Tailwind, Vite'
    },
    {
      id: 5,
      title: '게임 개발',
      description: 'Canvas API로 만든 간단한 게임',
      tech: 'JavaScript, Canvas'
    },
    {
      id: 6,
      title: 'E-커머스 플랫폼',
      description: '결제 시스템이 포함된 쇼핑몰',
      tech: 'React, Node.js, MongoDB'
    }
  ];

  return (
    <section className="main-content">
      <h2 className="section-title">{t.portfolio}</h2>
      
      <p className="section-content">
        {t.description}
      </p>

      <div className="portfolio-grid">
        {projects.map(project => (
          <div key={project.id} className="portfolio-item">
            <div className="portfolio-title">🎨 {project.title}</div>
            <div className="portfolio-desc">{project.description}</div>
            <div style={{ fontSize: '10px', color: '#0066cc', marginTop: '8px', fontWeight: 'bold' }}>
              {project.tech}
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '25px', padding: '15px', background: '#f0f8ff', border: '1px solid #3399ff', borderRadius: '4px' }}>
        <h3 style={{ color: '#0066cc', marginBottom: '8px' }}>🔗 {language === 'ko' ? '더보기' : 'More'}</h3>
        <p style={{ fontSize: '12px' }}>
          <a href="#" style={{ color: '#0066cc', textDecoration: 'underline' }}>
            {language === 'ko' ? 'GitHub 프로필 방문 →' : 'Visit GitHub Profile →'}
          </a>
        </p>
      </div>
    </section>
  );
}
