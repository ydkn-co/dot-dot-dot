import Button from '~/components/Button'
import styled from '~/styled'

export const Wrapper = styled.div`
  left: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
`
Wrapper.displayName = 'Controls.ButtonWrapper'

export const PlayButton = styled(Button)``
PlayButton.displayName = 'Controls.PlayButton'

export const PauseButton = styled(Button)``
PauseButton.displayName = 'Controls.PauseButton'
