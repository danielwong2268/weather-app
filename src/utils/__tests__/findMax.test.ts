import identity from 'lodash/identity';
import findMax from '../findMax';


describe('findMax', () => {
  it('Given empty array, returns empty array', () => {
    expect(findMax([], identity)).toEqual([]);
  });

  it('finds the maximum for input greater than 3', () => {
    const inputs = [
      { value: 10 },
      { value: 15 },
      { value: -5 }
    ];

    const selector = (input: { value: number }) => input.value;

    expect(findMax(inputs, selector)).toBe(15);
  });

  it('finds the maximum for input length 1', () => {
    const inputs = [ { value: 10 } ];

    const selector = (input: { value: number }) => input.value;

    expect(findMax(inputs, selector)).toBe(10);
  })
});