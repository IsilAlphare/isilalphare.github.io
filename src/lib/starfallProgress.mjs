export function readingPosition(marker, stops) {
  if (!stops.length) return { y: 0, index: 0 };
  const y = Math.max(stops[0], Math.min(marker, stops[stops.length - 1]));
  let index = 0;
  for (let i = 1; i < stops.length; i++) {
    if (y >= (stops[i - 1] + stops[i]) / 2) index = i;
  }
  return { y, index };
}
