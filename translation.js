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
    
  "hero-title": "أدرج عقارك على Evento",
  "hero-paragraph": "انضم إلى آلاف الملاك الذين يحققون دخلًا إضافيًا من خلال تأجير ممتلكاتهم.",
  "get-started-btn": "ابدأ الآن",

  "benefit-1-title": "حقق دخل إضافي",
  "benefit-1-text": "حوّل ممتلكاتك غير المستخدمة إلى مصدر دخل ثابت. حدد الأسعار والتوافر بنفسك.",
  "benefit-2-title": "الوصول إلى المزيد من الضيوف",
  "benefit-2-text": "احصل على آلاف الضيوف المحتملين الباحثين عن أماكن فريدة للإقامة والفعاليات.",
  "benefit-3-title": "مدفوعات آمنة",
  "benefit-3-text": "استلم مدفوعاتك بأمان وفي الوقت المحدد عبر نظامنا الموثوق.",
  "benefit-4-title": "دعم على مدار الساعة",
  "benefit-4-text": "فريق الدعم جاهز لمساعدتك في أي وقت.",

  "about-title": "عن Evento",
  "about-paragraph-1": "Evento هي المنصة الرائدة في السعودية لتأجير العقارات والمساحات.",
  "about-paragraph-2": "مهمتنا هي تسهيل الربح لأصحاب العقارات وتقديم تجارب مميزة للضيوف.",

  "action-title": "جاهز للبدء؟",
    "signin-text": "مفروض مسجل",
  "breadcrumb-home": "الرئيسية",
  "breadcrumb-properties": "عقاراتي",
  "breadcrumb-manage": "إدارة العقار",
  "save-status": "تم حفظ جميع التغييرات بنجاح!",
  "description-title": "الوصف",
  "description-placeholder": "صف عقارك بالتفصيل...",
  "hosted-by": "مستضاف من قبلك",
  "edit-profile": "تعديل الملف الشخصي",
  "tab-amenities": "المرافق",
  "tab-reviews": "التقييمات",
  "tab-location": "الموقع",
  "location-title": "موقع العقار",
  "map-placeholder": "سيتم عرض الخريطة التفاعلية هنا",
  "location-notes-label": "ملاحظات الموقع:",
  "location-notes-placeholder": "أضف أي تفاصيل مهمة أو اتجاهات...",
  "booking-settings-title": "إعدادات الحجز",
  "min-stay-label": "الحد الأدنى للإقامة (ليالٍ)",
  "max-guests-label": "الحد الأقصى للضيوف",
  "checkin-label": "وقت تسجيل الوصول",
  "checkout-label": "وقت تسجيل المغادرة",
  "save-booking-settings": "حفظ إعدادات الحجز",
  "publish-changes": "نشر التغييرات",
  "delete-media-title": "حذف الوسائط",
  "delete-media-confirm": "هل أنت متأكد أنك تريد حذف هذه الوسائط؟ لا يمكن التراجع عن هذا الإجراء.",
  "cancel-delete": "إلغاء",
  "confirm-delete": "حذف",

  "signin-text": "حسابي",
  "welcome-back": "مرحبًا بعودتك،",
  "owner-name": "اسم المالك",
  "dashboard": "لوحة التحكم",
  "my-properties": "عقاراتي",
  "bookings": "الحجوزات",
  "earnings": "الأرباح",
  "analytics": "التحليلات",
  "settings": "الإعدادات",
  "help-center": "مركز المساعدة",
  "dashboard-title": "لوحة تحكم المالك",
  "dashboard-subtitle": "أدر ممتلكاتك وحجوزاتك وأرباحك من مكان واحد",
  "total-properties": "إجمالي العقارات",
  "upcoming-bookings": "الحجوزات القادمة",
  "monthly-earnings": "أرباح هذا الشهر",
  "average-rating": "متوسط التقييم",
  "add-new-property": "أضف عقار جديد",
  "no-properties": "لا توجد عقارات بعد",
  "add-property": "ابدأ بإضافة أول عقار لك على Evento",
  "add-property-btn": "أضف أول عقار",
  "recent-bookings": "الحجوزات الأخيرة",
  "view-all": "عرض الكل",
  "no-bookings": "لا توجد حجوزات بعد",
  "bookings-placeholder": "عند استلامك للحجوزات، ستظهر هنا",
  "performance-overview": "نظرة عامة على الأداء",
  "export-report": "تصدير التقرير",
  "no-data": "لا توجد بيانات حتى الآن",
  "performance-placeholder": "ستظهر مؤشرات الأداء هنا عند وجود عقارات وحجوزات نشطة",



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
    
  "hero-title": "List Your Property on Evento",
  "hero-paragraph": "Join thousands of property owners earning extra income by renting out their spaces.",
  "get-started-btn": "Get Started Today",

  "benefit-1-title": "Earn Extra Income",
  "benefit-1-text": "Turn your unused property into a source of steady income. Set your own prices and availability.",
  "benefit-2-title": "Reach More Guests",
  "benefit-2-text": "Access thousands of potential guests looking for unique accommodations and event spaces.",
  "benefit-3-title": "Secure Payments",
  "benefit-3-text": "Receive secure, timely payments with our trusted payment system and cancellation policies.",
  "benefit-4-title": "24/7 Support",
  "benefit-4-text": "Our dedicated support team is available around the clock to help you with any issues.",

  "about-title": "About Evento",
  "about-paragraph-1": "Evento is Saudi Arabia's leading platform for property rentals and event spaces.",
  "about-paragraph-2": "Our mission is to help property owners monetize their spaces and offer guests great experiences.",

  "action-title": "Ready to Get Started?",
  "action-paragraph": "Join now and start earning from your space.",

    "breadcrumb-home": "Home",
  "breadcrumb-properties": "My Properties",
  "breadcrumb-manage": "Manage Property",
  "save-status": "All changes saved successfully!",
  "description-title": "Description",
  "description-placeholder": "Describe your property in detail...",
  "hosted-by": "Hosted by You",
  "edit-profile": "Edit profile",
  "tab-amenities": "Amenities",
  "tab-reviews": "Reviews",
  "tab-location": "Location",
  "location-title": "Property Location",
  "map-placeholder": "Interactive map would be displayed here",
  "location-notes-label": "Location Notes:",
  "location-notes-placeholder": "Add any important location details or directions...",
  "booking-settings-title": "Booking Settings",
  "min-stay-label": "Minimum Stay (nights)",
  "max-guests-label": "Maximum Guests",
  "checkin-label": "Check-in Time",
  "checkout-label": "Check-out Time",
  "save-booking-settings": "Save Booking Settings",
  "publish-changes": "Publish Changes",
  "delete-media-title": "Delete Media",
  "delete-media-confirm": "Are you sure you want to delete this media? This action cannot be undone.",
  "cancel-delete": "Cancel",
  "confirm-delete": "Delete",


      "signin-text": "My Account",
  "welcome-back": "Welcome back,",
  "owner-name": "Owner Name",
  "dashboard": "Dashboard",
  "my-properties": "My Properties",
  "bookings": "Bookings",
  "earnings": "Earnings",
  "analytics": "Analytics",
  "settings": "Settings",
  "help-center": "Help Center",
  "dashboard-title": "Property Owner Dashboard",
  "dashboard-subtitle": "Manage your properties, bookings, and earnings in one place",
  "total-properties": "Total Properties",
  "upcoming-bookings": "Upcoming Bookings",
  "monthly-earnings": "This Month's Earnings",
  "average-rating": "Average Rating",
  "add-new-property": "Add New Property",
  "no-properties": "No properties yet",
  "add-property": "Get started by adding your first property to list on Evento",
  "add-property-btn": "Add Your First Property",
  "recent-bookings": "Recent Bookings",
  "view-all": "View All",
  "no-bookings": "No bookings yet",
  "bookings-placeholder": "When you receive bookings, they will appear here",
  "performance-overview": "Performance Overview",
  "export-report": "Export Report",
  "no-data": "No data available yet",
  "performance-placeholder": "Performance metrics will appear here once you have active properties and bookings",


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
    document.body.setAttribute('dir', isArabic ? 'rtl' : 'ltr');
});

applyTranslations(englishTranslations);
arabicTranslations["hero-title"] = "أدرج عقارك على Evento";
englishTranslations["hero-title"] = "List Your Property on Evento";
