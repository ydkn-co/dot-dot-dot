/* eslint-disable max-len */
import styled from '~/utils/styled'

import BaseButton from './Button'
import BaseDifficultySlider from './DifficultySlider'

export const Container = styled.div`
  backdrop-filter: blur(10px);
  border: 8px solid ${props => props.theme.colors.background};
  border-radius: 16px;
  box-shadow: rgba(100, 100, 111, 0.4) 0px 7px 29px 0px;
  display: grid;
  gap: 8px;
  grid-template-areas:
      'header'
      'game'
      'settings';
  grid-template-rows: max-content 1fr max-content;
  height: calc(100vh - 80px);
  margin: 40px;
  max-width: calc(100vw - 96px);
  padding: 8px;
  position: relative;
  width: max-content;
  z-index: ${props => props.theme.zIndex.menu};
`

export const Header = styled.div`
  align-items: center;
  background: ${props => props.theme.colors.background};
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  grid-area: header;
  grid-auto-flow: row;
  height: max-content;
  padding: 40px;
`

export const Logo = styled.h1`
  ${props => props.theme.type.heirarchies.brand}
  color: ${props => props.theme.colors.primary};
  font-size: 70px;
  grid-area: logo;
  letter-spacing: 4px;
  margin: 0 0 30px;
  position: relative;
  text-align: center;
  text-transform: uppercase;
  transition: color 10s linear;
  white-space: nowrap;
`
Logo.displayName = 'Menu.Logo'

export const GameContainer = styled.div`
  background-color: red;
  border-radius: 4px;
  grid-area: game;
  position: relative;
`

export const Controls = styled.div`
  display: grid;
  gap: 8px;
  grid-auto-flow: column;
`

export const Button = styled(BaseButton)`
  background-color: ${props => props.theme.colors.primary};
  border-radius: 8px;
  display: flex;
  justify-content: center;
  transition: background-color ${props => props.theme.motion.randomColorTransition}, color ${props => props.theme.motion.randomColorTransition};

  svg * {
    transition: fill ${props => props.theme.motion.randomColorTransition};
  }

  &:hover {
    background: rgba(255,255,255,0.2);
    color: ${props => props.theme.colors.primary};

    svg * {
      fill: ${props => props.theme.colors.primary};
    }
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
