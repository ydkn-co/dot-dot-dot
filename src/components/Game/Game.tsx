import merge from 'lodash.merge'
import * as React from 'react'

import type { Settings } from '~/components/Game'
import { useGame } from '~/components/Game'

import Background from './Background'
import Dots from './Dots'
import { Container } from './GameElements'

interface GameProps {
  className?: string;
  readonly?: boolean;
  settings?: Partial<Settings>;
}

const Game: React.FC<GameProps> = (props) => {
  const { className, settings } = props
  const gameRef = React.useRef<HTMLDivElement | null>(null)
  const { game, dispatch } = useGame()

  React.useEffect(() => {
    if (settings) {
      dispatch({
        payload: merge(
          {},
          game.settings,
          settings
        ),
        type: '@GAME/UPDATE_SETTINGS'
      })
    }
  }, [])

  React.useEffect(() => {
    if (!gameRef.current) {
      return
    }

    dispatch({
      payload: {
        height: gameRef.current.offsetHeight,
        width: gameRef.current.offsetWidth
      },
      type: '@GAME/UPDATE_DIMENSIONS'
    })
  }, [dispatch])

  const handleResize = () => {
    if (!gameRef.current) {
      return
    }

    dispatch({
      payload: {
        height: gameRef.current.offsetHeight,
        width: gameRef.current.offsetWidth
      },
      type: '@GAME/UPDATE_DIMENSIONS'
    })
  }

  React.useEffect(() => {
    window.addEventListener('resize', handleResize)
  }, [])

  return (
    <Container
      className={className}
      ref={gameRef}
    >
      <Dots />
      <Background />
    </Container>
  )
}

export default React.memo(Game)
