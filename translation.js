const languageToggle = document.getElementById('language-toggle');
let isArabic = false;

const dayNamesEN = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const monthNamesEN = ['January','February','March','April','May','June','July','August','September','October','November','December'];

const dayNamesAR = ['الأحد','الاثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'];
const monthNamesAR = ['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'];

let dayNames = dayNamesEN.slice();
let monthNames = monthNamesEN.slice();

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

    "up-to-guests": "حتى ??? ضيوف",
    "bedrooms": "??? غرف نوم",
    "bathrooms": "??? حمامات",
    "area": "??? م²",
    "night": "ليلة",
    "view-details": "عرض التفاصيل",

    "welcome-title": "أهلاً بك!",
    "welcome-subtitle": "أدخل رقم هاتفك لإنشاء حساب أو تسجيل الدخول",
    "phone-label": "رقم الهاتف",
    "firstname-placeholder": "الاسم الأول",
    "familyname-placeholder": "اسم العائلة",
    "email-placeholder": "البريد الإلكتروني",
    "thankyou-title": "تم بنجاح!",
    "thankyou-message": "تم إنشاء حسابك بنجاح.",
    "btn-next": "متابعة",
    "btn-back": "رجوع",
    "btn-submit": "إنشاء حساب",
    "phone-error": "يرجى إدخال رقم هاتف صحيح",
    "name-error": "يرجى إدخال اسم صحيح",
    "email-error": "يرجى إدخال بريد إلكتروني صحيح",

    "home": "الرئيسية",
    "chalets": "الشاليهات",
    "property-title": "placeholder",
    "property-location": "placeholder",
    "property-price": "??? / ليلة",
    "property-description": "placeholder.",
    "booking-title": "احجزه ",
    "guests-label": "الضيوف",
    "book-btn": "تحقق من التوافر",
    "amenities-title": "المرافق",
    "description-title": "الوصف",
    "reviews-title": "تقييمات الضيوف"
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

    "up-to-guests": "Up to ??? guests",
    "bedrooms": "??? bedrooms",
    "bathrooms": "??? bathrooms",
    "area": "??? m²",
    "night": "night",
    "view-details": "View Details",

    "welcome-title": "Welcome!",
    "welcome-subtitle": "Enter your phone number to create account or login",
    "phone-label": "Phone Number",
    "firstname-placeholder": "First Name",
    "familyname-placeholder": "Family Name",
    "email-placeholder": "Email Address",
    "thankyou-title": "Success!",
    "thankyou-message": "Your account has been created successfully.",
    "btn-next": "Continue",
    "btn-back": "Back",
    "btn-submit": "Create Account",
    "phone-error": "Please enter a valid phone number",
    "name-error": "Please enter a valid name",
    "email-error": "Please enter a valid email address",

    "home": "Home",
    "chalets": "Chalets",
    "property-title": "placeholder",
    "property-location": "placeholder",
    "property-price": "??? / night",
    "property-description": "placeholder.",
    "booking-title": "Book it",
    "guests-label": "Guests",
    "book-btn": "Check Availability",
    "amenities-title": "Amenities",
    "description-title": "Description",
    "reviews-title": "Guest Reviews"
};

function applyTranslations(t) {
    const safeSet = (id, key, attr = 'textContent') => {
        const el = document.getElementById(id);
        if (el && t[key]) el[attr] = t[key];
    };

    safeSet('signin-text', 'signin-text');
    safeSet('property-type-label', 'property-type-label');
    safeSet('check-in-label', 'check-in-label');
    safeSet('check-out-label', 'check-out-label');
    safeSet('search-text', 'search-text');
    safeSet('available-title', 'available-title');
    safeSet('welcome-title', 'welcome-title');
    safeSet('welcome-subtitle', 'welcome-subtitle');
    safeSet('phone-number', 'phone-label', 'placeholder');
    safeSet('first-name', 'firstname-placeholder', 'placeholder');
    safeSet('family-name', 'familyname-placeholder', 'placeholder');
    safeSet('email', 'email-placeholder', 'placeholder');
    safeSet('thankyou-title', 'thankyou-title');
    safeSet('thankyou-message', 'thankyou-message');
    safeSet('btn-next', 'btn-next');
    safeSet('btn-back', 'btn-back');
    safeSet('btn-submit', 'btn-submit');

    const propertyType = document.getElementById('property-type');
    if (propertyType) {
        propertyType.options[0].text = t['property-type-option'];
        propertyType.options[1].text = t['chalet-option'];
        propertyType.options[2].text = t['hall-option'];
    }

    document.querySelectorAll('.translate').forEach(element => {
        const key = element.getAttribute('data-key');
        if (t[key]) element.textContent = t[key];
    });

    document.querySelectorAll('.error-message').forEach(el => {
        const field = el.getAttribute('data-field');
        if (field && t[field + '-error']) {
            el.textContent = t[field + '-error'];
        }
    });
}

languageToggle.addEventListener('click', () => {
    isArabic = !isArabic;
    if (isArabic) {
        document.body.classList.add('rtl');
        document.body.setAttribute('dir', 'rtl');
        dayNames = dayNamesAR.slice();
        monthNames = monthNamesAR.slice();
        applyTranslations(arabicTranslations);
        languageToggle.innerHTML = '<i class="fas fa-globe"></i>English';
    } else {
        document.body.classList.remove('rtl');
        document.body.removeAttribute('dir');
        dayNames = dayNamesEN.slice();
        monthNames = monthNamesEN.slice();
        applyTranslations(englishTranslations);
        languageToggle.innerHTML = '<i class="fas fa-globe"></i>العربية';
    }

    if (typeof daysHeader !== 'undefined') {
        daysHeader.innerHTML = '';
        dayNames.forEach(name => {
            const el = document.createElement('div');
            el.className = 'calendar-day-header';
            el.textContent = name;
            daysHeader.appendChild(el);
        });

        updateDisplays();
        generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
    }

    const currentlyDark = document.body.classList.contains('dark');
    if (themeToggle) {
        const span = themeToggle.querySelector('#theme-text') || themeToggle.querySelector('span');
        if (span) span.textContent = currentlyDark ? (isArabic ? 'فاتح' : 'Light') : (isArabic ? 'غامق' : 'Dark');
    }
});

applyTranslations(englishTranslations);
