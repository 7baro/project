const today = new Date();
const tomorrow = new Date();
tomorrow.setDate(today.getDate() + 1);

const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

document.getElementById('check-in').value = formatDate(today);
document.getElementById('check-out').value = formatDate(tomorrow);

document.getElementById('check-in').setAttribute('min', formatDate(today));

document.getElementById('check-in').addEventListener('change', function() {
    const checkInDate = this.value;
    document.getElementById('check-out').setAttribute('min', checkInDate);
    
    if (document.getElementById('check-out').value < checkInDate) {
        const newCheckOut = new Date(checkInDate);
        newCheckOut.setDate(newCheckOut.getDate() + 1);
        document.getElementById('check-out').value = formatDate(newCheckOut);
    }
});

const languageToggle = document.getElementById('language-toggle');
let isArabic = false;

const arabicTranslations = {
    "language-toggle": "English",
    "signin-text": "تسجيل الدخول",
    
    "property-type-label": "نوع العقار",
    "property-type-option": "اختر النوع",
    "chalet-option": "شاليه",
    "hall-option": "قاعة",
    "check-in-label": "تاريخ الوصول",
    "check-out-label": "تاريخ المغادرة",
    "search-text": "بحث",
    
    "available-title": "الشاليهات والقاعات المتاحة",
    "property-title-1": "placeholder",
    "feature-1": "حتى 10 ضيوف",
    "feature-2": "4 غرف نوم",
    "feature-3": "3 حمامات",
    "feature-4": "220 متر مربع",
    "night-text": "ليلة",
    "details-text": "عرض التفاصيل"
};

const englishTranslations = {
    "language-toggle": "العربية",
    "signin-text": "Sign In",
    
    "property-type-label": "Property Type",
    "property-type-option": "Select Type",
    "chalet-option": "Chalet",
    "hall-option": "Hall",
    "check-in-label": "Check-in Date",
    "check-out-label": "Check-out Date",
    "search-text": "Search",
    
    "available-title": "Available Chalets & Halls",
    "property-title-1": "Luxury Mountain Chalet",
    "feature-1": "Up to 10 guests",
    "feature-2": "4 bedrooms",
    "feature-3": "3 bathrooms",
    "feature-4": "220 m²",
    "night-text": "night",
    "details-text": "View Details"
};

languageToggle.addEventListener('click', function() {
    isArabic = !isArabic;
    
    if (isArabic) {
        document.body.classList.add('rtl');
        document.body.setAttribute('dir', 'rtl');
        translatePage(arabicTranslations);
        languageToggle.innerHTML = '<i class="fas fa-globe"></i>English';
    } else {
        document.body.classList.remove('rtl');
        document.body.removeAttribute('dir');
        translatePage(englishTranslations);
        languageToggle.innerHTML = '<i class="fas fa-globe"></i>العربية';
    }
});

function translatePage(translations) {
    for (const [id, text] of Object.entries(translations)) {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = text;
        }
    }
    
    if (isArabic) {
        document.getElementById('property-type').options[0].text = translations['property-type-option'];
        document.getElementById('property-type').options[1].text = translations['chalet-option'];
        document.getElementById('property-type').options[2].text = translations['hall-option'];
    } else {
        document.getElementById('property-type').options[0].text = translations['property-type-option'];
        document.getElementById('property-type').options[1].text = translations['chalet-option'];
        document.getElementById('property-type').options[2].text = translations['hall-option'];
    }
    
    document.querySelector('.signin-btn').innerHTML = `<i class="fas fa-user"></i>${translations['signin-text']}`;
}

const dateInputs = document.querySelectorAll('.large-date');
dateInputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.style.transform = 'scale(1.05)';
        this.style.boxShadow = '0 5px 15px rgba(45, 92, 127, 0.2)';
    });
    
    input.addEventListener('blur', function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = 'none';
    });
});