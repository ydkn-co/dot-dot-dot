import cx from 'classnames'
import * as React from 'react'
import { useTranslation } from 'react-i18next'

import { ReactComponent as SettingsIcon } from '../../assets/settings.svg'
// eslint-disable-next-line max-len
import useVisibilityAnimationClassModifier from '../../hooks/useVisibilityAnimationClassModifier'
import ControlButton from './ControlButton'
import styles from './Settings.module.scss'

interface SettingsProps {
  className?: string;
}

const Settings: React.FC<SettingsProps> = (props) => {
  const { className } = props

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
    <div
      className={cx(
        className,
        styles.Settings
      )}
    >
      <ControlButton
        Icon={SettingsIcon}
        aria-expanded={pane.isVisible}
        aria-haspopup="true"
        className={styles.ToggleButton}
        data-testid="settings-btn"
        onClick={handleSettingsClick}
        text={
          pane.isVisible
            ? t('game.settings.opened')
            : t('game.settings.closed')
        }
      />

      <form
        className={cx(
          styles.Pane,
          // eslint-disable-next-line security/detect-object-injection
          styles[`Pane${pane.cssClassModifier}`]
        )}
        data-testid="settings-form"
        onBlur={handleBlur}
        onSubmit={handleSubmit}
      >
        <h1
          className={styles.heading}
          id="settings"
        >
          {t('game.settings.heading')}
        </h1>

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
      </form>
    </div>
  )
}

export default React.memo(Settings)
