type Language = 'ko' | 'en';

const translations = {
  ko: {
    blog: '📝 블로그',
    description: '개발 경험과 배운 내용을 기록하는 공간입니다.',
    allPosts: '모든 글 보기 →',
    more: '더보기 →'
  },
  en: {
    blog: '📝 Blog',
    description: 'A space where I record my development experiences and learnings.',
    allPosts: 'View All Posts →',
    more: 'Read More →'
  }
};

export default function Blog({ language = 'ko' }: { language?: Language }) {
  const t = translations[language];
  const posts = [
    {
      id: 1,
      title: 'React Hooks 완벽 가이드',
      date: '2025-12-15',
      excerpt: 'useState, useEffect, useContext를 비롯한 React Hooks의 사용법과 최적화 팁을 소개합니다.',
      category: '개발'
    },
    {
      id: 2,
      title: 'TypeScript로 더 안전한 코드 작성하기',
      date: '2025-12-10',
      excerpt: '타입 시스템의 장점과 실제 프로젝트에서 활용하는 방법을 설명합니다.',
      category: '개발'
    },
    {
      id: 3,
      title: '웹 성능 최적화의 모든 것',
      date: '2025-12-05',
      excerpt: '이미지 최적화, 코드 스플리팅, 캐싱 전략 등 웹 성능을 개선하는 방법들을 다룹니다.',
      category: '최적화'
    },
    {
      id: 4,
      title: 'CSS-in-JS vs Tailwind: 언제 어떤 것을 사용할까?',
      date: '2025-11-28',
      excerpt: '각 스타일링 방식의 장단점을 비교하고 프로젝트에 맞는 선택을 돕습니다.',
      category: '스타일링'
    },
    {
      id: 5,
      title: 'Node.js로 REST API 만들기',
      date: '2025-11-20',
      excerpt: 'Express.js를 사용하여 확장 가능한 REST API를 구축하는 방법을 배웁니다.',
      category: '백엔드'
    },
    {
      id: 6,
      title: '2026년 웹 개발 트렌드 예측',
      date: '2025-11-15',
      excerpt: '올해 주목할 만한 웹 기술 트렌드와 개발자가 배워야 할 것들을 소개합니다.',
      category: '트렌드'
    }
  ];

  return (
    <section className="main-content">
      <h2 className="section-title">{t.blog}</h2>
      
      <p className="section-content" style={{ marginBottom: '20px' }}>
        {t.description}
      </p>

      <div>
        {posts.map(post => (
          <article key={post.id} className="post">
            <div className="post-title">📌 {post.title}</div>
            <div className="post-date">{post.date} · {post.category}</div>
            <div className="post-excerpt">
              {post.excerpt}
            </div>
            <div style={{ marginTop: '8px' }}>
              <a href="#" style={{ 
                fontSize: '11px',
                color: '#0066cc',
                textDecoration: 'none',
                fontWeight: 'bold'
              }}>
                {t.more}
              </a>
            </div>
          </article>
        ))}
      </div>

      <div style={{ 
        marginTop: '20px',
        textAlign: 'center',
        padding: '15px',
        background: '#f0f8ff',
        border: '1px solid #3399ff',
        borderRadius: '4px'
      }}>
        <a href="#" style={{ 
          color: '#0066cc',
          textDecoration: 'none',
          fontSize: '12px',
          fontWeight: 'bold'
        }}>
          {t.allPosts}
        </a>
      </div>
    </section>
  );
}
