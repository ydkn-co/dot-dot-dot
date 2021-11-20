import styled from '~/styled'

export const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  z-index: ${props => props.theme.zIndex.background.lotus};
`
Wrapper.displayName = 'Dots.Wrapper'
