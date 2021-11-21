/* eslint-disable max-len */
import styled, { css } from '~/utils/styled'

import type { Variant } from '..'

interface ContainerProps {
  variant: Variant;
}

export const Container = styled.div<ContainerProps>`
  display: grid;
  grid-template-areas:
    'steps'
    'label'
    'input';
  grid-template-rows: 1fr max-content max-content;
  height: 100%;

  ${props => props.variant === 'full' && css`
    grid-template-areas:
      'label'
      'input'
      'steps';
  `}
`
Container.displayName = 'NumberSlider.Container'

export const Label = styled.label`
  border-top: 2px dotted rgba(255,255,255,0.5);
  color: rgba(255,255,255,0.5);
  font-family: ${props => props.theme.type.fonts.voice};
  font-size: ${props => props.theme.type.size.xs};
  font-weight: ${props => props.theme.type.weight.bold};
  grid-area: label;
  margin: 4px 15px 0;
  padding: 15px 0 5px;
  text-align: center;
`
Label.displayName = 'NumberSlider.Label'

export const Input = styled.input`
  appearance: none;
  background: rgba(255,255,255,0.5);
  border: none;
  border-radius: 8px;
  height: 16px;
  outline: none;
  padding: 4px;
  transition: color ${props => props.theme.motion.randomColorTransition};

  &::-webkit-slider-thumb {
    appearance: none;
    aspect-ratio: 1 / 1;
    background-color: ${props => props.theme.colors.primary};
    border-radius: 10px;
    cursor: pointer;
    transition: background-color ${props => props.theme.motion.randomColorTransition};
    width: 10px;
  }
`
Input.displayName = 'NumberSlider.Input'

interface InputContainerProps {
  variant: Variant;
}

export const InputContainer = styled.div<InputContainerProps>`
  align-items: center;
  display: flex;
  grid-area: input;

  justify-content: center;

  ${props => props.variant === 'full' && css`
    height: 40px;

    ${Input} {
      border-radius: 14px;
      height: 32px;
      padding: 8px;
      width: calc(100% - 25px);

      &::-webkit-slider-thumb {
        border-radius: 12px;
        width: 20px;
      }
    }
  `}
`
InputContainer.displayName = 'NumberSlider.InputContainer'

interface LevelsProps {
  variant: Variant;
}

export const Levels = styled.div<LevelsProps>`
  align-content: baseline;
  display: flex;
  flex-direction: column-reverse;
  gap: 4px;
  grid-area: steps;
  width: 100%;

  ${props => props.variant === 'full' && css`
    flex-direction: row;
    gap: 8px;
    height: 80px;
  `}
`

interface LevelsProps {
  variant: Variant;
}

export const Level = styled.div<LevelsProps>`
  align-items: center;
  background: ${props => props.theme.colors.background};
  border-radius: 4px;
  color: ${props => props.theme.colors.primary};
  display: flex;
  font-family: ${props => props.theme.type.fonts.voice};
  font-size: ${props => props.theme.type.size.lg};
  font-weight: ${props => props.theme.type.weight.bold};
  height: calc(10% - 5px);
  justify-content: center;
  transition: color ${props => props.theme.motion.randomColorTransition};
  width: 100%;

  ${props => props.variant === 'full' && css`
    font-size: ${props => props.theme.type.size.md};
    height: 100%;
    width: calc(10% - 7.4px);
  `}
`
