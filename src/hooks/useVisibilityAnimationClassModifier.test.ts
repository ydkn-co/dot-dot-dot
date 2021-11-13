import { act, renderHook } from '@testing-library/react-hooks'

import useVisibilityAnimationClassModifier from './useVisibilityAnimationClassModifier'

describe('useVisibilityAnimationClassModifier()', () => {
  describe('returned `isVisible` variable', () => {
    test('defaults to false', () => {
      const { result } = renderHook(() => useVisibilityAnimationClassModifier({
        duration: 200
      }))

      expect(result.current.isVisible).toBe(false)
    })

    test('can be set to true', () => {
      const { result } = renderHook(() => useVisibilityAnimationClassModifier({
        duration: 200,
        isVisible: true
      }))

      expect(result.current.isVisible).toBe(true)
    })

    test('can be set to false', () => {
      const { result } = renderHook(() => useVisibilityAnimationClassModifier({
        duration: 200,
        isVisible: false
      }))

      expect(result.current.isVisible).toBe(false)
    })
  })

  describe('returned `toggleIsVisible()` function', () => {
    test('toggles `isVisible` value', () => {
      const { result } = renderHook(() => useVisibilityAnimationClassModifier({
        duration: 200
      }))

      expect(result.current.isVisible).toBe(false)

      act(() => {
        result.current.toggleIsVisible()
      })

      expect(result.current.isVisible).toBe(true)

      act(() => {
        result.current.toggleIsVisible()
      })

      expect(result.current.isVisible).toBe(false)
    })
  })

  describe('returned `cssClassModifier` variable', () => {
    const duration = 200

    describe('if default visibility is false', () => {
      let renderedHook: any

      beforeEach(() => {
        renderedHook = renderHook(
          () => useVisibilityAnimationClassModifier({
            duration,
            isVisible: false
          })
        )
      })

      test('initially returns empty string', () => {
        expect(renderedHook.result.current.cssClassModifier).toBe('')
      })

      test(
        'returns `--animatingIn` immediately after toggling visibility',
        async () => {
          act(() => {
            renderedHook.result.current.toggleIsVisible()
          })

          expect(
            renderedHook.result.current.cssClassModifier
          ).toBe('--animatingIn')
        }
      )

      test(
        `returns \`--visible\` ${duration}ms after toggling visibility`,
        async () => {
          const interval = 50
          let checks = 0

          act(() => {
            renderedHook.result.current.toggleIsVisible()
          })

          await renderedHook.waitFor(
            () => {
              checks++
              return (
                renderedHook.result.current.cssClassModifier === '--visible'
              )
            },
            { interval }
          )

          expect(checks).toBeGreaterThanOrEqual(duration / interval)
        }
      )

      test(
        // eslint-disable-next-line max-len
        'animation is cancelled on subsequent visibility toggles occuring within animation duration',
        async () => {
          const interval = 50
          let checks = 0

          act(() => {
            renderedHook.result.current.toggleIsVisible()
          })

          expect(
            renderedHook.result.current.cssClassModifier
          ).toBe('--animatingIn')

          act(() => {
            renderedHook.result.current.toggleIsVisible()
          })

          expect(
            renderedHook.result.current.cssClassModifier
          ).toBe('--animatingOut')

          await renderedHook.waitFor(
            () => {
              checks++
              return (
                renderedHook.result.current.cssClassModifier === ''
              )
            },
            { interval }
          )

          expect(checks).toBeGreaterThanOrEqual(duration / interval)
        }
      )
    })

    describe('if default visibility is true', () => {
      let renderedHook: any

      beforeEach(() => {
        renderedHook = renderHook(
          () => useVisibilityAnimationClassModifier({
            duration,
            isVisible: true
          })
        )
      })

      test('initially returns `--visible`', () => {
        expect(renderedHook.result.current.cssClassModifier).toBe('--visible')
      })

      test(
        'returns `--animatingOut` immediately after toggling visibility',
        async () => {
          act(() => {
            renderedHook.result.current.toggleIsVisible()
          })

          expect(
            renderedHook.result.current.cssClassModifier
          ).toBe('--animatingOut')
        }
      )

      test(
        `returns empty string ${duration}ms after toggling visibility`,
        async () => {
          const interval = 50
          let checks = 0

          act(() => {
            renderedHook.result.current.toggleIsVisible()
          })

          await renderedHook.waitFor(
            () => {
              checks++
              return (
                renderedHook.result.current.cssClassModifier === ''
              )
            },
            { interval }
          )

          expect(checks).toBeGreaterThanOrEqual(duration / interval)
        }
      )

      test(
        // eslint-disable-next-line max-len
        'animation is cancelled on subsequent visibility toggles occuring within animation duration',
        async () => {
          const interval = 50
          let checks = 0

          act(() => {
            renderedHook.result.current.toggleIsVisible()
          })

          expect(
            renderedHook.result.current.cssClassModifier
          ).toBe('--animatingOut')

          act(() => {
            renderedHook.result.current.toggleIsVisible()
          })

          expect(
            renderedHook.result.current.cssClassModifier
          ).toBe('--animatingIn')

          await renderedHook.waitFor(
            () => {
              checks++
              return (
                renderedHook.result.current.cssClassModifier === '--visible'
              )
            },
            { interval }
          )

          expect(checks).toBeGreaterThanOrEqual(duration / interval)
        }
      )
    })
  })
})
