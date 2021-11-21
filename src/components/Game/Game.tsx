import merge from 'lodash.merge'
import * as React from 'react'

import type { Settings } from '~/components/Game'
import { useGame } from '~/components/Game'

import Background from './Background'
import Dots from './Dots'
import { Container } from './GameElements'

interface GameProps {
  autoplay?: boolean;
  className?: string;
  isFullscreen?: boolean;
  readonly?: boolean;
  settings?: Partial<Settings>;
}

const Game: React.FC<GameProps> = (props) => {
  const { autoplay, className, isFullscreen, settings } = props
  const gameRef = React.useRef<HTMLDivElement | null>(null)
  const { game, dispatch } = useGame()

  React.useEffect(() => {
    if (autoplay) {
      dispatch({
        payload: 'playing',
        type: '@GAME/UPDATE_STATUS'
      })
    }

    if (isFullscreen) {
      dispatch({
        payload: isFullscreen,
        type: '@GAME/UPDATE_IS_FULLSCREEN'
      })
    }

    console.log('!!!!')

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

    // window.addEventListener('resize', () => {
    //   if (!boardRef.current) {
    //     return
    //   }

    //   dispatch({
    //     payload: {
    //       height: boardRef.current.offsetHeight,
    //       width: boardRef.current.offsetWidth
    //     },
    //     type: '@GAME/UPDATE_DIMENSIONS'
    //   })
    // })
  }, [dispatch])

  return (
    <Container
      className={className}
      isFullscreen={game.isFullscreen}
      ref={gameRef}
    >
      <Dots />
      <Background />
    </Container>
  )
}

export default React.memo(Game)
