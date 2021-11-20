import * as React from 'react'

import { useGame } from '~/app/game'
import { BoardDimensions } from '~/app/game/Board'
import { useSettings } from '~/app/settings'
import randomNumberBetween from '~/utils/randomNumberBetween'

import { Wrapper } from './DotElements'

const getElementTranslationY = (element: HTMLElement) => {
  const { transform } = window.getComputedStyle(element)
  const { f: translationY } = new DOMMatrix(transform)
  return translationY
}
interface DotProps {
  boardDimensions: BoardDimensions;
  className?: string;
  id: string;
  onRemoveCallback: (id: string) => void;
}

const Dot: React.FC<DotProps> = (props) => {
  const { boardDimensions, className, id, onRemoveCallback } = props
  const { settings } = useSettings()
  const { minDiameter, maxDiameter } = settings.dot

  /**
   * A dot's diameter is a random number between the lower and upper bounds,
   * inclusive of the bounds.
   */
  const diameter = React.useMemo(
    () => randomNumberBetween(minDiameter, maxDiameter),
    [
      minDiameter,
      maxDiameter
    ]
  )

  /**
   * A dot's point value has an inverse relationship to it's size. The smaller
   * a dot is, the more points it is worth.
   */
  const value = React.useMemo(() => Math.round(
    (minDiameter + maxDiameter - diameter) / minDiameter
  ), [
    diameter,
    minDiameter,
    maxDiameter
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
        boardDimensions.width - diameter
      ) * xPercent / 100
    )

    /**
     * The y-axis starting point value needs be set beyond the acccount for the dynamic height
     * of the dot.
     *
     *
     */
    const y = {
      finish: boardDimensions.height + diameter,
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
      (boardDimensions.height + diameter * 2) / //
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
    boardDimensions,
    diameter,
    difficulty,
    xPercent
    // animationRef
  ])

  const { game, dispatch: gameDispatch } = useGame()

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

    gameDispatch({
      payload: game.score + value,
      type: '@GAME/UPDATE_SCORE'
    })

    onRemoveCallback(id)
  }

  return (
    <Wrapper
      animationState={game.status === 'playing' ? 'running' : 'paused'}
      className={className}
      diameter={diameter}
      onMouseDown={handleClick}
      ref={dotRef}
    />
  )
}

export default React.memo(Dot)
