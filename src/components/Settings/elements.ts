import styled, { css } from 'styled-components'

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

export const SettingsButton = styled(ControlButton)`
  display: grid;
  align-items: center;
  justify-content: center;
  padding: 10px;
  height: 40px;
  width: 40px;

  > svg {
    display: block;
    height: 20px;
    width: 20px;
  }
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
  overflow: hidden;
  position: absolute;
  right: 0;
  top: -20px;
  transform: translateY(-95%);
  transition: all 0.2s ease-in-out;
  width: 300px;

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

export const Body = styled.div`
  padding: 40px;
`

export const Footer = styled.footer`
  background: #eee;
  border-top: 1px solid #ddd;
  display: grid;
  gap: 20px;
  grid-auto-flow: column;
  padding: 40px;
`

const FormButton = styled.button`
  background: #fff;
  border: 1px solid var(--ddd-blue);
  border-radius: 4px;
  background: transparent;
  padding: 8px 16px;
  font-size: 14px;
`

export const SubmitButton = styled(FormButton)`
  background-color: var(--ddd-blue);
  border: 2px solid var(--ddd-blue);
  color: #fff;
`

export const ResetButton = styled(FormButton)`
  background-color: #fff;
  border: 2px solid var(--ddd-blue);
`
