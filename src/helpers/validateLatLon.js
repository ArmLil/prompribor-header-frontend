export function validateLatLon(latOrlng) {
  return isFinite(latOrlng) && Math.abs(latOrlng) <= 90;
}
