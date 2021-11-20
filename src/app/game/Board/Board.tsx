import * as React from 'react'
import { v4 as uuidv4 } from 'uuid'

import { useGame } from '~/app/game'
import Dot from '~/app/game/Dot'
import { useSettings } from '~/app/settings'
import Background from '~/components/Background'
import useControlledInterval from '~/hooks/useControlledInterval'

import { Wrapper } from './BoardElements'

export interface BoardDimensions {
  height: number;
  width: number;
}

const Board: React.FC = () => {
  const boardRef = React.useRef<HTMLDivElement | null>(null)
  const [
    dimensions,
    setDimensions
  ] = React.useState<BoardDimensions | null>(null)

  React.useEffect(() => {
    if (!boardRef.current) {
      return
    }

    setDimensions({
      height: boardRef.current.offsetHeight,
      width: boardRef.current.offsetWidth
    })

    window.addEventListener('resize', () => {
      if (!boardRef.current) {
        return
      }

      console.log({
        height: boardRef.current.offsetHeight,
        width: boardRef.current.offsetWidth
      })

      setDimensions({
        height: boardRef.current.offsetHeight,
        width: boardRef.current.offsetWidth
      })
    })
  }, [
    boardRef
  ])

  const [dots, setDots] = React.useState(new Set<string>())
  const intervalRef = React.useRef<number>()
  const { game } = useGame()
  const { settings } = useSettings()

  React.useEffect(() => {
    if (game.status === 'playing') {
      intervalRef.current = setInterval(() => {
        const id = uuidv4()

        setDots(previous => {
          previous.add(id)
          return new Set([...previous])
        })
      }, settings.dot.interval)
    } else {
      clearInterval(intervalRef.current)
    }

    return () => clearInterval(intervalRef.current)
  }, [
    game.status,
    settings.dot.interval
  ])

  const handleRemoveCallback = React.useCallback(id => {
    setDots(previous => {
      previous.delete(id)
      return new Set([...previous])
    })
  }, [])

  return (
    <Wrapper
      ref={boardRef}
    >
      <Background />
      {dimensions && [...dots].map(id => (
        <Dot
          boardDimensions={dimensions}
          id={id}
          key={id}
          onRemoveCallback={handleRemoveCallback}
        />
      ))}
    </Wrapper>
  )
}

export default React.memo(Board)
