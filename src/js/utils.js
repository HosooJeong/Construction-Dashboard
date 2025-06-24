// 유틸리티 및 공통 기능 모듈

// 알림 표시 함수
export function showAlert(message, duration = 3000) {
    const existingAlert = document.querySelector('.notification');
    if (existingAlert) {
        existingAlert.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, duration);
}

// 작업 필터 토글
export function toggleWorkFilter(element) {
    const checkbox = element.querySelector('.work-checkbox');
    const isChecked = checkbox.checked;
    
    checkbox.checked = !isChecked;
    
    if (checkbox.checked) {
        element.classList.add('checked');
    } else {
        element.classList.remove('checked');
    }
    
    // 기타 필터 체크 시 검색창 표시/숨김
    const workSearchContainer = document.getElementById('work-search-container');
    const isOtherChecked = element.querySelector('.work-checkbox-label').textContent.includes('기타');
    
    if (isOtherChecked && workSearchContainer) {
        if (checkbox.checked) {
            workSearchContainer.style.display = 'flex';
            setTimeout(() => {
                document.getElementById('work-search-input').focus();
            }, 100);
        } else {
            workSearchContainer.style.display = 'none';
        }
    }
    
    showAlert(`${element.querySelector('.work-checkbox-label').textContent} 필터가 ${checkbox.checked ? '활성화' : '비활성화'}되었습니다.`);
}

// 작업 검색 함수
export function searchWork() {
    const searchInput = document.getElementById('work-search-input');
    const keyword = searchInput.value.trim();
    
    if (!keyword) {
        showAlert('검색 키워드를 입력해주세요.');
        return;
    }
    
    showAlert(`"${keyword}" 검색 결과를 표시합니다. 🔍`);
}

// 챗봇 관리 클래스
class ChatBot {
    constructor() {
        this.messages = [
            {
                type: 'bot',
                content: '안녕하세요! 건설공사 품질관리에 대해 궁금한 점이 있으시면 언제든 물어보세요.'
            },
            {
                type: 'user',
                content: '강우시 콘크리트 타설 기준은?'
            },
            {
                type: 'bot',
                content: `강우시 콘크리트 타설 기준은 다음과 같습니다:<br><br>
                • 강수량: 시간당 15mm 이하<br>
                • 일 강수량: 50mm 이하<br>
                • 강우 중 타설 금지 원칙<br>
                • 타설 후 2시간 이내 강우 시 양생보호 필수<br>
                • 강우 예보 시 타설 계획 조정 권장<br><br>
                💡 현재 대시보드에서 실시간 기상정보를 확인하실 수 있습니다!`
            }
        ];
        
        this.setupChatBot();
    }
    
    setupChatBot() {
        const chatSendBtn = document.getElementById('chat-send-btn');
        const chatInput = document.getElementById('chat-input');
        
        if (chatSendBtn) {
            chatSendBtn.addEventListener('click', () => this.sendMessage());
        }
        
        if (chatInput) {
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.sendMessage();
                }
            });
        }
        
        this.renderMessages();
    }
    
    sendMessage() {
        const chatInput = document.getElementById('chat-input');
        const message = chatInput.value.trim();
        
        if (!message) return;
        
        this.messages.push({
            type: 'user',
            content: message
        });
        
        const botResponse = this.generateBotResponse(message);
        this.messages.push({
            type: 'bot',
            content: botResponse
        });
        
        chatInput.value = '';
        this.renderMessages();
    }
    
    generateBotResponse(userMessage) {
        const message = userMessage.toLowerCase();
        
        if (message.includes('강우') || message.includes('비') || message.includes('날씨')) {
            return `날씨와 관련된 품질관리 기준을 안내드립니다:<br><br>
            🌧️ <strong>강우시</strong>: 시간당 15mm 이하, 타설 금지<br>
            🌡️ <strong>고온시</strong>: 35°C 이상시 작업시간 조정<br>
            ❄️ <strong>저온시</strong>: 5°C 미만시 보온양생 실시<br>
            💨 <strong>강풍시</strong>: 15m/s 이상시 크레인 작업 중단<br><br>
            실시간 현장별 날씨 정보는 대시보드에서 확인 가능합니다! ☁️`;
        }
        
        if (message.includes('콘크리트') || message.includes('타설')) {
            return `콘크리트 타설 품질관리 요점입니다:<br><br>
            🚛 <strong>재료관리</strong>: 슬럼프, 공기량, 염분함량 확인<br>
            ⏰ <strong>타설시기</strong>: 운반시간 90분 이내<br>
            🔨 <strong>다짐</strong>: 진동기 사용, 과다짐 금지<br>
            🛡️ <strong>양생</strong>: 7일간 습윤양생 실시<br><br>
            현재 진행중인 타설 현장은 레미콘 타설 위젯에서 확인하세요! 🚧`;
        }
        
        if (message.includes('품질관리자') || message.includes('배치')) {
            return `품질관리자 배치기준 정보입니다:<br><br>
            🔥 <strong>특급</strong>: 1,000억원 이상 대형공사<br>
            ⭐ <strong>고급</strong>: 500~1,000억원 공사<br>
            🛠️ <strong>중급</strong>: 100~500억원 공사<br>
            📋 <strong>초급</strong>: 2~100억원 공사<br><br>
            자세한 배치기준은 '📋 배치 기준' 버튼을 클릭해주세요! 👷‍♂️`;
        }
        
        return `문의해주신 내용을 잘 접수했습니다! 🤖<br><br>
        다음과 같은 주제로 도움을 드릴 수 있습니다:<br>
        • 날씨별 시공기준 (강우, 고온, 저온, 강풍)<br>
        • 콘크리트 타설 품질관리<br>
        • 품질관리자 배치기준<br>
        • 건설현장 안전관리<br><br>
        더 구체적인 질문을 해주시면 정확한 답변을 드릴게요! 😊`;
    }
    
    renderMessages() {
        const container = document.getElementById('chat-messages');
        if (!container) return;
        
        let html = '';
        for (let i = 0; i < this.messages.length; i++) {
            const msg = this.messages[i];
            html += `<div class="chat-message chat-${msg.type}">${msg.content}</div>`;
        }
        
        container.innerHTML = html;
        container.scrollTop = container.scrollHeight;
    }
}

// 드래그 앤 드롭 기능
export function setupDragAndDrop() {
    const gridItems = document.querySelectorAll('.grid-item');
    
    gridItems.forEach(item => {
        item.addEventListener('dragstart', handleDragStart);
        item.addEventListener('dragover', handleDragOver);
        item.addEventListener('drop', handleDrop);
        item.addEventListener('dragend', handleDragEnd);
    });
}

let draggedElement = null;

function handleDragStart(e) {
    draggedElement = this;
    this.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.outerHTML);
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }
    
    e.dataTransfer.dropEffect = 'move';
    
    if (this !== draggedElement) {
        this.classList.add('drag-over');
    }
    
    return false;
}

function handleDrop(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    }
    
    if (draggedElement !== this) {
        const draggedHTML = draggedElement.outerHTML;
        const droppedHTML = this.outerHTML;
        
        draggedElement.outerHTML = droppedHTML;
        this.outerHTML = draggedHTML;
        
        showAlert('위젯 위치가 변경되었습니다! 🔄');
        
        setTimeout(() => {
            setupDragAndDrop();
            if (window.dashboardCharts) {
                window.dashboardCharts.setupFilterButtons();
            }
        }, 100);
    }
    
    this.classList.remove('drag-over');
    return false;
}

function handleDragEnd(e) {
    const items = document.querySelectorAll('.grid-item');
    items.forEach(item => {
        item.classList.remove('dragging', 'drag-over');
    });
}

// 챗봇 인스턴스 생성 및 내보내기
export const chatBot = new ChatBot();

// 전역 함수들 (HTML에서 직접 호출용)
window.toggleWorkFilter = toggleWorkFilter;
window.searchWork = searchWork;
