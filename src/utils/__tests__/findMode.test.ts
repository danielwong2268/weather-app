import { findMode } from '../findMode';


describe('findMode', () => {
  it('return undefined if input is empty array', () => {
    expect(findMode([])).toBe(undefined);
  });

  describe('For an unempty array', () => {
    it('if there are multiple modes, returns the first mode', () => {
      expect(findMode([1,2,3,4,5])).toBe(1);
      expect(findMode([2,1,2,1])).toBe(2);
    });
  
    it('returns the mode', () => {
      expect(findMode([2,1,2,1,2])).toBe(2);
      expect(findMode([2,2,2])).toBe(2);
    });

    it('works for a string array', () => {
      expect(findMode(['2','2','2'])).toBe('2');
      expect(findMode(['2','1','2'])).toBe('2');
    });
  })
});