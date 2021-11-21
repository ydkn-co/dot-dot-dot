import styled, { css } from '~/utils/styled'

import { Variant } from '../.'

interface ButtonProps {
  variant: Variant
}

export const Button = styled.button<ButtonProps>`
  align-items: center;
  background: transparent;
  border: 2px solid ${props => props.theme.colors.background};
  border-radius: 10px;
  color: ${props => props.theme.colors.background};
  cursor: pointer;
  display: grid;
  font-weight: bold;
  gap: 10px;
  grid-auto-columns: max-content;
  grid-auto-flow: column;
  padding: 10px 15px;

  ${props => props.variant === 'full' && css`
    border-width: 4px;
  `}

  * {
    fill: ${props => props.theme.colors.background};
  }
`
