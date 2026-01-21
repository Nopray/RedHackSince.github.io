// Hamburger menü toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Menü linklerine tıklandığında menüyü kapat
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Typing efekti
const typingTexts = [
    "Dijital Adalet İçin Mücadele",
    "Bilgi Özgürlüğü",
    "Şeffaflık ve Demokrasi"
];

let currentTextIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
const typingElement = document.querySelector('.typing-text');

function typeText() {
    if (!typingElement) return;
    
    const currentText = typingTexts[currentTextIndex];
    
    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, currentCharIndex - 1) + '|';
        currentCharIndex--;
    } else {
        typingElement.textContent = currentText.substring(0, currentCharIndex + 1) + '|';
        currentCharIndex++;
    }
    
    if (!isDeleting && currentCharIndex === currentText.length) {
        setTimeout(() => {
            isDeleting = true;
        }, 2000);
    } else if (isDeleting && currentCharIndex === 0) {
        isDeleting = false;
        currentTextIndex = (currentTextIndex + 1) % typingTexts.length;
    }
    
    const speed = isDeleting ? 50 : 100;
    setTimeout(typeText, speed);
}

// Sayı animasyonu
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = Math.floor(target);
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 30);
}

// Intersection Observer ile sayıları animasyonla göster
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                if (!stat.classList.contains('animated')) {
                    stat.classList.add('animated');
                    animateCounter(stat, target);
                }
            });
        }
    });
}, observerOptions);

// EmailJS Yapılandırması
const EMAILJS_SERVICE_ID = 'service_injelp7';
const EMAILJS_TEMPLATE_ID = 'template_m35ukyc';
const EMAILJS_PUBLIC_KEY = 'qjHBK3RDXmz_ih_11';

// EmailJS'i başlat
(function() {
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_PUBLIC_KEY);
    }
})();

// Form gönderimi
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const button = contactForm.querySelector('.btn-primary');
        const originalText = button.textContent;
        const originalDisabled = button.disabled;
        
        // Butonu devre dışı bırak ve yükleniyor mesajı göster
        button.disabled = true;
        button.textContent = 'GÖNDERİLİYOR...';
        button.style.animation = 'glitch 0.5s';
        formMessage.textContent = '';
        formMessage.className = 'form-message';
        
        // Form verilerini al
        const formData = {
            user_name: document.getElementById('user_name').value,
            user_email: document.getElementById('user_email').value,
            message: document.getElementById('message').value
        };
        
        try {
            // EmailJS ile e-posta gönder
            await emailjs.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                {
                    from_name: formData.user_name,
                    from_email: formData.user_email,
                    message: formData.message,
                    reply_to: formData.user_email
                }
            );
            
            // Başarılı mesajı
            button.textContent = 'GÖNDERİLDİ ✓';
            button.style.background = '#00ff00';
            button.style.borderColor = '#00ff00';
            button.style.boxShadow = '0 0 20px rgba(0, 255, 0, 0.5)';
            formMessage.textContent = 'Mesajınız başarıyla gönderildi!';
            formMessage.className = 'form-message success';
            
            // Formu temizle
            contactForm.reset();
            
            // 3 saniye sonra normale dön
            setTimeout(() => {
                button.textContent = originalText;
                button.style.background = '';
                button.style.borderColor = '';
                button.style.boxShadow = '';
                button.style.animation = '';
                button.disabled = originalDisabled;
                formMessage.textContent = '';
                formMessage.className = 'form-message';
            }, 3000);
            
        } catch (error) {
            // Hata mesajı
            console.error('Email gönderme hatası:', error);
            button.textContent = 'HATA!';
            button.style.background = '#ff0033';
            button.style.borderColor = '#ff0033';
            button.style.boxShadow = '0 0 20px rgba(255, 0, 51, 0.5)';
            formMessage.textContent = 'Bir hata oluştu. Lütfen tekrar deneyin.';
            formMessage.className = 'form-message error';
            
            // 3 saniye sonra normale dön
            setTimeout(() => {
                button.textContent = originalText;
                button.style.background = '';
                button.style.borderColor = '';
                button.style.boxShadow = '';
                button.style.animation = '';
                button.disabled = originalDisabled;
                formMessage.textContent = '';
                formMessage.className = 'form-message';
            }, 3000);
        }
    });
}

// Scroll animasyonları
const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Sayfa yüklendiğinde
document.addEventListener('DOMContentLoaded', () => {
    // Typing efekti başlat
    if (typingElement) {
        typeText();
    }
    
    // Sayıları gözlemle
    const aboutSection = document.querySelector('.about');
    if (aboutSection) {
        observer.observe(aboutSection);
    }
    
    // Kartları gözlemle
    const cards = document.querySelectorAll('.activity-card, .principle');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s, transform 0.6s';
        scrollObserver.observe(card);
    });
    
    // Hero butonlarına scroll ekle
    const heroButtons = document.querySelectorAll('.hero-buttons button');
    heroButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            if (index === 0) {
                document.querySelector('#hakkimizda').scrollIntoView({ behavior: 'smooth' });
            } else {
                document.querySelector('#manifesto').scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});

// Navbar scroll efekti
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Galeri lightbox efekti
const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach(item => {
    item.addEventListener('click', function() {
        const img = this.querySelector('img');
        const imgSrc = img.src;
        const imgAlt = img.alt;
        
        // Basit lightbox oluştur
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <span class="lightbox-close">&times;</span>
                <img src="${imgSrc}" alt="${imgAlt}">
            </div>
        `;
        
        document.body.appendChild(lightbox);
        document.body.style.overflow = 'hidden';
        
        // Kapatma
        const closeBtn = lightbox.querySelector('.lightbox-close');
        closeBtn.addEventListener('click', () => {
            lightbox.remove();
            document.body.style.overflow = '';
        });
        
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.remove();
                document.body.style.overflow = '';
            }
        });
    });
});
