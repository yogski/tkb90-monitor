import { expect } from 'chai';
import { parseAbbrValue } from '../../src/handlers/valueHandler'; // Adjust the import path as necessary

describe('parseAbbrValue', () => {
  it('should parse "10M" as 10000000', () => {
    expect(parseAbbrValue('10M')).to.equal(10000000);
  });

  it('should parse "10 M" as 10000000000 in ID locale', () => {
    expect(parseAbbrValue('10 M', 'ID')).to.equal(10000000000);
  });

  it('should parse "10 jt" as 10000000 in ID locale', () => {
    expect(parseAbbrValue('10 jt', 'ID')).to.equal(10000000);
  });

  it('should parse "10 juta" as 10000000 in ID locale', () => {
    expect(parseAbbrValue('10 juta', 'ID')).to.equal(10000000);
  });

  it('should parse "10 rb" as 10000 in ID locale', () => {
    expect(parseAbbrValue('10 rb', 'ID')).to.equal(10000);
  });

  it('should parse "10 ribu" as 10000 in ID locale', () => {
    expect(parseAbbrValue('10 ribu', 'ID')).to.equal(10000);
  });

  it('should parse "19000" as 19000 in ID locale', () => {
    expect(parseAbbrValue('19000', 'ID')).to.equal(19000);
  });

  it('should parse "10k" as 10000 in EN locale', () => {
    expect(parseAbbrValue('10k', 'EN')).to.equal(10000);
  });

  it('should parse "10 k" as 10000 in EN locale', () => {
    expect(parseAbbrValue('10 k', 'EN')).to.equal(10000);
  });

  it('should parse "515.65 M" as 515650000000 in ID locale', () => {
    expect(parseAbbrValue('515.65 M', 'ID')).to.equal(515650000000);
  });

  it('should return NaN for "10pi" in EN locale', () => {
    expect(parseAbbrValue('10pi', 'EN')).to.be.NaN;
  });

  it('should return NaN for "10m10" in ID locale', () => {
    expect(parseAbbrValue('10m10', 'ID')).to.be.NaN;
  });

  it('should return NaN for "over9000"', () => {
    expect(parseAbbrValue('over9000')).to.be.NaN;
  });

  it('should return NaN for "10 k k" in ID locale', () => {
    expect(parseAbbrValue('10 k k', 'ID')).to.be.NaN;
  });

  it('should return NaN for "10 k 10k" in ID locale', () => {
    expect(parseAbbrValue('10 k k', 'ID')).to.be.NaN;
  });
});
