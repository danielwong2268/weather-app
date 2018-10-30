import roundDecimal1Places from "../roundDecimal1Place";


describe('roundDecimal1Place', () => {
  it('works on an integer', () => {
    expect(roundDecimal1Places(1)).toEqual(1);
  });

  it('rounds the decimal appropriately', () => {
    expect(roundDecimal1Places(1.05)).toEqual(1.1);
    expect(roundDecimal1Places(1.06)).toEqual(1.1);
    expect(roundDecimal1Places(1.04)).toEqual(1);

    expect(roundDecimal1Places(1.00004)).toEqual(1);
    expect(roundDecimal1Places(1.00552)).toEqual(1);
  });
})