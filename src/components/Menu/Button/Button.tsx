import * as React from 'react'

import type { Variant } from '../.'
import { Button as StyledButton } from './ButtonElements'

interface ButtonProps {
  children: string;
  icon: React.ReactElement;
  variant: Variant;
}

const Button: React.FC<
  ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>
> = (props) => {
  const { children, icon, variant = 'full', ...rest } = props
  return (
    <StyledButton
      variant={variant}
      {...rest}
    >
      {icon}
      {variant === 'full' && children}
    </StyledButton>
  )
}

Button.defaultProps = {
  variant: 'full'
}

export default Button
