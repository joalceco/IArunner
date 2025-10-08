import { checkCollision, getDistance, clamp } from '../game/utils/helpers.js';

describe('Collision Detection', () => {
  test('should detect collision when rectangles overlap', () => {
    const rect1 = { x: 0, y: 0, width: 50, height: 50 };
    const rect2 = { x: 25, y: 25, width: 50, height: 50 };
    expect(checkCollision(rect1, rect2)).toBe(true);
  });

  test('should not detect collision when rectangles do not overlap', () => {
    const rect1 = { x: 0, y: 0, width: 50, height: 50 };
    const rect2 = { x: 100, y: 100, width: 50, height: 50 };
    expect(checkCollision(rect1, rect2)).toBe(false);
  });

  test('should detect collision when rectangles touch edges', () => {
    const rect1 = { x: 0, y: 0, width: 50, height: 50 };
    const rect2 = { x: 50, y: 0, width: 50, height: 50 };
    expect(checkCollision(rect1, rect2)).toBe(false);
  });

  test('should detect collision when one rectangle is inside another', () => {
    const rect1 = { x: 0, y: 0, width: 100, height: 100 };
    const rect2 = { x: 25, y: 25, width: 25, height: 25 };
    expect(checkCollision(rect1, rect2)).toBe(true);
  });
});

describe('Distance Calculation', () => {
  test('should calculate distance between two points', () => {
    const distance = getDistance(0, 0, 3, 4);
    expect(distance).toBe(5);
  });

  test('should return 0 for same point', () => {
    const distance = getDistance(5, 5, 5, 5);
    expect(distance).toBe(0);
  });

  test('should handle negative coordinates', () => {
    const distance = getDistance(-3, -4, 0, 0);
    expect(distance).toBe(5);
  });
});

describe('Utility Functions', () => {
  test('clamp should restrict value within range', () => {
    expect(clamp(5, 0, 10)).toBe(5);
    expect(clamp(-5, 0, 10)).toBe(0);
    expect(clamp(15, 0, 10)).toBe(10);
  });

  test('clamp should handle equal min and max', () => {
    expect(clamp(5, 3, 3)).toBe(3);
  });
});
