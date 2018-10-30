/**
 * Finds the numerical min of an array of type T,
 * based on a selector you pass in.
 */
const findMin = <T>(arr: T[], selector: (value: T) => number) => {
  if (arr.length === 0) return arr;

  return arr.reduce((max, item) => (
    Math.min(max, selector(item))
  ), selector(arr[0]))
};

export default findMin;