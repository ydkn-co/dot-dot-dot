import * as React from 'react'

import { Button as StyledButton } from './ButtonElements'

type BaseVariation = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'aria-label' | 'children'
>

interface TextOnlyVariation {
  'aira-label'?: string;
  children: string;
  icon?: undefined;
}

interface IconOnlyVariation {
  'aria-label': string;
  children?: undefined,
  icon: React.ReactElement;
}
interface TextAndIconVariation {
  'aria-label'?: string;
  children: string;
  icon: React.ReactElement
}

export type ButtonProps =
  | TextOnlyVariation
  | IconOnlyVariation
  | TextAndIconVariation

const Button: React.FC<ButtonProps & BaseVariation> = (props) => {
  let ariaLabel
  let icon
  let children

  if ('aria-label' in props) {
    ariaLabel = props['aria-label']
  }

  if ('children' in props) {
    children = props.children
  }

  if ('icon' in props) {
    icon = props.icon
  }

  return (
    <StyledButton
      aria-label={ariaLabel || children}
      {...props}
    >
      {icon}
      {children}
    </StyledButton>
  )
}

export default Button
