/**
 * Coffee Bar – Eatery 28 | Single-Page Website JavaScript
 * Pure Vanilla JavaScript · Zero Dependencies
 * Features:
 *  - Responsive Mobile Navigation & Backdrop
 *  - ScrollSpy Navigation Active State
 *  - Accessible Hero Image Carousel (Auto-play, Controls, Pause/Play, Reduced-Motion support)
 *  - Accessible Menu Category Tabs
 *  - Accessible Gallery Lightbox Modal (Keyboard Esc, Arrow keys, Focus management)
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', init);

  function init() {
    initNavigation();
    initScrollSpy();
    initHeroCarousel();
    initMenuTabs();
    initGalleryLightbox();
  }

  /* --------------------------------------------------------------------------
   * 1. Responsive Mobile Navigation
   * -------------------------------------------------------------------------- */
  function initNavigation() {
    const toggleBtn = document.querySelector('.mobile-nav-toggle');
    const navMenu = document.querySelector('.nav-menu-wrapper');
    const backdrop = document.querySelector('.nav-menu-backdrop');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-actions a');

    if (!toggleBtn || !navMenu) return;

    function openMenu() {
      toggleBtn.setAttribute('aria-expanded', 'true');
      navMenu.classList.add('is-open');
      if (backdrop) backdrop.classList.add('is-active');
      document.body.style.overflow = 'hidden';

      const firstInteractive = navMenu.querySelector('a, button');
      if (firstInteractive) firstInteractive.focus();
    }

    function closeMenu() {
      toggleBtn.setAttribute('aria-expanded', 'false');
      navMenu.classList.remove('is-open');
      if (backdrop) backdrop.classList.remove('is-active');
      document.body.style.overflow = '';
      toggleBtn.focus();
    }

    toggleBtn.addEventListener('click', function () {
      const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    if (backdrop) {
      backdrop.addEventListener('click', closeMenu);
    }

    // Escape key closes mobile navigation
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggleBtn.getAttribute('aria-expanded') === 'true') {
        closeMenu();
      }
    });

    // Close drawer when an anchor link is clicked
    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        if (toggleBtn.getAttribute('aria-expanded') === 'true') {
          closeMenu();
        }
      });
    });
  }

  /* --------------------------------------------------------------------------
   * 2. ScrollSpy Navigation Active Link Highlighter
   * -------------------------------------------------------------------------- */
  function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.main-nav .nav-link');

    if (!sections.length || !navLinks.length) return;

    function updateActiveNav() {
      const scrollPos = window.scrollY + 120; // 120px header buffer

      sections.forEach(function (section) {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');

        if (scrollPos >= top && scrollPos < top + height) {
          navLinks.forEach(function (link) {
            if (link.getAttribute('href') === '#' + id) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }

    window.addEventListener('scroll', updateActiveNav, { passive: true });
    updateActiveNav();
  }

  /* --------------------------------------------------------------------------
   * 3. Accessible Hero Carousel
   * -------------------------------------------------------------------------- */
  function initHeroCarousel() {
    const carouselWrapper = document.querySelector('.hero-section');
    if (!carouselWrapper) return;

    const slides = carouselWrapper.querySelectorAll('.carousel-slide');
    const dots = carouselWrapper.querySelectorAll('.carousel-dot');
    const prevBtn = carouselWrapper.querySelector('.carousel-prev');
    const nextBtn = carouselWrapper.querySelector('.carousel-next');
    const playPauseBtn = carouselWrapper.querySelector('.carousel-play-pause');

    if (slides.length <= 1) return;

    let currentIndex = 0;
    let timer = null;
    let isPlaying = true;
    const intervalTime = 5500;

    // Check system preference for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      isPlaying = false;
      updatePlayPauseState();
    }

    function goToSlide(index) {
      slides[currentIndex].classList.remove('is-active');
      if (dots[currentIndex]) {
        dots[currentIndex].classList.remove('is-active');
        dots[currentIndex].setAttribute('aria-selected', 'false');
      }

      currentIndex = (index + slides.length) % slides.length;

      slides[currentIndex].classList.add('is-active');
      if (dots[currentIndex]) {
        dots[currentIndex].classList.add('is-active');
        dots[currentIndex].setAttribute('aria-selected', 'true');
      }
    }

    function nextSlide() {
      goToSlide(currentIndex + 1);
    }

    function prevSlide() {
      goToSlide(currentIndex - 1);
    }

    function startAutoplay() {
      if (timer) clearInterval(timer);
      if (!prefersReducedMotion && isPlaying) {
        timer = setInterval(nextSlide, intervalTime);
      }
    }

    function stopAutoplay() {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    }

    function updatePlayPauseState() {
      if (!playPauseBtn) return;
      const iconPause = playPauseBtn.querySelector('.icon-pause');
      const iconPlay = playPauseBtn.querySelector('.icon-play');

      if (isPlaying) {
        playPauseBtn.setAttribute('aria-label', 'Pause slideshow');
        if (iconPause) iconPause.style.display = 'block';
        if (iconPlay) iconPlay.style.display = 'none';
        startAutoplay();
      } else {
        playPauseBtn.setAttribute('aria-label', 'Play slideshow');
        if (iconPause) iconPause.style.display = 'none';
        if (iconPlay) iconPlay.style.display = 'block';
        stopAutoplay();
      }
    }

    // Button event listeners
    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        nextSlide();
        if (isPlaying) startAutoplay();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        prevSlide();
        if (isPlaying) startAutoplay();
      });
    }

    if (playPauseBtn) {
      playPauseBtn.addEventListener('click', function () {
        isPlaying = !isPlaying;
        updatePlayPauseState();
      });
    }

    dots.forEach(function (dot, index) {
      dot.addEventListener('click', function () {
        goToSlide(index);
        if (isPlaying) startAutoplay();
      });
    });

    // Pause on hover or focus for accessibility
    carouselWrapper.addEventListener('mouseenter', stopAutoplay);
    carouselWrapper.addEventListener('mouseleave', function () {
      if (isPlaying) startAutoplay();
    });
    carouselWrapper.addEventListener('focusin', stopAutoplay);
    carouselWrapper.addEventListener('focusout', function () {
      if (isPlaying) startAutoplay();
    });

    // Start on load if permitted
    if (isPlaying) {
      startAutoplay();
    }
  }

  /* --------------------------------------------------------------------------
   * 4. Accessible Menu Category Tabs
   * -------------------------------------------------------------------------- */
  function initMenuTabs() {
    const tabButtons = document.querySelectorAll('.menu-tab-btn');
    const tabPanels = document.querySelectorAll('.menu-tab-panel');

    if (!tabButtons.length || !tabPanels.length) return;

    tabButtons.forEach(function (button, index) {
      button.addEventListener('click', function () {
        activateTab(button);
      });

      // Keyboard left/right arrow navigation
      button.addEventListener('keydown', function (e) {
        let targetIndex = index;
        if (e.key === 'ArrowRight') {
          targetIndex = (index + 1) % tabButtons.length;
        } else if (e.key === 'ArrowLeft') {
          targetIndex = (index - 1 + tabButtons.length) % tabButtons.length;
        }

        if (targetIndex !== index) {
          e.preventDefault();
          tabButtons[targetIndex].focus();
          activateTab(tabButtons[targetIndex]);
        }
      });
    });

    function activateTab(selectedBtn) {
      const targetPanelId = selectedBtn.getAttribute('aria-controls');

      tabButtons.forEach(function (btn) {
        btn.classList.remove('is-active');
        btn.setAttribute('aria-selected', 'false');
      });

      tabPanels.forEach(function (panel) {
        panel.setAttribute('hidden', '');
        panel.classList.remove('is-active');
      });

      selectedBtn.classList.add('is-active');
      selectedBtn.setAttribute('aria-selected', 'true');

      const targetPanel = document.getElementById(targetPanelId);
      if (targetPanel) {
        targetPanel.removeAttribute('hidden');
        targetPanel.classList.add('is-active');
      }
    }
  }

  /* --------------------------------------------------------------------------
   * 5. Accessible Gallery Lightbox Modal
   * -------------------------------------------------------------------------- */
  function initGalleryLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.querySelector('.lightbox-modal');

    if (!galleryItems.length || !lightbox) return;

    const lightboxImg = lightbox.querySelector('.lightbox-image');
    const captionEl = lightbox.querySelector('.lightbox-caption');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');
    const backdrop = lightbox.querySelector('.lightbox-backdrop');

    let currentIndex = 0;
    let lastActiveTrigger = null;

    const itemsData = [];
    galleryItems.forEach(function (item, index) {
      const img = item.querySelector('img');
      const captionText = item.querySelector('.gallery-caption-text');
      itemsData.push({
        src: img ? img.getAttribute('src') : '',
        alt: img ? img.getAttribute('alt') : '',
        caption: captionText ? captionText.textContent.trim() : ''
      });

      function handleOpen() {
        lastActiveTrigger = item;
        openLightbox(index);
      }

      item.addEventListener('click', handleOpen);
      item.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleOpen();
        }
      });
    });

    function openLightbox(index) {
      currentIndex = index;
      displayItem(currentIndex);
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      if (closeBtn) closeBtn.focus();
    }

    function closeLightbox() {
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (lastActiveTrigger) lastActiveTrigger.focus();
    }

    function displayItem(index) {
      const data = itemsData[index];
      if (!data) return;
      lightboxImg.src = data.src;
      lightboxImg.alt = data.alt;
      if (captionEl) {
        captionEl.textContent = data.caption || data.alt;
      }
    }

    function showPrev() {
      currentIndex = (currentIndex - 1 + itemsData.length) % itemsData.length;
      displayItem(currentIndex);
    }

    function showNext() {
      currentIndex = (currentIndex + 1) % itemsData.length;
      displayItem(currentIndex);
    }

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (backdrop) backdrop.addEventListener('click', closeLightbox);
    if (prevBtn) prevBtn.addEventListener('click', showPrev);
    if (nextBtn) nextBtn.addEventListener('click', showNext);

    document.addEventListener('keydown', function (e) {
      if (lightbox.getAttribute('aria-hidden') === 'false') {
        if (e.key === 'Escape') {
          closeLightbox();
        } else if (e.key === 'ArrowLeft') {
          showPrev();
        } else if (e.key === 'ArrowRight') {
          showNext();
        }
      }
    });
  }

})();
