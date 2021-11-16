import * as React from 'react'

import { Board, Controls } from '~/app/game'
import { GameStatus, useGame } from '~/app/game/store'
import Settings from '~/app/settings'
import Logo from '~/components/Logo'

import { BottomPane, TopPane, Wrapper } from './elements'

const isActive = (gameStatus: GameStatus) => gameStatus !== 'unstarted'

const App: React.FC = () => {
  const { game } = useGame()

  return (
    <Wrapper
      isActive={isActive(game.status)}
    >
      <Board />

      <TopPane>
        <Logo />
      </TopPane>

      <BottomPane>
        <Controls />
        <Settings />
      </BottomPane>
    </Wrapper>
  )
}

export default App
