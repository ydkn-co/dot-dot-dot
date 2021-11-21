import * as React from 'react'
import { useTranslation } from 'react-i18next'

import { useGame } from '~/app/game'

import type { Variant } from '..'
import {
  Container,
  Input,
  InputContainer,
  Label,
  Level,
  Levels
} from './DifficultySliderElements'

// eslint-disable-next-line max-len
interface DifficultySliderProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant: Variant;
}

const DifficultySlider: React.FC<DifficultySliderProps> = (props) => {
  const { variant } = props
  const { t } = useTranslation()
  const { game, dispatch } = useGame()

  const { difficulty } = game.settings
  const levels = React.useMemo(() => [...Array(10).keys()], [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      payload: Number(e.target.value),
      type: '@GAME/UPDATE_DIFFICULTY'
    })
  }

  return (
    <Container
      variant={variant}
    >
      <Label>{t('settings.labels.difficulty')}</Label>
      <InputContainer
        variant={variant}
      >
        <Input
          {...props}
          defaultValue={difficulty}
          max={10}
          min={1}
          name="difficulty"
          onChange={handleChange}
          step={1}
          type="range"
        />
      </InputContainer>
      <Levels
        variant={variant}
      >
        {levels.map(n => {
          const level = n + 1

          return level <= difficulty && (
            <Level
              key={`level-${level}`}
              variant={variant}
            >
              {level === difficulty && level}
            </Level>
          )
        })}
      </Levels>
    </Container>
  )
}

export default DifficultySlider
