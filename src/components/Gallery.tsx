import { useState } from 'react';

type Language = 'ko' | 'en';

const translations = {
  ko: {
    gallery: '📷 갤러리',
    description: '일상과 특별한 순간들을 담았습니다.',
    close: '닫기',
    placeholder: '클릭한 사진입니다. 실제 이미지로 대체할 수 있습니다.',
    addPhoto: '💝 갤러리에 사진을 추가하려면 여기를 클릭하세요!'
  },
  en: {
    gallery: '📷 Gallery',
    description: 'Captured daily moments and special times.',
    close: 'Close',
    placeholder: 'This is the photo you clicked on. You can replace it with an actual image.',
    addPhoto: '💝 Click here to add a photo to your gallery!'
  }
};

export default function Gallery({ language = 'ko' }: { language?: Language }) {
  const t = translations[language];

  const photos = [
    { id: 1, emoji: '🌅', title: '아침 풍경' },
    { id: 2, emoji: '🎮', title: '게임 개발' },
    { id: 3, emoji: '💻', title: '코딩 세션' },
    { id: 4, emoji: '🏖️', title: '휴가' },
    { id: 5, emoji: '🎨', title: '디자인 작업' },
    { id: 6, emoji: '🍕', title: '맛있는 음식' },
    { id: 7, emoji: '📚', title: '책 읽기' },
    { id: 8, emoji: '🎬', title: '영화 감상' },
    { id: 9, emoji: '🎵', title: '음악 레슨' },
  ];

  return (
    <section className="main-content">
      <h2 className="section-title">{t.gallery}</h2>
      
      <p className="section-content" style={{ marginBottom: '20px' }}>
        {t.description}
      </p>

      <div className="gallery">
        {photos.map(photo => (
          <div 
            key={photo.id} 
            className="gallery-item"
            onClick={() => setSelectedPhoto(photo.id)}
            style={{ cursor: 'pointer' }}
            title={photo.title}
          >
            {photo.emoji}
          </div>
        ))}
      </div>

      {selectedPhoto && (
        <div style={{
          marginTop: '20px',
          padding: '15px',
          background: '#f9f9f9',
          border: '2px solid #3399ff',
          borderRadius: '4px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '60px', marginBottom: '10px' }}>
            {photos.find(p => p.id === selectedPhoto)?.emoji}
          </div>
          <p style={{ fontSize: '14px', fontWeight: 'bold', color: '#0066cc' }}>
            {photos.find(p => p.id === selectedPhoto)?.title}
          </p>
          <p style={{ fontSize: '12px', color: '#666', marginTop: '8px' }}>
            {t.placeholder}
          </p>
          <button 
            onClick={() => setSelectedPhoto(null)}
            style={{
              marginTop: '10px',
              padding: '6px 12px',
              background: '#0066cc',
              color: 'white',
              border: 'none',
              borderRadius: '3px',
              fontSize: '12px',
              cursor: 'pointer'
            }}
          >
            {t.close}
          </button>
        </div>
      )}

      <div style={{ 
        marginTop: '25px',
        padding: '15px',
        background: '#fff0f5',
        border: '2px solid #ff6699',
        borderRadius: '4px',
        textAlign: 'center'
      }}>
        <p style={{ fontSize: '12px', color: '#666' }}>
          {t.addPhoto}
        </p>
      </div>
    </section>
  );
}
