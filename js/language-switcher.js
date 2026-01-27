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
    // Find all portfolio modals and update their content
    const modals = document.querySelectorAll('.portfolio-modal');
    
    modals.forEach(modal => {
        const titleElement = modal.querySelector('h2');
        const descriptionElement = modal.querySelector('.modal-body > div');
        
        // Get title from data attributes
        const titleData = modal.getAttribute('data-title-' + lang);
        if (titleElement && titleData) {
            titleElement.textContent = titleData;
        }
        
        // Get description from data attributes
        const descriptionData = modal.getAttribute('data-description-' + lang);
        if (descriptionElement && descriptionData) {
            descriptionElement.innerHTML = descriptionData;
        }
    });
}

// Initialize language on page load
document.addEventListener('DOMContentLoaded', function() {
    const savedLang = localStorage.getItem('preferred-language') || 'en';
    switchLanguage(savedLang);
});