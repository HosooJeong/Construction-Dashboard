# 🏗️ Construction Dashboard - 실시간 종합건설정보(RICS)

건설공사 품질관리를 위한 실시간 대시보드입니다.

## 📂 프로젝트 구조

### 🔥 모듈화된 버전 (권장)
```
📁 프로젝트 루트/
├── 📄 modular-index.html          # 모듈화된 메인 HTML
├── 📁 src/
│   ├── 📁 css/                    # CSS 모듈들
│   │   ├── 📄 base.css           # 기본 스타일 및 레이아웃
│   │   ├── 📄 components.css     # 컴포넌트별 스타일
│   │   ├── 📄 tables-modals.css  # 테이블 및 모달 스타일
│   │   └── 📄 responsive.css     # 반응형 디자인
│   └── 📁 js/                     # JavaScript 모듈들
│       ├── 📄 data.js            # 데이터 관리
│       ├── 📄 charts.js          # 차트 및 렌더링
│       ├── 📄 modals.js          # 모달 관리
│       ├── 📄 utils.js           # 유틸리티 및 챗봇
│       └── 📄 main.js            # 메인 애플리케이션
└── 📄 index.html                  # 기존 단일 파일 (레거시)
```

## 🚀 사용 방법

### 모듈화된 버전 실행
```bash
# 로컬 서버 실행 (ES6 모듈 사용을 위해 필요)
python -m http.server 8000
# 또는
npx http-server

# 브라우저에서 접속
http://localhost:8000/modular-index.html
```

### 기존 버전 실행
```bash
# 브라우저에서 직접 열기 가능
open index.html
```

## ✨ 주요 기능

### 📊 대시보드 위젯
- **품질등급 현황**: 권역별 품질등급 통계 차트
- **구조물 현황**: 교량, 옹벽, 지하차도 등 구조물 진행현황
- **품질관리자 배치**: 등급별 품질관리자 배치현황
- **현장 관리**: 레미콘 타설, 도로 포장, 다짐 현장 실시간 정보
- **AI 챗봇**: 품질관리 관련 질의응답

### 🎛️ 인터랙티브 기능
- **권역별 필터링**: 전국/수도권/강원권/충청권/영남권/호남권/제주권
- **드래그 앤 드롭**: 위젯 위치 자유 변경
- **실시간 날씨**: 현장별 기상 정보 및 작업 적합성 판단
- **모달 팝업**: 상세 정보 및 설정
- **문자 발송**: SMS 알림 기능

## 🔧 기술 스택

### Frontend
- **HTML5**: 시맨틱 마크업
- **CSS3**: Flexbox, Grid, 반응형 디자인
- **JavaScript ES6+**: 모듈 시스템, 클래스, async/await
- **ES6 Modules**: 코드 분할 및 재사용성

### 브라우저 지원
- Chrome 61+
- Firefox 60+
- Safari 10.1+
- Edge 16+

## 📈 모듈화 장점

### 🎯 기존 문제점
- ❌ 135KB 단일 HTML 파일
- ❌ 3000+ 줄 JavaScript 코드
- ❌ 유지보수의 어려움
- ❌ 코드 재사용 불가

### ✅ 모듈화 이후
- ✅ 기능별 파일 분리
- ✅ 재사용 가능한 모듈
- ✅ 팀 개발 협업 용이
- ✅ 버그 추적 및 수정 간편
- ✅ 성능 최적화 가능

## 🚧 개발 가이드

### 새 기능 추가하기
```javascript
// 1. 데이터 추가 (src/js/data.js)
export const newFeatureData = { ... };

// 2. 렌더링 함수 추가 (src/js/charts.js)
export function renderNewFeature() { ... }

// 3. 메인에서 초기화 (src/js/main.js)
import { renderNewFeature } from './charts.js';
```

### CSS 스타일 추가하기
```css
/* 컴포넌트별로 적절한 CSS 파일에 추가 */
/* src/css/components.css - 새 컴포넌트 */
/* src/css/base.css - 전역 스타일 */
/* src/css/responsive.css - 반응형 */
```

## 🎨 커스터마이징

### 테마 변경
```css
/* src/css/base.css에서 CSS 변수 수정 */
:root {
  --primary-color: #3498db;
  --secondary-color: #2c3e50;
  --success-color: #27ae60;
  --warning-color: #f39c12;
  --danger-color: #e74c3c;
}
```

### 데이터 소스 변경
```javascript
// src/js/data.js에서 데이터 구조 수정
// 실제 API 연동 시 fetch 함수로 대체
export async function fetchQualityData() {
  const response = await fetch('/api/quality');
  return response.json();
}
```

## 📱 반응형 지원

- **모바일**: 320px ~ 768px
- **태블릿**: 768px ~ 1024px  
- **데스크톱**: 1024px+
- **대형 화면**: 1440px+
- **4K**: 1920px+

## 🔒 보안 고려사항

- XSS 방지를 위한 innerHTML 대신 textContent 사용
- HTTPS 환경에서 실행 권장
- API 키 환경변수 관리

## 🐛 알려진 이슈

- ES6 모듈 사용으로 로컬 파일 직접 실행 불가 (서버 필요)
- IE 브라우저 미지원

## 📝 업데이트 로그

### v2.0.0 (모듈화 버전)
- ✨ 코드 모듈화 완료
- ✨ ES6 모듈 시스템 도입
- ✨ 컴포넌트별 파일 분리
- ✨ 개발자 경험 개선

### v1.0.0 (기존 버전)
- ✨ 기본 대시보드 기능
- ✨ 실시간 데이터 표시
- ✨ 권역별 필터링

## 👥 기여하기

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📞 지원

문의사항이나 버그 신고는 GitHub Issues를 이용해주세요.

---

**⚡ 성능 최적화와 유지보수성을 위해 모듈화된 버전 사용을 권장합니다!**
