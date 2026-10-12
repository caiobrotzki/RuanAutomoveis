const requestedMotion = new URLSearchParams(window.location.search).get('motion');
const forceFullMotionForDevelopment = import.meta.env.DEV && requestedMotion !== 'reduce';

if (forceFullMotionForDevelopment) {
  document.documentElement.dataset.motion = 'full';
}

export function shouldReduceMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches && !forceFullMotionForDevelopment;
}
