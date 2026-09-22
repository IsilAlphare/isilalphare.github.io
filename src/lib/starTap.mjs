export function createDoubleTap() {
  let previous;
  const tap = (time, x, y) => {
    const matched = previous && time - previous.time <= 450 && Math.hypot(x - previous.x, y - previous.y) <= 28;
    previous = matched ? undefined : { time, x, y };
    return Boolean(matched);
  };
  tap.reset = () => { previous = undefined; };
  return tap;
}
