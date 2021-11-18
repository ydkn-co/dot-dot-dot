import * as React from 'react'
import { v4 as uuidv4 } from 'uuid'

import { useSettings } from '~/app/settings/store'
import Background from '~/components/Background'
import useInterval from '~/hooks/useInterval'

import Dot from '../Dot'
import { useGame } from '../store'
import { Wrapper } from './elements'

const DOT_FALL_INTERVAL = 1000
export interface BoardDimensions {
  height: number;
  width: number;
}

const Board: React.FC = () => {
  const isMounted = React.useRef(false)
  const boardRef = React.useRef<HTMLDivElement | null>(null)
  const [
    dimensions,
    setDimensions
  ] = React.useState<BoardDimensions | null>(null)
  const { settings } = useSettings()
  const { game } = useGame()

  const [dots, setDots] = React.useState(new Set<string>())

  const handleResize = () => {
    if (!boardRef.current) {
      return
    }

    setDimensions({
      height: boardRef.current.offsetHeight,
      width: boardRef.current.offsetWidth
    })
  }

  const intervalCallback = () => {
    const id = uuidv4()
    setDots(previous => {
      previous.add(id)
      return new Set([...previous])
    })
  }

  const interval = useInterval(intervalCallback, DOT_FALL_INTERVAL)

  React.useEffect(() => {
    isMounted.current = true
    interval.start()
  }, [ // eslint-disable-line react-hooks/exhaustive-deps
    interval.ref
  ])

  React.useEffect(() => {
    if (!isMounted.current) {
      return
    }

    if (game.status === 'playing') {
      interval.start()
    } else {
      interval.stop()
    }
  }, [ // eslint-disable-line react-hooks/exhaustive-deps
    game.status,
    interval.ref,
    isMounted
  ])

  React.useEffect(() => {
    if (!boardRef.current) {
      return
    }

    setDimensions({
      height: boardRef.current.offsetHeight,
      width: boardRef.current.offsetWidth
    })

    window.addEventListener('resize', handleResize)
  }, [
    boardRef
  ])

  const handleRemovalCallback = React.useCallback(id => {
    setDots(previous => {
      previous.delete(id)
      return new Set([...previous])
    })
  }, [])

  return (
    <Wrapper
      data-board-domrect-height={dimensions?.height}
      data-board-domrect-width={dimensions?.width}
      data-difficulty={settings.difficulty}
      data-fallrate={`${settings.difficulty * 10}px / sec`}
      data-game-status={game.status}
      data-score={game.score}
      ref={boardRef}
    >
      <Background />
      {dimensions && [...dots].map(id => (
        <Dot
          boardDimensions={dimensions}
          handleRemovalCallback={handleRemovalCallback}
          id={id}
          key={id}
        />
      ))}
    </Wrapper>
  )
}

export default React.memo(Board)
