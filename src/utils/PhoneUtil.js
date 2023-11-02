/**
 *
 * @param {string} v
 */
export function FormatPhone(v) {
  v = v.replaceAll(' ', '');
  return [v.slice(0, 3), v.slice(3, 7), v.slice(7)]
    .filter(item => !!item)
    .join(' ');
}
