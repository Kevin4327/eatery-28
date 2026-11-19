/**
 * Eatery 28 — Menu Interaction Script
 * Progressive enhancement for category navigation and section scrolling.
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', initMenuNavigation);

  function initMenuNavigation() {
    const tabBtns = document.querySelectorAll('.menu-tab-btn');
    const menuSections = document.querySelectorAll('.menu-section');

    if (!tabBtns.length || !menuSections.length) return;

    // Handle click on category tabs
    tabBtns.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = btn.getAttribute('data-target');
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
          // Update active tab appearance
          tabBtns.forEach(function (b) {
            b.classList.remove('active');
            b.setAttribute('aria-selected', 'false');
          });
          btn.classList.add('active');
          btn.setAttribute('aria-selected', 'true');

          // Smooth scroll to section
          targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });

          // Update URL hash cleanly without jumping
          if (history.pushState) {
            history.pushState(null, null, '#' + targetId);
          }
        }
      });
    });

    // IntersectionObserver to update active tab as user scrolls
    if ('IntersectionObserver' in window) {
      const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
      };

      const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const currentId = entry.target.getAttribute('id');
            tabBtns.forEach(function (btn) {
              if (btn.getAttribute('data-target') === currentId) {
                btn.classList.add('active');
                btn.setAttribute('aria-selected', 'true');
              } else {
                btn.classList.remove('active');
                btn.setAttribute('aria-selected', 'false');
              }
            });
          }
        });
      }, observerOptions);

      menuSections.forEach(function (section) {
        observer.observe(section);
      });
    }
  }
})();
