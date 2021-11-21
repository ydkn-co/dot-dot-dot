import * as React from 'react'

import { useGame } from '~/components/Game'
import Menu from '~/components/Menu'

import { Container, Game } from './AppElements'

const App: React.FC = () => {
  const { game } = useGame()

  return (
    <Container
      gameBackgroundColor={game.backgroundColor}
    >
      <Menu
        variant="mini"
      />
      <Menu />
      <Game />
    </Container>
  )
}

export default App
