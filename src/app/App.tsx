import * as React from 'react'

import { Board, Controls, useGame } from '~/app/game'
import Settings from '~/app/settings'
import Logo from '~/components/Logo'

import { BottomPane, TopPane, Wrapper } from './elements'

const App: React.FC = () => {
  const { game } = useGame()

  return (
    <Wrapper
      isActive={game.status !== 'unstarted'}
    >
      <Board />

      <TopPane>
        <Logo />
        {game.score}
      </TopPane>

      <BottomPane>
        <Controls />
        <Settings />
      </BottomPane>
    </Wrapper>
  )
}

export default App
