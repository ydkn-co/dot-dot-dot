import * as React from 'react'
import { useTranslation } from 'react-i18next'

import { GameStatus, useGame } from '~/app/game/store'
import { ReactComponent as PauseIcon } from '~/assets/pause.svg'
import { ReactComponent as PlayIcon } from '~/assets/play.svg'

import { PauseButton, PlayButton, Wrapper } from './elements'

const isPlayable = (gameStatus: GameStatus) => [
  'paused',
  'unstarted'
].includes(gameStatus)

const isPausible = (gameStatus: GameStatus) => gameStatus === 'playing'

const Controls: React.FC = () => {
  const { t } = useTranslation()
  const { game, dispatch } = useGame()

  return (
    <Wrapper>
      {isPlayable(game.status) && (
        <PlayButton
          Icon={PlayIcon}
          data-testid="play-btn"
          onClick={() => dispatch({
            payload: 'playing',
            type: '@GAME/UPDATE_STATUS'
          })}
        >
          {t('game.controlButtonText.play')}
        </PlayButton>
      )}

      {isPausible(game.status) && (
        <PauseButton
          Icon={PauseIcon}
          data-testid="pause-btn"
          onClick={() => dispatch({
            payload: 'paused',
            type: '@GAME/UPDATE_STATUS'
          })}
        >
          {t('game.controlButtonText.pause')}
        </PauseButton>
      )}
    </Wrapper>
  )
}

export default Controls
