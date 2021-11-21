/* eslint-disable max-len */
import styled from '~/utils/styled'

export const Container = styled.div`
  display: grid;
  grid-template-areas:
      'label'
      'input'
      'steps';
  grid-template-rows: 1fr max-content max-content;
  height: 100%;
`
Container.displayName = 'DifficultySlider.Container'

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
Label.displayName = 'DifficultySlider.Label'

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
Input.displayName = 'DifficultySlider.Input'

export const InputContainer = styled.div`
  align-items: center;
  border-radius: 14px;
  display: flex;
  grid-area: input;
  height: 40px;
  justify-content: center;
  padding: 8px;
  width: calc(100% - 25px);

  &::-webkit-slider-thumb {
    border-radius: 12px;
    width: 20px;
  }
`
InputContainer.displayName = 'DifficultySlider.InputContainer'

export const Levels = styled.div`
  align-content: baseline;
  display: flex;
  flex-direction: row;
  gap: 8px;
  grid-area: steps;
  height: 80px;
  width: 100%;
`
Levels.displayName = 'DifficultySlider.Levels'

export const Level = styled.div`
  align-items: center;
  background: ${props => props.theme.colors.background};
  border-radius: 4px;
  color: ${props => props.theme.colors.primary};
  display: flex;
  font-family: ${props => props.theme.type.fonts.voice};
  font-size: ${props => props.theme.type.size.md};
  font-weight: ${props => props.theme.type.weight.bold};
  height: 100%;
  justify-content: center;
  transition: color ${props => props.theme.motion.randomColorTransition};
  width: calc(10% - 7.4px);
`
Level.displayName = 'DifficultySlider.Level'
