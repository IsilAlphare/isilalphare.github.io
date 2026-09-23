/** Feedback follows the active navigation, including aborts and rapid retargeting. */
export function createNavigationFeedback({ show, hide, setTimer = setTimeout, clearTimer = clearTimeout }) {
  let active;
  function finish() {
    if (active) { clearTimer(active.timer); active.signal?.removeEventListener('abort', active.abort); }
    active = undefined;
    hide();
  }
  function start(label, signal) {
    finish();
    if (signal?.aborted) return;
    const state = { label, signal, timer: undefined, abort: undefined };
    active = state;
    state.abort = () => { if (active === state) finish(); };
    signal?.addEventListener('abort', state.abort, { once: true });
    show({ label, slow: false });
    state.timer = setTimer(() => {
      if (active === state) show({ label, slow: true });
    }, 8000);
  }
  return { start, finish };
}
