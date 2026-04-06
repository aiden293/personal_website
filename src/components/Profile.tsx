type Language = 'ko' | 'en';

const translations = {
  ko: {
    profile: '👋 프로필',
    basicInfo: '📌 기본 정보',
    name: '이름:',
    job: '직업:',
    interests: '관심사:',
    motto: '좌우명:',
    career: '🎓 경력',
  },
  en: {
    profile: '👋 Profile',
    basicInfo: '📌 Basic Information',
    name: 'Name:',
    job: 'Job:',
    interests: 'Interests:',
    motto: 'Motto:',
    career: '🎓 Career',
  }
};

export default function Profile({ language = 'ko' }: { language?: Language }) {
  const t = translations[language];
  return (
    <section className="main-content">
      <h2 className="section-title">{t.profile}</h2>
      
      <div className="profile">
        <div className="profile-image">👨‍💻</div>
        <div className="profile-info">
          <div className="profile-name">{language === 'ko' ? '당신의 이름' : 'Your Name'}</div>
          <div className="profile-bio">
            {language === 'ko' ? (
              <>
                안녕하세요! 저는 웹 개발자입니다.
                <br />
                React, TypeScript, 그리고 UI/UX 디자인에 관심이 있습니다.
                <br />
                <br />
                항상 새로운 기술을 배우고, 창의적인 프로젝트에 도전하는 것을 즐깁니다.
              </>
            ) : (
              <>
                Hello! I'm a web developer.
                <br />
                I'm interested in React, TypeScript, and UI/UX design.
                <br />
                <br />
                I enjoy learning new technologies and taking on creative projects.
              </>
            )}
          </div>
        </div>
      </div>

      <div className="section-content">
        <h3 style={{ color: '#0066cc', marginBottom: '10px', fontSize: '14px' }}>{t.basicInfo}</h3>
        <p><strong>{t.name}</strong> {language === 'ko' ? '당신의 이름' : 'Your Name'}</p>
        <p><strong>{t.job}</strong> {language === 'ko' ? '개발자 / 디자이너' : 'Developer / Designer'}</p>
        <p><strong>{t.interests}</strong> {language === 'ko' ? '웹 개발, 프론트엔드, UX 디자인' : 'Web Development, Frontend, UX Design'}</p>
        <p><strong>{t.motto}</strong> {language === 'ko' ? '"코드는 시, 디자인은 예술"' : '"Code is Poetry, Design is Art"'}</p>
      </div>

      <div style={{ marginTop: '20px' }}>
        <h3 style={{ color: '#0066cc', marginBottom: '10px', fontSize: '14px' }}>{t.career}</h3>
        <ul style={{ fontSize: '12px', lineHeight: '1.8' }}>
          <li>{language === 'ko' ? '📚 서울대학교 컴퓨터공학과 (2020-2024)' : '📚 Seoul University Computer Science (2020-2024)'}</li>
          <li>{language === 'ko' ? '💼 스타트업 프론트엔드 개발자 (2023-현재)' : '💼 Startup Frontend Developer (2023-Present)'}</li>
          <li>{language === 'ko' ? '🏆 여러 해커톤 및 공모전 수상' : '🏆 Multiple Hackathon & Competition Awards'}</li>
        </ul>
      </div>
    </section>
  );
}
