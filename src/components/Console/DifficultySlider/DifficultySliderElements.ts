/* eslint-disable max-len */
import styled from '~/utils/styled'

export const Container = styled.div`
  display: grid;
  gap: 10px;
  grid-template-areas:
    'stats'
    'input'
    'levels';
  grid-template-rows: 1fr max-content max-content;
  height: 100%;
`
Container.displayName = 'DifficultySlider.Container'

export const Stats = styled.div`
  color: ${props => props.theme.colors.text};
  display: grid;
  font-family: ${props => props.theme.type.fonts.voice};
  font-size: ${props => props.theme.type.size.xs};
  font-weight: ${props => props.theme.type.weight.bold};
  grid-area: stats;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  margin-top: 10px;
  text-align: center;
`
Stats.displayName = 'DifficultySlider.Stats'

export const Input = styled.input`
  appearance: none;
  background: rgba(255,255,255,0.5);
  border: none;
  border-radius: 8px;
  height: 16px;
  outline: none;
  transition: color ${props => props.theme.motion.randomColorTransition};

  ${props => props.theme.mediaQueries.md`
    padding: 4px;
  `}

  &::-webkit-slider-thumb {
    appearance: none;
    aspect-ratio: 1 / 1;
    background-color: ${props => props.theme.colors.primary};
    border-radius: 15px;
    cursor: pointer;
    transition: background-color ${props => props.theme.motion.randomColorTransition};
    width: 30px;

    ${props => props.theme.mediaQueries.md`
      border-radius: 10px;
      width: 10px;
    `}
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
  margin-bottom: 10px;
  width: 100%;

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
  grid-area: levels;
  height: 20px;
  width: 100%;
`
Levels.displayName = 'DifficultySlider.Levels'

export const Level = styled.button`
  align-items: center;
  background: ${props => props.theme.colors.background};
  border: 0;
  border-radius: 4px;
  color: ${props => props.theme.colors.primary};
  cursor: pointer;
  display: flex;
  font-family: ${props => props.theme.type.fonts.voice};
  font-size: ${props => props.theme.type.size.md};
  font-weight: ${props => props.theme.type.weight.bold};
  margin: 0;
  padding: 0;
  transition: background-color 100ms linear;
  width: calc(10% - 7.4px);
`
Level.displayName = 'DifficultySlider.Level'
