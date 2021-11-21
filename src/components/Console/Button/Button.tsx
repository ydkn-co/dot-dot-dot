import * as React from 'react'

import { Button as StyledButton } from './ButtonElements'

interface ButtonProps {
  children: string;
  icon: React.ReactElement;
}

const Button: React.FC<
  ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>
> = (props) => {
  const { children, icon, ...rest } = props
  return (
    <StyledButton
      {...rest}
    >
      {icon}
      {children}
    </StyledButton>
  )
}

export default Button
