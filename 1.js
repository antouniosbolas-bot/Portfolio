
    
    
        // Mobile Menu Toggle
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');
        const links = document.querySelectorAll('.nav-links li');

        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.querySelector('i').classList.toggle('fa-bars');
            hamburger.querySelector('i').classList.toggle('fa-times');
        });

        // Close mobile menu when clicking a link
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.querySelector('i').classList.add('fa-bars');
                hamburger.querySelector('i').classList.remove('fa-times');
            });
        });

        // Sticky Navbar & Active Link Highlight
        const sections = document.querySelectorAll('section');
        const navLi = document.querySelectorAll('nav ul li a');

        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (pageYOffset >= sectionTop - 100) {
                    current = section.getAttribute('id');
                }
            });

            navLi.forEach(a => {
                a.classList.remove('active');
                if (a.getAttribute('href').includes(current)) {
                    a.classList.add('active');
                }
            });

            // Back to Top Button Visibility
            const backToTop = document.getElementById('backToTop');
            if (window.scrollY > 300) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        });

        // Back to Top Functionality
        document.getElementById('backToTop').addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        // Scroll Reveal Animation for Timeline
        const observerOptions = {
            threshold: 0.2
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.timeline-item').forEach(item => {
            observer.observe(item);
        });

        // Simple Form Validation Alert
        // WhatsApp Integration
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // جلب البيانات من الفورم
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const subject = this.querySelectorAll('input[type="text"]')[1].value;
    const message = this.querySelector('textarea').value;

    // رقمك بصيغة دولية (مصر 20 + الرقم بدون صفر في الأول)
    const phoneNumber = "201284453186"; 
    
    // تجهيز الرسالة
    const text = `Hello Antounios,%0A%0A*Name:* ${name}%0A*Email:* ${email}%0A*Subject:* ${subject}%0A*Message:* ${message}`;
    
    // فتح واتساب
    const url = `https://wa.me/${phoneNumber}?text=${text}`;
    window.open(url, '_blank');
    
    this.reset();
});
       
    