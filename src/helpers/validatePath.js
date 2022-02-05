export function validatePath(path) {
  console.log({ path });
  const pattern = new RegExp("^[0-9a-zA-Z\\-]+$");
  return pattern.test(path) && path.length > 2;
}
