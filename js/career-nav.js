const header = document.querySelector('.career-tools .topbar');
if (header) {
  const nav = header.querySelector('nav');
  nav.id = 'career-primary-nav';
  const toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = 'career-menu-toggle';
  toggle.setAttribute('aria-controls', nav.id);
  toggle.innerHTML = '<span aria-hidden="true"></span><span aria-hidden="true"></span>';
  const setOpen = (open) => {
    header.classList.toggle('menu-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
  };
  setOpen(false);
  header.append(toggle);
  header.classList.add('menu-ready');
  toggle.addEventListener('click', () => setOpen(!header.classList.contains('menu-open')));
  header.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && header.classList.contains('menu-open')) {
      setOpen(false);
      toggle.focus();
    }
  });
  document.addEventListener('click', (event) => {
    if (!header.contains(event.target)) setOpen(false);
  });
  nav.addEventListener('click', (event) => {
    if (event.target.closest('a')) setOpen(false);
  });
  matchMedia('(max-width: 800px)').addEventListener('change', () => setOpen(false));
}
