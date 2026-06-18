import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const container = document.getElementById('stepContainer');
const progressBar = document.getElementById('progressBar');

gsap.to(container, {
  x: -window.innerWidth,
  ease: 'none',
  scrollTrigger: {
    trigger: container,
    start: 'top top',
    end: 'bottom top',
    scrub: 1,
    pin: true
  }
});

window.addEventListener('scroll', () => {
  const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (window.scrollY / totalScroll) * 100;
  progressBar.style.width = progress + '%';
});

document.addEventListener('click', (e) => {
  const img = e.target.closest('.zoomable');
  if (!img) return;
  const overlay = document.createElement('div');
  overlay.className = 'fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4';
  const big = document.createElement('img');
  big.src = img.src;
  big.alt = img.alt;
  big.className = 'max-w-[90vw] max-h-[90vh] object-contain rounded-md';
  overlay.appendChild(big);
  document.body.appendChild(overlay);

  const remove = () => overlay.remove();
  overlay.addEventListener('click', remove);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') remove();
  }, { once: true });
});