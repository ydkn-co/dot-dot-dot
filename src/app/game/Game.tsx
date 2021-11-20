import * as React from 'react'

import { useGame } from '~/app/game'

import Background from './Background'
import Dots from './Dots'
import { Container } from './GameElements'

interface GameProps {
  className?: string;
}

const Game: React.FC<GameProps> = (props) => {
  const { className } = props
  const gameRef = React.useRef<HTMLDivElement | null>(null)
  const { dispatch: gameDispatch } = useGame()

  React.useEffect(() => {
    if (!gameRef.current) {
      return
    }

    gameDispatch({
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

    //   gameDispatch({
    //     payload: {
    //       height: boardRef.current.offsetHeight,
    //       width: boardRef.current.offsetWidth
    //     },
    //     type: '@GAME/UPDATE_DIMENSIONS'
    //   })
    // })
  }, [
    gameRef,
    gameDispatch
  ])

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
