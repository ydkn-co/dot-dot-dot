import * as React from 'react'

import { useGame } from '~/components/Game'
import { collectExpressiveColorsByWeight } from '~/design-language/color'
import randomNumberBetween from '~/utils/randomNumberBetween'

import { Container } from './DotElements'

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
      settings.diameter.min,
      settings.diameter.max
    ]
  )

  /**
   * A dot's point value has an inverse relationship to it's size. The smaller
   * a dot is, the more points it is worth.
   *
   * This could be a large hardcoded switch statement. I prefer a formula. There
   * several dependencies to consider when determining the value. I think a
   * hardcoded switch statement would be more difficult to maintain if any of
   * these values changed.
   */
  const value = React.useMemo(() => Math.max(
    settings.value.min,
    Math.round(
      (settings.diameter.min + settings.diameter.max - diameter) /
        settings.value.max
    )
  ), [
    diameter,
    settings.value.min,
    settings.value.max,
    settings.diameter.min,
    settings.diameter.max
  ])

  /**
   * There are 10 possible point values, and there are also 10 tones (or
   * weights) for each color in Indeed's expressive color chart. Let's pick one
   * a random color at a weight to represent the point value.
   */
  const color = React.useMemo(
    () => {
      const weightColors = collectExpressiveColorsByWeight(400)
      // eslint-disable-next-line security/detect-object-injection
      const randomIdx = randomNumberBetween(0, weightColors.length)
      // eslint-disable-next-line security/detect-object-injection
      return weightColors[randomIdx]
    },
    []
  )

  const animationRef = React.useRef<Animation>()
  const dotRef = React.useRef<HTMLButtonElement | null>(null)

  /**
   * Ensure that a dot is not positioned beyond the bounds the board.
   */
  const x = React.useMemo(() => randomNumberBetween(
    0,
    game.dimensions.width - diameter
  ), [
    game.dimensions.width,
    diameter
  ])

  /**
   * This variable captures the position on the y-axis that the animation will
   * start from.
   */
  const [yStart, setYStart] = React.useState(0 - diameter)

  /**
   * This function creates a few outputs that will be consumed by the Web
   * Animation api.
   */
  const animation = React.useMemo(() => {
    /**
     * A dot's position will always start off the board. However, this value
     * needs to be reset if the speed/difficulty level changes.
     */
    const y = {
      finish: game.dimensions.height,
      start: yStart
    }

    /**
     *
     */
    const duration = (
      ((game.dimensions.height - yStart) * 2) /
      (settings.difficulty * 10)
    ) * 1000

    /**
     * Use `translate3d` to ensure the animation can be hardware accelerated and
     * run in its own thread.
     */
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    game.dimensions.height,
    game.dimensions.width,
    diameter,
    settings.difficulty,
    x,
    yStart
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

  /**
   * Use the Web Animation api to animate the dot's fall. After the fall is
   * complete, the dot is deleted to hedge against unneccessary dom elements
   * laying around, possibly impacting performance if there is a large
   * accumulation of them.
   */
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

  /**
   * If the difficulty level/speed of the game changes, we need to replace the
   * current animation with a newly recalculated animation.
   */
  React.useEffect(() => {
    if (
      !dotRef.current ||
      !animationRef.current ||
      animationRef.current.currentTime === 0
    ) {
      return
    }

    if (game.status === 'playing') {
      animationRef.current.pause()
    }

    animationRef.current = undefined

    const { transform } = window.getComputedStyle(dotRef.current)
    const { f: translationY } = new DOMMatrix(transform)

    setYStart(translationY)
  }, [
    game.settings.difficulty
  ])

  /**
   * Update the score on click, and then remove the dot. Also, use a ref to
   * hedge against double clicks that might result in firing duplicate events.
   *
   * This is really unlikely by a human, but it's a good practice to hedge
   * against those pesky bots.
   */
  const clickedRef = React.useRef<boolean>(false)
  const handleClick = () => {
    if (
      game.status !== 'playing' ||
      clickedRef.current ||
      game.settings.isReadonly
    ) {
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
    <Container
      animationState={game.status === 'playing' ? 'running' : 'paused'}
      color={color}
      diameter={diameter}
      isReadonly={game.settings.isReadonly}
      onMouseDown={handleClick}
      ref={dotRef}
    />
  )
}

export default React.memo(Dot)
