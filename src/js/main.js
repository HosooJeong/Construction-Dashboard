// 메인 애플리케이션 모듈
import { initializeCharts, setupFilterButtons } from './charts.js';
import { modalManager } from './modals.js';
import { showAlert, setupDragAndDrop, chatBot, toggleWorkFilter, searchWork } from './utils.js';

// 🚀 즉시 전역 함수 등록 (DOM 로드 전에 실행)
function registerGlobalFunctions() {
    // 모달 관련 함수들
    window.showManagerCriteria = () => modalManager.showManagerCriteria();
    window.hideManagerCriteria = () => modalManager.hideManagerCriteria();
    
    // 유틸리티 함수들
    window.toggleWorkFilter = toggleWorkFilter;
    window.searchWork = searchWork;
    
    // 전역 객체들
    window.dashboardModals = {
        showManagerCriteria: () => modalManager.showManagerCriteria(),
        hideManagerCriteria: () => modalManager.hideManagerCriteria(),
        showBridgeModal: () => modalManager.showBridgeModal(),
        hideBridgeModal: () => modalManager.hideBridgeModal(),
        showSMSModal: () => modalManager.showSMSModal(),
        hideSMSModal: () => modalManager.hideSMSModal(),
        filterBridges: () => modalManager.filterBridges(),
        sendSMS: () => modalManager.sendSMS()
    };
    
    window.dashboardUtils = {
        showAlert: showAlert,
        setupDragAndDrop: setupDragAndDrop
    };
    
    console.log('✅ 전역 함수 등록 완료');
}

// 즉시 전역 함수 등록
registerGlobalFunctions();

// 메인 대시보드 애플리케이션 클래스
class Dashboard {
    constructor() {
        this.isInitialized = false;
    }

    // 대시보드 초기화
    async init() {
        if (this.isInitialized) return;
        
        try {
            console.log('🚀 대시보드 초기화 시작...');
            
            // DOM이 준비될 때까지 대기
            if (document.readyState === 'loading') {
                await new Promise(resolve => {
                    document.addEventListener('DOMContentLoaded', resolve);
                });
            }
            
            // 초기 차트 및 데이터 렌더링
            initializeCharts();
            
            // 필터 버튼 이벤트 설정
            setupFilterButtons();
            
            // 드래그 앤 드롭 설정
            setupDragAndDrop();
            
            // SMS 버튼 이벤트 설정
            this.setupSMSButtons();
            
            // 차트 관련 전역 객체 추가
            window.dashboardCharts = {
                setupFilterButtons: setupFilterButtons
            };
            
            // 메인 대시보드 인스턴스
            window.dashboard = this;
            
            this.isInitialized = true;
            
            console.log('✅ 대시보드 초기화 완료!');
            showAlert('대시보드가 성공적으로 로드되었습니다! 🎉');
            
        } catch (error) {
            console.error('❌ 대시보드 초기화 중 오류:', error);
            showAlert('대시보드 로드 중 오류가 발생했습니다. 페이지를 새로고침해주세요.');
        }
    }
    
    // SMS 버튼 이벤트 설정
    setupSMSButtons() {
        const smsButtons = document.querySelectorAll('.sms-button, #sms-button, #paving-sms-button');
        
        smsButtons.forEach(button => {
            if (button) {
                button.addEventListener('click', () => {
                    modalManager.showSMSModal();
                });
            }
        });
    }
    
    // 대시보드 재시작
    restart() {
        console.log('🔄 대시보드 재시작...');
        this.isInitialized = false;
        this.init();
    }
    
    // 대시보드 상태 확인
    getStatus() {
        return {
            initialized: this.isInitialized,
            timestamp: new Date().toISOString(),
            modules: {
                charts: !!window.dashboardCharts,
                modals: !!window.dashboardModals,
                utils: !!window.dashboardUtils
            }
        };
    }
}

// 대시보드 인스턴스 생성
const dashboard = new Dashboard();

// 페이지 로드 시 자동 초기화
if (typeof window !== 'undefined') {
    // 브라우저 환경에서만 실행
    dashboard.init();
    
    // 페이지 새로고침 시에도 상태 유지
    window.addEventListener('beforeunload', () => {
        console.log('📄 페이지 종료 중...');
    });
    
    // 에러 핸들링
    window.addEventListener('error', (event) => {
        console.error('🚨 전역 에러 발생:', event.error);
        showAlert('시스템 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    });
}

// 모듈 내보내기
export default dashboard;
export { Dashboard };
