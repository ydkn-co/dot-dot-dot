import * as React from 'react'
import { useTranslation } from 'react-i18next'

import { GameStatus } from '.'
import ControlButton from './ControlButton'
import styles from './ControlButton.module.scss'

const isPlayable = (gameStatus: GameStatus) => [
  GameStatus.Paused,
  GameStatus.New
].includes(gameStatus)

const isPausible = (gameStatus: GameStatus) => gameStatus === GameStatus.Playing

const Game: React.FC = () => {
  const [gameStatus, setGameStatus] = React.useState<GameStatus>(GameStatus.New)
  const { t } = useTranslation()

  return (
    <section>
      <p
        data-testid="status-description"
      >
        {t(`game.statusDescription.${gameStatus}`)}
      </p>

      <div
        className={styles.controls}
      >
        {isPlayable(gameStatus) && (
          <ControlButton
            data-testid="play-btn"
            icon={(<></>)}
            onClick={() => setGameStatus(GameStatus.Playing)}
            text={t('game.controlButtonText.play')}
          />
        )}

        {isPausible(gameStatus) && (
          <ControlButton
            data-testid="pause-btn"
            icon={(<></>)}
            onClick={() => setGameStatus(GameStatus.Paused)}
            text={t('game.controlButtonText.pause')}
          />
        )}
      </div>
    </section>
  )
}

export default Game
