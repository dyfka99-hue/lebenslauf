const toggleButton = document.getElementById('theme-toggle');
toggleButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    // Button-Text ändern
    if (document.body.classList.contains('dark-mode')) {
        toggleButton.innerText = 'Light Mode';
    } else {
        toggleButton.innerText = 'Dark Mode';
    }
});

const header = document.getElementById('main-header');

window.addEventListener('scroll', () => {
    // Ab einer Scroll-Position von 50px wird die Klasse "scrolled" hinzugefügt
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});