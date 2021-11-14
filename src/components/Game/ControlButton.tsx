import cx from 'classnames'
import PropTypes from 'prop-types'
import * as React from 'react'

import styles from './ControlButton.module.scss'

interface ButtonProps {
  Icon: React.FC<React.SVGProps<SVGSVGElement> & { title?: string }>;
  className?: string;
  text: string
}

const ControlButton: React.FC<
  ButtonProps & React.HTMLAttributes<HTMLButtonElement>
> = (props) => {
  const { className, Icon, text, ...rest } = props

  return (
    <button
      aria-label={text}
      className={cx(
        className,
        styles.Button
      )}
      data-testid="control-button"
      {...rest}
    >
      <Icon
        className={styles.Icon}
        focusable={false}
        role="presentation"
      />
    </button>
  )
}

ControlButton.propTypes = {
  Icon: PropTypes.any.isRequired,
  className: PropTypes.string,
  text: PropTypes.string.isRequired
}

export default ControlButton
