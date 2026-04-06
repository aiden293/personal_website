import { useState } from 'react';
import { Mail, Github, Linkedin, Twitter } from 'lucide-react';

type Language = 'ko' | 'en';

const translations = {
  ko: {
    contact: '💌 연락처',
    description: '저와 연락하고 싶으신 분은 아래 양식을 작성해주세요.',
    success: '✅ 메시지가 전송되었습니다! 감사합니다.',
    name: '이름',
    email: '이메일',
    message: '메시지',
    nameLabel: '이름 *',
    emailLabel: '이메일 *',
    messageLabel: '메시지 *',
    namePlaceholder: '당신의 이름',
    emailPlaceholder: 'your.email@example.com',
    messagePlaceholder: '전하고 싶은 메시지를 작성해주세요...',
    sendButton: '📬 메시지 보내기',
    emailSection: '이메일',
    githubSection: 'GitHub',
    linkedinSection: 'LinkedIn',
    twitterSection: 'Twitter',
    hint: '💡 실제 이메일 기능을 원하시면 백엔드를 연동할 수 있습니다.'
  },
  en: {
    contact: '💌 Contact',
    description: 'If you want to contact me, please fill out the form below.',
    success: '✅ Message sent! Thank you.',
    name: 'Name',
    email: 'Email',
    message: 'Message',
    nameLabel: 'Name *',
    emailLabel: 'Email *',
    messageLabel: 'Message *',
    namePlaceholder: 'Your Name',
    emailPlaceholder: 'your.email@example.com',
    messagePlaceholder: 'Write your message here...',
    sendButton: '📬 Send Message',
    emailSection: 'Email',
    githubSection: 'GitHub',
    linkedinSection: 'LinkedIn',
    twitterSection: 'Twitter',
    hint: '💡 You can integrate actual email functionality with a backend.'
  }
};

export default function Contact({ language = 'ko' }: { language?: Language }) {
  const t = translations[language];
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <section className="main-content">
      <h2 className="section-title">{t.contact}</h2>
      
      <p className="section-content" style={{ marginBottom: '20px' }}>
        {t.description}
      </p>

      {submitted && (
        <div style={{
          padding: '12px',
          background: '#e8f5e9',
          border: '2px solid #4caf50',
          borderRadius: '4px',
          marginBottom: '20px',
          color: '#2e7d32',
          fontSize: '12px',
          fontWeight: 'bold'
        }}>
          {t.success}
        </div>
      )}

      <div className="contact-form">
        <div className="form-group">
          <label>{t.nameLabel}</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder={t.namePlaceholder}
          />
        </div>

        <div className="form-group">
          <label>{t.emailLabel}</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={t.emailPlaceholder}
          />
        </div>

        <div className="form-group">
          <label>{t.messageLabel}</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder={t.messagePlaceholder}
          />
        </div>

        <button 
          onClick={handleSubmit}
          className="btn"
          style={{
            width: '100%',
            padding: '10px'
          }}
        >
          {t.sendButton}
        </button>
      </div>

      <div style={{ marginTop: '30px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
        <div style={{
          padding: '15px',
          background: '#f0f8ff',
          border: '1px solid #3399ff',
          borderRadius: '4px',
          textAlign: 'center'
        }}>
          <div style={{ marginBottom: '10px' }}>
            <Mail size={24} style={{ color: '#0066cc', margin: '0 auto' }} />
          </div>
          <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#0066cc' }}>{t.emailSection}</div>
          <div style={{ fontSize: '11px', color: '#666', marginTop: '5px' }}>
            your.email@gmail.com
          </div>
        </div>

        <div style={{
          padding: '15px',
          background: '#fff0f5',
          border: '1px solid #ff6699',
          borderRadius: '4px',
          textAlign: 'center'
        }}>
          <div style={{ marginBottom: '10px' }}>
            <Github size={24} style={{ color: '#ff6699', margin: '0 auto' }} />
          </div>
          <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#ff6699' }}>{t.githubSection}</div>
          <div style={{ fontSize: '11px', color: '#666', marginTop: '5px' }}>
            github.com/yourprofile
          </div>
        </div>
      </div>

      <div style={{ marginTop: '15px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
        <div style={{
          padding: '15px',
          background: '#f5f0ff',
          border: '1px solid #9966ff',
          borderRadius: '4px',
          textAlign: 'center'
        }}>
          <div style={{ marginBottom: '10px' }}>
            <Linkedin size={24} style={{ color: '#0066cc', margin: '0 auto' }} />
          </div>
          <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#0066cc' }}>{t.linkedinSection}</div>
          <div style={{ fontSize: '11px', color: '#666', marginTop: '5px' }}>
            linkedin.com/in/yourprofile
          </div>
        </div>

        <div style={{
          padding: '15px',
          background: '#fffaf0',
          border: '1px solid #ff9933',
          borderRadius: '4px',
          textAlign: 'center'
        }}>
          <div style={{ marginBottom: '10px' }}>
            <Twitter size={24} style={{ color: '#1da1f2', margin: '0 auto' }} />
          </div>
          <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#1da1f2' }}>{t.twitterSection}</div>
          <div style={{ fontSize: '11px', color: '#666', marginTop: '5px' }}>
            @yourhandle
          </div>
        </div>
      </div>

      <div style={{ 
        marginTop: '20px',
        padding: '12px',
        background: '#f0f8ff',
        border: '1px solid #3399ff',
        borderRadius: '4px',
        fontSize: '12px',
        color: '#666',
        textAlign: 'center'
      }}>
        {t.hint}
      </div>
    </section>
  );
}
