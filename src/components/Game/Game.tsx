import * as React from 'react'
import { useTranslation } from 'react-i18next'

import Board from '../Board'
import Controls from '../Controls'
import Logo from '../Logo'
import Settings from '../Settings'
import { GameStatus } from '.'
import { BottomPane, TopPane, Wrapper } from './elements'

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
