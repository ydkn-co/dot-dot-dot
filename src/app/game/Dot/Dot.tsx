import * as React from 'react'

import { BoardDimensions } from '~/app/game/Board'
import { useGame } from '~/app/game/store'
import { useSettings } from '~/app/settings/store'
import useInterval from '~/hooks/useInterval'

import { Wrapper, YPositions } from './elements'

const MIN_DIAMETER = 10
const MAX_DIAMETER = 100
const X_POSITION_INTERVAL = 100

const randomNumberBetween = (min: number, max: number) => Math.floor(
  Math.random() * (max - min + 1) + min
)

interface DotProps {
  boardDimensions: BoardDimensions;
  handleRemovalCallback: (id: string) => void;
  id: string;
}

const Dot: React.FC<DotProps> = (props) => {
  const { boardDimensions, id, handleRemovalCallback } = props
  const { game, dispatch } = useGame()
  const { settings } = useSettings()

  /**
   * `clickedRef` is used to track the click status of the dot, to ensure
   * that a dot cannot be clicked on more than once
   */
  const clickedRef = React.useRef<boolean>(false)

  /**
   * A dot's diameter is a random number between the lower and upper bounds,
   * inclusive of the bounds.
   */
  const diameter = React.useMemo<number>(
    () => randomNumberBetween(MIN_DIAMETER, MAX_DIAMETER),
    []
  )

  /**
   * A dot's point value has an inverse relationship to it's size. The smaller a
   * dot is, the more points it is worth.
   */
  const value = React.useMemo<number>(
    () => Math.round(
      (MIN_DIAMETER + MAX_DIAMETER - diameter) / MIN_DIAMETER
    ),
    [
      diameter
    ]
  )

  /**
   * A dot's has a random x position in the viewport. To main this position
   * during the resizing of the viewport, a dot's x position should be a percent
   * age of the viewport.
   */
  const xOffSetPercent = React.useMemo<number>(
    () => randomNumberBetween(1, MAX_DIAMETER),
    []
  )

  /**
   * A dot's has a random x position in the viewport. To main this position
   * during the resizing of the viewport, a dot's x position should be a percent
   * age of the viewport.
   */
  const xPosition = React.useMemo<number>(
    () => (boardDimensions.width - diameter) * xOffSetPercent / 100,
    [
      diameter,
      boardDimensions.width,
      xOffSetPercent
    ]
  )

  const yPositions = React.useMemo<YPositions>(
    () => ({
      finish: boardDimensions.height,
      start: 0 - diameter
    }),
    [
      diameter,
      boardDimensions.height
    ]
  )

  const animationDuration = React.useMemo(
    () => boardDimensions.height / (settings.difficulty * 10),
    [
      boardDimensions.height,
      settings.difficulty
    ]
  )

  const dotRef = React.useRef<HTMLButtonElement>(null)

  const yPositionIntervalCallback = () => {
    if (!dotRef.current) {
      return
    }

    if (dotRef.current.offsetTop >= boardDimensions.height) {
      handleRemovalCallback(id)
    }
  }

  const interval = useInterval(yPositionIntervalCallback, X_POSITION_INTERVAL)

  React.useEffect(() => {
    interval.start()
  },
  [ // eslint-disable-line react-hooks/exhaustive-deps
    interval.ref
  ])

  const handleClick = () => {
    if (game.status !== 'playing' || clickedRef.current) {
      return
    }

    clickedRef.current = true

    dispatch({
      payload: game.score + value,
      type: '@GAME/UPDATE_SCORE'
    })

    handleRemovalCallback(id)
  }

  return (
    <Wrapper
      animationDuration={animationDuration}
      animationState={game.status === 'playing' ? 'running' : 'paused'}
      data-diameter={diameter}
      data-value={value}
      data-x-offset-percent={xOffSetPercent}
      data-x-position={xPosition}
      data-y-position-finish={yPositions.finish}
      data-y-position-start={yPositions.start}
      diameter={diameter}
      onClick={handleClick}
      ref={dotRef}
      xPosition={xPosition}
    />
  )
}

export default React.memo(Dot)
