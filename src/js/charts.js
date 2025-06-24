// 차트 및 렌더링 모듈 - 통일된 컬러 시스템 적용
import { 
    qualityData, 
    structureData, 
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

// 🌤️ 툴팁 위치 계산 함수 추가
function setupWeatherTooltips() {
    const weatherIcons = document.querySelectorAll('.weather-icon');
    
    weatherIcons.forEach(icon => {
        const tooltip = icon.querySelector('.weather-tooltip');
        if (!tooltip) return;
        
        icon.addEventListener('mouseenter', function() {
            positionTooltip(this, tooltip);
        });
    });
}

function positionTooltip(iconElement, tooltip) {
    const iconRect = iconElement.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // 기본 위치 (아이콘 위쪽)
    let top = iconRect.top - tooltipRect.height - 10;
    let left = iconRect.left + (iconRect.width / 2) - (tooltipRect.width / 2);
    
    // 🔧 오른쪽 경계 체크 및 조정
    if (left + tooltipRect.width > viewportWidth - 20) {
        left = viewportWidth - tooltipRect.width - 20; // 오른쪽 여백 20px
        tooltip.classList.add('tooltip-right-adjusted');
    } else {
        tooltip.classList.remove('tooltip-right-adjusted');
    }
    
    // 🔧 왼쪽 경계 체크 및 조정
    if (left < 20) {
        left = 20; // 왼쪽 여백 20px
        tooltip.classList.add('tooltip-left-adjusted');
    } else {
        tooltip.classList.remove('tooltip-left-adjusted');
    }
    
    // 🔧 위쪽 경계 체크 및 조정 (아이콘 아래로 이동)
    if (top < 20) {
        top = iconRect.bottom + 10;
        tooltip.classList.add('tooltip-bottom');
        tooltip.classList.remove('tooltip-top');
    } else {
        tooltip.classList.add('tooltip-top');
        tooltip.classList.remove('tooltip-bottom');
    }
    
    // 위치 적용
    tooltip.style.top = top + 'px';
    tooltip.style.left = left + 'px';
}

// 품질 차트 렌더링
export function renderQualityChart(region = '전국') {
    const container = document.getElementById('quality-chart');
    if (!container) return;
    
    const data = qualityData[region] || qualityData['전국'];
    const total = data.reduce((sum, item) => sum + item.count, 0);
    
    let html = '<div class="quality-chart-container">';
    
    for (let i = 0; i < data.length; i++) {
        const item = data[i];
        const percentage = total > 0 ? Math.round((item.count / total) * 100) : 0;
        const color = qualityColors[item.color] || colorPalette.muted;
        
        html += `
            <div class="quality-bar">
                <div class="quality-label" style="color: ${color};">
                    <span class="quality-icon">●</span>
                    ${item.label}
                </div>
                <div class="bar-container">
                    <div class="bar-fill" 
                         style="width: ${percentage}%; background: linear-gradient(135deg, ${color}, ${color}dd);">
                        <span class="bar-percentage">${percentage}%</span>
                    </div>
                </div>
                <div class="quality-count" style="color: ${color}; font-weight: 600;">
                    ${item.count}건
                </div>
            </div>
        `;
    }
    
    html += '</div>';
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
        
        html += `<td class="structure-count-cell${isClickable ? ' bridge-clickable' : ''}"${
            isClickable ? ' onclick="window.dashboardModals.showBridgeModal()"' : ''
        } style="color: ${colorPalette.primary}; font-weight: 600;">`;
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
        
        // 날씨 아이콘
        if (site.weather) {
            const weatherColors = {
                'rain': colorPalette.primary,
                'hot': colorPalette.danger,
                'cold': colorPalette.primary,
                'wind': colorPalette.warning
            };
            
            const weatherColor = weatherColors[site.weather] || colorPalette.muted;
            
            html += `<div class="weather-icon weather-${site.weather}" style="color: ${weatherColor};">`;
            html += getWeatherIcon(site.weather);
            
            if (site.weatherData) {
                const statusColor = site.weatherData.status === 'critical' ? colorPalette.danger : colorPalette.success;
                
                html += '<div class="weather-tooltip">';
                html += `<div class="tooltip-header" style="background: ${weatherColor}; color: white;">`;
                html += '<span class="tooltip-icon">' + getWeatherIcon(site.weather) + '</span>';
                html += '<span class="tooltip-title">' + getWeatherTitle(site.weather) + '</span>';
                html += '</div>';
                html += '<div class="tooltip-content">';
                html += '<div class="weather-data">';
                html += `<span class="weather-label" style="color: ${colorPalette.muted};">현재</span>`;
                html += `<span class="weather-value" style="color: ${statusColor}; font-weight: 600;">`;
                html += site.weatherData.current + site.weatherData.unit;
                html += '</span>';
                html += '</div>';
                html += '<div class="weather-data">';
                html += `<span class="weather-label" style="color: ${colorPalette.muted};">예보</span>`;
                html += `<span class="weather-value" style="color: ${colorPalette.secondary};">${site.weatherData.forecast}</span>`;
                html += '</div>';
                html += '<div class="quality-standard">';
                html += `<div class="standard-title" style="color: ${colorPalette.primary}; font-weight: 600;">품질관리기준</div>`;
                html += `<div class="standard-text" style="color: ${colorPalette.secondary};">${site.weatherData.standard}</div>`;
                html += '</div>';
                html += '</div>';
                html += '</div>';
            }
            
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
    
    // 🔥 렌더링 후 날씨 툴팁 위치 설정
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
    renderManagerTable('전국');
    renderSiteList('concrete-sites', concreteSites, '전국');
    renderSiteList('paving-sites', pavingSites, '전국');
    renderSiteList('compaction-sites', compactionSites);
    
    // 🔥 창 크기 변경 시 툴팁 위치 재계산
    window.addEventListener('resize', () => {
        setupWeatherTooltips();
    });
}
