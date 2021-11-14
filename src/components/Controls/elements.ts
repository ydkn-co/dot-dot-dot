import styled from '@emotion/styled'

import { ReactComponent as PauseSvg } from '../../assets/pause.svg'
import { ReactComponent as PlaySvg } from '../../assets/play.svg'
import ControlButton from '../ControlButton'

export const Wrapper = styled.div`
  align-items: center;
  background: #3f72d3;
  border-radius: 50%;
  justify-content: center;
  left: 50%;
  padding: 10px;
  position: absolute;
  transform: translate(-50%, -50%);
`

export const PlayButton = styled(ControlButton)``

export const PauseButton = styled(ControlButton)``
