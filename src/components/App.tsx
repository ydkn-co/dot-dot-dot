import * as React from 'react'

import Console from '~/components/Console'
import { GameProvider, useGame } from '~/components/Game'

import { ConsoleGame, Container, Game } from './AppElements'

const App: React.FC = () => {
  const { game } = useGame()

  return (
    <Container
      appBackgroundColor={game.backgroundColor}
    >
      <GameProvider>
        <Console>
          <ConsoleGame
            settings={{
              canToggleFullscreen: true
            }}
          />
        </Console>
      </GameProvider>
      <Game
        // autoplay={true}
        isFullscreen={true}
        settings={{
          difficulty: 3,
          interval: 5000,
          isReadonly: true
        }}
      />
    </Container>
  )
}

export default App
