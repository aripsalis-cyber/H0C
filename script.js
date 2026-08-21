const button = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');
button.addEventListener('click', () => {
  const open = nav.classList.toggle('is-open');
  button.setAttribute('aria-expanded', open);
});
nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('is-open');
  button.setAttribute('aria-expanded', 'false');
}));
const languageSelect = document.querySelector('[data-language-select]');
if (languageSelect) languageSelect.addEventListener('change', (event) => {
  if (event.target.value) window.location.href = event.target.value;
});
