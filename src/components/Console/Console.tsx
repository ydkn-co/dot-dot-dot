import * as React from 'react'
import { useTranslation } from 'react-i18next'

import Icon from '~/components/Console/Icon'
import { useGame } from '~/components/Game'
import { useTheme } from '~/utils/styled'

import {
  Button,
  Container,
  DifficultySlider,
  GameContainer,
  Header,
  Logo,
  Settings
} from './ConsoleElements'

interface MenuProps {
  children?: React.ReactNode;
}

const Console: React.FC<MenuProps> = (props) => {
  const { children } = props

  const { t } = useTranslation()
  const { game, dispatch } = useGame()
  const theme = useTheme()

  const { PauseSvg, PlaySvg } = theme.assets.icons.svgs

  return (
    <Container>
      <Header>
        <Logo>
          {t('app.name')}
        </Logo>

        {game.status === 'unstarted' && (
          <Button
            icon={(
              <Icon
                Svg={PlaySvg}
              />
            )}
            onClick={() => dispatch({
              payload: 'playing',
              type: '@GAME/UPDATE_STATUS'
            })}
          >
            {t('menu.button.unstarted')}
          </Button>
        )}

        {game.status === 'playing' && (
          <Button
            icon={(
              <Icon
                Svg={PauseSvg}
              />
            )}
            onClick={() => dispatch({
              payload: 'paused',
              type: '@GAME/UPDATE_STATUS'
            })}
          >
            {t('menu.button.playing')}
          </Button>
        )}

        {game.status === 'paused' && (
          <Button
            icon={(
              <Icon
                Svg={PlaySvg}
              />
            )}
            onClick={() => dispatch({
              payload: 'playing',
              type: '@GAME/UPDATE_STATUS'
            })}
          >
            {t('menu.button.paused')}
          </Button>
        )}
      </Header>

      <GameContainer>
        {children}
      </GameContainer>

      <Settings>
        <DifficultySlider />
      </Settings>
    </Container>
  )
}

export default React.memo(Console)
