import Button from '~/components/Button'
import styled, { css } from '~/styled'

export const Wrapper = styled.div`
  border-radius: 50%;
  position: absolute;
  right: 0;
  transform: translate(-50%, -50%);
`

export const SettingsButton = styled(Button)`
  border-width: 5px;
  grid-template-columns: max-content;
  padding: 10px;
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
Footer.displayName = 'Settings.Footer'

const FormButton = styled(Button)`
  display: block;
`
FormButton.displayName = 'Settings.FormButton'

export const SubmitButton = styled(FormButton)`
  background-color: var(--ddd-blue);
  border: 2px solid var(--ddd-blue);
  color: #fff;
`
SubmitButton.displayName = 'SubmitButton.Footer'

export const ResetButton = styled(FormButton)`
  border: 2px solid var(--ddd-blue);
`
ResetButton.displayName = 'ResetButton.Footer'
