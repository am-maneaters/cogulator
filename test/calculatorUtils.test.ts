import { describe, it, expect } from 'vitest';
import { calculateCogHealth } from '../src/utils/calculatorUtils';

describe('calculateCogHealth', () => {
  it('should be greater than 0', () => {
    expect(() => calculateCogHealth(0)).toThrowError();
  });

  it('should work 1-11', () => {
    expect(calculateCogHealth(1)).toBe(6);
    expect(calculateCogHealth(11)).toBe(156);
  });

  it('should work 12+', () => {
    expect(calculateCogHealth(12)).toBe(196);
    expect(calculateCogHealth(13)).toBe(224);
  });
});
