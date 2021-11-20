import * as React from 'react'
import { useTranslation } from 'react-i18next'

import { useGame } from '~/app/game'
import Icon from '~/components/Icon'
import NumberSlider from '~/components/NumberSlider'
import { usePresence } from '~/hooks'
import { useTheme } from '~/styled'

import {
  Body,
  Footer,
  Form,
  Heading,
  ResetButton,
  SettingsButton,
  SubmitButton,
  Wrapper
} from './SettingsElements'
import { useSettings } from './store'

const Settings: React.FC = () => {
  const { t } = useTranslation()

  const { dispatch: gameDispatch } = useGame()

  const theme = useTheme()

  const { CloseSvg, SettingsSvg } = theme.icons.svgs

  /* ----- Container Display Logic ----- */

  const presence = usePresence({
    duration: 200,
    initialVisibility: 'Hidden'
  })

  const [formCssModifier, setFormCssModifier] = React.useState('')

  React.useEffect(() => {
    switch (presence.status) {
      case 'AnimatingIn':
        setFormCssModifier('--animatingIn')
        break
      case 'AnimatingOut':
        setFormCssModifier('--animatingOut')
        break
      case 'Visible':
        setFormCssModifier('--visible')
        break
      case 'Hidden':
        setFormCssModifier('')
        break
    }
  }, [
    presence.status
  ])

  const handleSettingsClick = () => {
    presence.toggle()

    if (!presence.isVisible) {
      gameDispatch({
        payload: 'paused',
        type: '@GAME/UPDATE_STATUS'
      })
    }
  }

  const closeSettings = () => {
    presence.hide()
    // Todo - set focus on setting button
  }

  const handleBlur = (e: React.FocusEvent) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      presence.hide()
    }
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault()
      closeSettings()
      document.body.removeEventListener('keyup', handleKeyDown, false)
    }
  }

  React.useEffect(() => {
    document.body.addEventListener('keyup', handleKeyDown)
  })

  /* ----- Form Handling Logic ----- */

  const {
    settings,
    dispatch
  } = useSettings()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const formValues = Object.fromEntries(formData.entries())

    dispatch({
      payload: {
        ...settings,
        ...formValues,
        difficulty: Number(formValues.difficulty)
      },
      type: '@SETTINGS/UPDATE'
    })

    closeSettings()
  }

  const icon = presence.isVisible
    ? (
      <Icon
        Svg={CloseSvg}
        size="sm"
      />
    )
    : (
      <Icon
        Svg={SettingsSvg}
        size="sm"
      />
    )

  return (
    <Wrapper>
      <SettingsButton
        aria-expanded={presence.isVisible}
        aria-haspopup="true"
        aria-label={
          presence.isVisible
            ? t('settings.opened')
            : t('settings.closed')
        }
        data-testid="settings-btn"
        icon={icon}
        onClick={handleSettingsClick}
      />

      <Form
        data-modifier={formCssModifier}
        data-testid="settings-form"
        modifier={formCssModifier}
        noValidate
        onBlur={handleBlur}
        onSubmit={handleSubmit}
      >
        <Body>
          <Heading>
            {t('settings.heading')}
          </Heading>

          {settings.difficulty}

          <NumberSlider
            defaultValue={settings.difficulty}
            id="difficulty-input"
            list={'difficulty-input-list'}
            max={10}
            min={1}
            name='difficulty'
            step={1}
          />
        </Body>

        <Footer>
          <ResetButton
            type="reset"
          >
            {t('settings.reset')}
          </ResetButton>
          <SubmitButton
            type="submit"
          >
            {t('settings.save')}
          </SubmitButton>
        </Footer>
      </Form>
    </Wrapper>
  )
}

export default React.memo(Settings)
