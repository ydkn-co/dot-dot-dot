import * as React from 'react'
import { useTranslation } from 'react-i18next'

import Settings from '~/app/settings'
import Logo from '~/components/Logo'

import Board from './Board'
import Controls from './Controls'
import { BottomPane, TopPane, Wrapper } from './elements'
import { GameStatus } from './types'

const isActive = (gameStatus: GameStatus) => gameStatus !== GameStatus.New

const Game: React.FC = () => {
  const [gameStatus, setGameStatus] = React.useState<GameStatus>(GameStatus.New)
  const { t } = useTranslation()

  return (
    <Wrapper
      isActive={isActive(gameStatus)}
    >
      <Board />

      <TopPane
        data-testid="status-description"
      >
        <Logo>{t('app.name')}</Logo>
      </TopPane>

      <BottomPane>
        <Controls
          gameStatus={gameStatus}
          setGameStatus={setGameStatus}
        />

        <Settings />
      </BottomPane>
    </Wrapper>
  )
}

export default Game
