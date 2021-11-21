import * as React from 'react'
import { useTranslation } from 'react-i18next'

import type { Variant } from '~/components/Menu'
import Icon from '~/components/Menu/Icon'
import { usePresence } from '~/hooks'
import { useAppState } from '~/store'
import { useTheme } from '~/styled'

import {
  Container,
  Controls,
  DifficultySlider,
  Logo,
  PlayButton,
  Settings,
  SettingsButton
} from './MenuElements'

const modifierMap = {
  AnimatingIn: '--animatingIn',
  AnimatingOut: '--animatingOut',
  Hidden: '',
  Visible: '--visible'
}

interface MenuProps {
  variant?: Variant
}

const Menu: React.FC<MenuProps> = (props) => {
  const { variant = 'full' } = props

  const { t } = useTranslation()
  const { app, dispatch } = useAppState()
  const theme = useTheme()

  const { CloseSvg, PauseSvg, PlaySvg, SettingsSvg } = theme.assets.icons.svgs

  const presence = usePresence({
    duration: 200,
    initialVisibility: 'Visible'
  })

  const [cssModifier, setCssModifier] = React.useState('')

  React.useEffect(() => {
    setCssModifier(modifierMap.Visible)
  }, [])

  React.useEffect(() => {
    if (app.status !== 'playing') {
      setCssModifier(modifierMap.Visible)
    }
  }, [
    app.status
  ])

  React.useEffect(() => {
    const cssModifier = modifierMap[presence.status] || ''
    setCssModifier(cssModifier)
  }, [
    presence.status
  ])

  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false)

  return (
    <Container
      modifier={cssModifier}
      variant={variant}
    >
      {variant === 'full' && (
        <Logo>
          {t('app.name')}
        </Logo>
      )}

      <Controls>
        <SettingsButton
          data-testid="toggle-settings-btn"
          icon={(
            <Icon
              Svg={isSettingsOpen ? CloseSvg : SettingsSvg}
            />
          )}
          isSettingsOpen={isSettingsOpen}
          onClick={() => setIsSettingsOpen(!isSettingsOpen)}
          variant={variant}
        >
          {
            isSettingsOpen
              ? t('menu.button.settings.open')
              : t('menu.button.settings.close')
          }
        </SettingsButton>

        {variant === 'mini' && (
          <PlayButton
            data-testid="resume-btn"
            icon={(
              <Icon
                Svg={PauseSvg}
              />
            )}
            onClick={() => dispatch({
              payload: 'paused',
              type: '@APP/UPDATE_STATUS'
            })}
            variant={variant}
          >
            {t('menu.button.paused')}
          </PlayButton>
        )}

        {variant === 'full' && (
          <PlayButton
            data-testid="play-btn"
            icon={(
              <Icon
                Svg={PlaySvg}
              />
            )}
            onClick={() => dispatch({
              payload: 'playing',
              type: '@APP/UPDATE_STATUS'
            })}
            variant={variant}
          >
            {t('menu.button.unstarted')}
          </PlayButton>
        )}
      </Controls>
      <Settings
        variant={variant}
      >
        <DifficultySlider
          variant={variant}
        />
      </Settings>
    </Container>
  )
}

Menu.defaultProps = {
  variant: 'full'
}

export default React.memo(Menu)
