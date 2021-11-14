import * as React from 'react'
import { useTranslation } from 'react-i18next'

import { ReactComponent as SettingsIcon } from '../../assets/settings.svg'
// eslint-disable-next-line max-len
import useVisibilityAnimationClassModifier from '../../hooks/useVisibilityAnimationClassModifier'
import { Button, Form, Heading, Wrapper } from './elements'

const Settings: React.FC = () => {
  const { t } = useTranslation()

  const pane = useVisibilityAnimationClassModifier({
    duration: 200,
    isVisible: false
  })

  const handleSettingsClick = () => {
    pane.toggleIsVisible()
  }

  const closePane = () => {
    pane.setIsVisible(false)
    // Todo - set focus on setting button
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault()
      closePane()
      document.body.removeEventListener('keyup', handleKeyDown, false)
    }
  }

  React.useEffect(() => {
    document.body.addEventListener('keyup', handleKeyDown)
  })

  const handleBlur = (e: React.FocusEvent) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      closePane()
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    closePane()
  }

  return (
    <Wrapper>
      <Button
        Icon={SettingsIcon}
        aria-expanded={pane.isVisible}
        aria-haspopup="true"
        data-testid="settings-btn"
        onClick={handleSettingsClick}
        text={
          pane.isVisible
            ? t('game.settings.opened')
            : t('game.settings.closed')
        }
      />

      <Form
        data-modifier={pane.cssClassModifier}
        data-testid="settings-form"
        modifier={pane.cssClassModifier}
        onBlur={handleBlur}
        onSubmit={handleSubmit}
      >
        <Heading>
          {t('game.settings.heading')}
        </Heading>

        <input
          type="range"
        />

        <button
          type="reset"
        >
          {t('game.settings.reset')}
        </button>
        <button
          type="submit"
        >
          {t('game.settings.save')}
        </button>
      </Form>
    </Wrapper>
  )
}

export default React.memo(Settings)
