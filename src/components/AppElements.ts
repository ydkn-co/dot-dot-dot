import BaseGame from '~/components/Game'
import styled from '~/styled'

export const Game = styled(BaseGame)`
  height: 100vh;
  overflow: hidden;
  position: absolute;
  width: 100vw;
`

interface Container {
  appBackgroundColor?: string;
}

export const Container = styled.div<Container>`
  --ddd-app-background-color: ${props => props.appBackgroundColor};
  align-items: center;
  box-shadow:
    rgb(0 0 0 / 0%) 0 0 0 0,
    rgb(0 0 0 / 0%) 0 0 0 0,
    rgb(0 0 0 / 10%) 0 4px 6px -1px,
    rgb(0 0 0 / 6%) 0 2px 4px -1px;
  display: flex;
  height: 100%;
  justify-content: center;
  overflow: hidden;
  padding: 40px;
  position: relative;
  width: 100%;
`
Container.displayName = 'App.Container'
