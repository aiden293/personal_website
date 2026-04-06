type Language = 'ko' | 'en';

const translations = {
  ko: {
    skills: '⭐ 기술 스택',
    description: '제가 보유한 기술과 경험을 정리했습니다.',
    frontend: '프론트엔드',
    backend: '백엔드',
    tools: '도구 & 라이브러리',
    design: '디자인',
    learning: '💡 지속적으로 배우고 있습니다!'
  },
  en: {
    skills: '⭐ Skills',
    description: 'Here are the technologies I have and my experience.',
    frontend: 'Frontend',
    backend: 'Backend',
    tools: 'Tools & Libraries',
    design: 'Design',
    learning: '💡 Continuously Learning!'
  }
};

export default function Skills({ language = 'ko' }: { language?: Language }) {
  const t = translations[language];
  const skills = [
    { category: t.frontend, items: [
      { name: 'React', level: 95 },
      { name: 'TypeScript', level: 90 },
      { name: 'CSS / Tailwind', level: 88 },
      { name: 'JavaScript', level: 92 }
    ]},
    { category: t.backend, items: [
      { name: 'Node.js', level: 80 },
      { name: 'Python', level: 85 },
      { name: 'MongoDB', level: 82 },
      { name: 'PostgreSQL', level: 78 }
    ]},
    { category: t.tools, items: [
      { name: 'Git / GitHub', level: 90 },
      { name: 'Vite', level: 88 },
      { name: 'Redux', level: 85 },
      { name: 'REST API', level: 89 }
    ]},
    { category: t.design, items: [
      { name: 'Figma', level: 80 },
      { name: 'UI/UX Design', level: 82 },
      { name: 'Responsive Design', level: 90 }
    ]}
  ];

  return (
    <section className="main-content">
      <h2 className="section-title">{t.skills}</h2>
      
      <p className="section-content" style={{ marginBottom: '20px' }}>
        {t.description}
      </p>

      {skills.map((skillGroup, idx) => (
        <div key={idx} style={{ marginBottom: '25px' }}>
          <h3 style={{ 
            fontSize: '14px', 
            color: '#0066cc', 
            marginBottom: '12px', 
            fontWeight: 'bold',
            paddingBottom: '8px',
            borderBottom: '2px solid #3399ff'
          }}>
            {skillGroup.category}
          </h3>
          
          <div className="skills-container">
            {skillGroup.items.map((skill, skillIdx) => (
              <div key={skillIdx} className="skill-item">
                <div className="skill-name">{skill.name}</div>
                <div className="skill-bar">
                  <div 
                    className="skill-fill" 
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
                <div style={{ fontSize: '10px', color: '#666', marginTop: '2px' }}>
                  {skill.level}%
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div style={{ 
        marginTop: '25px', 
        padding: '15px', 
        background: '#fff0f5', 
        border: '2px solid #ff6699', 
        borderRadius: '4px',
        textAlign: 'center'
      }}>
        <p style={{ fontSize: '12px', color: '#666', lineHeight: '1.6' }}>
          {t.learning}
          <br />
          {language === 'ko' ? '새로운 기술에 대한 관심이 많으며, 주기적으로 스킬을 업데이트하고 있습니다.' : 'I have a strong interest in new technologies and regularly update my skills.'}
        </p>
      </div>
    </section>
  );
}
