import * as React from 'react'

import Menu from '~/components/Menu'
import { useAppState } from '~/store'

import { Container, Game } from './AppElements'

const App: React.FC = () => {
  const { app } = useAppState()

  return (
    <Container
      appBackgroundColor={app.backgroundColor}
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
