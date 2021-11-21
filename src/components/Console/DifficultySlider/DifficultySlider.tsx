import * as React from 'react'
import { useTranslation } from 'react-i18next'

import { useGame } from '~/components/Game'

import {
  Container,
  Input,
  InputContainer,
  Label,
  Level,
  Levels
} from './DifficultySliderElements'

const DifficultySlider: React.FC = () => {
  const { t } = useTranslation()
  const { game, dispatch } = useGame()

  const { difficulty } = game.settings
  const [speed, setSpeed] = React.useState<number>(difficulty * 10)
  const levels = React.useMemo(() => [...Array(10).keys()], [])

  React.useEffect(() => {
    dispatch({
      payload: Math.floor(speed / 10),
      type: '@GAME/UPDATE_DIFFICULTY'
    })
  }, [
    speed
  ])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSpeed(Number(e.target.value))
  }

  console.log(difficulty)

  return (
    <Container>
      <Label>
        {t('settings.labels.difficulty')}
        {' '}
        (speed:
        {' '}
        {speed}
        )
      </Label>
      <InputContainer>
        <Input
          defaultValue={difficulty}
          max={100}
          min={10}
          name="difficulty"
          onChange={handleChange}
          step={1}
          type="range"
        />
      </InputContainer>
      <Levels>
        {levels.map(n => {
          const level = n + 1

          return level <= difficulty && (
            <Level
              key={`level-${level}`}
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
