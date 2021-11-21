import styled, { css } from '~/utils/styled'

interface ContainerProps {
  isFullscreen: boolean;
}

export const Container = styled.div<ContainerProps>`
  height: 100%;
  width: 100%;

  ${props => props.isFullscreen && css`
    height: 100vh;
    position: fixed;
    width: 100vw;
  `}
`
Container.displayName = 'Game.Container'
