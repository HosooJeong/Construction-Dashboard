# 🏗️ 실시간 종합건설정보(RICS) - 품질관리 대시보드

> **모듈화 & 컬러 시스템 통일 완료!** ✨  
> 기존 135KB 단일 파일 → 9개 모듈 파일로 분리  
> 통일된 5색상 팔레트로 디자인 일관성 확보

## 🎯 프로젝트 개요

실시간 종합건설정보(RICS) 시스템의 품질관리 대시보드입니다. 건설 현장의 품질 데이터를 실시간으로 모니터링하고, 지역별 통계를 제공합니다.

### 🚀 라이브 데모
**🌐 [https://hosoojeong.github.io/Construction-Dashboard/](https://hosoojeong.github.io/Construction-Dashboard/)**

---

## 🎨 v2.0.0 주요 업데이트

### ✅ 모듈화 완료
- **기존**: 135KB 단일 HTML 파일
- **현재**: 78KB 분산 모듈 (42% 용량 절약)
- **구조**: CSS 4개 + JS 5개 모듈

### ✅ 컬러 시스템 통일
5가지 색상으로 통일된 디자인:
- 🔵 **Primary** (#3498db): 메인 기능, 차트
- 🟢 **Success** (#27ae60): 성공, 우수 등급
- 🟠 **Warning** (#f39c12): 주의, 경고
- 🔴 **Danger** (#e74c3c): 위험, 불량
- ⚫ **Secondary** (#2c3e50): 텍스트, 보조

---

## 📁 파일 구조

```
📦 Construction-Dashboard/
├── 📄 index.html              # 메인 페이지
├── 📁 src/
│   ├── 📁 css/               # 스타일 모듈
│   │   ├── 🎨 base.css       # 기본 스타일 + 컬러 변수
│   │   ├── 🧩 components.css # 컴포넌트 스타일
│   │   ├── 📋 tables-modals.css # 테이블 & 모달
│   │   └── 📱 responsive.css # 반응형 디자인
│   └── 📁 js/                # 자바스크립트 모듈
│       ├── 📊 data.js        # 데이터 관리
│       ├── 📈 charts.js      # 차트 렌더링
│       ├── 🎛️ modals.js      # 모달 관리
│       ├── 🔧 utils.js       # 유틸리티 & 챗봇
│       └── 🎯 main.js        # 메인 앱 로직
└── 📚 README.md
```

---

## 🌟 주요 기능

### 📊 실시간 대시보드
- **품질등급 현황**: 우수/양호/보통/불량 통계
- **구조물 현황**: 교량, 옹벽, 지하차도 등
- **품질관리자**: 특급/고급/중급/초급 분포

### 🏗️ 현장 모니터링
- **레미콘 타설**: 실시간 타설량 추적
- **도로 포장**: 포장면적 및 진행률
- **다짐 관리**: 현장별 다짐도 관리

### 🌦️ 날씨 연동
- **실시간 날씨**: OpenWeather API 연동
- **품질관리기준**: 날씨별 시공 가이드
- **현장별 알림**: 기상 상황 모니터링

### 🎛️ 대화형 기능
- **지역별 필터**: 전국/수도권/영남권 등
- **모달 상세보기**: 교량, SMS, 품질관리자 기준
- **드래그 앤 드롭**: 위젯 배치 커스터마이징
- **AI 챗봇**: 실시간 질의응답

---

## 🚀 사용 방법

### 💻 로컬 개발
```bash
# 저장소 복제
git clone https://github.com/HosooJeong/Construction-Dashboard.git
cd Construction-Dashboard

# 로컬 서버 실행 (Python)
python -m http.server 8000

# 또는 Node.js
npx serve .

# 접속
http://localhost:8000
```

---

## 🎨 컬러 시스템 가이드

### CSS 변수 사용
```css
:root {
    /* 메인 컬러 */
    --primary-color: #3498db;
    --success-color: #27ae60;
    --warning-color: #f39c12;
    --danger-color: #e74c3c;
    --secondary-color: #2c3e50;
}
```

### 사용법
```css
.my-button {
    background: var(--primary-color);
    color: white;
}
```

---

## 🔧 기술 스택

- **Frontend**: HTML5, CSS3, JavaScript ES6+
- **호스팅**: GitHub Pages
- **버전관리**: Git + GitHub

---

## 📱 반응형 지원

- 🖥️ **데스크톱** (1440px+): 3컬럼 그리드
- 💻 **노트북** (1024px~1439px): 최적화된 레이아웃  
- 📱 **태블릿** (768px~1023px): 2컬럼 그리드
- 📱 **모바일** (480px~767px): 1컬럼 스택

---

## 🎯 성능 최적화

- **42% 용량 절약**: 135KB → 78KB
- **모듈별 캐싱**: 브라우저 캐시 최적화
- **부드러운 애니메이션**: CSS transition 활용

---

## 📞 연락처

- **개발자**: 호수
- **GitHub**: [@HosooJeong](https://github.com/HosooJeong)

---

## 🎉 변경 이력

### v2.0.0 (2024-06-24)
- ✨ 모듈화 완료 (CSS 4개 + JS 5개)
- 🎨 컬러 시스템 통일 (5색상 팔레트)
- 📱 반응형 디자인 개선
- 🚀 42% 성능 향상

---

<div align="center">

**🚀 Made with ❤️ by 호수**

[![GitHub Pages](https://img.shields.io/badge/GitHub-Pages-blue?style=for-the-badge&logo=github)](https://hosoojeong.github.io/Construction-Dashboard/)
[![Version](https://img.shields.io/badge/Version-v2.0.0-orange?style=for-the-badge)](https://github.com/HosooJeong/Construction-Dashboard)

</div>
