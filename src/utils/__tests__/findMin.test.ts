import identity from 'lodash/identity';
import findMin from '../findMin';


describe('findMin', () => {
  it('Given empty array, returns empty array', () => {
    expect(findMin([], identity)).toEqual([]);
  });

  it('finds the minimum for input greater than 3', () => {
    const inputs = [
      { value: 10 },
      { value: 15 },
      { value: -5 }
    ];

    const selector = (input: { value: number }) => input.value;

    expect(findMin(inputs, selector)).toBe(-5);
  });

  it('finds the minimum for input length 1', () => {
    const inputs = [ { value: 10 } ];

    const selector = (input: { value: number }) => input.value;

    expect(findMin(inputs, selector)).toBe(10);
  })
});