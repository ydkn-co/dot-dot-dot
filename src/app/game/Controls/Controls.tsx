import * as React from 'react'
import { useTranslation } from 'react-i18next'

import { useGame } from '~/app/game'
import { ReactComponent as PauseIcon } from '~/assets/pause.svg'
import { ReactComponent as PlayIcon } from '~/assets/play.svg'

import { PauseButton, PlayButton, Wrapper } from './elements'

const Controls: React.FC = () => {
  const { t } = useTranslation()
  const { game, dispatch } = useGame()

  return (
    <Wrapper>
      {game.status === 'unstarted' && (
        <PlayButton
          Icon={PlayIcon}
          data-testid="play-btn"
          onClick={() => dispatch({
            payload: 'playing',
            type: '@GAME/UPDATE_STATUS'
          })}
        >
          {t('game.controlButtonText.unstarted')}
        </PlayButton>
      )}

      {game.status === 'paused' && (
        <PlayButton
          Icon={PlayIcon}
          data-testid="resume-btn"
          onClick={() => dispatch({
            payload: 'playing',
            type: '@GAME/UPDATE_STATUS'
          })}
        >
          {t('game.controlButtonText.paused')}
        </PlayButton>
      )}

      {game.status === 'playing' && (
        <PauseButton
          Icon={PauseIcon}
          data-testid="pause-btn"
          onClick={() => dispatch({
            payload: 'paused',
            type: '@GAME/UPDATE_STATUS'
          })}
        >
          {t('game.controlButtonText.playing')}
        </PauseButton>
      )}
    </Wrapper>
  )
}

export default Controls
