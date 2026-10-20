(() => {
  document.querySelectorAll('[data-copyright-year]').forEach(year => { year.textContent = new Date().getFullYear(); });
  const button = document.getElementById('hamb');
  const menu = document.getElementById('menu');
  const panel = menu.querySelector('.mobile-menu__panel');
  const desktop = matchMedia('(min-width: 900px)');
  const background = [document.querySelector('.topbar-inner'), document.querySelector('main'), document.getElementById('backToTop')];
  let scrollY = 0;
  menu.inert = true;

  function closeMenu() {
    if (!menu.classList.contains('open')) return;
    menu.classList.remove('open');
    button.setAttribute('aria-expanded', 'false');
    background.forEach(element => { element.inert = false; });
    document.body.classList.remove('no-scroll');
    document.body.style.top = '';
    window.scrollTo({top: scrollY, behavior: 'instant'});
    if (!desktop.matches) button.focus({preventScroll: true});
    else document.activeElement?.blur();
    menu.inert = true;
    menu.setAttribute('aria-hidden', 'true');
  }

  panel.addEventListener('transitionend', event => {
    if (event.propertyName === 'transform' && menu.classList.contains('open')) {
      panel.querySelector('button').focus({preventScroll: true});
    }
  });
  button.addEventListener('click', () => {
    if (desktop.matches || menu.classList.contains('open')) return;
    scrollY = window.scrollY;
    menu.inert = false;
    menu.setAttribute('aria-hidden', 'false');
    menu.classList.add('open');
    button.setAttribute('aria-expanded', 'true');
    document.body.style.top = `-${scrollY}px`;
    document.body.classList.add('no-scroll');
    requestAnimationFrame(() => requestAnimationFrame(() => {
      if (menu.classList.contains('open')) panel.querySelector('button').focus({preventScroll: true});
    }));
    background.forEach(element => { element.inert = true; });
  });
  menu.addEventListener('click', event => {
    if (event.target.closest('[data-close], a[href]')) closeMenu();
  });
  menu.addEventListener('keydown', event => {
    if (event.key === 'Escape') { event.preventDefault(); closeMenu(); }
    if (event.key !== 'Tab') return;
    const nodes = panel.querySelectorAll('button, a[href]');
    const first = nodes[0], last = nodes[nodes.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault(); last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault(); first.focus();
    }
  });
  desktop.addEventListener('change', () => { if (desktop.matches) closeMenu(); });
  window.addEventListener('pagehide', closeMenu);
})();
