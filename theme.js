const themeToggle = document.getElementById('theme-toggle') || document.querySelector('.theme-btn');

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