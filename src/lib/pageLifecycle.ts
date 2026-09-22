/** Each page gets fresh bindings; release observers and global listeners before swapping. */
export function onPageLoad(setup: (scope: { signal: AbortSignal; cleanup: (fn: () => void) => void }) => void) {
  let dispose: (() => void) | undefined;
  document.addEventListener('astro:before-swap', () => { dispose?.(); dispose = undefined; });
  document.addEventListener('astro:page-load', () => {
    dispose?.();
    const controller = new AbortController();
    const cleanups: (() => void)[] = [];
    dispose = () => { controller.abort(); cleanups.forEach(fn => fn()); };
    setup({ signal: controller.signal, cleanup: fn => cleanups.push(fn) });
  });
}
