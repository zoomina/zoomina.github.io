// Language switcher functionality
function switchLanguage(lang) {
    // Store language preference
    localStorage.setItem('preferred-language', lang);
    
    // Update current language display
    const currentLangSpan = document.getElementById('current-lang');
    if (currentLangSpan) {
        currentLangSpan.textContent = lang === 'ko' ? '한국어' : 'English';
    }
    
    // Update all elements with language data attributes
    const elements = document.querySelectorAll('[data-en][data-ko]');
    elements.forEach(element => {
        const text = element.getAttribute('data-' + lang);
        if (text) {
            element.textContent = text;
        }
    });
    
    // Update portfolio modal content
    updatePortfolioModals(lang);
}

function updatePortfolioModals(lang) {
    // Portfolio data with translations
    const portfolioData = {
        1: {
            en: { title: "Cabin Project", description: "Use this area of the page to describe your project. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia neque assumenda ipsam nihil, molestias magnam, recusandae quos quis inventore quisquam velit asperiores, vitae? Reprehenderit soluta, eos quod consequuntur itaque. Nam." },
            ko: { title: "캐빈 프로젝트", description: "이 영역을 사용하여 프로젝트를 설명하세요. 데이터 분석 및 시각화 프로젝트로, 고객 행동 패턴을 분석하고 인사이트를 도출하는 작업을 수행했습니다." }
        },
        2: {
            en: { title: "Cake Project", description: "Use this area of the page to describe your project. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia neque assumenda ipsam nihil, molestias magnam, recusandae quos quis inventore quisquam velit asperiores, vitae? Reprehenderit soluta, eos quod consequuntur itaque. Nam." },
            ko: { title: "케이크 프로젝트", description: "이 영역을 사용하여 프로젝트를 설명하세요. 마케팅 캠페인 성과 분석 프로젝트로, ROI 최적화를 위한 데이터 기반 의사결정을 지원했습니다." }
        },
        3: {
            en: { title: "Circus Project", description: "Use this area of the page to describe your project. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia neque assumenda ipsam nihil, molestias magnam, recusandae quos quis inventore quisquam velit asperiores, vitae? Reprehenderit soluta, eos quod consequuntur itaque. Nam." },
            ko: { title: "서커스 프로젝트", description: "이 영역을 사용하여 프로젝트를 설명하세요. 고객 세그멘테이션 및 타겟팅 프로젝트로, 머신러닝을 활용한 개인화 추천 시스템을 구축했습니다." }
        },
        4: {
            en: { title: "Game Project", description: "Use this area of the page to describe your project. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia neque assumenda ipsam nihil, molestias magnam, recusandae quos quis inventore quisquam velit asperiores, vitae? Reprehenderit soluta, eos quod consequuntur itaque. Nam." },
            ko: { title: "게임 프로젝트", description: "이 영역을 사용하여 프로젝트를 설명하세요. 게임 사용자 행동 분석 프로젝트로, 플레이어 리텐션 향상을 위한 데이터 기반 전략을 수립했습니다." }
        },
        5: {
            en: { title: "Safe Project", description: "Use this area of the page to describe your project. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia neque assumenda ipsam nihil, molestias magnam, recusandae quos quis inventore quisquam velit asperiores, vitae? Reprehenderit soluta, eos quod consequuntur itaque. Nam." },
            ko: { title: "세이프 프로젝트", description: "이 영역을 사용하여 프로젝트를 설명하세요. 보안 데이터 분석 프로젝트로, 이상 거래 탐지 및 리스크 관리 시스템을 구축했습니다." }
        },
        6: {
            en: { title: "Submarine Project", description: "Use this area of the page to describe your project. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia neque assumenda ipsam nihil, molestias magnam, recusandae quos quis inventore quisquam velit asperiores, vitae? Reprehenderit soluta, eos quod consequuntur itaque. Nam." },
            ko: { title: "서브마린 프로젝트", description: "이 영역을 사용하여 프로젝트를 설명하세요. 딥러닝 기반 예측 모델링 프로젝트로, 시계열 데이터를 활용한 수요 예측 시스템을 개발했습니다." }
        }
    };
    
    // Update each modal
    Object.keys(portfolioData).forEach(modalId => {
        const modal = document.getElementById('portfolioModal-' + modalId);
        if (modal) {
            const titleElement = modal.querySelector('h2');
            const descriptionElement = modal.querySelector('p');
            
            if (titleElement && portfolioData[modalId][lang]) {
                titleElement.textContent = portfolioData[modalId][lang].title;
            }
            
            if (descriptionElement && portfolioData[modalId][lang]) {
                descriptionElement.textContent = portfolioData[modalId][lang].description;
            }
        }
    });
}

// Initialize language on page load
document.addEventListener('DOMContentLoaded', function() {
    const savedLang = localStorage.getItem('preferred-language') || 'en';
    switchLanguage(savedLang);
});