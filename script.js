document.addEventListener('DOMContentLoaded', () => {
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
        "property-title-1": "شاليه جبلي فاخر",
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

        const firstDay = new Date(year, month, 1).getDay(); // 0 = Sun
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const daysInPrevMonth = new Date(year, month, 0).getDate();

        for (let i = firstDay - 1; i >= 0; i--) {
            const dayNum = daysInPrevMonth - i;
            const dayIndex = (firstDay - 1 - i) % 7;
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
        document.getElementById('property-title-1').textContent = t['property-title-1'];
        document.getElementById('feature-1').textContent = t['feature-1'];
        document.getElementById('feature-2').textContent = t['feature-2'];
        document.getElementById('feature-3').textContent = t['feature-3'];
        document.getElementById('feature-4').textContent = t['feature-4'];
        document.getElementById('night-text').textContent = t['night-text'];
        document.getElementById('details-text').textContent = t['details-text'];
    }

    applyTranslations(englishTranslations);

    init();
});
