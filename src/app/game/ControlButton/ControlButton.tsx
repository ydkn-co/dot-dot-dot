import PropTypes from 'prop-types'
import * as React from 'react'

import { Button, iconStyles } from './elements'

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
    <Button
      aria-label={text}
      className={className}
      css={iconStyles}
      data-testid="control-button"
      {...rest}
    >
      <Icon
        focusable={false}
        role="presentation"
      />
    </Button>
  )
}

ControlButton.propTypes = {
  Icon: PropTypes.any.isRequired,
  className: PropTypes.string,
  text: PropTypes.string.isRequired
}

export default ControlButton
