import * as React from 'react'
import { useTranslation } from 'react-i18next'

import { useGame } from '~/components/Game'
import { useDebounce } from '~/hooks'

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

  const [difficulty, setDifficulty] = React.useState(game.settings.difficulty)
  const [speed, setSpeed] = React.useState<number>(difficulty * 10)
  const debouncedDifficulty = useDebounce(difficulty, 100)

  const levels = React.useMemo(() => [...Array(10).keys()], [])

  React.useEffect(() => {
    setDifficulty(Math.floor(speed / 10))
  }, [speed])

  React.useEffect(() => {
    dispatch({
      payload: debouncedDifficulty,
      type: '@GAME/UPDATE_SETTINGS_DIFFICULTY'
    })
  }, [dispatch, debouncedDifficulty])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSpeed(Number(e.target.value))
  }

  const inputRef = React.useRef<HTMLInputElement>(null)
  const handleLevelChange = (level: number) => {
    const difficultyToSpeed = level * 10
    setSpeed(difficultyToSpeed)

    if (inputRef.current) {
      inputRef.current.value = difficultyToSpeed.toString()
    }
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
          ref={inputRef}
          step={1}
          type="range"
        />
      </InputContainer>
      <Levels>
        {levels.map(n => {
          const level = n + 1

          const style = level > difficulty
            ? { backgroundColor: 'rgba(0,0,0,.3)' }
            : {}

          return (
            <Level
              key={`level-${level}`}
              onClick={() => handleLevelChange(level)}
              style={style}
            />
          )
        })}
      </Levels>
    </Container>
  )
}

export default DifficultySlider
