// 모달 관리 모듈
import { managerCriteria } from './data.js';

// 모달 관리 클래스
class ModalManager {
    constructor() {
        this.currentBridgeRegion = '전체';
        this.currentBridgeType = '전체';
        this.currentBridgeMethod = '전체';
        this.currentBridgeStatus = '전체';
        
        this.bridgeDetailData = [
            { name: '한강대교', type: '트러스교', method: 'FCM공법', length: 1005, span: 52.5, width: 27.0, region: '수도권', status: '시공중' },
            { name: '잠실대교', type: '현수교', method: 'MSS공법', length: 1270, span: 65.0, width: 31.5, region: '수도권', status: '완료' },
            { name: '성수대교', type: '트러스교', method: 'FCM공법', length: 1160, span: 58.0, width: 25.0, region: '수도권', status: '시공중' },
            { name: '영종대교', type: '현수교', method: 'FCM공법', length: 4420, span: 300.0, width: 32.0, region: '수도권', status: '완료' },
            { name: '인천대교', type: '사장교', method: 'FCM공법', length: 21380, span: 800.0, width: 33.4, region: '수도권', status: '완료' },
            { name: '여수대교', type: '사장교', method: 'MSS공법', length: 2260, span: 155.0, width: 23.5, region: '호남권', status: '시공중' },
            { name: '진도대교', type: '사장교', method: 'FCM공법', length: 484, span: 344.0, width: 11.7, region: '호남권', status: '완료' },
            { name: '거제대교', type: '사장교', method: 'MSS공법', length: 8900, span: 115.0, width: 13.0, region: '영남권', status: '완료' },
            { name: '부산대교', type: '현수교', method: 'FCM공법', length: 2050, span: 540.0, width: 32.0, region: '영남권', status: '시공중' },
            { name: '울산대교', type: '트러스교', method: 'FCM공법', length: 1740, span: 85.0, width: 28.0, region: '영남권', status: '시공중' },
            { name: '대전고가교', type: '박스거더교', method: 'FSM공법', length: 890, span: 45.0, width: 24.0, region: '충청권', status: '완료' },
            { name: '청주대교', type: '트러스교', method: 'FCM공법', length: 1320, span: 62.0, width: 26.5, region: '충청권', status: '시공중' },
            { name: '춘천대교', type: '박스거더교', method: 'FSM공법', length: 780, span: 40.0, width: 22.0, region: '강원권', status: '완료' },
            { name: '강릉대교', type: '트러스교', method: 'FCM공법', length: 1050, span: 55.0, width: 25.0, region: '강원권', status: '시공중' },
            { name: '제주대교', type: '박스거더교', method: 'FSM공법', length: 680, span: 38.0, width: 20.0, region: '제주권', status: '완료' }
        ];
    }

    // 품질관리자 기준 모달 표시
    showManagerCriteria() {
        let modal = document.getElementById('manager-criteria-modal');
        if (!modal) {
            this.createManagerCriteriaModal();
            modal = document.getElementById('manager-criteria-modal');
        }
        
        const modalTitle = modal.querySelector('.criteria-modal-title');
        const criteriaContent = modal.querySelector('.criteria-content');
        
        modalTitle.innerHTML = '👷‍♂️ 품질관리자 배치기준';
        
        let html = '';
        const grades = ['특급', '고급', '중급', '초급'];
        
        for (let i = 0; i < grades.length; i++) {
            const grade = grades[i];
            const criteria = managerCriteria[grade];
            
            html += '<div class="criteria-section">';
            html += '<div class="criteria-section-title">' + criteria.title + '</div>';
            html += '<ul class="criteria-list">';
            
            for (let j = 0; j < criteria.criteria.length; j++) {
                html += '<li>• ' + criteria.criteria[j] + '</li>';
            }
            
            html += '</ul>';
            html += '</div>';
        }
        
        criteriaContent.innerHTML = html;
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    hideManagerCriteria() {
        const modal = document.getElementById('manager-criteria-modal');
        if (modal) {
            modal.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    }

    // 교량 모달
    showBridgeModal() {
        let modal = document.getElementById('bridge-modal');
        if (!modal) {
            this.createBridgeModal();
            modal = document.getElementById('bridge-modal');
        }
        
        this.renderBridgeTable();
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    hideBridgeModal() {
        const modal = document.getElementById('bridge-modal');
        if (modal) {
            modal.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    }

    // SMS 모달
    showSMSModal() {
        let modal = document.getElementById('sms-modal');
        if (!modal) {
            this.createSMSModal();
            modal = document.getElementById('sms-modal');
        }
        
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    hideSMSModal() {
        const modal = document.getElementById('sms-modal');
        if (modal) {
            modal.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    }

    // 교량 테이블 렌더링
    renderBridgeTable() {
        const container = document.getElementById('bridge-table-body');
        if (!container) return;
        
        const filteredData = this.getFilteredBridgeData();
        
        let html = '';
        for (let i = 0; i < filteredData.length; i++) {
            const bridge = filteredData[i];
            html += '<tr>';
            html += '<td class="bridge-name">' + bridge.name + '</td>';
            html += '<td>' + bridge.type + '</td>';
            html += '<td>' + bridge.method + '</td>';
            html += '<td>' + bridge.length.toLocaleString() + '</td>';
            html += '<td>' + bridge.span + '</td>';
            html += '<td>' + bridge.width + '</td>';
            html += '<td>' + bridge.region + '</td>';
            html += '<td>' + bridge.status + '</td>';
            html += '</tr>';
        }
        
        container.innerHTML = html;
    }

    // 교량 데이터 필터링
    getFilteredBridgeData() {
        let data = this.bridgeDetailData.slice();
        
        if (this.currentBridgeRegion !== '전체') {
            data = data.filter(bridge => bridge.region === this.currentBridgeRegion);
        }
        
        if (this.currentBridgeType !== '전체') {
            data = data.filter(bridge => bridge.type === this.currentBridgeType);
        }
        
        if (this.currentBridgeMethod !== '전체') {
            data = data.filter(bridge => bridge.method === this.currentBridgeMethod);
        }
        
        if (this.currentBridgeStatus !== '전체') {
            data = data.filter(bridge => bridge.status === this.currentBridgeStatus);
        }
        
        return data;
    }

    // 교량 필터 적용
    filterBridges() {
        this.currentBridgeRegion = document.getElementById('bridge-region-filter').value;
        this.currentBridgeType = document.getElementById('bridge-type-filter').value;
        this.currentBridgeMethod = document.getElementById('bridge-method-filter').value;
        this.currentBridgeStatus = document.getElementById('bridge-status-filter').value;
        
        this.renderBridgeTable();
    }

    // SMS 발송
    sendSMS() {
        const recipient = document.getElementById('sms-recipient').value;
        const message = document.getElementById('sms-message').value;
        
        if (!recipient || !message) {
            window.dashboardUtils.showAlert('받는 사람과 메시지를 모두 입력해주세요.');
            return;
        }
        
        // 실제 SMS 발송 로직은 서버 연동 필요
        window.dashboardUtils.showAlert('문자가 발송되었습니다! 📱');
        this.hideSMSModal();
        
        // 입력 필드 초기화
        document.getElementById('sms-recipient').value = '';
        document.getElementById('sms-message').value = '';
        document.getElementById('sms-char-count').textContent = '0';
    }

    // 모달 HTML 생성 메서드들
    createManagerCriteriaModal() {
        const modalHtml = `
            <div class="manager-criteria-modal" id="manager-criteria-modal" onclick="window.dashboardModals.hideManagerCriteria()">
                <div class="manager-criteria-content" onclick="event.stopPropagation()">
                    <div class="criteria-modal-header">
                        <h3 class="criteria-modal-title">품질관리자 배치기준</h3>
                        <button class="criteria-close" onclick="window.dashboardModals.hideManagerCriteria()">×</button>
                    </div>
                    <div class="criteria-content"></div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHtml);
    }

    createBridgeModal() {
        const modalHtml = `
            <div class="bridge-modal" id="bridge-modal" onclick="window.dashboardModals.hideBridgeModal()">
                <div class="bridge-modal-content" onclick="event.stopPropagation()">
                    <div class="bridge-modal-header">
                        <h3 class="bridge-modal-title">🌉 교량 상세 현황</h3>
                        <button class="bridge-close" onclick="window.dashboardModals.hideBridgeModal()">×</button>
                    </div>
                    <div class="bridge-filter-container">
                        <div class="bridge-filter-group">
                            <label class="bridge-filter-label">권역</label>
                            <select class="bridge-filter-select" id="bridge-region-filter" onchange="window.dashboardModals.filterBridges()">
                                <option value="전체">전체</option>
                                <option value="수도권">수도권</option>
                                <option value="강원권">강원권</option>
                                <option value="충청권">충청권</option>
                                <option value="영남권">영남권</option>
                                <option value="호남권">호남권</option>
                                <option value="제주권">제주권</option>
                            </select>
                        </div>
                        <div class="bridge-filter-group">
                            <label class="bridge-filter-label">교량형식</label>
                            <select class="bridge-filter-select" id="bridge-type-filter" onchange="window.dashboardModals.filterBridges()">
                                <option value="전체">전체</option>
                                <option value="현수교">현수교</option>
                                <option value="사장교">사장교</option>
                                <option value="트러스교">트러스교</option>
                                <option value="박스거더교">박스거더교</option>
                            </select>
                        </div>
                        <div class="bridge-filter-group">
                            <label class="bridge-filter-label">공법명</label>
                            <select class="bridge-filter-select" id="bridge-method-filter" onchange="window.dashboardModals.filterBridges()">
                                <option value="전체">전체</option>
                                <option value="FCM공법">FCM공법</option>
                                <option value="MSS공법">MSS공법</option>
                                <option value="FSM공법">FSM공법</option>
                            </select>
                        </div>
                        <div class="bridge-filter-group">
                            <label class="bridge-filter-label">상태</label>
                            <select class="bridge-filter-select" id="bridge-status-filter" onchange="window.dashboardModals.filterBridges()">
                                <option value="전체">전체</option>
                                <option value="시공중">시공중</option>
                                <option value="완료">완료</option>
                            </select>
                        </div>
                    </div>
                    <div class="bridge-table-container">
                        <table class="bridge-table">
                            <thead>
                                <tr>
                                    <th>교량명</th>
                                    <th>교량형식</th>
                                    <th>공법명</th>
                                    <th>총연장(m)</th>
                                    <th>경간장(m)</th>
                                    <th>폭원(m)</th>
                                    <th>권역</th>
                                    <th>상태</th>
                                </tr>
                            </thead>
                            <tbody id="bridge-table-body"></tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHtml);
    }

    createSMSModal() {
        const modalHtml = `
            <div class="sms-modal" id="sms-modal" onclick="window.dashboardModals.hideSMSModal()">
                <div class="sms-modal-content" onclick="event.stopPropagation()">
                    <div class="sms-modal-header">
                        <h3 class="sms-modal-title">📱 문자 발송</h3>
                        <button class="sms-close" onclick="window.dashboardModals.hideSMSModal()">×</button>
                    </div>
                    <div class="sms-form-group">
                        <label class="sms-label">받는 사람</label>
                        <input type="text" class="sms-input" id="sms-recipient" placeholder="전화번호를 입력하세요">
                    </div>
                    <div class="sms-form-group">
                        <label class="sms-label">메시지 내용</label>
                        <textarea class="sms-textarea" id="sms-message" placeholder="전송할 메시지를 입력하세요" maxlength="90"></textarea>
                        <div class="sms-char-count">
                            <span id="sms-char-count">0</span>/90자
                        </div>
                    </div>
                    <div class="sms-buttons">
                        <button class="sms-btn sms-btn-cancel" onclick="window.dashboardModals.hideSMSModal()">취소</button>
                        <button class="sms-btn sms-btn-send" onclick="window.dashboardModals.sendSMS()">발송</button>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHtml);
        
        // 문자 수 카운터 이벤트 추가
        const messageTextarea = document.getElementById('sms-message');
        const charCount = document.getElementById('sms-char-count');
        
        if (messageTextarea && charCount) {
            messageTextarea.addEventListener('input', function() {
                charCount.textContent = this.value.length;
            });
        }
    }
}

// 전역 모달 관리자 인스턴스 생성
export const modalManager = new ModalManager();

// 전역 함수들 (HTML에서 직접 호출용)
window.showManagerCriteria = () => modalManager.showManagerCriteria();
window.hideManagerCriteria = () => modalManager.hideManagerCriteria();
