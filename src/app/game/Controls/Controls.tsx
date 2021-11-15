import * as React from 'react'
import { useTranslation } from 'react-i18next'

import { GameStatus } from '~/app/game/types'
import { ReactComponent as PauseIcon } from '~/assets/pause.svg'
import { ReactComponent as PlayIcon } from '~/assets/play.svg'

import { PauseButton, PlayButton, Wrapper } from './elements'

const isPlayable = (gameStatus: GameStatus) => [
  GameStatus.Paused,
  GameStatus.New
].includes(gameStatus)

const isPausible = (gameStatus: GameStatus) => gameStatus === GameStatus.Playing

interface ControlsProps {
  gameStatus: GameStatus;
  setGameStatus: (gameStatus: GameStatus) => void;
}

const Controls: React.FC<ControlsProps> = (props) => {
  const { gameStatus, setGameStatus } = props
  const { t } = useTranslation()

  return (
    <Wrapper>
      {isPlayable(gameStatus) && (
        <PlayButton
          Icon={PlayIcon}
          data-testid="play-btn"
          onClick={() => setGameStatus(GameStatus.Playing)}
          text={t('game.controlButtonText.play')}
        />
      )}

      {isPausible(gameStatus) && (
        <PauseButton
          Icon={PauseIcon}
          data-testid="pause-btn"
          onClick={() => setGameStatus(GameStatus.Paused)}
          text={t('game.controlButtonText.pause')}
        />
      )}
    </Wrapper>
  )
}

export default Controls
