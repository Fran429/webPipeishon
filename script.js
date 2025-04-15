// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Navegación móvil
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    
    // Función para alternar el menú de navegación móvil
    function toggleNav() {
        // Alternar la clase nav-active para mostrar/ocultar el menú
        nav.classList.toggle('nav-active');
        
        // Animar los enlaces con un retraso escalonado
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
        
        // Animar el icono de hamburguesa a X
        burger.classList.toggle('toggle');
    }
    
    burger.addEventListener('click', toggleNav);
    
    // Cerrar el menú al hacer clic en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('nav-active')) {
                toggleNav();
            }
        });
    });
    
    // Carrusel principal
    const carouselTrack = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.carousel-slide');
    const dotsContainer = document.querySelector('.carousel-dots');
    let currentIndex = 0;
    let interval;
    
    // Crear puntos indicadores para el carrusel
    function createDots() {
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                goToSlide(index);
                resetInterval();
            });
            dotsContainer.appendChild(dot);
        });
    }
    
    // Ir a una diapositiva específica
    function goToSlide(index) {
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;
        
        carouselTrack.style.transform = `translateX(-${index * 100}%)`;
        
        // Actualizar puntos activos
        document.querySelectorAll('.dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        
        currentIndex = index;
    }
    
    // Avanzar a la siguiente diapositiva
    function nextSlide() {
        goToSlide(currentIndex + 1);
    }
    
    // Reiniciar el intervalo del carrusel
    function resetInterval() {
        clearInterval(interval);
        interval = setInterval(nextSlide, 2500); // Cambiar cada 2.5 segundos
    }
    
    // Inicializar el carrusel
    function initCarousel() {
        if (slides.length > 0) {
            createDots();
            resetInterval();
        }
    }
    
    initCarousel();
    
    // Carrusel de equipo
    const teamCarousel = document.querySelector('.team-carousel');
    const teamCards = document.querySelectorAll('.team-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    // Configuración del carrusel de equipo
    let cardWidth = 270; // Ancho de la tarjeta + margen
    let scrollPosition = 0;
    let visibleCards = Math.floor(teamCarousel.offsetWidth / cardWidth);
    
    // Actualizar el número de tarjetas visibles en función del ancho de la ventana
    function updateVisibleCards() {
        if (window.innerWidth < 768) {
            visibleCards = 1;
        } else if (window.innerWidth < 1024) {
            visibleCards = 2;
        } else {
            visibleCards = 3;
        }
    }
    
    // Manejar el clic en el botón anterior
    prevBtn.addEventListener('click', () => {
        if (scrollPosition > 0) {
            scrollPosition -= cardWidth;
            teamCarousel.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            });
        }
    });
    
    // Manejar el clic en el botón siguiente
    nextBtn.addEventListener('click', () => {
        if (scrollPosition < (teamCards.length - visibleCards) * cardWidth) {
            scrollPosition += cardWidth;
            teamCarousel.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            });
        }
    });
    
    // Manejar el efecto de hover/activo para dispositivos móviles
    function handleCardActive() {
        if (window.innerWidth <= 768) {
            teamCards.forEach(card => {
                card.addEventListener('click', () => {
                    // Eliminar la clase activa de todas las tarjetas
                    teamCards.forEach(c => c.classList.remove('active'));
                    // Agregar la clase activa a la tarjeta clickeada
                    card.classList.add('active');
                });
            });
        }
    }
    
    // Actualizar la configuración del carrusel al cambiar el tamaño de la ventana
    window.addEventListener('resize', () => {
        updateVisibleCards();
        handleCardActive();
    });
    
    // Inicializar el carrusel de equipo
    updateVisibleCards();
    handleCardActive();
    
    // Formulario de contacto
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Aquí normalmente enviarías los datos del formulario a un servidor
        // Para este ejemplo, solo mostraremos un mensaje de éxito
        
        const formData = new FormData(contactForm);
        const formValues = {};
        
        formData.forEach((value, key) => {
            formValues[key] = value;
        });
        
        console.log('Formulario enviado:', formValues);
        
        // Mostrar mensaje de éxito
        alert('¡Gracias por tu mensaje! Te contactaremos pronto.');
        
        // Limpiar el formulario
        contactForm.reset();
    });
    
    // Efecto de desplazamiento suave para los enlaces de navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Efecto de aparición al hacer scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observar secciones para animarlas al hacer scroll
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });
    
    // Agregar clase CSS para la animación
    const style = document.createElement('style');
    style.textContent = `
        .fade-in {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .fade-in.visible {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
});