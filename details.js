document.addEventListener('DOMContentLoaded', function() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.querySelector('.main-image');
    const mainMedia = document.getElementById('main-media');
    const mainVideo = document.getElementById('main-video');
    const mainPlaceholder = document.getElementById('main-placeholder');
    const mainPrevBtn = document.querySelector('.main-image-prev');
    const mainNextBtn = document.querySelector('.main-image-next');

    const thumbnailsContainer = document.querySelector('.thumbnails');
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');

    const thumbnailsArray = Array.from(thumbnails);
    let currentIndex = 0;

    function updateArrowVisibility() {
        const scrollLeft = thumbnailsContainer.scrollLeft;
        const scrollWidth = thumbnailsContainer.scrollWidth;
        const clientWidth = thumbnailsContainer.clientWidth;
        
        leftArrow.disabled = scrollLeft === 0;
        rightArrow.disabled = scrollLeft + clientWidth >= scrollWidth - 5;
    }

    leftArrow.addEventListener('click', () => {
        thumbnailsContainer.scrollBy({ left: -200, behavior: 'smooth' });
        setTimeout(updateArrowVisibility, 300);
    });

    rightArrow.addEventListener('click', () => {
        thumbnailsContainer.scrollBy({ left: 200, behavior: 'smooth' });
        setTimeout(updateArrowVisibility, 300);
    });

    thumbnailsContainer.addEventListener('scroll', updateArrowVisibility);
    window.addEventListener('resize', updateArrowVisibility);

    function updateMainNavButtons() {
        mainPrevBtn.disabled = currentIndex === 0;
        mainNextBtn.disabled = currentIndex === thumbnailsArray.length - 1;
    }

    function displayMedia(index) {
        const thumb = thumbnailsArray[index];
        const mediaSrc = thumb.getAttribute('data-src');
        const mediaType = thumb.getAttribute('data-type');
        
        thumbnailsArray.forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
        
        mainImage.classList.remove('show-image', 'show-video');
        
        if (mediaType === 'image') {
            mainMedia.src = mediaSrc;
            mainMedia.alt = `Property image ${index + 1}`;
            mainImage.classList.add('show-image');
            mainVideo.pause();
            mainVideo.currentTime = 0;
        } else if (mediaType === 'video') {
            mainVideo.src = mediaSrc;
            const thumbStyle = thumb.style.backgroundImage;
            if (thumbStyle) {
                const posterUrl = thumbStyle.replace('url("', '').replace('")', '');
                mainVideo.poster = posterUrl;
            }
            mainImage.classList.add('show-video');
        }
        
        thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        
        currentIndex = index;
        updateMainNavButtons();
    }

    thumbnailsArray.forEach((thumb, index) => {
        thumb.addEventListener('click', () => {
            displayMedia(index);
        });
    });

    mainPrevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            displayMedia(currentIndex - 1);
        }
    });

    mainNextBtn.addEventListener('click', () => {
        if (currentIndex < thumbnailsArray.length - 1) {
            displayMedia(currentIndex + 1);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' && currentIndex > 0) {
            displayMedia(currentIndex - 1);
        } else if (e.key === 'ArrowRight' && currentIndex < thumbnailsArray.length - 1) {
            displayMedia(currentIndex + 1);
        }
    });

    updateArrowVisibility();
    updateMainNavButtons();
    
    if (thumbnailsArray.length > 0) {
        displayMedia(0);
    }
});

document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        
        tab.classList.add('active');
        const tabId = tab.getAttribute('data-tab');
        document.getElementById(`${tabId}-tab`).classList.add('active');
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const checkInDisplay = document.getElementById('check-in-display');
    const checkOutDisplay = document.getElementById('check-out-display');
    const checkInCalendar = document.getElementById('checkin-calendar');
    const checkOutCalendar = document.getElementById('checkout-calendar');
    
    let currentCalendar = null;
    
    initCalendar('checkin-calendar');
    initCalendar('checkout-calendar');
    
    function initCalendar(calendarId) {
        const calendar = document.getElementById(calendarId);
        const prevBtn = calendar.querySelector('#prev-month');
        const nextBtn = calendar.querySelector('#next-month');
        const monthDisplay = calendar.querySelector('.month-year-display');
        const daysContainer = calendar.querySelector('#calendar-days');
        const daysHeader = calendar.querySelector('#days-header');
        
        let currentDate = new Date();
        
        if (typeof dayNames !== 'undefined') {
            dayNames.forEach(name => {
                const el = document.createElement('div');
                el.className = 'calendar-day-header';
                el.textContent = name;
                daysHeader.appendChild(el);
            });
        }
        
        function generateCalendar(year, month) {
            daysContainer.innerHTML = '';
            
            const firstDay = new Date(year, month, 1);
            const lastDay = new Date(year, month + 1, 0);
            const daysInMonth = lastDay.getDate();
            
            for (let i = 0; i < firstDay.getDay(); i++) {
                const emptyDay = document.createElement('div');
                emptyDay.className = 'calendar-day disabled';
                daysContainer.appendChild(emptyDay);
            }
            
            for (let day = 1; day <= daysInMonth; day++) {
                const dayElement = document.createElement('div');
                dayElement.className = 'calendar-day';
                dayElement.textContent = day;
                dayElement.addEventListener('click', () => selectDate(day, month, year, calendarId));
                daysContainer.appendChild(dayElement);
            }
            
            if (typeof monthNames !== 'undefined') {
                monthDisplay.innerHTML = `${monthNames[month]} ${year}`;
            }
        }
        
        function selectDate(day, month, year, calendarType) {
            const selectedDate = new Date(year, month, day);
            const dateString = selectedDate.toISOString().split('T')[0];
            
            if (calendarType === 'checkin-calendar') {
                checkInDisplay.innerHTML = `<i class="fas fa-calendar"></i> ${selectedDate.toLocaleDateString()}`;
                checkInCalendar.style.display = 'none';
            } else {
                checkOutDisplay.innerHTML = `<i class="fas fa-calendar"></i> ${selectedDate.toLocaleDateString()}`;
                checkOutCalendar.style.display = 'none';
            }
            
            currentCalendar = null;
        }
        
        prevBtn.addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() - 1);
            generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
        });
        
        nextBtn.addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() + 1);
            generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
        });
        
        generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
    }
    
    checkInDisplay.addEventListener('click', (e) => {
        e.stopPropagation();
        if (currentCalendar === checkInCalendar) {
            checkInCalendar.style.display = 'none';
            currentCalendar = null;
        } else {
            checkInCalendar.style.display = 'block';
            checkOutCalendar.style.display = 'none';
            currentCalendar = checkInCalendar;
        }
    });
    
    checkOutDisplay.addEventListener('click', (e) => {
        e.stopPropagation();
        if (currentCalendar === checkOutCalendar) {
            checkOutCalendar.style.display = 'none';
            currentCalendar = null;
        } else {
            checkOutCalendar.style.display = 'block';
            checkInCalendar.style.display = 'none';
            currentCalendar = checkOutCalendar;
        }
    });
    
    document.addEventListener('click', () => {
        if (currentCalendar) {
            currentCalendar.style.display = 'none';
            currentCalendar = null;
        }
    });
    
    [checkInCalendar, checkOutCalendar].forEach(calendar => {
        if (calendar) {
            calendar.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        }
    });
});