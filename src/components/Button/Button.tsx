import * as React from 'react'

import { Button as StyledButton, iconStyles } from './elements'

type BaseVariation = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'aria-label' | 'children'
>

interface TextOnlyVariation {
  Icon?: undefined;
  'aira-label'?: string;
  children: string;
}

interface IconOnlyVariation {
  Icon: React.FC<Svg>;
  'aria-label': string;
  children?: undefined
}
interface TextAndIconVariation {
  Icon: React.FC<Svg>
  'aria-label'?: string;
  children: string;
}

type ButtonProps =
  | TextOnlyVariation
  | IconOnlyVariation
  | TextAndIconVariation

const Button: React.FC<ButtonProps & BaseVariation> = (props) => {
  let ariaLabel
  let Icon
  let children

  if ('aria-label' in props) {
    ariaLabel = props['aria-label']
    delete props['aria-label']
  }

  if ('children' in props) {
    children = props.children
    delete props.children
  }

  if ('Icon' in props) {
    Icon = props.Icon
    delete props.Icon
  }

  return (
    <StyledButton
      aria-label={ariaLabel || children}
      {...props}
    >
      {Icon && (
        <Icon
          css={iconStyles}
        />
      )}
      {children}
    </StyledButton>
  )
}

export default Button
