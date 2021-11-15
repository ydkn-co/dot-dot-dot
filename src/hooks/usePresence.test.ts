import { act, renderHook, RenderHookResult } from '@testing-library/react-hooks'

import usePresence, { Presence } from './usePresence'

describe('usePresence()', () => {
  describe('returned `isVisible` variable', () => {
    test('defaults to false', () => {
      const { result } = renderHook(() => usePresence({
        duration: 200
      }))

      expect(result.current.isVisible).toBe(false)
    })

    test('can be set to true', () => {
      const { result } = renderHook(() => usePresence({
        duration: 200,
        initialVisibility: 'Visible'
      }))

      expect(result.current.isVisible).toBe(true)
    })

    test('can be set to false', () => {
      const { result } = renderHook(() => usePresence({
        duration: 200,
        initialVisibility: 'Hidden'
      }))

      expect(result.current.isVisible).toBe(false)
    })
  })

  describe('returned `show()` function', () => {
    test('toggles `isVisible` value', () => {
      const { result } = renderHook(() => usePresence({
        duration: 200
      }))

      expect(result.current.isVisible).toBe(false)

      act(() => {
        result.current.show()
      })

      expect(result.current.isVisible).toBe(true)
    })

    test('subsequent calls return same result', () => {
      const { result } = renderHook(() => usePresence({
        duration: 200
      }))

      expect(result.current.isVisible).toBe(false)

      act(() => {
        result.current.show()
      })

      expect(result.current.isVisible).toBe(true)

      act(() => {
        result.current.show()
      })

      expect(result.current.isVisible).toBe(true)
    })
  })

  describe('returned `hide()` function', () => {
    test('hides `isVisible` value', () => {
      const { result } = renderHook(() => usePresence({
        duration: 200,
        initialVisibility: 'Visible'
      }))

      expect(result.current.isVisible).toBe(true)

      act(() => {
        result.current.hide()
      })

      expect(result.current.isVisible).toBe(false)
    })

    test('subsequent calls return same result', () => {
      const { result } = renderHook(() => usePresence({
        duration: 200,
        initialVisibility: 'Visible'
      }))

      expect(result.current.isVisible).toBe(true)

      act(() => {
        result.current.hide()
      })

      expect(result.current.isVisible).toBe(false)

      act(() => {
        result.current.hide()
      })

      expect(result.current.isVisible).toBe(false)
    })
  })

  describe('returned `toggle()` function', () => {
    test('toggles `isVisible` value', () => {
      const { result } = renderHook(() => usePresence({
        duration: 200
      }))

      expect(result.current.isVisible).toBe(false)

      act(() => {
        result.current.toggle()
      })

      expect(result.current.isVisible).toBe(true)
    })

    test('subsequent calls return different results', () => {
      const { result } = renderHook(() => usePresence({
        duration: 200
      }))

      expect(result.current.isVisible).toBe(false)

      act(() => {
        result.current.toggle()
      })

      expect(result.current.isVisible).toBe(true)

      act(() => {
        result.current.toggle()
      })

      expect(result.current.isVisible).toBe(false)
    })
  })

  describe('returned `status` variable', () => {
    const duration = 200

    describe('if passed `inititialVisibility` prop is `Hidden`', () => {
      let renderedHook: RenderHookResult<null, Presence>

      beforeEach(() => {
        renderedHook = renderHook<null, Presence>(
          () => usePresence({
            duration
          })
        )
      })

      test('initially returns `Hidden`', () => {
        expect(renderedHook.result.current.status).toBe('Hidden')
      })

      test(
        'returns `AnimatingIn` immediately after toggling visibility',
        async () => {
          act(() => {
            renderedHook.result.current.toggle()
          })

          expect(renderedHook.result.current.status).toBe('AnimatingIn')
        }
      )

      test(
        `returns \`Visible\` ${duration}ms after toggling visibility`,
        async () => {
          const interval = 50
          let checks = 0

          act(() => {
            renderedHook.result.current.toggle()
          })

          await renderedHook.waitFor(
            () => {
              checks++
              return (
                renderedHook.result.current.status === 'Visible'
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
            renderedHook.result.current.toggle()
          })

          expect(
            renderedHook.result.current.status
          ).toBe('AnimatingIn')

          act(() => {
            renderedHook.result.current.toggle()
          })

          expect(
            renderedHook.result.current.status
          ).toBe('AnimatingOut')

          await renderedHook.waitFor(
            () => {
              checks++
              return (
                renderedHook.result.current.status === 'Hidden'
              )
            },
            { interval }
          )

          expect(checks).toBeGreaterThanOrEqual(duration / interval)
        }
      )
    })

    describe('if passed `inititialVisibility` prop is `Visible`', () => {
      let renderedHook: RenderHookResult<null, Presence>

      beforeEach(() => {
        renderedHook = renderHook<null, Presence>(
          () => usePresence({
            duration,
            initialVisibility: 'Visible'
          })
        )
      })

      test('initially returns `Visible`', () => {
        expect(renderedHook.result.current.status).toBe('Visible')
      })

      test(
        'returns `AnimatingOut` immediately after toggling visibility',
        async () => {
          act(() => {
            renderedHook.result.current.toggle()
          })

          expect(renderedHook.result.current.status).toBe('AnimatingOut')
        }
      )

      test(
        `returns empty string ${duration}ms after toggling visibility`,
        async () => {
          const interval = 50
          let checks = 0

          act(() => {
            renderedHook.result.current.toggle()
          })

          await renderedHook.waitFor(
            () => {
              checks++
              return renderedHook.result.current.status === 'Hidden'
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
            renderedHook.result.current.toggle()
          })

          expect(renderedHook.result.current.status).toBe('AnimatingOut')

          act(() => {
            renderedHook.result.current.toggle()
          })

          expect(renderedHook.result.current.status).toBe('AnimatingIn')

          await renderedHook.waitFor(
            () => {
              checks++
              return renderedHook.result.current.status === 'Visible'
            },
            { interval }
          )

          expect(checks).toBeGreaterThanOrEqual(duration / interval)
        }
      )
    })
  })
})
