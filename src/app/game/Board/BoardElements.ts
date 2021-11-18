import BaseDot from '~/app/game/Dot'
import BaseBackground from '~/components/Background'
import styled from '~/styled'

export const Wrapper = styled.div`
  color: #fff;
  height: calc(100vh - 150px);
  overflow: hidden;
  position: absolute;
  top: 100px;
  width: 100%;
`
Wrapper.displayName = 'Board.Wrapper'

export const Dot = styled(BaseDot)`
  z-index: 2;
`
Dot.displayName = 'Board.Dot'

export const Background = styled(BaseBackground)`
  z-index: 1;
`
Background.displayName = 'Board.Background'
