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
  const {
    isVisible,
    cssClassModifier,
    toggleIsVisible
  } = useVisibilityAnimationClassModifier({
    duration: 200,
    isVisible: false
  })

  return (
    <div
      className={cx(
        className,
        styles.Settings
      )}
    >
      <ControlButton
        Icon={SettingsIcon}
        aria-expanded={isVisible}
        aria-haspopup="true"
        className={styles.ToggleButton}
        data-testid="settings-btn"
        onClick={toggleIsVisible}
        text={
          isVisible
            ? t('game.settings.opened')
            : t('game.settings.closed')
        }
      />

      <div
        className={cx(
          styles.Pane,
          // eslint-disable-next-line security/detect-object-injection
          styles[`Pane${cssClassModifier}`]
        )}
        role="menu"
        tabIndex={-1}
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
      </div>
    </div>
  )
}

export default React.memo(Settings)
