/* ============================================
   twentyhours studio  -  Main Scripts
   ============================================ */

// --- Mobile Menu Toggle ---
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav__toggle');
  const links = document.querySelector('.nav__links');

  const langLink = document.querySelector('.nav__links a.nav__lang');
  if (langLink && links) {
    const isGerman = window.location.pathname === '/de' || window.location.pathname.startsWith('/de/');
    const currentCode = isGerman ? 'DE' : 'EN';
    const currentLabel = isGerman ? 'Deutsch' : 'English';
    const otherCode = isGerman ? 'EN' : 'DE';
    const otherLabel = isGerman ? 'English' : 'Deutsch';
    const currentHref = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    const otherHref = langLink.getAttribute('href') || (isGerman ? '/' : '/de/');

    const wrapper = document.createElement('div');
    wrapper.className = 'nav__lang-switch';
    wrapper.innerHTML = `
      <button type="button" class="nav__lang-trigger" aria-haspopup="true" aria-expanded="false" aria-label="Language selector">
        <svg class="nav__lang-globe" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8"></circle>
          <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
        </svg>
        <span class="nav__lang-code">${currentCode}</span>
        <svg class="nav__lang-chevron" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="m6 9 6 6 6-6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
      </button>
      <div class="nav__lang-menu" role="menu">
        <a href="${currentHref}" class="nav__lang-option is-active" role="menuitem" aria-current="page">
          <span>${currentLabel}</span>
        </a>
        <a href="${otherHref}" class="nav__lang-option" role="menuitem">
          <span>${otherLabel}</span>
        </a>
      </div>
    `;

    langLink.replaceWith(wrapper);

    const ctaLink = links.querySelector('.nav__cta');
    if (ctaLink) {
      ctaLink.insertAdjacentElement('afterend', wrapper);
    }

    const trigger = wrapper.querySelector('.nav__lang-trigger');
    const closeDropdown = () => {
      wrapper.classList.remove('is-open');
      trigger.setAttribute('aria-expanded', 'false');
    };

    trigger.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      const isOpen = wrapper.classList.toggle('is-open');
      trigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    document.addEventListener('click', (event) => {
      if (!wrapper.contains(event.target)) closeDropdown();
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeDropdown();
    });
  }

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
          const categories = (card.dataset.category || '').split(/\s+/).filter(Boolean);
          if (filter === 'all' || categories.includes(filter)) {
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

  // Scroll stack handled by CSS

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


// Disable right-click on images
document.addEventListener('contextmenu', function(e) {
  if (e.target.tagName === 'IMG') {
    e.preventDefault();
  }
});
