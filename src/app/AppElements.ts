import BaseGame from '~/app/game'
import styled, { css } from '~/styled'

export const Game = styled(BaseGame)`
  height: calc(100vh - 150px);
  overflow: hidden;
  position: absolute;
  top: 100px;
  width: 100vw;
`

const Pane = styled.div`
  height: 50%;
  position: absolute;
  transform: translate3d(0, 0, 0);
  transition: height 1s cubic-bezier(0.16, 1, 0.3, 1);
  width: 100%;
  will-change: height;
`

export const TopPane = styled(Pane)`
  align-content: center;
  background: #fff;
  display: grid;
  justify-items: center;
  top: 0;
  z-index: ${props => props.theme.zIndex.panes.top}
`
TopPane.displayName = 'App.TopPane'

export const BottomPane = styled(Pane)`
  background: hsl(30deg 17% 98%);
  border-top: 1px solid #ddd;
  bottom: 0;
  z-index: ${props => props.theme.zIndex.panes.bottom}
`
BottomPane.displayName = 'App.BottomPane'

interface ContainerProps {
  isActive: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #ccc;
  box-shadow:
    rgb(0 0 0 / 0%) 0 0 0 0,
    rgb(0 0 0 / 0%) 0 0 0 0,
    rgb(0 0 0 / 10%) 0 4px 6px -1px,
    rgb(0 0 0 / 6%) 0 2px 4px -1px;
  height: 100%;
  overflow: hidden;
  position: relative;
  width: 100%;

  ${props => props.isActive && css`
    ${TopPane} {
      height: 100px;
    }

    ${BottomPane} {
      height: 50px;
    }
  `}
`
Container.displayName = 'App.Container'
