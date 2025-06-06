// Function to change the language
function changeLanguage(lang) {
    // Save the selected language to localStorage
    localStorage.setItem('selectedLanguage', lang);
    
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });

    // Update the HTML lang attribute
    document.documentElement.lang = lang;

    // Update the language toggle button text
    const langText = document.querySelector('.lang-text');
    switch(lang) {
        case 'zh-CN':
            langText.textContent = '繁';
            break;
        case 'zh-TW':
            langText.textContent = 'ENG';
            break;
        case 'en':
            langText.textContent = '简';
            break;
    }
}

// Function to initialize the language
function initLanguage() {
    // Get the saved language from localStorage or use browser's language
    const savedLanguage = localStorage.getItem('selectedLanguage');
    const browserLanguage = navigator.language;
    
    // Set initial language
    let initialLang = savedLanguage || 
                     (browserLanguage.startsWith('zh') ? 
                      (browserLanguage.includes('CN') ? 'zh-CN' : 'zh-TW') : 
                      'en');
    
    // Apply the language
    changeLanguage(initialLang);

    // Add click handler for language toggle
    const languageToggle = document.getElementById('languageToggle');
    languageToggle.addEventListener('click', () => {
        const currentLang = document.documentElement.lang;
        let nextLang;
        switch(currentLang) {
            case 'zh-CN':
                nextLang = 'zh-TW';
                break;
            case 'zh-TW':
                nextLang = 'en';
                break;
            case 'en':
                nextLang = 'zh-CN';
                break;
            default:
                nextLang = 'en';
        }
        changeLanguage(nextLang);
    });
}

// Theme switching functionality
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Get saved theme or use system preference
    const savedTheme = localStorage.getItem('theme');
    const initialTheme = savedTheme || (prefersDarkScheme.matches ? 'dark' : 'light');
    
    // Apply initial theme
    document.documentElement.setAttribute('data-theme', initialTheme);
    
    // Theme toggle click handler
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

// Initialize everything when the page loads
document.addEventListener('DOMContentLoaded', () => {
    initLanguage();
    initTheme();
}); 
