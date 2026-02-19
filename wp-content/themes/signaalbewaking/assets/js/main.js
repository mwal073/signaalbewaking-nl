/**
 * SignaalBewaking — Main JS
 * Mobile menu toggle, sticky header, FAQ accordion, smooth scroll, mega dropdown
 */
(function() {
  'use strict';

  // Sticky header shrink on scroll
  const header = document.querySelector('.sb-header');
  if (header) {
    let ticking = false;
    window.addEventListener('scroll', function() {
      if (!ticking) {
        window.requestAnimationFrame(function() {
          header.classList.toggle('sb-header--scrolled', window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  // Mobile menu toggle
  const toggle = document.querySelector('.sb-menu-toggle');
  const nav = document.querySelector('.sb-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function() {
      nav.classList.toggle('sb-nav--open');
      const isOpen = nav.classList.contains('sb-nav--open');
      toggle.setAttribute('aria-expanded', isOpen);
      // Update hamburger → X icon
      const bars = toggle.querySelectorAll('line');
      if (bars.length === 3) {
        if (isOpen) {
          bars[0].setAttribute('y1', '6'); bars[0].setAttribute('y2', '18');
          bars[0].setAttribute('x1', '6'); bars[0].setAttribute('x2', '18');
          bars[1].style.opacity = '0';
          bars[2].setAttribute('y1', '18'); bars[2].setAttribute('y2', '6');
          bars[2].setAttribute('x1', '6'); bars[2].setAttribute('x2', '18');
        } else {
          bars[0].setAttribute('y1', '6'); bars[0].setAttribute('y2', '6');
          bars[0].setAttribute('x1', '3'); bars[0].setAttribute('x2', '21');
          bars[1].style.opacity = '1';
          bars[2].setAttribute('y1', '18'); bars[2].setAttribute('y2', '18');
          bars[2].setAttribute('x1', '3'); bars[2].setAttribute('x2', '21');
        }
      }
      // Close mega dropdowns when menu closes
      if (!isOpen) {
        document.querySelectorAll('.sb-mega-dropdown').forEach(function(dd) {
          dd.classList.remove('sb-mega--open');
        });
      }
    });
  }

  // Mobile: toggle mega dropdown on click (touch devices)
  var isMobile = function() { return window.innerWidth <= 768; };

  document.querySelectorAll('.sb-nav-item').forEach(function(item) {
    var megaDD = item.querySelector('.sb-mega-dropdown');
    if (!megaDD) return;

    var link = item.querySelector('.sb-nav-link');
    if (link) {
      link.addEventListener('click', function(e) {
        if (isMobile()) {
          e.preventDefault();
          megaDD.classList.toggle('sb-mega--open');
          var expanded = megaDD.classList.contains('sb-mega--open');
          link.setAttribute('aria-expanded', expanded);
        }
      });
    }
  });

  // FAQ accordion
  document.querySelectorAll('.sb-faq__question').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var item = btn.closest('.sb-faq__item');
      var wasActive = item.classList.contains('active');
      // Close all
      document.querySelectorAll('.sb-faq__item.active').forEach(function(el) {
        el.classList.remove('active');
      });
      if (!wasActive) item.classList.add('active');
    });
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function(link) {
    link.addEventListener('click', function(e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Scroll animation observer
  var animateEls = document.querySelectorAll('.sb-animate');
  if (animateEls.length && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('sb-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    animateEls.forEach(function(el) { observer.observe(el); });
  }
})();
