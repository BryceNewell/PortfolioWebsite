document.addEventListener('DOMContentLoaded', () => {
    const animateOnScroll = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    };

    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver(animateOnScroll, options);

    const aboutMeText = document.querySelector('.about-me-text');
    const aboutMeImage = document.querySelector('.about-me-image');

    if (aboutMeText) {
        observer.observe(aboutMeText);
    }
    if (aboutMeImage) {
        observer.observe(aboutMeImage);
    }
});