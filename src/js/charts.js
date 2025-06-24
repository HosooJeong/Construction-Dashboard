// 차트 및 렌더링 모듈 - 통일된 컬러 시스템 적용
import { 
    qualityData, 
    structureData, 
    materialData,
    qualityManagerData,
    concreteSites,
    pavingSites,
    compactionSites
} from './data.js';

// 🎨 통일된 컬러 팔레트 정의
const colorPalette = {
    primary: '#3498db',
    primaryDark: '#2980b9',
    primaryLight: '#5dade2',
    success: '#27ae60',
    successLight: '#2ecc71',
    warning: '#f39c12',
    warningLight: '#f4d03f',
    danger: '#e74c3c',
    dangerLight: '#ec7063',
    secondary: '#2c3e50',
    secondaryLight: '#34495e',
    muted: '#7f8c8d',
    light: '#ecf0f1'
};

// 품질 등급별 색상 매핑
const qualityColors = {
    'excellent': colorPalette.success,
    'good': colorPalette.primary,
    'warning': colorPalette.warning,
    'poor': colorPalette.danger
};

// 🌤️ 동적 툴팁 관리
let currentTooltip = null;

function createWeatherTooltip(weatherData, weather) {
    // 기존 툴팁 제거
    removeWeatherTooltip();
    
    const statusColor = weatherData.status === 'critical' ? colorPalette.danger : colorPalette.success;
    const weatherColor = getWeatherColor(weather);
    
    const tooltip = document.createElement('div');
    tooltip.className = 'weather-tooltip-dynamic';
    tooltip.innerHTML = `
        <div class="tooltip-header" style="background: ${weatherColor}; color: white;">
            <span class="tooltip-icon">${getWeatherIcon(weather)}</span>
            <span class="tooltip-title">${getWeatherTitle(weather)}</span>
        </div>
        <div class="tooltip-content">
            <div class="weather-data">
                <span class="weather-label" style="color: ${colorPalette.muted};">현재</span>
                <span class="weather-value" style="color: ${statusColor}; font-weight: 600;">
                    ${weatherData.current}${weatherData.unit}
                </span>
            </div>
            <div class="weather-data">
                <span class="weather-label" style="color: ${colorPalette.muted};">예보</span>
                <span class="weather-value" style="color: ${colorPalette.secondary};">${weatherData.forecast}</span>
            </div>
            <div class="quality-standard">
                <div class="standard-title" style="color: ${colorPalette.primary}; font-weight: 600;">품질관리기준</div>
                <div class="standard-text" style="color: ${colorPalette.secondary};">${weatherData.standard}</div>
            </div>
        </div>
    `;
    
    // 동적 스타일 적용
    tooltip.style.cssText = `
        position: fixed !important;
        background: white;
        border: 2px solid ${colorPalette.primary};
        border-radius: 12px;
        padding: 0;
        box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4);
        z-index: 999999 !important;
        width: 300px;
        max-width: 90vw;
        opacity: 0;
        visibility: hidden;
        transform: scale(0.8);
        transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        pointer-events: none;
        max-height: 80vh;
        overflow-y: auto;
    `;
    
    document.body.appendChild(tooltip);
    currentTooltip = tooltip;
    
    return tooltip;
}

function showWeatherTooltip(iconElement, weatherData, weather) {
    const tooltip = createWeatherTooltip(weatherData, weather);
    const iconRect = iconElement.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // 툴팁 기본 크기
    const tooltipWidth = 300;
    const tooltipHeight = 200;
    
    // 🎯 기본 위치: 아이콘 왼쪽 위
    let left = iconRect.left - tooltipWidth - 15;
    let top = iconRect.top - 10;
    
    // 🔧 왼쪽 경계 벗어나면 오른쪽으로
    if (left < 20) {
        left = iconRect.right + 15;
    }
    
    // 🔧 오른쪽 경계 벗어나면 다시 왼쪽으로, 위치 조정
    if (left + tooltipWidth > viewportWidth - 20) {
        left = viewportWidth - tooltipWidth - 20;
    }
    
    // 🔧 위쪽 경계 벗어나면 아래로
    if (top < 20) {
        top = iconRect.bottom + 10;
    }
    
    // 🔧 아래쪽 경계 벗어나면 위로 조정
    if (top + tooltipHeight > viewportHeight - 20) {
        top = viewportHeight - tooltipHeight - 20;
    }
    
    // 최종 위치 적용
    tooltip.style.left = Math.max(20, left) + 'px';
    tooltip.style.top = Math.max(20, top) + 'px';
    
    // 툴팁 표시 (약간의 지연으로 애니메이션 효과)
    setTimeout(() => {
        tooltip.style.opacity = '1';
        tooltip.style.visibility = 'visible';
        tooltip.style.transform = 'scale(1)';
    }, 10);
}

function removeWeatherTooltip() {
    if (currentTooltip) {
        currentTooltip.style.opacity = '0';
        currentTooltip.style.visibility = 'hidden';
        currentTooltip.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            if (currentTooltip && currentTooltip.parentNode) {
                currentTooltip.parentNode.removeChild(currentTooltip);
            }
            currentTooltip = null;
        }, 300);
    }
}

function setupWeatherTooltips() {
    const weatherIcons = document.querySelectorAll('.weather-icon');
    
    weatherIcons.forEach(icon => {
        const weatherData = icon.dataset.weatherData ? JSON.parse(icon.dataset.weatherData) : null;
        const weather = icon.dataset.weather;
        
        if (!weatherData || !weather) return;
        
        icon.addEventListener('mouseenter', function() {
            showWeatherTooltip(this, weatherData, weather);
        });
        
        icon.addEventListener('mouseleave', function() {
            removeWeatherTooltip();
        });
    });
}

// 🍕 품질 차트를 원형 차트로 렌더링
export function renderQualityChart(region = '전국') {
    const container = document.getElementById('quality-chart');
    if (!container) return;
    
    const data = qualityData[region] || qualityData['전국'];
    const total = data.reduce((sum, item) => sum + item.count, 0);
    
    // SVG 원형 차트 생성
    let html = `
        <div class="quality-chart-container">
            <div class="pie-chart-wrapper">
                <svg class="pie-chart" width="200" height="200" viewBox="0 0 42 42">
                    <circle class="pie-background" cx="21" cy="21" r="15.915" fill="transparent" stroke="${colorPalette.light}" stroke-width="3"></circle>
    `;
    
    let cumulativePercentage = 0;
    
    for (let i = 0; i < data.length; i++) {
        const item = data[i];
        const percentage = total > 0 ? (item.count / total) * 100 : 0;
        const color = qualityColors[item.color] || colorPalette.muted;
        
        if (percentage > 0) {
            const strokeDasharray = `${percentage} ${100 - percentage}`;
            const strokeDashoffset = 25 - cumulativePercentage;
            
            html += `
                <circle class="pie-segment" 
                        cx="21" cy="21" r="15.915" 
                        fill="transparent" 
                        stroke="${color}" 
                        stroke-width="3" 
                        stroke-dasharray="${strokeDasharray}" 
                        stroke-dashoffset="${strokeDashoffset}"
                        opacity="0.8">
                </circle>
            `;
            
            cumulativePercentage += percentage;
        }
    }
    
    html += `
                </svg>
                <div class="pie-center-text">
                    <div class="pie-total-count">${total}</div>
                    <div class="pie-total-label">개소</div>
                </div>
            </div>
            <div class="pie-legend">
    `;
    
    for (let i = 0; i < data.length; i++) {
        const item = data[i];
        const percentage = total > 0 ? Math.round((item.count / total) * 100) : 0;
        const color = qualityColors[item.color] || colorPalette.muted;
        
        html += `
            <div class="legend-item">
                <span class="legend-color" style="background: ${color};"></span>
                <span class="legend-label">${item.label}</span>
                <span class="legend-value">${item.count}개 (${percentage}%)</span>
            </div>
        `;
    }
    
    html += `
            </div>
        </div>
    `;
    
    container.innerHTML = html;
}

// 구조물 테이블 렌더링
export function renderStructureTable(region = '전국') {
    const container = document.getElementById('structure-data-row');
    if (!container) return;
    
    const data = structureData[region] || structureData['전국'];
    const structureOrder = ['교량', '옹벽', '지하차도', '펌프장', '하천'];
    
    let html = '';
    for (let i = 0; i < structureOrder.length; i++) {
        const structureName = structureOrder[i];
        const structureInfo = data.find(item => item.type === structureName);
        const count = structureInfo ? structureInfo.count : 0;
        const isClickable = structureName === '교량';
        
        html += `<td class="structure-count-cell${isClickable ? ' bridge-clickable' : ''}\"${
            isClickable ? ' onclick="window.dashboardModals.showBridgeModal()"' : ''
        } style="color: ${colorPalette.primary}; font-weight: 600;">`;
        html += count + '개소';
        html += '</td>';
    }
    
    container.innerHTML = html;
}

// 자재 테이블 렌더링 (새로 추가!)
export function renderMaterialTable(region = '전국') {
    const container = document.getElementById('material-data-row');
    if (!container) return;
    
    const data = materialData[region] || materialData['전국'];
    const materialOrder = ['상수관', '오수관', '우수관', '경계석', '기타'];
    
    let html = '';
    for (let i = 0; i < materialOrder.length; i++) {
        const materialName = materialOrder[i];
        const materialInfo = data.find(item => item.type === materialName);
        const count = materialInfo ? materialInfo.count : 0;
        
        html += `<td class="structure-count-cell" style="color: ${colorPalette.success}; font-weight: 600;">`;
        html += count + '개소';
        html += '</td>';
    }
    
    container.innerHTML = html;
}

// 품질관리자 테이블 렌더링
export function renderManagerTable(region = '전국') {
    const container = document.getElementById('manager-table-body-horizontal');
    if (!container) return;
    
    const data = qualityManagerData[region] || qualityManagerData['전국'];
    const dataMap = {};
    
    for (let i = 0; i < data.length; i++) {
        dataMap[data[i].grade] = data[i];
    }
    
    // 등급별 색상 정의
    const gradeColors = {
        '특급': colorPalette.success,
        '고급': colorPalette.primary,
        '중급': colorPalette.warning,
        '초급': colorPalette.secondary
    };
    
    let html = '';
    html += '<tr class="manager-row-horizontal">';
    html += '<td class="manager-cell-horizontal" style="font-weight: 600; color: ' + colorPalette.secondary + ';">현장 수</td>';
    
    const grades = ['특급', '고급', '중급', '초급'];
    for (let i = 0; i < grades.length; i++) {
        const grade = grades[i];
        const count = dataMap[grade] ? dataMap[grade].count : 0;
        const color = gradeColors[grade];
        
        html += '<td class="manager-cell-horizontal">';
        html += `<div class="manager-count-horizontal" style="color: ${color}; font-weight: 700; border-left: 3px solid ${color}; padding-left: 8px;">`;
        html += count + '개소';
        html += '</div>';
        html += '</td>';
    }
    
    html += '</tr>';
    container.innerHTML = html;
}

// 현장 목록 렌더링 공통 함수
export function renderSiteList(containerId, sitesData, region = '전국') {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    let sites = [];
    let totalVolume = 0;
    let totalArea = 0;
    let siteCount = 0;
    
    // 데이터 처리
    if (region === '전국') {
        if (Array.isArray(sitesData)) {
            sites = sitesData;
        } else {
            for (const regionKey in sitesData) {
                if (sitesData[regionKey] && Array.isArray(sitesData[regionKey])) {
                    sites = sites.concat(sitesData[regionKey]);
                }
            }
        }
    } else {
        sites = Array.isArray(sitesData) ? sitesData : (sitesData[region] || []);
    }
    
    siteCount = sites.length;
    
    // 총합 계산
    for (let i = 0; i < sites.length; i++) {
        const site = sites[i];
        if (site.volume) totalVolume += site.volume;
        if (site.area) totalArea += site.area;
    }
    
    // 요약 정보 업데이트
    if (containerId === 'concrete-sites') {
        updateConcreteSummary(siteCount, totalVolume);
    } else if (containerId === 'paving-sites') {
        updatePavingSummary(siteCount, totalArea);
    }
    
    // 목록 렌더링
    let html = '';
    for (let i = 0; i < sites.length; i++) {
        const site = sites[i];
        
        html += `<div class="site-item" style="border-left: 3px solid ${colorPalette.primary};">`;
        html += '<div class="site-info">';
        html += `<div class="site-name" style="color: ${colorPalette.secondary}; font-weight: 600;">${site.name}</div>`;
        html += `<div class="site-details" style="color: ${colorPalette.muted};">${site.location}</div>`;
        html += '</div>';
        
        // 타설량/포장면적 정보
        if (site.volume) {
            html += `<div class="volume-info" style="color: ${colorPalette.primary};">`;
            html += `<span class="volume-amount" style="font-weight: 700; font-size: 1.1rem;">${site.volume.toLocaleString()}</span>`;
            html += `<span class="volume-unit" style="color: ${colorPalette.muted};">m³</span>`;
            html += '</div>';
        }
        
        if (site.area) {
            html += `<div class="area-info" style="color: ${colorPalette.primary};">`;
            html += `<span class="area-amount" style="font-weight: 700; font-size: 1.1rem;">${site.area.toLocaleString()}</span>`;
            html += `<span class="area-unit" style="color: ${colorPalette.muted};">m²</span>`;
            html += '</div>';
        }
        
        // 날씨 아이콘 (동적 데이터 저장)
        if (site.weather && site.weatherData) {
            const weatherColor = getWeatherColor(site.weather);
            
            html += `<div class="weather-icon weather-${site.weather}" 
                           style="color: ${weatherColor};" 
                           data-weather="${site.weather}"
                           data-weather-data='${JSON.stringify(site.weatherData)}'>`;
            html += getWeatherIcon(site.weather);
            html += '</div>';
        }
        
        html += '</div>';
    }
    
    if (sites.length === 0) {
        html = `<div class="site-item" style="border-left: 3px solid ${colorPalette.muted};">`;
        html += '<div class="site-info">';
        html += `<div class="site-name" style="color: ${colorPalette.muted};">현재 진행중인 현장이 없습니다.</div>`;
        html += '</div></div>';
    }
    
    container.innerHTML = html;
    
    // 🔥 렌더링 후 날씨 툴팁 설정
    setTimeout(() => {
        setupWeatherTooltips();
    }, 100);
}

// 레미콘 요약 정보 업데이트
function updateConcreteSummary(siteCount, totalVolume) {
    const siteCountEl = document.getElementById('concrete-site-count');
    const totalVolumeEl = document.getElementById('concrete-total-volume');
    
    if (siteCountEl) {
        siteCountEl.textContent = siteCount + '개소';
        siteCountEl.style.color = colorPalette.primary;
        siteCountEl.style.fontWeight = '700';
    }
    if (totalVolumeEl) {
        totalVolumeEl.textContent = totalVolume.toLocaleString() + 'm³';
        totalVolumeEl.style.color = colorPalette.success;
        totalVolumeEl.style.fontWeight = '700';
    }
}

// 포장 요약 정보 업데이트
function updatePavingSummary(siteCount, totalArea) {
    const siteCountEl = document.getElementById('paving-site-count');
    const totalAreaEl = document.getElementById('paving-total-area');
    
    if (siteCountEl) {
        siteCountEl.textContent = siteCount + '개소';
        siteCountEl.style.color = colorPalette.warning;
        siteCountEl.style.fontWeight = '700';
    }
    if (totalAreaEl) {
        totalAreaEl.textContent = totalArea.toLocaleString() + 'm²';
        totalAreaEl.style.color = colorPalette.success;
        totalAreaEl.style.fontWeight = '700';
    }
}

// 날씨 아이콘 반환
function getWeatherIcon(weather) {
    const icons = {
        'rain': '🌧️',
        'hot': '🌡️',
        'cold': '❄️',
        'wind': '💨'
    };
    return icons[weather] || '☀️';
}

// 날씨 제목 반환
function getWeatherTitle(weather) {
    const titles = {
        'rain': '강우 상황',
        'hot': '고온 주의',
        'cold': '저온 주의',
        'wind': '강풍 주의'
    };
    return titles[weather] || '날씨 정보';
}

// 날씨별 색상 반환
function getWeatherColor(weather) {
    const colors = {
        'rain': colorPalette.primary,
        'hot': colorPalette.danger,
        'cold': colorPalette.primary,
        'wind': colorPalette.warning
    };
    return colors[weather] || colorPalette.muted;
}

// 필터 버튼 이벤트 설정
export function setupFilterButtons() {
    // 품질 차트 필터
    const qualityFilterButtons = document.querySelectorAll('#quality-filter-buttons .filter-btn');
    qualityFilterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const region = this.getAttribute('data-region');
            
            qualityFilterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            renderQualityChart(region);
            window.dashboardUtils.showAlert(region + ' 품질등급 현황으로 변경되었습니다! 📊');
        });
    });
    
    // 구조물 필터
    const structureFilterButtons = document.querySelectorAll('#structure-filter-buttons .filter-btn');
    structureFilterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const region = this.getAttribute('data-region');
            
            structureFilterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            renderStructureTable(region);
            renderMaterialTable(region); // 자재 테이블도 같이 업데이트
            window.dashboardUtils.showAlert(region + ' 구조물 현황으로 변경되었습니다! 🏗️');
        });
    });
    
    // 품질관리자 필터
    const managerFilterButtons = document.querySelectorAll('#quality-manager-filter-buttons .filter-btn');
    managerFilterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const region = this.getAttribute('data-region');
            
            managerFilterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            renderManagerTable(region);
            window.dashboardUtils.showAlert(region + ' 품질관리자 현황으로 변경되었습니다! 👷‍♂️');
        });
    });
    
    // 레미콘 타설 필터
    const concreteFilterButtons = document.querySelectorAll('#concrete-filter-buttons .filter-btn');
    concreteFilterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const region = this.getAttribute('data-region');
            
            concreteFilterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            renderSiteList('concrete-sites', concreteSites, region);
            window.dashboardUtils.showAlert(region + ' 레미콘 타설 현장으로 변경되었습니다! 🚛');
        });
    });
    
    // 도로 포장 필터
    const pavingFilterButtons = document.querySelectorAll('#paving-filter-buttons .filter-btn');
    pavingFilterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const region = this.getAttribute('data-region');
            
            pavingFilterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            renderSiteList('paving-sites', pavingSites, region);
            window.dashboardUtils.showAlert(region + ' 도로 포장 현장으로 변경되었습니다! 🛣️');
        });
    });
}

// 초기 렌더링
export function initializeCharts() {
    renderQualityChart('전국');
    renderStructureTable('전국');
    renderMaterialTable('전국'); // 자재 테이블 초기화
    renderManagerTable('전국');
    renderSiteList('concrete-sites', concreteSites, '전국');
    renderSiteList('paving-sites', pavingSites, '전국');
    renderSiteList('compaction-sites', compactionSites);
    
    // 🔥 창 크기 변경 시 툴팁 재설정
    window.addEventListener('resize', () => {
        removeWeatherTooltip(); // 기존 툴팁 제거
    });
}
