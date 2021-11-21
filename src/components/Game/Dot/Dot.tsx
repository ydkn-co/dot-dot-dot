import * as React from 'react'

import { useGame } from '~/components/Game'
import randomNumberBetween from '~/utils/randomNumberBetween'

import { Wrapper } from './DotElements'

// const getElementTranslationY = (element: HTMLElement) => {
//   const { transform } = window.getComputedStyle(element)
//   const { f: translationY } = new DOMMatrix(transform)
//   return translationY
// }
interface DotProps {
  id: string;
  onRemoveCallback: (id: string) => void;
}

const Dot: React.FC<DotProps> = (props) => {
  const { id, onRemoveCallback } = props
  const { game, dispatch } = useGame()
  const { settings } = game

  /**
   * A dot's diameter is a random number between the lower and upper bounds,
   * inclusive of the bounds.
   */
  const diameter = React.useMemo(
    () => randomNumberBetween(settings.diameter.min, settings.diameter.max),
    [
      settings.diameter
    ]
  )

  /**
   * A dot's point value has an inverse relationship to it's size. The smaller
   * a dot is, the more points it is worth.
   *
   * A dot also needs to be able to observe min and max values. If the
   * calculation relative to the max value is below the minValue, use the min
   * value instead.
   */
  const value = React.useMemo(() => Math.max(
    settings.value.min,
    Math.round(
      (settings.diameter.min + settings.diameter.max - diameter) /
        settings.value.max
    )
  ), [
    diameter,
    settings.value,
    settings.diameter
  ])

  const xPercent = React.useMemo(() => randomNumberBetween(1, 100), [])

  const animationRef = React.useRef<Animation>()
  const dotRef = React.useRef<HTMLButtonElement | null>(null)
  const { difficulty } = settings

  const animation = React.useMemo(() => {
    /**
     * A dot has a random x position in the viewport. To main this position
     * during the resizing of the board, a dot's x position should be a
     * percent age of the board's width.
     */
    const x = Math.round(
      (
        game.dimensions.width - diameter
      ) * xPercent / 100
    )

    /**
     * The y-axis starting point value needs be set beyond the height of the
     * board to the acccount for the dynamic height of the dot.
     *
     * Likewise, the dot needs to finish beyond the height of the board, so
     * the diameter of the dot must be added to the height of the board.
     */
    const y = {
      finish: game.dimensions.height + diameter,
      start: 0 - diameter
    }

    /* eslint-disable max-len */
    /**
     *
     *       total y-axis range of dot
     *  x = ---------------------------  x  1000 (seconds to milliseconds)
     *          pixels per second
     *
     * Larger dots have a larger distance to travel compared to smaller dots,
     * yet they need to travel at the same speed (rate of distance). The total
     * range of a dot on the y-axis will be the height of the board plus the
     * height of the dot, times two, accounting for the occurance of the dot
     * beyond the bounds at the top and bottom of the board.
     *
     * The difficulty, defined by the range input in the app settings, is
     * proportionate to the rate at which a dot falls, 10px per increment in
     * difficulty.
     *
     * It's also worth noting that there is a possibility that a individual can
     * experience an optical illusion where the smaller objects appear to be
     * moving at a higher rate of distance than larger objects.
     *
     * For more info, see - https://jov.arvojournals.org/article.aspx?articleid=2646799
     *
     */
    /* eslint-enable max-len */
    const duration = (
      (game.dimensions.height + diameter * 2) / //
      (difficulty * 10)
    ) * 1000

    const keyframes: [Keyframe, Keyframe] = [
      {
        transform: `translate3d(${x}px, ${y.start}px, 0)`
      },
      {
        transform: `translate3d(${x}px, ${y.finish}px, 0)`
      }
    ]

    return {
      duration,
      keyframes
    }
  }, [
    // dotRef,
    game.dimensions,
    diameter,
    difficulty,
    xPercent
    // animationRef
  ])

  React.useEffect(
    () => {
      if (game.status === 'paused') {
        animationRef.current?.pause()
      }

      if (game.status === 'playing') {
        animationRef.current?.play()
      }
    },
    [
      game.status
    ]
  )

  React.useEffect(
    () => {
      if (!dotRef.current || animationRef.current) {
        return
      }

      const { duration, keyframes } = animation

      animationRef.current = dotRef.current.animate(keyframes, {
        duration,
        id
      })

      animationRef.current.addEventListener('finish', () => {
        animationRef.current?.cancel()
        onRemoveCallback(id)
      })
    },
    [
      animation,
      animationRef,
      dotRef,
      game.status,
      id,
      onRemoveCallback
    ]
  )

  const clickedRef = React.useRef<boolean>(false)
  const handleClick = () => {
    if (game.status !== 'playing' || clickedRef.current) {
      return
    }

    clickedRef.current = true

    dispatch({
      payload: game.score + value,
      type: '@GAME/UPDATE_SCORE'
    })

    onRemoveCallback(id)
  }

  return (
    <Wrapper
      animationState={game.status === 'playing' ? 'running' : 'paused'}
      diameter={diameter}
      onMouseDown={handleClick}
      ref={dotRef}
    />
  )
}

export default React.memo(Dot)
