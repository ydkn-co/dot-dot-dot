/* eslint-disable max-len */
import { ReactComponent as LogoSvg } from '~/assets/logo.svg'
import styled from '~/utils/styled'

import BaseButton from './Button'
import BaseDifficultySlider from './DifficultySlider'

export const Container = styled.div`
  backdrop-filter: blur(20px);
  background-color: rgba(255,255,255, 0.2);
  border: 8px solid ${props => props.theme.colors.background};
  border-radius: 16px;
  display: grid;
  gap: 8px;
  grid-template-areas:
    'header'
    'game'
    'settings';
  grid-template-rows: max-content 1fr max-content;
  height: calc(100vh - 40px);
  max-width: calc(100vw - 40px);
  padding: 8px;
  position: relative;
  width: 80vw;
  z-index: ${props => props.theme.zIndex.menu};
`

export const Header = styled.div`
  align-items: center;
  background: ${props => props.theme.colors.background};
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  grid-area: header;
  grid-auto-flow: row;
  height: max-content;
  padding: 40px;
`

export const Logo = styled(LogoSvg)`
  width: 100%;

  * {
    fill: ${props => props.theme.colors.primary};
    transition: fill ${props => props.theme.motion.randomColorTransition};
  }
`
Logo.displayName = 'Menu.Logo'

export const GameContainer = styled.div`
  border: 4px solid ${props => props.theme.colors.background};
  border-radius: 4px;
  grid-area: game;
  overflow: hidden;
  position: relative;
`

export const Controls = styled.div`
  display: grid;
  gap: 8px;
  grid-auto-flow: column;
`

export const Button = styled(BaseButton)`
  background-color: ${props => props.theme.colors.primary};
  border-color: rgba(255,255,255,0.3);
  border-radius: 8px;
  color: ${props => props.theme.colors.text};
  display: flex;
  justify-content: center;
  transition: background-color ${props => props.theme.motion.randomColorTransition}, color ${props => props.theme.motion.randomColorTransition};

  svg * {
    fill: ${props => props.theme.colors.text};
    transition: fill ${props => props.theme.motion.randomColorTransition};
  }

  &:hover {
    background: rgba(255,255,255,0.5);
    color: ${props => props.theme.colors.primary};
  }
`

export const Settings = styled.div`
  border-radius: 8px;
  border-width: 8px;
  gap: 8px;
  grid-area: settings;
`

export const Label = styled.label`
  color: ${props => props.theme.colors.primary};
  font-family: ${props => props.theme.type.fonts.voice};
  font-size: ${props => props.theme.type.size.xs};
  font-weight: ${props => props.theme.type.weight.bold};
  margin-bottom: 16px;
  transition: color ${props => props.theme.motion.randomColorTransition};
`

export const DifficultySlider = styled(BaseDifficultySlider)``
