
document.addEventListener('DOMContentLoaded', () => {
    // 1. Sticky Header
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('header-glass', 'py-4');
            header.classList.remove('py-8');
        } else {
            header.classList.remove('header-glass', 'py-4');
            header.classList.add('py-8');
        }
    }, { passive: true });

    // 2. Reveal on Scroll (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => observer.observe(el));

    // 3. Lead Form Processing
    const leadForm = document.getElementById('lead-form');
    const formWrapper = document.getElementById('form-wrapper');

    if (leadForm) {
        leadForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const phone = leadForm.querySelector('input').value;
            const waNumber = '79000000000'; // Замените на реальный
            const text = encodeURIComponent(`Здравствуйте! Хочу обсудить проект. Мой телефон: ${phone}`);

            // Success Visual Feedback
            formWrapper.innerHTML = `
                <div class="text-center animate-pulse">
                    <h4 class="text-2xl font-serif text-slate-900 mb-4 italic">Благодарим за доверие</h4>
                    <p class="text-slate-500 mb-8 text-sm font-light">Перенаправляем вас в WhatsApp...</p>
                    <div class="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center mx-auto text-white">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                </div>
            `;

            setTimeout(() => {
                window.open(`https://wa.me/${waNumber}?text=${text}`, '_blank');
            }, 1000);
        });
    }

    // 4. Cookie Bar
    const cookieBar = document.getElementById('cookie-bar');
    const acceptCookie = document.getElementById('accept-cookie');

    if (!localStorage.getItem('thelmebel_cookie')) {
        setTimeout(() => {
            cookieBar.classList.remove('translate-y-full', 'opacity-0');
        }, 2000);
    }

    if (acceptCookie) {
        acceptCookie.addEventListener('click', () => {
            localStorage.setItem('thelmebel_cookie', 'true');
            cookieBar.classList.add('translate-y-full', 'opacity-0');
        });
    }
});
