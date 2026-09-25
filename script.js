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
    document.querySelectorAll('[data-dropdown].is-open').forEach((d) => d.classList.remove('is-open'));
    dropdown.classList.add('is-open');
    nav.classList.add('nav-active');
  });

  dropdown.addEventListener('mouseleave', (e) => {
    const rect = dropdown.getBoundingClientRect();
    const leftThroughBottom = e.clientY >= rect.bottom - 1;
    if (leftThroughBottom) {
      dropdown.classList.remove('is-open');
      nav.classList.remove('nav-active');
    }
  });
});