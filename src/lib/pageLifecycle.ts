/** Bind when the DOM is usable, without waiting for images or external fonts. */
export function onPageLoad(setup: (scope: { signal: AbortSignal; cleanup: (fn: () => void) => void }) => void) {
  let dispose: (() => void) | undefined;
  const mount = () => {
    // DOM readiness and Astro's later page-load can both fire for the same page.
    if (dispose) return;
    const controller = new AbortController();
    const cleanups: (() => void)[] = [];
    dispose = () => { controller.abort(); cleanups.forEach(fn => fn()); };
    setup({ signal: controller.signal, cleanup: fn => cleanups.push(fn) });
  };
  document.addEventListener('astro:before-swap', () => { dispose?.(); dispose = undefined; });
  document.addEventListener('astro:after-swap', mount);
  document.addEventListener('astro:page-load', mount);
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount, { once: true });
  } else mount();
}
