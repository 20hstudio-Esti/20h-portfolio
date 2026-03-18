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

  // --- Scroll Stack: Selected Work hidden behind sticky What I Do, reveals as you scroll ---
  const overlaySection = document.querySelector('.section--overlay');
  const revealSection = document.querySelector('.section--reveal');
  if (overlaySection && revealSection) {
    // Pull Selected Work up so it starts fully hidden behind What I Do
    const overlayH = overlaySection.offsetHeight;
    revealSection.style.marginTop = `-${overlayH}px`;
    revealSection.style.paddingTop = `${overlayH + 40}px`;

    // Clip-path wipe: start fully clipped, animate open as it scrolls into view
    const inner = revealSection.querySelector('.reveal-inner');
    if (inner) {
      inner.style.clipPath = `inset(${overlayH}px 0 0 0)`;
      inner.style.transition = 'clip-path 0s'; // no transition until scroll triggers

      window.addEventListener('scroll', () => {
        const revealTop = revealSection.getBoundingClientRect().top;
        const windowH = window.innerHeight;
        // How far Selected Work has scrolled past the top of viewport
        const scrolled = Math.max(0, windowH - revealTop);
        const clip = Math.max(0, overlayH - scrolled);
        inner.style.clipPath = `inset(${clip}px 0 0 0)`;
      }, { passive: true });
    }
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
