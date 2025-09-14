document.addEventListener('DOMContentLoaded', () => {
     
   // ===== التحقق =====
function isValidPhone(phone) {
    return /^[0-9]{8,15}$/.test(phone.trim());
}
function isValidName(name) {
    return /^[\u0621-\u064Aa-zA-Z\s]+$/.test(name.trim());
}
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}
// ==================

    const checkInDisplay = document.getElementById('check-in-display');
    const checkOutDisplay = document.getElementById('check-out-display');
    const checkInHidden = document.getElementById('check-in');
    const checkOutHidden = document.getElementById('check-out');

    const calendar = document.getElementById('shared-calendar');
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');
    const currentMonthEl = document.getElementById('current-month');
    const currentYearEl = document.getElementById('current-year');
    const calendarDays = document.getElementById('calendar-days');
    const daysHeader = document.getElementById('days-header');

    const languageToggle = document.getElementById('language-toggle');
    let isArabic = false;

    const themeToggle = document.getElementById('theme-toggle') || document.querySelector('.theme-btn');

    const signinBtn = document.getElementById('signin-btn');
    const signinModal = document.getElementById('signin-modal');
    const modalClose = document.getElementById('modal-close');
    const btnNext = document.getElementById('btn-next');
    const btnBack = document.getElementById('btn-back');
    const btnSubmit = document.getElementById('btn-submit');
    const step1 = document.getElementById('step-1');
    const step2 = document.getElementById('step-2');
    const step3 = document.getElementById('step-3');
    let currentStep = 1;

    let today = new Date();
    let currentDate = new Date(today.getFullYear(), today.getMonth(), 1);
    let selectedCheckIn = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    let selectedCheckOut = new Date(selectedCheckIn.getTime() + 24*60*60*1000);
    let activeField = 'check-in';

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
        "property-title-1": "placeholder",
  "up-to-guests": "حتى ??? ضيوف",
  "bedrooms": "??? غرف نوم",
  "bathrooms": "??? حمامات",
  "area": "??? م²",
  "night": "ليلة",
  "view-details": "عرض التفاصيل",
        "details-text": "عرض التفاصيل",
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
        "btn-submit": "إنشاء حساب"
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
  "property-title": "placeholder",
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
        "btn-submit": "Create Account"
    };

    function formatISO(d) {
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${y}-${m}-${day}`;
    }

    function formatWithNames(d) {
        const dayName = dayNames[(d.getDay()+6)%7];
        const monthName = monthNames[d.getMonth()];
        return `${dayName}, ${monthName} ${d.getDate()}, ${d.getFullYear()}`;
    }

    function init() {
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

    function updateDisplays() {
        checkInDisplay.innerHTML = `<i class="fas fa-calendar"></i> ${formatWithNames(selectedCheckIn)}`;
        checkOutDisplay.innerHTML = `<i class="fas fa-calendar"></i> ${formatWithNames(selectedCheckOut)}`;
        checkInHidden.value = formatISO(selectedCheckIn);
        checkOutHidden.value = formatISO(selectedCheckOut);
    }

    function generateCalendar(year, month) {
        currentMonthEl.textContent = monthNames[month];
        currentYearEl.textContent = year;
        calendarDays.innerHTML = '';
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const daysInPrevMonth = new Date(year, month, 0).getDate();

        for (let i = firstDay - 1; i >= 0; i--) {
            const dayNum = daysInPrevMonth - i;
            const d = new Date(year, month - 1, dayNum);
            const cell = createDayCell(d, true);
            calendarDays.appendChild(cell);
        }

        for (let i = 1; i <= daysInMonth; i++) {
            const d = new Date(year, month, i);
            const cell = createDayCell(d, false);
            calendarDays.appendChild(cell);
        }

        const totalCells = 42;
        const used = firstDay + daysInMonth;
        const nextDays = totalCells - used;
        for (let i = 1; i <= nextDays; i++) {
            const d = new Date(year, month + 1, i);
            const cell = createDayCell(d, true);
            calendarDays.appendChild(cell);
        }
    }

    function createDayCell(d, otherMonth) {
        const cell = document.createElement('div');
        cell.className = 'calendar-day' + (otherMonth ? ' other-month' : '');
        const dayIndex = d.getDay();
        const dayNameText = dayNames[dayIndex];
        const dayNumberText = d.getDate();
        cell.innerHTML = `<span class="day-name">${dayNameText}</span><span class="day-number">${dayNumberText}</span>`;
        const isToday = d.getFullYear() === today.getFullYear() && d.getMonth() === today.getMonth() && d.getDate() === today.getDate();
        if (isToday) cell.classList.add('today');
        if (datesEqual(d, selectedCheckIn)) cell.classList.add('selected');
        if (datesEqual(d, selectedCheckOut)) {
            if (!cell.classList.contains('selected')) cell.classList.add('selected');
        }
        cell.addEventListener('click', (e) => {
            e.stopPropagation();
            onDayPicked(new Date(d.getFullYear(), d.getMonth(), d.getDate()));
        });
        return cell;
    }

    function datesEqual(a, b) {
        return a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
    }

    function onDayPicked(date) {
        if (activeField === 'check-in') {
            selectedCheckIn = date;
            const minOut = new Date(selectedCheckIn.getTime() + 24*60*60*1000);
            if (selectedCheckOut <= selectedCheckIn) selectedCheckOut = minOut;
        } else {
            selectedCheckOut = date;
            const minIn = new Date(selectedCheckOut.getTime() - 24*60*60*1000);
            if (selectedCheckOut <= selectedCheckIn) selectedCheckIn = minIn;
        }
        updateDisplays();
        generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
        hideCalendar();
    }

    function showCalendar(anchorEl, forField) {
        activeField = forField;
        calendar.style.display = 'block';
        calendar.setAttribute('aria-hidden', 'false');
        if (forField === 'check-in' && selectedCheckIn) {
            currentDate = new Date(selectedCheckIn.getFullYear(), selectedCheckIn.getMonth(), 1);
        } else if (forField === 'check-out' && selectedCheckOut) {
            currentDate = new Date(selectedCheckOut.getFullYear(), selectedCheckOut.getMonth(), 1);
        } else {
            currentDate = new Date(today.getFullYear(), today.getMonth(), 1);
        }
        generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
        const rect = anchorEl.getBoundingClientRect();
        const top = rect.bottom + 6;
        const left = rect.left;
        const maxRight = window.innerWidth - 12;
        let finalLeft = left;
        if (finalLeft + calendar.offsetWidth > maxRight) finalLeft = Math.max(12, maxRight - calendar.offsetWidth);
        calendar.style.top = `${top}px`;
        calendar.style.left = `${finalLeft}px`;
    }

    function hideCalendar() {
        calendar.style.display = 'none';
        calendar.setAttribute('aria-hidden', 'true');
    }

    prevMonthBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentDate.setMonth(currentDate.getMonth() - 1);
        generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
    });

    nextMonthBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentDate.setMonth(currentDate.getMonth() + 1);
        generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
    });

    checkInDisplay.addEventListener('click', (e) => {
        e.stopPropagation();
        showCalendar(e.currentTarget, 'check-in');
    });

    checkOutDisplay.addEventListener('click', (e) => {
        e.stopPropagation();
        showCalendar(e.currentTarget, 'check-out');
    });

    document.addEventListener('click', (e) => {
        if (!calendar.contains(e.target) && !checkInDisplay.contains(e.target) && !checkOutDisplay.contains(e.target)) {
            hideCalendar();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') hideCalendar();
    });

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
        daysHeader.innerHTML = '';
        dayNames.forEach(name => {
            const el = document.createElement('div');
            el.className = 'calendar-day-header';
            el.textContent = name;
            daysHeader.appendChild(el);
        });
        updateDisplays();
        generateCalendar(currentDate.getFullYear(), currentDate.getMonth());

        const currentlyDark = document.body.classList.contains('dark');
        if (themeToggle) {
            const span = themeToggle.querySelector('#theme-text') || themeToggle.querySelector('span');
            if (span) span.textContent = currentlyDark ? (isArabic ? 'فاتح' : 'Light') : (isArabic ? 'غامق' : 'Dark');
        }
    });

function applyTranslations(t) {
    document.getElementById('signin-text').textContent = t['signin-text'];
    document.getElementById('property-type-label').textContent = t['property-type-label'];
    const propertyType = document.getElementById('property-type');
    propertyType.options[0].text = t['property-type-option'];
    propertyType.options[1].text = t['chalet-option'];
    propertyType.options[2].text = t['hall-option'];
    document.getElementById('check-in-label').textContent = t['check-in-label'];
    document.getElementById('check-out-label').textContent = t['check-out-label'];
    document.getElementById('search-text').textContent = t['search-text'];
    document.getElementById('available-title').textContent = t['available-title'];
    document.getElementById('welcome-title').textContent = t['welcome-title'];
    document.getElementById('welcome-subtitle').textContent = t['welcome-subtitle'];
    document.getElementById('phone-number').placeholder = t['phone-label'];
    document.getElementById('first-name').placeholder = t['firstname-placeholder'];
    document.getElementById('family-name').placeholder = t['familyname-placeholder'];
    document.getElementById('email').placeholder = t['email-placeholder'];
    document.getElementById('thankyou-title').textContent = t['thankyou-title'];
    document.getElementById('thankyou-message').textContent = t['thankyou-message'];
    document.getElementById('btn-next').textContent = t['btn-next'];
    document.getElementById('btn-back').textContent = t['btn-back'];
    document.getElementById('btn-submit').textContent = t['btn-submit'];
    
    document.querySelectorAll('.translate').forEach(element => {
        const key = element.getAttribute('data-key');
        if (t[key]) {
            element.textContent = t[key];
        }
    });
}

    signinBtn.addEventListener('click', () => {
        resetModal();
        signinModal.style.display = 'flex';
    });

    modalClose.addEventListener('click', () => {
        signinModal.style.display = 'none';
    });

    signinModal.addEventListener('click', (e) => {
        if (e.target === signinModal) {
            signinModal.style.display = 'none';
        }
    });

    btnNext.addEventListener('click', () => {
        if (currentStep === 1) {
        const phoneNumber = document.getElementById('phone-number').value;
        if (!isValidPhone(phoneNumber)) {
            alert(isArabic ? "أدخل رقم هاتف صحيح (أرقام فقط)" : "Enter a valid phone number (digits only)");
            return;
            }
            step1.classList.remove('active');
            step2.classList.add('active');
            btnNext.style.display = 'none';
            btnBack.style.display = 'block';
            btnSubmit.style.display = 'block';
            currentStep = 2;
        }
    });

    btnBack.addEventListener('click', () => {
        if (currentStep === 2) {
            step2.classList.remove('active');
            step1.classList.add('active');
            btnNext.style.display = 'block';
            btnBack.style.display = 'none';
            btnSubmit.style.display = 'none';
            currentStep = 1;
        }
    });

    btnSubmit.addEventListener('click', () => {
         if (currentStep === 2) {
        const firstName = document.getElementById('first-name').value;
        const familyName = document.getElementById('family-name').value;
        const email = document.getElementById('email').value;

        if (!isValidName(firstName)) {
            alert(isArabic ? "أدخل الاسم الأول صحيح (حروف فقط)" : "Enter a valid first name (letters only)");
            return;
        }
        if (!isValidName(familyName)) {
            alert(isArabic ? "أدخل اسم العائلة صحيح (حروف فقط)" : "Enter a valid family name (letters only)");
            return;
        }
        if (!isValidEmail(email)) {
            alert(isArabic ? "أدخل بريد إلكتروني صحيح" : "Enter a valid email address");
            return;
            }
            step2.classList.remove('active');
            step3.classList.add('active');
            btnBack.style.display = 'none';
            btnSubmit.style.display = 'none';
            currentStep = 3;
            setTimeout(() => {
                signinModal.style.display = 'none';
            }, 2000);
        }
    });

    function resetModal() {
        step1.classList.add('active');
        step2.classList.remove('active');
        step3.classList.remove('active');
        btnNext.style.display = 'block';
        btnBack.style.display = 'none';
        btnSubmit.style.display = 'none';
        currentStep = 1;
        document.getElementById('phone-number').value = '';
        document.getElementById('first-name').value = '';
        document.getElementById('family-name').value = '';
        document.getElementById('email').value = '';
    }

    applyTranslations(englishTranslations);
    init();

    function setTheme(isDark) {
        document.body.classList.toggle('dark', isDark);
        const icon = isDark ? 'fa-sun' : 'fa-moon';
        const text = isDark ? (isArabic ? 'فاتح' : 'Light') : (isArabic ? 'غامق' : 'Dark');
        if (themeToggle) {
            themeToggle.setAttribute('aria-pressed', String(isDark));
            const i = themeToggle.querySelector('i');
            const span = themeToggle.querySelector('#theme-text') || themeToggle.querySelector('span');
            if (i) { i.classList.remove('fa-moon','fa-sun'); i.classList.add(icon); }
            if (span) { span.textContent = text; }
        }
        try { localStorage.setItem('evento_theme', isDark ? 'dark' : 'light'); } catch(_) {}
    }

    function initTheme() {
        let isDark = false;
        try {
            const saved = localStorage.getItem('evento_theme');
            if (saved) {
                isDark = (saved === 'dark');
            } else if (window.matchMedia) {
                isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            }
        } catch(_) {}
        setTheme(isDark);
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const willBeDark = !document.body.classList.contains('dark');
            setTheme(willBeDark);
        });
    }
    initTheme();



    
});
