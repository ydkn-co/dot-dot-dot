import * as React from 'react'

import { useGame } from '~/components/Game'

import Background from './Background'
import Dots from './Dots'
import { Container } from './GameElements'

interface GameProps {
  autoplay?: boolean;
  className?: string;
}

const Game: React.FC<GameProps> = (props) => {
  const { autoplay, className } = props
  const gameRef = React.useRef<HTMLDivElement | null>(null)
  const { dispatch } = useGame()

  React.useEffect(() => {
    if (autoplay) {
      dispatch({
        payload: 'playing',
        type: '@GAME/UPDATE_STATUS'
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
      ref={gameRef}
    >
      <Dots />
      <Background />
    </Container>
  )
}

export default React.memo(Game)
