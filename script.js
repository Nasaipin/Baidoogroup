    // DOM Elements
        const themeToggle = document.getElementById('theme-toggle');
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        const backToTop = document.getElementById('back-to-top');
        const carouselSlide = document.querySelector('.carousel-slide');
        const carouselItems = document.querySelectorAll('.carousel-item');
        const indicators = document.querySelectorAll('.carousel-indicator');

        // Theme Toggle
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            if (document.body.classList.contains('dark-theme')) {
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            } else {
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            }
        });

        // Mobile Menu Toggle
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.innerHTML = navMenu.classList.contains('active') ? 
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });

        // Close mobile menu when clicking on a nav link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });

        // Back to Top Button
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 70,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Carousel Functionality
        let currentSlide = 0;
        const slideCount = carouselItems.length;
        let slideInterval;

        function moveToSlide(slideIndex) {
            if (slideIndex < 0) slideIndex = slideCount - 1;
            if (slideIndex >= slideCount) slideIndex = 0;
            
            carouselSlide.style.transform = `translateX(-${slideIndex * 33.333}%)`;
            
            // Update indicators
            indicators.forEach((indicator, index) => {
                if (index === slideIndex) {
                    indicator.classList.add('active');
                } else {
                    indicator.classList.remove('active');
                }
            });
            
            currentSlide = slideIndex;
        }

        function nextSlide() {
            moveToSlide(currentSlide + 1);
        }

        function startCarousel() {
            slideInterval = setInterval(nextSlide, 5000);
        }

        function stopCarousel() {
            clearInterval(slideInterval);
        }

        // Initialize carousel
        startCarousel();

        // Pause carousel on hover
        const carouselContainer = document.querySelector('.carousel-container');
        carouselContainer.addEventListener('mouseenter', stopCarousel);
        carouselContainer.addEventListener('mouseleave', startCarousel);

        // Add click events to indicators
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                moveToSlide(index);
            });
        });

        // Add touch events for mobile swipe
        let touchStartX = 0;
        let touchEndX = 0;

        carouselContainer.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        });

        carouselContainer.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });

        function handleSwipe() {
            if (touchEndX < touchStartX - 50) {
                nextSlide();
            } else if (touchEndX > touchStartX + 50) {
                moveToSlide(currentSlide - 1);
            }
        }
  