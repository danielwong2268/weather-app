/**
 * Finds the numerical max of an array of type T,
 * based on a selector you pass in.
 */
const findMax = <T>(arr: T[], selector: (value: T) => number) => {
  if (arr.length === 0) return arr;

  return arr.reduce((max, item) => (
    Math.max(max, selector(item))
  ), selector(arr[0]))
};

export default findMax;