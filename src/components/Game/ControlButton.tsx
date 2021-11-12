import cx from 'classnames'
import PropTypes from 'prop-types'
import * as React from 'react'

import styles from './ControlButton.module.scss'

interface ButtonProps {
  className?: string;
  icon: React.ReactElement,
  text: string
}

const ControlButton: React.FC<
  ButtonProps & React.HTMLAttributes<HTMLButtonElement>
> = (props) => {
  const { text, className, icon, ...rest } = props

  return (
    <button
      className={cx(
        className,
        styles.Button
      )}
      data-testid="control-button"
      {...rest}
    >
      {icon}
      {' '}
      {text}
    </button>
  )
}

ControlButton.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.element.isRequired,
  text: PropTypes.string.isRequired
}

export default ControlButton
