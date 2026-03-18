/* ============================================
   twentyhours studio  -  Main Scripts
   ============================================ */

// --- Mobile Menu Toggle ---
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav__toggle');
  const links = document.querySelector('.nav__links');

  if (toggle && links) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      links.classList.toggle('active');
    });

    // Close menu when a link is clicked
    links.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('active');
        links.classList.remove('active');
      });
    });
  }

  // --- Scroll Reveal (Testimonials) ---
  const revealElements = document.querySelectorAll('.testimonial-card');

  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealElements.forEach(el => revealObserver.observe(el));
  }

  // --- Filter Tabs (Portfolio Page) ---
  const filterTabs = document.querySelectorAll('.filter-tab');
  const portfolioCards = document.querySelectorAll('.portfolio-card[data-category]');

  if (filterTabs.length > 0 && portfolioCards.length > 0) {
    filterTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // Update active tab
        filterTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const filter = tab.dataset.filter;

        portfolioCards.forEach(card => {
          if (filter === 'all' || card.dataset.category === filter) {
            card.style.display = '';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 10);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(10px)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }

  // --- Fade In on Scroll ---
  const fadeElements = document.querySelectorAll('.fade-in');

  if (fadeElements.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    fadeElements.forEach(el => observer.observe(el));
  }

  // --- Testimonial Carousel ---
  const carousel = document.querySelector('.testimonial-carousel');
  if (carousel) {
    const slides = carousel.querySelectorAll('.testimonial-carousel__slide');
    const prevBtn = carousel.querySelector('.testimonial-carousel__arrow--prev');
    const nextBtn = carousel.querySelector('.testimonial-carousel__arrow--next');
    let currentIndex = 0;

    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
      });
    }

    if (prevBtn && nextBtn && slides.length > 1) {
      prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(currentIndex);
      });

      nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
      });
    }
  }

  // Selected Work: clip-path wipe from top as What I Do exits viewport
  const overlayEl2 = document.querySelector('.section--overlay');
  const revealSection2 = document.querySelector('.section--reveal');
  if (overlayEl2 && revealSection2) {
    // Start with top clipped
    revealSection2.style.clipPath = 'inset(250px 0 0 0 round 0px)';

    function driveReveal() {
      const oTop = overlayEl2.getBoundingClientRect().top;
      const oHeight = overlayEl2.offsetHeight;
      // scrolledIntoOverlay: how many px of overlay have scrolled above top of viewport
      const scrolledPast = Math.max(0, -oTop);
      // Clip reduces as scrolledPast increases — fully revealed when scrolledPast >= 250
      const clip = Math.max(0, 250 - scrolledPast);
      revealSection2.style.clipPath = `inset(${clip}px 0 0 0 round 0px)`;
    }

    window.addEventListener('scroll', driveReveal, { passive: true });
    driveReveal();
  }

  // --- FAQ Accordion (close others when one opens) ---
  const faqItems = document.querySelectorAll('.faq-item');
  if (faqItems.length > 0) {
    faqItems.forEach(item => {
      item.addEventListener('toggle', () => {
        if (item.open) {
          faqItems.forEach(other => {
            if (other !== item && other.open) {
              other.open = false;
            }
          });
        }
      });
    });
  }
});
