import * as React from 'react'

import { useAppState } from '~/store'

import Background from './Background'
import Dots from './Dots'
import { Container } from './GameElements'

interface GameProps {
  className?: string;
}

const Game: React.FC<GameProps> = (props) => {
  const { className } = props
  const gameRef = React.useRef<HTMLDivElement | null>(null)
  const { dispatch } = useAppState()

  React.useEffect(() => {
    if (!gameRef.current) {
      return
    }

    dispatch({
      payload: {
        height: gameRef.current.offsetHeight,
        width: gameRef.current.offsetWidth
      },
      type: '@APP/UPDATE_DIMENSIONS'
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
    //     type: '@APP/UPDATE_DIMENSIONS'
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
