
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
    const daysHeader = document.getElementById('days-header');;

    
    
    let today = new Date();
    let currentDate = new Date(today.getFullYear(), today.getMonth(), 1);
    let selectedCheckIn = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    let selectedCheckOut = new Date(selectedCheckIn.getTime() + 24*60*60*1000);
    let activeField = 'check-in';


    
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



    init();
