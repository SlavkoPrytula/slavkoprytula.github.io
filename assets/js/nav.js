(function () {
const path = window.location.pathname.replace(/\/$/, '');
const navLinks = document.querySelectorAll('.nav-item');

navLinks.forEach(link => {
    const href = link.getAttribute('href').replace(/\/$/, '');
    if (path.endsWith(href)) {
    link.classList.add('active');
    }
});
})();
