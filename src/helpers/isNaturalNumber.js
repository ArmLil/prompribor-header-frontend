export default function isNaturalNumber(n) {
  if (Number.isInteger(n) && n > 0) return true;
  return false;
}
