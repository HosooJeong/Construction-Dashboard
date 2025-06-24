// 대시보드 데이터 모듈

// 품질등급 현황 데이터 - 색상 코드 수정
export const qualityData = {
    '전국': [
        { label: '우수', count: 28, color: 'excellent' },
        { label: '양호', count: 45, color: 'good' },
        { label: '보통', count: 32, color: 'warning' },
        { label: '미흡', count: 18, color: 'poor' },
        { label: '불량', count: 8, color: 'poor' }
    ],
    '수도권': [
        { label: '우수', count: 12, color: 'excellent' },
        { label: '양호', count: 18, color: 'good' },
        { label: '보통', count: 11, color: 'warning' },
        { label: '미흡', count: 6, color: 'poor' },
        { label: '불량', count: 3, color: 'poor' }
    ],
    '강원권': [
        { label: '우수', count: 4, color: 'excellent' },
        { label: '양호', count: 6, color: 'good' },
        { label: '보통', count: 3, color: 'warning' },
        { label: '미흡', count: 2, color: 'poor' },
        { label: '불량', count: 1, color: 'poor' }
    ],
    '충청권': [
        { label: '우수', count: 7, color: 'excellent' },
        { label: '양호', count: 10, color: 'good' },
        { label: '보통', count: 8, color: 'warning' },
        { label: '미흡', count: 4, color: 'poor' },
        { label: '불량', count: 2, color: 'poor' }
    ],
    '영남권': [
        { label: '우수', count: 15, color: 'excellent' },
        { label: '양호', count: 20, color: 'good' },
        { label: '보통', count: 14, color: 'warning' },
        { label: '미흡', count: 7, color: 'poor' },
        { label: '불량', count: 4, color: 'poor' }
    ],
    '호남권': [
        { label: '우수', count: 8, color: 'excellent' },
        { label: '양호', count: 12, color: 'good' },
        { label: '보통', count: 9, color: 'warning' },
        { label: '미흡', count: 5, color: 'poor' },
        { label: '불량', count: 2, color: 'poor' }
    ],
    '제주권': [
        { label: '우수', count: 3, color: 'excellent' },
        { label: '양호', count: 4, color: 'good' },
        { label: '보통', count: 3, color: 'warning' },
        { label: '미흡', count: 1, color: 'poor' },
        { label: '불량', count: 1, color: 'poor' }
    ]
};

// 🏗️ 구조물 현황 데이터 - 누락된 부분 추가!
export const structureData = {
    '전국': [
        { type: '교량', count: 156 },
        { type: '옹벽', count: 243 },
        { type: '지하차도', count: 78 },
        { type: '펌프장', count: 45 },
        { type: '하천', count: 89 }
    ],
    '수도권': [
        { type: '교량', count: 62 },
        { type: '옹벽', count: 98 },
        { type: '지하차도', count: 34 },
        { type: '펌프장', count: 18 },
        { type: '하천', count: 28 }
    ],
    '강원권': [
        { type: '교량', count: 18 },
        { type: '옹벽', count: 24 },
        { type: '지하차도', count: 6 },
        { type: '펌프장', count: 4 },
        { type: '하천', count: 12 }
    ],
    '충청권': [
        { type: '교량', count: 28 },
        { type: '옹벽', count: 45 },
        { type: '지하차도', count: 12 },
        { type: '펌프장', count: 8 },
        { type: '하천', count: 18 }
    ],
    '영남권': [
        { type: '교량', count: 45 },
        { type: '옹벽', count: 72 },
        { type: '지하차도', count: 24 },
        { type: '펌프장', count: 15 },
        { type: '하천', count: 31 }
    ],
    '호남권': [
        { type: '교량', count: 32 },
        { type: '옹벽', count: 54 },
        { type: '지하차도', count: 18 },
        { type: '펌프장', count: 12 },
        { type: '하천', count: 22 }
    ],
    '제주권': [
        { type: '교량', count: 8 },
        { type: '옹벽', count: 15 },
        { type: '지하차도', count: 2 },
        { type: '펌프장', count: 3 },
        { type: '하천', count: 6 }
    ]
};

// 품질관리자 배치기준 데이터
export const qualityManagerData = {
    '전국': [
        { grade: '특급', icon: '🔥', count: 8, type: 'special' },
        { grade: '고급', icon: '⭐', count: 15, type: 'advanced' },
        { grade: '중급', icon: '🛠️', count: 42, type: 'intermediate' },
        { grade: '초급', icon: '📋', count: 67, type: 'basic' }
    ],
    '수도권': [
        { grade: '특급', icon: '🔥', count: 3, type: 'special' },
        { grade: '고급', icon: '⭐', count: 6, type: 'advanced' },
        { grade: '중급', icon: '🛠️', count: 18, type: 'intermediate' },
        { grade: '초급', icon: '📋', count: 28, type: 'basic' }
    ],
    '강원권': [
        { grade: '특급', icon: '🔥', count: 0, type: 'special' },
        { grade: '고급', icon: '⭐', count: 1, type: 'advanced' },
        { grade: '중급', icon: '🛠️', count: 5, type: 'intermediate' },
        { grade: '초급', icon: '📋', count: 8, type: 'basic' }
    ],
    '충청권': [
        { grade: '특급', icon: '🔥', count: 1, type: 'special' },
        { grade: '고급', icon: '⭐', count: 2, type: 'advanced' },
        { grade: '중급', icon: '🛠️', count: 8, type: 'intermediate' },
        { grade: '초급', icon: '📋', count: 12, type: 'basic' }
    ],
    '영남권': [
        { grade: '특급', icon: '🔥', count: 3, type: 'special' },
        { grade: '고급', icon: '⭐', count: 4, type: 'advanced' },
        { grade: '중급', icon: '🛠️', count: 15, type: 'intermediate' },
        { grade: '초급', icon: '📋', count: 22, type: 'basic' }
    ],
    '호남권': [
        { grade: '특급', icon: '🔥', count: 1, type: 'special' },
        { grade: '고급', icon: '⭐', count: 2, type: 'advanced' },
        { grade: '중급', icon: '🛠️', count: 6, type: 'intermediate' },
        { grade: '초급', icon: '📋', count: 10, type: 'basic' }
    ],
    '제주권': [
        { grade: '특급', icon: '🔥', count: 0, type: 'special' },
        { grade: '고급', icon: '⭐', count: 0, type: 'advanced' },
        { grade: '중급', icon: '🛠️', count: 2, type: 'intermediate' },
        { grade: '초급', icon: '📋', count: 5, type: 'basic' }
    ]
};

// 레미콘 타설 현장 데이터
export const concreteSites = {
    '수도권': [
        { 
            name: '위례신도시 조성공사', 
            location: '경기 성남시',
            volume: 245,
            weather: 'rain',
            weatherData: {
                current: 12.5,
                unit: 'mm',
                forecast: '오후 2시~5시 강우 예상 (15-20mm)',
                todayForecast: '흐림, 오후 소나기',
                tomorrowForecast: '맑음, 작업 적합',
                standard: '15mm 이하',
                status: 'safe'
            }
        },
        { 
            name: '인천검단 택지개발사업 조성공사', 
            location: '인천 서구',
            volume: 180,
            weather: 'wind',
            weatherData: {
                current: 18.5,
                unit: 'm/s',
                forecast: '오전 중 강풍주의보 지속 (20-25m/s)',
                todayForecast: '강풍, 크레인 작업 금지',
                tomorrowForecast: '바람 약해짐, 작업 가능',
                standard: '15m/s 이하',
                status: 'critical'
            }
        },
        { 
            name: '광교신도시 A1블록 조성공사', 
            location: '경기 수원시',
            volume: 320,
            weather: 'hot',
            weatherData: {
                current: 32.8,
                unit: '°C',
                forecast: '고온 주의',
                standard: '30°C 이하',
                status: 'critical'
            }
        }
    ],
    '강원권': [
        { 
            name: '춘천혁신도시 2단계 조성공사', 
            location: '강원 춘천시',
            volume: 160,
            weather: 'cold',
            weatherData: {
                current: -2.5,
                unit: '°C',
                forecast: '추위 지속',
                standard: '5°C 이상',
                status: 'critical'
            }
        }
    ],
    '충청권': [
        { 
            name: '세종5-1생활권 조성공사', 
            location: '세종특별자치시',
            volume: 310,
            weather: 'hot',
            weatherData: {
                current: 28.5,
                unit: '°C',
                forecast: '맑음',
                standard: '30°C 이하',
                status: 'safe'
            }
        }
    ],
    '영남권': [
        { 
            name: '김해신도시 2단계 조성공사', 
            location: '경남 김해시',
            volume: 275,
            weather: null 
        }
    ],
    '호남권': [
        { 
            name: '새만금신도시 1단계 조성공사', 
            location: '전북 군산시',
            volume: 205,
            weather: 'wind',
            weatherData: {
                current: 22.1,
                unit: 'm/s',
                forecast: '강풍주의보 발효 중',
                standard: '20m/s 이하',
                status: 'critical'
            }
        }
    ],
    '제주권': [
        { 
            name: '제주영어교육도시 확장공사', 
            location: '제주 서귀포시',
            volume: 95,
            weather: 'wind',
            weatherData: {
                current: 16.5,
                unit: 'm/s',
                forecast: '바람 보통',
                standard: '20m/s 이하',
                status: 'safe'
            }
        }
    ]
};

// 도로 포장 현장 데이터
export const pavingSites = {
    '수도권': [
        { 
            name: '하남교산신도시 진입도로 조성공사', 
            location: '경기 하남시',
            area: 15600,
            weather: 'hot',
            weatherData: {
                current: 38.5,
                unit: '°C',
                forecast: '폭염특보 지속, 최고 40°C까지 상승',
                todayForecast: '폭염, 오전 10시~오후 4시 작업금지',
                tomorrowForecast: '고온 지속, 새벽/저녁 작업 권장',
                standard: '35°C 이하',
                status: 'critical'
            }
        }
    ],
    '충청권': [
        { 
            name: '진천혁신도시 순환도로 조성공사', 
            location: '충북 진천군',
            area: 12800,
            weather: 'cold',
            weatherData: {
                current: -5.2,
                unit: '°C',
                forecast: '한파주의보, 최저 -8°C까지 하강',
                todayForecast: '한파, 동결방지 조치 필수',
                tomorrowForecast: '추위 지속, 보온양생 실시',
                standard: '5°C 이상',
                status: 'critical'
            }
        }
    ],
    '영남권': [
        { 
            name: '부산명지지구 연결도로 조성공사', 
            location: '부산 강서구',
            area: 16900,
            weather: 'rain',
            weatherData: {
                current: 25.8,
                unit: 'mm',
                forecast: '오후~저녁 집중호우 (시간당 30-50mm)',
                todayForecast: '집중호우, 포장작업 전면 중단',
                tomorrowForecast: '비 그침, 노면 건조 후 작업 가능',
                standard: '20mm 이하',
                status: 'critical'
            }
        }
    ]
};

// 다짐 현장 데이터
export const compactionSites = [
    { 
        name: '평택고덕신도시 A블록 조성공사', 
        location: '경기 평택시', 
        weather: 'rain',
        weatherData: {
            current: 8.2,
            unit: 'mm',
            forecast: '새벽 소나기 후 점차 개임 (총 10-15mm)',
            todayForecast: '오전 비, 오후 흐림',
            tomorrowForecast: '맑음, 다짐작업 적합',
            standard: '10mm 이하',
            status: 'safe'
        }
    },
    { 
        name: '새만금신도시 1단계 조성공사', 
        location: '전북 군산시', 
        weather: 'wind',
        weatherData: {
            current: 22.1,
            unit: 'm/s',
            forecast: '강풍주의보 발효 중 (25-30m/s 돌풍)',
            todayForecast: '강풍, 중장비 작업중단',
            tomorrowForecast: '바람 다소 약해짐',
            standard: '20m/s 이하',
            status: 'critical'
        }
    }
];

// 품질관리자 기준 정보
export const managerCriteria = {
    '특급': {
        title: '🔥 특급품질관리 대상공사',
        criteria: [
            '공사비 1,000억원 이상',
            '5만㎡ 이상 다중이용건축물',
            '특급기술자 1명 이상 + 중급기술자 2명 이상',
            '시험실 규모: 50㎡ 이상',
            '품질관리계획서 수립 의무'
        ]
    },
    '고급': {
        title: '⭐ 고급품질관리 대상공사',
        criteria: [
            '공사비 500억~1,000억원 미만',
            '특급품질관리 대상이 아닌 공사',
            '고급기술자 1명 이상 + 중급기술자 2명 이상',
            '시험실 규모: 50㎡ 이상',
            '품질관리계획서 수립 의무'
        ]
    },
    '중급': {
        title: '🛠️ 중급품질관리 대상공사',
        criteria: [
            '공사비 100억~500억원 미만',
            '연면적 5,000㎡ 이상 다중이용건축물',
            '중급기술자 1명 이상 + 초급기술자 1명 이상',
            '시험실 규모: 20㎡ 이상',
            '품질관리계획서 수립 의무'
        ]
    },
    '초급': {
        title: '📋 초급품질관리 대상공사',
        criteria: [
            '공사비 2억~100억원 미만',
            '중급품질관리 대상이 아닌 공사',
            '초급기술자 1명 이상',
            '시험실 규모: 20㎡ 이상',
            '품질관리계획서 수립 의무'
        ]
    }
};

// 전역 상태 변수들
export let currentQualityRegion = '전국';
export let currentStructureRegion = '전국';
export let currentManagerRegion = '전국';
export let currentConcreteRegion = '전국';
export let currentPavingRegion = '전국';

// 상태 업데이트 함수들
export function updateCurrentQualityRegion(region) {
    currentQualityRegion = region;
}

export function updateCurrentStructureRegion(region) {
    currentStructureRegion = region;
}

export function updateCurrentManagerRegion(region) {
    currentManagerRegion = region;
}

export function updateCurrentConcreteRegion(region) {
    currentConcreteRegion = region;
}

export function updateCurrentPavingRegion(region) {
    currentPavingRegion = region;
}
