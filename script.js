// Возвращает пользователя наверх страницы при клике на "ХКБМ"
document.querySelector('.brand-name').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Если video.mp4 ещё не добавлен (или не загрузился) — показываем
// анимированную заглушку вместо видео.
const video = document.getElementById('heroVideo');
const fallback = document.getElementById('videoFallback');
fallback.style.display = 'none';

let resolved = false;
function useFallback() {
  if (resolved) return;
  resolved = true;
  video.style.display = 'none';
  fallback.style.display = 'block';
}

video.addEventListener('error', useFallback, true);
setTimeout(() => {
  if (video.readyState === 0) useFallback();
}, 1500);

const nav = document.querySelector('.nav');

document.querySelectorAll('[data-nav-item]').forEach((item) => {
  const trigger = item.querySelector('.nav-word');
  const dropdown = item.querySelector('[data-dropdown]');
  if (!dropdown) return;

  trigger.addEventListener('mouseenter', () => {
    const wasActive = nav.classList.contains('nav-active');
    const allDropdowns = document.querySelectorAll('[data-dropdown]');

    if (wasActive) {
      allDropdowns.forEach((d) => d.classList.add('instant'));
    }

    allDropdowns.forEach((d) => {
      if (d !== dropdown) d.classList.remove('is-open');
    });

    const inner = dropdown.querySelector('.dropdown-inner');
    if (inner) {
      const rect = trigger.getBoundingClientRect();
      const buttonCenter = rect.left + rect.width / 2;
      const centerCol = inner.querySelector('[data-center-under-trigger]');

      if (centerCol) {
        const currentPadding = parseFloat(inner.style.paddingLeft) || 0;
        const colRect = centerCol.getBoundingClientRect();
        const colCenter = colRect.left + colRect.width / 2;
        const delta = buttonCenter - colCenter;
        inner.style.paddingLeft = (currentPadding + delta) + 'px';
      } else {
        inner.style.paddingLeft = rect.left + 'px';
      }
    }

    dropdown.classList.add('is-open');
    nav.classList.add('nav-active');

    if (wasActive) {
      requestAnimationFrame(() => {
        allDropdowns.forEach((d) => d.classList.remove('instant'));
      });
    }
  });

  dropdown.addEventListener('mouseleave', (e) => {
    const rect = dropdown.getBoundingClientRect();
    const leftThroughBottom = e.clientY >= rect.bottom - 1;
    if (leftThroughBottom) {
      dropdown.classList.remove('is-open');

      dropdown.addEventListener('transitionend', function handler(ev) {
        if (ev.propertyName !== 'max-height') return;
        dropdown.removeEventListener('transitionend', handler);

        const anyOpen = document.querySelector('[data-dropdown].is-open');
        if (!anyOpen) {
          nav.classList.remove('nav-active');
        }
      });
    }
  });
});