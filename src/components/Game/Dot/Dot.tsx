import * as React from 'react'

import { useGame } from '~/components/Game'
import { collectExpressiveColorsByWeight } from '~/design-language/color'
import randomNumberBetween from '~/utils/randomNumberBetween'

import { Container } from './DotElements'
import * as math from './math'

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
    () => math.randomDiameter(settings.diameter.min, settings.diameter.max),
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
  const value = React.useMemo(() => math.value({
    diameter,
    maxDiameter: settings.diameter.max,
    maxValue: settings.value.max,
    minDiameter: settings.diameter.min,
    minValue: settings.value.min
  }), [
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
  const x = React.useRef(randomNumberBetween(
    0,
    game.dimensions.width - diameter
  ))

  const [vericalProgress, setVerticalProgress] = React.useState(0 - diameter)

  /**
   * This function creates a few outputs that will be consumed by the Web
   * Animation api.
   */
  const animation = React.useMemo(() => {
    /**
     * A dot's position will always start off the board.
     */
    const y = {
      finish: game.dimensions.height,
      start: vericalProgress
    }

    /**
     * The duration of the dot animation needs to consider the dot's height to
     * achieve perceived constant animation rates between dots of varying sizes.
     */
    const duration = math.durationInMs(
      game.dimensions.height - vericalProgress,
      settings.speed
    )

    const keyframes = [
      {
        transform: `translate3d(${x.current}px, ${y.start}px, 0)`
      },
      {
        transform: `translate3d(${x.current}px, ${y.finish}px, 0)`
      }
    ]

    return {
      duration,
      keyframes,
      x: x.current,
      y
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    game.dimensions.height,
    game.dimensions.width,
    diameter,
    settings.speed,
    vericalProgress,
    x
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

      if (game.status === 'paused') {
        animationRef.current.pause()
      }

      animationRef.current.addEventListener('finish', () => {
        animationRef.current?.cancel()
        onRemoveCallback(id)
      })
    },
    [
      animation.duration,
      animation.keyframes,
      animationRef,
      dotRef,
      game.status,
      id,
      onRemoveCallback
    ]
  )

  /**
   * If the speed of the game changes, we need to replace the current animation
   * with a newly recalculated animation.
   */
  React.useEffect(() => {
    if (
      !dotRef.current ||
      !dotRef.current.parentElement ||
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

    setVerticalProgress(translationY)
  }, [
    game.status,
    game.settings.speed
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

  const title = game.status === 'paused'
    ? [
      `ID: ${id}`,
      `Value: ${value}`,
      `Diameter: ${diameter}`,
      `Game Dimensions: ${game.dimensions.width}x${game.dimensions.height}`,
      `Initial coordinates: ${x.current}, ${0 - diameter}`,
      // eslint-disable-next-line max-len
      `Animation vertical progress: ${vericalProgress}`,
      `Animation y-axis [start, finish]: [${animation.y.start}, ${animation.y.finish}]`,
      `Animation keyframe start: ${animation.keyframes[0].transform}`,
      `Animation keyframe finish: ${animation.keyframes[1].transform}`,
      // eslint-disable-next-line max-len
      `Animation Duration as constant: ${math.durationInMs(game.dimensions.height, settings.speed) / 1000}s`,
      `Animation Duration, dot height adjusted: ${animation.duration / 1000}s`
    ].join('\n')
    : ''

  return (
    <Container
      animationState={game.status === 'playing' ? 'running' : 'paused'}
      color={color}
      diameter={diameter}
      isReadonly={game.settings.isReadonly}
      onMouseDown={handleClick}
      onTouchStart={handleClick}
      ref={dotRef}
      title={title}
    />
  )
}

export default React.memo(Dot)
