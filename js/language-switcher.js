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
            // For CTA buttons, update the span inside
            const span = element.querySelector('span');
            if (span) {
                span.textContent = text;
            } else {
                element.textContent = text;
            }
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
            en: { title: "Shownote Brand Analysis", description: "Use this area of the page to describe your project. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia neque assumenda ipsam nihil, molestias magnam, recusandae quos quis inventore quisquam velit asperiores, vitae? Reprehenderit soluta, eos quod consequuntur itaque. Nam." },
            ko: { title: "쇼노트 기업 분석 리포트", description: "이 영역을 사용하여 프로젝트를 설명하세요. 고객 세그멘테이션 및 타겟팅 프로젝트로, 머신러닝을 활용한 개인화 추천 시스템을 구축했습니다." }
        },
        4: {
            en: { 
                title: "Market Analysis and B2B/B2C Marketing Strategy for the Feels Wearable Device", 
                description: "Validating Market Growth and Campaign Timing through Google Trends–Based Demand Analysis\n\nThis project analyzes the wearable healthcare device Feels, with a focus on quantitatively validating market growth and optimal marketing timing using real demand data, rather than relying solely on qualitative market narratives.\nWhile academic papers and industry reports were referenced as supporting context, the core analysis is based on five years of Google Trends search volume data, collected and analyzed directly.\n\nKey analytical outcomes include:\nIdentification of sustained market growth, indicating that the category has moved beyond a short-term trend\nTime-series decomposition revealing clear seasonality with two annual demand peaks (January and August)\n\nStrategic alignment of campaign objectives with seasonal demand patterns:\n- January: B2C-focused campaigns targeting end users\n- August: B2B-focused campaigns targeting institutions\n\nGiven that Feels operates through partnerships with hospitals and counseling centers, the proposed strategy follows a B2B-first approach, securing institutional partners ahead of demand peaks, followed by localized B2C expansion that guides users to nearby service providers.\n\nThis project demonstrates how search behavior data can be translated into actionable marketing decisions, bridging data analysis and business strategy." 
            },
            ko: { 
                title: "Feels 웨어러블 기기 시장 분석 및 B2B·B2C 마케팅 전략 제언", 
                description: "Google Trends 기반 수요 분석으로 검증한 웨어러블 헬스케어 시장의 성장성과 캠페인 타이밍\n\n본 프로젝트는 웨어러블 헬스케어 기기 Feels를 대상으로, 정성적 시장 논의에 그치지 않고 실제 수요 데이터 기반으로 시장의 성장성과 마케팅 집행 시점을 검증하는 데 초점을 맞췄습니다.\n논문·산업 리포트에서 제시하는 시장 전망을 보조 지표로 활용하되, 핵심 분석은 Google Trends의 5년치 검색량 데이터를 직접 수집·가공하여 수행했습니다.\n\n- 검색량 추이를 통해 해당 시장이 단기 유행이 아닌, 지속 성장 국면에 진입했음을 정량적으로 확인\n- 시계열 분해를 통해 연 2회(1월, 8월) 반복적으로 나타나는 시즌성 패턴을 도출\n- 시즌별 수요 맥락을 고려해 1월은 B2C, 8월은 B2B 중심의 캠페인 전략을 제안\n\n특히 Feels 제품이 병원·상담센터 등 기관과의 연계를 전제로 한다는 점을 반영하여,\nB2B 선행 → 지역 기반 B2C 확장 구조의 마케팅 시나리오를 설계했습니다.\n이는 단순 캠페인 아이디어가 아니라, 데이터로 검증된 수요 타이밍에 맞춘 실행 전략이라는 점에서 차별성을 가집니다." 
            }
        },
        5: {
            en: { title: "Safe Project", description: "Use this area of the page to describe your project. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia neque assumenda ipsam nihil, molestias magnam, recusandae quos quis inventore quisquam velit asperiores, vitae? Reprehenderit soluta, eos quod consequuntur itaque. Nam." },
            ko: { title: "세이프 프로젝트", description: "이 영역을 사용하여 프로젝트를 설명하세요. 보안 데이터 분석 프로젝트로, 이상 거래 탐지 및 리스크 관리 시스템을 구축했습니다." }
        },
        6: {
            en: { title: "hanzzan - Premium Liqure Newsletter", description: "Use this area of the page to describe your project. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia neque assumenda ipsam nihil, molestias magnam, recusandae quos quis inventore quisquam velit asperiores, vitae? Reprehenderit soluta, eos quod consequuntur itaque. Nam." },
            ko: { title: "한잔레터 - 프리미엄 주류 뉴스레터", description: "이 영역을 사용하여 프로젝트를 설명하세요. 딥러닝 기반 예측 모델링 프로젝트로, 시계열 데이터를 활용한 수요 예측 시스템을 개발했습니다." }
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
                descriptionElement.innerHTML = portfolioData[modalId][lang].description.replace(/\n/g, '<br>');
            }
        }
    });
}

// Initialize language on page load
document.addEventListener('DOMContentLoaded', function() {
    const savedLang = localStorage.getItem('preferred-language') || 'en';
    switchLanguage(savedLang);
});