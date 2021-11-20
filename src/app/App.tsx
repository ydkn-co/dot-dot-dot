import * as React from 'react'

import { Controls, useGame } from '~/app/game'
import Settings from '~/app/settings'
import Logo from '~/components/Logo'

import { BottomPane, Container, Game, TopPane } from './AppElements'

const App: React.FC = () => {
  const { game, dispatch } = useGame()

  React.useEffect(() => {
    window.addEventListener('resize', () => {
      dispatch({
        payload: 'paused',
        type: '@GAME/UPDATE_STATUS'
      })
    })
  }, [
    dispatch
  ])

  return (
    <Container
      isActive={game.status !== 'unstarted'}
    >
      <Game />

      <TopPane>
        <Logo />
        {game.score}
      </TopPane>

      <BottomPane>
        <Controls />
        <Settings />
      </BottomPane>
    </Container>
  )
}

export default App
