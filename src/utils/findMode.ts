/**
 * Example:
 * findMode([{ value: 1 }, { value: 2 }, { value: 2 }], item => item.value)
 * // => 2
 */
export const findMode = <T>(items: T[]): T | undefined  => {
  if (items.length === 0) return undefined;
  
  // _.countBy doesn't work here, because it
  // converts it K to string. use Map to preserve type T
  const valueToCount: Map<T, number> = items.reduce((result, value) => {
    if (result.has(value)) {
      const existingCount = result.get(value) as number;
      result.set(value, existingCount + 1)
    } else {
      result.set(value, 1);
    }

    return result;
  }, new Map<T, number>());

  const max: [T, number] = Array.from(valueToCount.entries()).reduce(
    ([value, maxCount], [currentValue, currentCount]) =>
      (currentCount > maxCount)
        ? [currentValue, currentCount]
        : [value, maxCount]
  );

  return max[0];
};

