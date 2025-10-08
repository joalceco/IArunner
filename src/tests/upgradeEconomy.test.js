import { calculateUpgradeCost } from '../game/utils/helpers.js';
import { GAME_CONFIG } from '../game/config.js';

describe('Upgrade Economy', () => {
  test('should calculate base cost correctly', () => {
    const cost = calculateUpgradeCost(100, 0, 2);
    expect(cost).toBe(100);
  });

  test('should increase cost exponentially', () => {
    const baseCost = 100;
    const multiplier = 2;

    const cost1 = calculateUpgradeCost(baseCost, 1, multiplier);
    const cost2 = calculateUpgradeCost(baseCost, 2, multiplier);
    const cost3 = calculateUpgradeCost(baseCost, 3, multiplier);

    expect(cost1).toBe(200);
    expect(cost2).toBe(400);
    expect(cost3).toBe(800);
  });

  test('should calculate costs for all upgrades', () => {
    Object.keys(GAME_CONFIG.UPGRADES).forEach((key) => {
      const upgrade = GAME_CONFIG.UPGRADES[key];
      const baseCost = upgrade.baseCost;
      const multiplier = upgrade.costMultiplier;
      const maxLevel = upgrade.maxLevel;

      for (let level = 0; level < maxLevel; level++) {
        const cost = calculateUpgradeCost(baseCost, level, multiplier);
        expect(cost).toBeGreaterThan(0);
        expect(cost).toBe(Math.floor(baseCost * Math.pow(multiplier, level)));
      }
    });
  });

  test('should scale costs appropriately to slow power growth', () => {
    const magnetUpgrade = GAME_CONFIG.UPGRADES.MAGNET;
    const cost1 = calculateUpgradeCost(magnetUpgrade.baseCost, 0, magnetUpgrade.costMultiplier);
    const cost2 = calculateUpgradeCost(magnetUpgrade.baseCost, 1, magnetUpgrade.costMultiplier);
    const cost3 = calculateUpgradeCost(magnetUpgrade.baseCost, 2, magnetUpgrade.costMultiplier);

    // Each level should cost significantly more
    expect(cost2).toBeGreaterThan(cost1 * 2);
    expect(cost3).toBeGreaterThan(cost2 * 2);
  });

  test('should ensure headphones (most expensive) costs more than other upgrades', () => {
    const headphones = GAME_CONFIG.UPGRADES.HEADPHONES;
    const magnet = GAME_CONFIG.UPGRADES.MAGNET;

    const headphonesCost = calculateUpgradeCost(
      headphones.baseCost,
      0,
      headphones.costMultiplier
    );
    const magnetCost = calculateUpgradeCost(magnet.baseCost, 0, magnet.costMultiplier);

    expect(headphonesCost).toBeGreaterThan(magnetCost);
  });
});
