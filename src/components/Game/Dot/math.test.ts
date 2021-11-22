/* eslint-disable sort-keys, sort-keys-fix/sort-keys-fix */
import { durationInMs, randomDiameter, value } from './math'

describe('math', () => {
  describe('randomDiameter()', () => {
    test('returns a minimum diameter of 1', () => {
      expect(randomDiameter(-10, 0)).toBe(1)
    })

    test('returns a number between the min and max', () => {
      const min = 3
      const max = 1

      for (let i = 0; i < 10; i++) {
        const d = randomDiameter(min, max)
        expect(d).toBeGreaterThanOrEqual(max)
        expect(d).toBeLessThanOrEqual(min)
      }
    })

    test('if min is greater than the max, use swap the min and max', () => {
      const min = 3
      const max = 1

      for (let i = 0; i < 10; i++) {
        const d = randomDiameter(min, max)
        expect(d).toBeGreaterThanOrEqual(max)
        expect(d).toBeLessThanOrEqual(min)
      }
    })
  })

  describe('value()', () => {
    const baseArgs = {
      minValue: 1,
      maxValue: 10,
      minDiameter: 10,
      maxDiameter: 100
    }

    describe('given value constraints of 1-10, and diameter 10-100', () => {
      test.only.each([
        { ...baseArgs, diameter: 100, expected: 1 },
        { ...baseArgs, diameter: 90, expected: 2 },
        { ...baseArgs, diameter: 80, expected: 3 },
        { ...baseArgs, diameter: 70, expected: 4 },
        { ...baseArgs, diameter: 60, expected: 5 },
        { ...baseArgs, diameter: 50, expected: 6 },
        { ...baseArgs, diameter: 40, expected: 7 },
        { ...baseArgs, diameter: 30, expected: 8 },
        { ...baseArgs, diameter: 20, expected: 9 },
        { ...baseArgs, diameter: 10, expected: 10 }
      ])('a dot with a diameter of $diameter has a value of $expected', ({
        expected, ...args
      }) => {
        expect(value(args)).toBe(expected)
      })
    })
  })

  describe('duration()', () => {
    test('returns a minimum duration of 2 seconds to for a pleasant UX', () => {
      expect(durationInMs(1, 10)).toBe(2000)
    })

    describe('given test cases', () => {
      test.each([
        { h: 1000, d: 10, e: 10 * 1000 },
        { h: 1000, d: 5, e: 20 * 1000 },
        { h: 1000, d: 1, e: 100 * 1000 },
        { h: 500, d: 10, e: 5 * 1000 },
        { h: 500, d: 5, e: 10 * 1000 },
        { h: 500, d: 1, e: 50 * 1000 }
      ])(
        // eslint-disable-next-line max-len
        'given a height of $h and a difficulty of $d, the duration should be $e milliseconds',
        ({ h: height, d: difficulty, e: expected }) => {
          expect(durationInMs(height, difficulty)).toBe(expected)
        }
      )
    })
  })
})
