import cx from 'classnames'
import PropTypes from 'prop-types'
import * as React from 'react'
import { useTranslation } from 'react-i18next'

import { ReactComponent as Pause } from '../../assets/pause.svg'
import { ReactComponent as Play } from '../../assets/play.svg'
import { GameStatus } from '.'
import ControlButton from './ControlButton'
import styles from './Game.module.scss'

const isPlayable = (gameStatus: GameStatus) => [
  GameStatus.Paused,
  GameStatus.New
].includes(gameStatus)

const isPausible = (gameStatus: GameStatus) => gameStatus === GameStatus.Playing

const isActive = (gameStatus: GameStatus) => gameStatus !== GameStatus.New

interface GameProps {
  className?: string;
}

const Game: React.FC<GameProps> = (props) => {
  const { className } = props
  const [gameStatus, setGameStatus] = React.useState<GameStatus>(GameStatus.New)
  const { t } = useTranslation()

  return (
    <div
      className={cx(
        className,
        styles.Game,
        {
          [styles.Game__IsActive]: isActive(gameStatus)
        }
      )}
    >
      <div
        className={styles.Board}
      >

      </div>

      <div
        className={styles.TopPane}
        data-testid="status-description"
      >
        <h1>{t('app.name')}</h1>
      </div>

      <div
        className={styles.BottomPane}
      >
        <div
          className={styles.Controls}
        >
          {isPlayable(gameStatus) && (
            <ControlButton
              Icon={Play}
              data-testid="play-btn"
              onClick={() => setGameStatus(GameStatus.Playing)}
              text={t('game.controlButtonText.play')}
            />
          )}

          {isPausible(gameStatus) && (
            <ControlButton
              Icon={Pause}
              data-testid="pause-btn"
              onClick={() => setGameStatus(GameStatus.Paused)}
              text={t('game.controlButtonText.pause')}
            />
          )}
        </div>
      </div>
    </div>
  )
}

Game.propTypes = {
  className: PropTypes.string
}

export default Game
