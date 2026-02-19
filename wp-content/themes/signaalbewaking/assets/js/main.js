/**
 * SignaalBewaking — Main JS
 * Mobile menu, sticky header, FAQ accordion, smooth scroll, mega dropdown, animations
 */
(function() {
  'use strict';

  // Sticky header shrink on scroll
  var header = document.querySelector('.sb-header');
  if (header) {
    var ticking = false;
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
  var toggle = document.querySelector('.sb-menu-toggle');
  var nav = document.querySelector('.sb-nav');

  function closeMenu() {
    if (!nav || !toggle) return;
    nav.classList.remove('sb-nav--open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    // Reset hamburger icon
    var bars = toggle.querySelectorAll('line');
    if (bars.length === 3) {
      bars[0].setAttribute('y1', '6'); bars[0].setAttribute('y2', '6');
      bars[0].setAttribute('x1', '3'); bars[0].setAttribute('x2', '21');
      bars[1].style.opacity = '1';
      bars[2].setAttribute('y1', '18'); bars[2].setAttribute('y2', '18');
      bars[2].setAttribute('x1', '3'); bars[2].setAttribute('x2', '21');
    }
    // Close mega dropdowns
    document.querySelectorAll('.sb-mega-dropdown').forEach(function(dd) {
      dd.classList.remove('sb-mega--open');
    });
    // Reset chevrons
    document.querySelectorAll('.sb-nav-item .sb-chevron').forEach(function(ch) {
      ch.style.transform = '';
    });
  }

  if (toggle && nav) {
    toggle.addEventListener('click', function() {
      var isOpen = nav.classList.contains('sb-nav--open');
      if (isOpen) {
        closeMenu();
      } else {
        nav.classList.add('sb-nav--open');
        toggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
        // Morph hamburger → X
        var bars = toggle.querySelectorAll('line');
        if (bars.length === 3) {
          bars[0].setAttribute('y1', '6'); bars[0].setAttribute('y2', '18');
          bars[0].setAttribute('x1', '6'); bars[0].setAttribute('x2', '18');
          bars[1].style.opacity = '0';
          bars[2].setAttribute('y1', '18'); bars[2].setAttribute('y2', '6');
          bars[2].setAttribute('x1', '6'); bars[2].setAttribute('x2', '18');
        }
      }
    });

    // Close mobile menu when clicking a regular nav link (not mega dropdown parent)
    nav.querySelectorAll('.sb-nav-link').forEach(function(link) {
      // Skip the mega dropdown parent link — it toggles the dropdown
      if (link.parentElement.querySelector('.sb-mega-dropdown')) return;
      link.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
          closeMenu();
        }
      });
    });

    // Close menu when clicking the CTA
    var cta = nav.querySelector('.sb-nav-cta');
    if (cta) {
      cta.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
          closeMenu();
        }
      });
    }

    // Close menu on links inside mega dropdown
    nav.querySelectorAll('.sb-mega-links a, .sb-mega-all').forEach(function(link) {
      link.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
          closeMenu();
        }
      });
    });
  }

  // Mobile: toggle mega dropdown on click
  var isMobile = function() { return window.innerWidth <= 768; };

  document.querySelectorAll('.sb-nav-item').forEach(function(item) {
    var megaDD = item.querySelector('.sb-mega-dropdown');
    if (!megaDD) return;

    var link = item.querySelector('.sb-nav-link');
    var chevron = item.querySelector('.sb-chevron');
    if (link) {
      link.addEventListener('click', function(e) {
        if (isMobile()) {
          e.preventDefault();
          var wasOpen = megaDD.classList.contains('sb-mega--open');

          // Close all other mega dropdowns first
          document.querySelectorAll('.sb-mega-dropdown.sb-mega--open').forEach(function(dd) {
            if (dd !== megaDD) {
              dd.classList.remove('sb-mega--open');
              var otherChevron = dd.parentElement.querySelector('.sb-chevron');
              if (otherChevron) otherChevron.style.transform = '';
            }
          });

          megaDD.classList.toggle('sb-mega--open');
          var expanded = megaDD.classList.contains('sb-mega--open');
          link.setAttribute('aria-expanded', expanded);

          // Rotate chevron
          if (chevron) {
            chevron.style.transform = expanded ? 'rotate(180deg)' : '';
          }
        }
      });
    }
  });

  // Close mobile menu on window resize to desktop
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768 && nav && nav.classList.contains('sb-nav--open')) {
      closeMenu();
    }
  });

  // FAQ accordion
  document.querySelectorAll('.sb-faq__question').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var item = btn.closest('.sb-faq__item');
      var wasActive = item.classList.contains('active');
      document.querySelectorAll('.sb-faq__item.active').forEach(function(el) {
        el.classList.remove('active');
      });
      if (!wasActive) item.classList.add('active');
    });
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function(link) {
    link.addEventListener('click', function(e) {
      var href = this.getAttribute('href');
      if (href === '#') return;
      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        // Close mobile menu if open
        if (nav && nav.classList.contains('sb-nav--open')) {
          closeMenu();
        }
        // Scroll with offset for fixed header
        var headerHeight = header ? header.offsetHeight : 80;
        var targetPos = target.getBoundingClientRect().top + window.scrollY - headerHeight - 16;
        window.scrollTo({ top: targetPos, behavior: 'smooth' });
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
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    animateEls.forEach(function(el) { observer.observe(el); });
  }
})();
