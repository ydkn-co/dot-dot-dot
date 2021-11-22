import * as React from 'react'
import { useTranslation } from 'react-i18next'

import { useGame } from '~/components/Game'

import {
  Container,
  Input,
  InputContainer,
  Level,
  Levels,
  Stats
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
      type: '@GAME/UPDATE_SETTINGS_DIFFICULTY'
    })
  }, [dispatch, speed])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSpeed(Number(e.target.value))
  }

  return (
    <Container>
      <Stats>
        <span>
          {t('game.stats.speed')}
          :
          {' '}
          {speed}
        </span>
        <span>
          {t('game.stats.difficulty')}
          :
          {' '}
          {difficulty}
        </span>
        <span>
          {t('game.stats.score')}
          :
          {' '}
          {game.score}
        </span>
      </Stats>
      <InputContainer>
        <Input
          defaultValue={speed}
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
            />
          )
        })}
      </Levels>
    </Container>
  )
}

export default DifficultySlider
