# 🌈 내 미니홈피 (My Mini Homepage)

싸이월드(Cyworld) 미니홈피 스タ일의 개인 포트폴리오 웹사이트입니다. 프로필, 포트폴리오, 블로그, 갤러리, 음악 플레이어 등의 기능을 포함하고 있습니다.

## 🎨 특징

- **반응형 디자인**: 모바일부터 데스크톱까지 모든 기기에서 완벽하게 작동
- **복고 미감**: 싸이월드 미니홈피의 향수적인 디자인
- **다양한 섹션**:
  - 👤 프로필: 자기소개 및 기본 정보
  - 💼 포트폴리오: 진행한 프로젝트 소개
  - ⭐ 기술 스택: 보유한 기술과 숙련도
  - 📝 블로그: 개발 경험 및 지식 공유
  - 📷 갤러리: 사진 및 콘텐츠
  - 🎵 음악 플레이어: 재생목록 관리
  - 💌 연락처: 방문자와의 소통

## 🚀 시작하기

### 필수 요구사항
- Node.js 16+ 
- npm 또는 yarn

### 설치

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 결과물 미리보기
npm run preview
```

개발 서버가 실행되면 `http://localhost:5173`에서 웹사이트를 확인할 수 있습니다.

## 📁 프로젝트 구조

```
src/
├── App.tsx              # 메인 애플리케이션
├── main.tsx             # 엔트리 포인트
├── index.css            # 전역 스타일 (Cyworld 테마)
├── components/
│   ├── Profile.tsx      # 프로필 섹션
│   ├── Portfolio.tsx    # 포트폴리오 섹션
│   ├── Skills.tsx       # 기술 스택 섹션
│   ├── Blog.tsx         # 블로그 섹션
│   ├── Gallery.tsx      # 갤러리 섹션
│   ├── MusicPlayer.tsx  # 음악 플레이어
│   └── Contact.tsx      # 연락처 섹션
├── vite.config.ts       # Vite 설정
└── tsconfig.json        # TypeScript 설정
```

## 🛠 기술 스택

- **React 18**: 최신 React 버전으로 구축
- **TypeScript**: 타입 안정성을 위한 TS 사용
- **Vite**: 빠른 빌드 및 개발 경험
- **lucide-react**: 아이콘 라이브러리

## 🎯 커스터마이징

### 개인 정보 업데이트
`src/components/Profile.tsx`에서 다음을 수정하세요:
- 이름, 직업, 관심사
- 경력 정보
- 프로필 아이콘

### 포트폴리오 프로젝트 추가
`src/components/Portfolio.tsx`의 `projects` 배열에 새 프로젝트를 추가하세요.

### 스킬 정보 수정
`src/components/Skills.tsx`의 `skills` 배열에서 기술과 숙련도를 편집하세요.

### 블로그 포스트 추가
`src/components/Blog.tsx`의 `posts` 배열에 새 포스트를 추가하세요.

### 색상 테마 변경
`src/index.css`의 `:root` 섹션에서 CSS 변수를 수정하세요:
```css
:root {
  --primary-blue: #0066cc;
  --secondary-blue: #3399ff;
  --accent-color: #ff6699;
  /* ... 다른 색상 */
}
```

## 📱 반응형 디자인

- **데스크톱**: 풀 레이아웃 (사이드바 + 메인 콘텐츠)
- **태블릿/모바일**: 스택 레이아웃 (자동으로 조정됨)

## 🚀 배포

### Vercel로 배포
```bash
# Vercel CLI 설치
npm i -g vercel

# 배포
vercel
```

### Netlify로 배포
1. 프로젝트를 GitHub에 푸시
2. Netlify에서 새 사이트 생성
3. 빌드 설정: `npm run build`, 출력 폴더: `dist`

### GitHub Pages로 배포
`vite.config.ts`에 다음을 추가:
```typescript
export default defineConfig({
  base: '/website_2026/',
  // ...
})
```

## 🎨 디자인 노트

이 프로젝트는 싸이월드(Cyworld)의 미니홈피 디자인에서 영감을 받았습니다:
- 전형적인 파란색 테마
- 격자 레이아웃
- 향수적이고 따뜻한 분위기
- 초기 2000년대 웹 디자인 미학

## 📝 라이선스

이 프로젝트는 자유롭게 사용, 수정, 배포할 수 있습니다.

## 💡 앞으로의 개선사항

- [ ] 실시간 방명록 기능
- [ ] 동적 테마 선택기
- [ ] 실제 API 연동 (블로그, 갤러리)
- [ ] 다크 모드 지원
- [ ] 국제화 (i18n)
- [ ] 분석 통계 추가
- [ ] PWA 지원

## 🤝 기여

개선 아이디어가 있으신가요? 이슈를 등록하거나 풀 리퀘스트를 보내주세요!

---

**Made with ❤️ using React + Vite**
