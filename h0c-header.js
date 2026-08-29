/* H0C shared mobile navigation */
(() => {
  'use strict';
  document.querySelectorAll('.site-header, .events-header').forEach(header => {
    const button = header.querySelector('.menu-toggle');
    const nav = header.querySelector('.site-nav, .events-nav');
    if (!button || !nav) return;

    const setState = open => {
      header.classList.toggle('is-menu-open', open);
      button.setAttribute('aria-expanded', String(open));
      button.innerHTML = open
        ? 'Menu <span aria-hidden="true">×</span>'
        : 'Menu <span aria-hidden="true">☰</span>';
    };

    setState(false);
    button.addEventListener('click', () => setState(!header.classList.contains('is-menu-open')));

    nav.addEventListener('click', e => {
      if (e.target.closest('a')) setState(false);
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 900) setState(false);
    });
  });
})();
