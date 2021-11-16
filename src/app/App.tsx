import * as React from 'react'

import { Board, Controls, GameStatus } from '~/app/game'
import Settings from '~/app/settings'
import { SettingsProvider } from '~/app/settings/store'
import Logo from '~/components/Logo'

import { BottomPane, TopPane, Wrapper } from './elements'

const isActive = (gameStatus: GameStatus) => gameStatus !== GameStatus.New

const App: React.FC = () => {
  const [gameStatus, setGameStatus] = React.useState<GameStatus>(GameStatus.New)

  return (
    <SettingsProvider>
      <Wrapper
        isActive={isActive(gameStatus)}
      >
        <Board />

        <TopPane>
          <Logo />
        </TopPane>

        <BottomPane>
          <Controls
            gameStatus={gameStatus}
            setGameStatus={setGameStatus}
          />
          <Settings />
        </BottomPane>
      </Wrapper>
    </SettingsProvider>
  )
}

export default App
