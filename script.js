// ===== ALTERNAR TEMA =====
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const themeIcon = document.querySelector('.theme-icon');

// Verifica se há preferência salva
const currentTheme = localStorage.getItem('theme') || 'dark';
body.setAttribute('data-theme', currentTheme);
themeIcon.textContent = currentTheme === 'dark' ? '🌙' : '☀️';

themeToggle.addEventListener('click', () => {
    const newTheme = body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    themeIcon.textContent = newTheme === 'dark' ? '🌙' : '☀️';
});

// ===== ANIMAÇÃO DO CONTADOR =====
function animateCounter() {
    const counter = document.querySelector('.counter-number');
    const target = parseInt(counter.getAttribute('data-target'));
    let current = 0;
    const increment = target / 50; // Velocidade da animação
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            counter.textContent = Math.ceil(current);
            setTimeout(updateCounter, 30);
        } else {
            counter.textContent = target;
        }
    };
    
    updateCounter();
}

// Inicia animação quando a página carregar
window.addEventListener('load', () => {
    setTimeout(animateCounter, 500);
});

// ===== UPLOAD DE FOTO DE PERFIL =====
const profilePhoto = document.querySelector('.profile-photo');
const profileImage = document.getElementById('profileImage');

profilePhoto.addEventListener('click', () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                profileImage.src = event.target.result;
                localStorage.setItem('profilePhoto', event.target.result);
            };
            reader.readAsDataURL(file);
        }
    };
    
    input.click();
});

// Carrega foto salva se existir
const savedPhoto = localStorage.getItem('profilePhoto');
if (savedPhoto) {
    profileImage.src = savedPhoto;
}

// ===== NAVEGAÇÃO COM SCROLL SUAVE =====
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.content-section');

// Scroll suave ao clicar nos links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Destacar item do menu ativo baseado na seção visível
function updateActiveNavLink() {
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        // Considera uma seção ativa se estiver visível na viewport
        if (window.pageYOffset >= (sectionTop - 100)) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });

    // Atualiza barra de progresso de leitura
    const scrollProgress = document.getElementById('scrollProgress');
    if (scrollProgress) {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        scrollProgress.style.width = scrolled + '%';
    }
}

// Atualiza o link ativo ao fazer scroll
window.addEventListener('scroll', updateActiveNavLink);

// Atualiza ao carregar a página
window.addEventListener('load', updateActiveNavLink);

// ===== ATUALIZAR ANO AUTOMÁTICO NO RODAPÉ =====
const currentYearElement = document.getElementById('currentYear');
if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
}

// ===== FUNCIONALIDADE DO ACORDEON DE EXPERIÊNCIA =====
function toggleAccordion(button) {
    const accordionItem = button.parentElement;
    const isActive = accordionItem.classList.contains('active');
    
    // Fecha todos os acordeons
    document.querySelectorAll('.accordion-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Se o item clicado não estava ativo, abre ele
    if (!isActive) {
        accordionItem.classList.add('active');
    }
}

// ===== FORMULÁRIO DE CONTATO =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Monta o corpo do email
        const emailBody = `Nome: ${name}%0D%0A` +
                            `Email: ${email}%0D%0A%0D%0A` +
                            `Mensagem:%0D%0A${message}`;
        
        // Abre o cliente de email do usuário
        window.location.href = `mailto:ednesio.colli@gmail.com?subject=${encodeURIComponent(subject)}&body=${emailBody}`;
        
        // Limpa o formulário
        contactForm.reset();
    });
}

// ===== BOTÃO DE DOWNLOAD CV =====
const cvButton = document.querySelector('.cv-button');
if (cvButton) {
    cvButton.addEventListener('click', function() {
        window.open('./Ednesio_Colli_CV.pdf', '_blank');                
    });
}