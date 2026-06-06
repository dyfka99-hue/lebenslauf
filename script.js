const toggleButton = document.getElementById('theme-toggle');
const header = document.getElementById('main-header');

// Initialisierung des Themes
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        document.body.classList.add('dark-mode');
        if (toggleButton) toggleButton.innerText = 'Light Mode';
    }
}

initTheme();

if (toggleButton) {
    toggleButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        
        // Persistenz
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        
        // Button-Text ändern
        toggleButton.innerText = isDark ? 'Light Mode' : 'Dark Mode';
    });
}

// Kontaktformular Handling via Fetch API
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm && formStatus) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = new FormData(contactForm);
        
        try {
            formStatus.innerText = 'Wird gesendet...';
            formStatus.className = 'form-status';
            formStatus.style.display = 'block';

            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: data,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                formStatus.innerText = 'Vielen Dank! Ihre Nachricht wurde erfolgreich gesendet.';
                formStatus.className = 'form-status success';
                contactForm.reset();
            } else {
                throw new Error();
            }
        } catch (error) {
            formStatus.innerText = 'Hoppla! Da ist etwas schiefgelaufen. Bitte versuchen Sie es später erneut.';
            formStatus.className = 'form-status error';
        }
    });
}

// Scroll-Reveal Animationen (Intersection Observer API)
const revealElements = document.querySelectorAll('section');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            revealObserver.unobserve(entry.target); // Nur einmal animieren
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
});

if (header) {
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        // Hysterese-Logik
        if (scrollY > 120) {
            if (!header.classList.contains('scrolled')) {
                header.classList.add('scrolled');
            }
        } else if (scrollY < 20) {
            if (header.classList.contains('scrolled')) {
                header.classList.remove('scrolled');
            }
        }
    }, { passive: true });
}