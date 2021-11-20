import * as React from 'react'
import { useTranslation } from 'react-i18next'

import { useGame } from '~/app/game'
import Icon from '~/components/Icon'
import { useTheme } from '~/styled'

import {
  PauseButton,
  // PauseIcon,
  PlayButton,
  // PlayIcon,
  Wrapper
} from './ControlsElements'

const Controls: React.FC = () => {
  const { t } = useTranslation()
  const { game, dispatch } = useGame()
  const theme = useTheme()

  const { PlaySvg, PauseSvg } = theme.icons.svgs

  return (
    <Wrapper>
      {game.status === 'unstarted' && (
        <PlayButton
          data-testid="play-btn"
          icon={(
            <Icon
              Svg={PlaySvg}
              size="md"
            />
          )}
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
          data-testid="resume-btn"
          icon={(
            <Icon
              Svg={PlaySvg}
              size="md"
            />
          )}
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
          data-testid="pause-btn"
          icon={(
            <Icon
              Svg={PauseSvg}
              size="md"
            />
          )}
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
