// Jalankan lewat DevTools Console pada viewport < 900px:
// await import('./mobile-check.js')
(async () => {
  const assert = (condition, message) => { if (!condition) throw new Error(message); };
  assert(innerWidth < 900, 'Gunakan viewport mobile');
  const menu = document.getElementById('menu');
  const button = document.getElementById('hamb');
  const y = scrollY;
  button.click();
  await new Promise(resolve => setTimeout(resolve, 400));
  assert(document.activeElement.id === 'closeMenu', 'Fokus awal menu');
  assert(document.querySelector('main').inert, 'Konten belakang tidak interaktif');
  document.activeElement.dispatchEvent(new KeyboardEvent('keydown', {key: 'Tab', shiftKey: true, bubbles: true, cancelable: true}));
  assert(document.activeElement === menu.querySelector('a:last-child'), 'Fokus berputar dalam menu');
  document.activeElement.dispatchEvent(new KeyboardEvent('keydown', {key: 'Escape', bubbles: true}));
  assert(menu.inert && button.getAttribute('aria-expanded') === 'false', 'Menu tertutup');
  assert(!document.body.classList.contains('no-scroll') && Math.abs(scrollY - y) < 2, 'Scroll dipulihkan');
  assert(document.activeElement === button, 'Fokus kembali ke hamburger');
  console.log('Mobile navigation OK');
})();
