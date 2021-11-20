import styled, { css } from '~/styled'

import type { Variant } from '.'
import BaseButton from './Button'
import BaseDifficultySlider from './DifficultySlider'
interface ContainerProps {
  modifier?: string;
  variant: Variant;
}

export const Container = styled.div<ContainerProps>`
  border: 4px solid ${props => props.theme.colors.background};
  border-radius: 8px;
  box-shadow: rgba(100, 100, 111, 0.4) 0px 7px 29px 0px;
  display: none;
  gap: 4px;
  grid-template-areas:
    'settings'
    'controls';
  grid-template-rows: 1fr max-content;
  height: calc(100% - 2px);
  margin: 40px;
  max-width: calc(100vw - 96px);
  opacity: 0;
  padding: 4px;
  position: relative;
  width: max-content;
  z-index: ${props => props.theme.zIndex.menu};

  ${props => props.variant === 'full' && css`
    border-radius: 16px;
    border-width: 8px;
    gap: 8px;
    grid-template-areas:
      'logo'
      'controls'
      'settings';
    height: max-content;
    padding: 8px;
  `}

  ${({ modifier }) => modifier === '--animatingIn' && css`
    display: grid;
  `}

  ${({ modifier }) => modifier === '--visible' && css`
    display: grid;
    opacity: 100%;
  `}

  ${({ modifier }) => modifier === '--animatingOut' && css`
    display: grid;
    opacity: 0%;
  `}
`

export const Logo = styled.h1`
  ${props => props.theme.type.heirarchies.brand}
  background-clip: text;
  color: ${props => props.theme.colors.primary};
  font-size: 70px;
  font-size: clamp(50px, 10vw, 70px);
  grid-area: logo;
  letter-spacing: 4px;
  margin: 0;
  padding: 40px 40px 50px;
  position: relative;
  text-align: center;
  text-transform: uppercase;
  transition: color 10s linear;

  white-space: nowrap;

  &::before {
    background: ${props => props.theme.colors.background};
    border-radius: 4px;
    content: ' ';
    display: block;
    height: 100% ;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: -1;
  }
`
Logo.displayName = 'Menu.Logo'

export const Controls = styled.div`
  display: grid;
  gap: 8px;
  grid-area: controls;
  grid-auto-flow: column;
`

const Button = styled(BaseButton)`
  border-radius: 4px;
  display: flex;
  justify-content: center;
  transition: color ${props => props.theme.motion.randomColorTransition};

  svg * {
    transition: fill ${props => props.theme.motion.randomColorTransition};
  }

  ${props => props.variant === 'full' && css`
    border-radius: 8px;
  `}

  &:hover {
    background: rgba(255,255,255,0.2);
    color: ${props => props.theme.colors.primary};

    svg * {
      fill: ${props => props.theme.colors.primary};
    }
  }
`

interface SettingsButtonProps {
  isSettingsOpen: boolean;
}

export const SettingsButton = styled(Button)<SettingsButtonProps>`
  border-color: transparent;
  transition: color ${props => props.theme.motion.randomColorTransition};

  svg {
    transform: rotate(90deg);

    * {
      transition: fill ${props => props.theme.motion.randomColorTransition}
    }
  }

  ${props => props.isSettingsOpen && css`
    background: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.primary};

    svg {
      transform: rotate(0);

      * {
        fill: ${props => props.theme.colors.primary};
      }
    }
  `}
`

export const PlayButton = styled(Button)`

`
PlayButton.displayName = 'Menu.PlayButton'

interface SettingsProps {
  variant: Variant;
}

export const Settings = styled.form<SettingsProps>`
  border-radius: 4px;
  grid-area: settings;

  ${props => props.variant === 'full' && css`
    border-radius: 8px;
    border-width: 8px;
    gap: 8px;
  `}
`

export const Label = styled.label`
  color: ${props => props.theme.colors.primary};
  font-family: ${props => props.theme.type.fonts.voice};
  font-size: ${props => props.theme.type.size.xs};
  font-weight: ${props => props.theme.type.weight.bold};
  margin-bottom: 16px;
  transition: color ${props => props.theme.motion.randomColorTransition};
`

interface SettingsProps {
  variant: Variant;
}

export const DifficultySlider = styled(BaseDifficultySlider)<SettingsProps>`
  -webkit-appearance: slider-vertical;
  height: 200px;

  ${props => props.variant === 'full' && css`
    -webkit-appearance: slider-horizontal;
    height: auto;
  `}
`
