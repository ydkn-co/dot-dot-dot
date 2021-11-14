import { css } from '@emotion/react'
import styled from '@emotion/styled'

import ControlButton from '../ControlButton'

export const Wrapper = styled.div`
  align-items: center;
  background: #3f72d3;
  border-radius: 50%;
  justify-content: center;
  padding: 5px;
  position: absolute;
  right: 0;
  transform: translate(-50%, -50%);
`

export const Button = styled(ControlButton)`
  padding: 10px;
  width: 40px;
`

export const Heading = styled.h2``

interface FormProps {
  modifier?: string;
}

export const Form = styled.form<FormProps>`
  background: #fff;
  border-radius: 8px;
  box-shadow: 2px 4px 4px rgb(0 0 0 / 50%);
  display: none;
  opacity: 0%;
  padding: 40px;
  position: absolute;
  right: 0;
  top: -20px;
  transform: translateY(-95%);
  transition: all 0.2s ease-in-out;

  &::after {
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 10px solid #fff;
    bottom: 1px;
    content: " ";
    display: block;
    height: 0;
    position: absolute;
    right: 15px;
    transform: translateY(100%);
    width: 0;
  }

  ${({ modifier }) => modifier === '--animatingIn' && css`
    display: block;
  `}

  ${({ modifier }) => modifier === '--visible' && css`
    display: block;
    opacity: 100%;
    top: -20px;
    transform: translateY(-100%);
  `}

  ${({ modifier }) => modifier === '--animatingOut' && css`
    display: block;
    opacity: 0%;
  `}
`
