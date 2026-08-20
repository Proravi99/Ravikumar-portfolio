/* ============================================================
   Motion: scroll-reveal for section blocks + count-up on the
   metric numbers when they enter view. Respects reduced-motion.
   ============================================================ */

(function () {
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---- scroll reveal ----
  var revealEls = document.querySelectorAll('.reveal');

  if (prefersReduced || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('reveal-in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(function (el) { io.observe(el); });
  }

  // ---- count-up metrics ----
  var counters = document.querySelectorAll('[data-count]');

  function animateCount(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    var suffix = el.getAttribute('data-suffix') || '';
    if (prefersReduced) {
      el.textContent = target + suffix;
      return;
    }
    var duration = 1100;
    var start = null;

    function step(ts) {
      if (start === null) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      var value = Math.round(eased * target);
      el.textContent = value + suffix;
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        el.textContent = target + suffix;
      }
    }
    window.requestAnimationFrame(step);
  }

  if (counters.length) {
    if (!('IntersectionObserver' in window)) {
      counters.forEach(animateCount);
    } else {
      var counterIO = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            counterIO.unobserve(entry.target);
          }
        });
      }, { threshold: 0.4 });

      counters.forEach(function (el) { counterIO.observe(el); });
    }
  }

  // ---- active nav link highlight on scroll ----
  var navLinks = document.querySelectorAll('.nav-links a');
  var sections = Array.prototype.map.call(navLinks, function (a) {
    return document.querySelector(a.getAttribute('href'));
  }).filter(Boolean);

  if (sections.length && 'IntersectionObserver' in window) {
    var navIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var id = '#' + entry.target.id;
        var link = document.querySelector('.nav-links a[href="' + id + '"]');
        if (!link) return;
        if (entry.isIntersecting) {
          navLinks.forEach(function (l) { l.classList.remove('active'); });
          link.classList.add('active');
        }
      });
    }, { rootMargin: '-40% 0px -50% 0px' });

    sections.forEach(function (s) { navIO.observe(s); });
  }
})();
