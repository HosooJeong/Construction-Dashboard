// 차트 및 렌더링 모듈
import { 
    qualityData, 
    structureData, 
    qualityManagerData,
    concreteSites,
    pavingSites,
    compactionSites
} from './data.js';

// 품질 차트 렌더링
export function renderQualityChart(region = '전국') {
    const container = document.getElementById('quality-chart');
    if (!container) return;
    
    const data = qualityData[region] || qualityData['전국'];
    const total = data.reduce((sum, item) => sum + item.count, 0);
    
    let html = '';
    for (let i = 0; i < data.length; i++) {
        const item = data[i];
        const percentage = total > 0 ? Math.round((item.count / total) * 100) : 0;
        
        html += `
            <div class="quality-bar">
                <div class="quality-label quality-${item.color}">${item.label}</div>
                <div class="bar-container">
                    <div class="bar-fill bar-${item.color}" 
                         style="width: ${percentage}%">
                        ${percentage}%
                    </div>
                </div>
                <div class="quality-count">${item.count}</div>
            </div>
        `;
    }
    
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
        }>`;
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
    
    let html = '';
    html += '<tr class="manager-row-horizontal">';
    html += '<td class="manager-cell-horizontal">현장 수</td>';
    html += '<td class="manager-cell-horizontal">';
    html += '<div class="manager-count-horizontal special">' + (dataMap['특급'] ? dataMap['특급'].count : 0) + '개소</div>';
    html += '</td>';
    html += '<td class="manager-cell-horizontal">';
    html += '<div class="manager-count-horizontal advanced">' + (dataMap['고급'] ? dataMap['고급'].count : 0) + '개소</div>';
    html += '</td>';
    html += '<td class="manager-cell-horizontal">';
    html += '<div class="manager-count-horizontal intermediate">' + (dataMap['중급'] ? dataMap['중급'].count : 0) + '개소</div>';
    html += '</td>';
    html += '<td class="manager-cell-horizontal">';
    html += '<div class="manager-count-horizontal basic">' + (dataMap['초급'] ? dataMap['초급'].count : 0) + '개소</div>';
    html += '</td>';
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
        html += '<div class="site-item">';
        html += '<div class="site-info">';
        html += '<div class="site-name">' + site.name + '</div>';
        html += '<div class="site-details">' + site.location + '</div>';
        html += '</div>';
        
        // 타설량/포장면적 정보
        if (site.volume) {
            html += '<div class="volume-info">';
            html += '<span class="volume-amount">' + site.volume + '</span>';
            html += '<span class="volume-unit">m³</span>';
            html += '</div>';
        }
        
        if (site.area) {
            html += '<div class="area-info">';
            html += '<span class="area-amount">' + site.area.toLocaleString() + '</span>';
            html += '<span class="area-unit">m²</span>';
            html += '</div>';
        }
        
        // 날씨 아이콘
        if (site.weather) {
            html += '<div class="weather-icon weather-' + site.weather + '">';
            html += getWeatherIcon(site.weather);
            
            if (site.weatherData) {
                html += '<div class="weather-tooltip">';
                html += '<div class="tooltip-header">';
                html += '<span class="tooltip-icon">' + getWeatherIcon(site.weather) + '</span>';
                html += '<span class="tooltip-title">' + getWeatherTitle(site.weather) + '</span>';
                html += '</div>';
                html += '<div class="tooltip-content">';
                html += '<div class="weather-data">';
                html += '<span class="weather-label">현재</span>';
                html += '<span class="weather-value ' + (site.weatherData.status === 'critical' ? 'weather-critical' : 'weather-safe') + '">';
                html += site.weatherData.current + site.weatherData.unit;
                html += '</span>';
                html += '</div>';
                html += '<div class="weather-data">';
                html += '<span class="weather-label">예보</span>';
                html += '<span class="weather-value">' + site.weatherData.forecast + '</span>';
                html += '</div>';
                html += '<div class="quality-standard">';
                html += '<div class="standard-title">품질관리기준</div>';
                html += '<div class="standard-text">' + site.weatherData.standard + '</div>';
                html += '</div>';
                html += '</div>';
                html += '</div>';
            }
            
            html += '</div>';
        }
        
        html += '</div>';
    }
    
    if (sites.length === 0) {
        html = '<div class="site-item"><div class="site-info"><div class="site-name">현재 진행중인 현장이 없습니다.</div></div></div>';
    }
    
    container.innerHTML = html;
}

// 레미콘 요약 정보 업데이트
function updateConcreteSummary(siteCount, totalVolume) {
    const siteCountEl = document.getElementById('concrete-site-count');
    const totalVolumeEl = document.getElementById('concrete-total-volume');
    
    if (siteCountEl) siteCountEl.textContent = siteCount + '개소';
    if (totalVolumeEl) totalVolumeEl.textContent = totalVolume.toLocaleString() + 'm³';
}

// 포장 요약 정보 업데이트
function updatePavingSummary(siteCount, totalArea) {
    const siteCountEl = document.getElementById('paving-site-count');
    const totalAreaEl = document.getElementById('paving-total-area');
    
    if (siteCountEl) siteCountEl.textContent = siteCount + '개소';
    if (totalAreaEl) totalAreaEl.textContent = totalArea.toLocaleString() + 'm²';
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
}
