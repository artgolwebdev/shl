/**
 * Phone Contact Modal Handler
 * Supports Hebrew, Arabic, and English languages
 */

// Language detection based on current page
function getCurrentLanguage() {
    const path = window.location.pathname;
    if (path.includes('/ar')) return 'ar';
    if (path.includes('/en')) return 'en';
    return 'he';
}

// Translations for modal content
const translations = {
    he: {
        title: 'צור קשר',
        subtitle: 'בחר דרך ליצירת קשר',
        callNow: 'התקשר עכשיו',
        whatsapp: 'WhatsApp'
    },
    ar: {
        title: 'اتصل بنا',
        subtitle: 'اختر طريقة للتواصل',
        callNow: 'اتصل الآن',
        whatsapp: 'WhatsApp'
    },
    en: {
        title: 'Contact Us',
        subtitle: 'Choose a way to contact',
        callNow: 'Call Now',
        whatsapp: 'WhatsApp'
    }
};

// Initialize phone modal
function initializePhoneModal() {
    const modal = document.getElementById('phone-modal');
    const phoneButton = document.getElementById('phone-button');
    const closeBtn = modal.querySelector('.modal-close');
    const lang = getCurrentLanguage();
    const t = translations[lang];

    // Update modal content based on language
    const modalTitle = modal.querySelector('.modal-title');
    const modalSubtitle = modal.querySelector('.modal-subtitle');
    const callBtnText = modal.querySelector('.call-btn .btn-text');
    const whatsappBtnText = modal.querySelector('.whatsapp-btn .btn-text');

    if (modalTitle) modalTitle.textContent = t.title;
    if (modalSubtitle) modalSubtitle.textContent = t.subtitle;
    if (callBtnText) callBtnText.textContent = t.callNow;
    if (whatsappBtnText) whatsappBtnText.textContent = t.whatsapp;

    // Open modal when phone button is clicked
    if (phoneButton) {
        phoneButton.addEventListener('click', function(e) {
            e.preventDefault();
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    }

    // Close modal when X is clicked
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
            document.body.style.overflow = ''; // Restore scrolling
        });
    }

    // Close modal when clicking outside the modal content
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = ''; // Restore scrolling
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            modal.style.display = 'none';
            document.body.style.overflow = ''; // Restore scrolling
        }
    });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePhoneModal);
} else {
    initializePhoneModal();
}

