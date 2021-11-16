import * as React from 'react'
import { useTranslation } from 'react-i18next'

import { ReactComponent as CloseIcon } from '~/assets/close.svg'
import { ReactComponent as SettingsIcon } from '~/assets/settings.svg'
import NumberSlider from '~/components/NumberSlider'
import usePresence from '~/hooks/usePresence'

import {
  Body,
  Footer,
  Form,
  Heading,
  ResetButton,
  SettingsButton,
  SubmitButton,
  Wrapper
} from './elements'
import { useSettings } from './store'

const Settings: React.FC = () => {
  const { t } = useTranslation()

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
        ...formValues,
        difficulty: Number(formValues.difficulty)
      },
      type: '@SETTINGS/UPDATE'
    })

    closeSettings()
  }

  return (
    <Wrapper>
      <SettingsButton
        Icon={presence.isVisible ? CloseIcon : SettingsIcon}
        aria-expanded={presence.isVisible}
        aria-haspopup="true"
        aria-label={
          presence.isVisible
            ? t('game.settings.opened')
            : t('game.settings.closed')
        }
        data-testid="settings-btn"
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
            {t('game.settings.heading')}
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
            {t('game.settings.reset')}
          </ResetButton>
          <SubmitButton
            type="submit"
          >
            {t('game.settings.save')}
          </SubmitButton>
        </Footer>
      </Form>
    </Wrapper>
  )
}

export default Settings
