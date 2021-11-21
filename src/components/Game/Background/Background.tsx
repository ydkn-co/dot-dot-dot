import * as React from 'react'

import { useControlledInterval, useRandomColor } from '~/hooks'
import { useAppState } from '~/store'

import { Container, Grain } from './BackgroundElements'

const BACKGROUND_TRANSITION_DURATION = 10000

const Background: React.FC = () => {
  const { dispatch } = useAppState()

  const [randomColor, pickRandomColor] = useRandomColor({
    weight: 700
  })

  const randomColorInterval = useControlledInterval({
    callback: pickRandomColor,
    delay: BACKGROUND_TRANSITION_DURATION
  })

  React.useEffect(() => {
    randomColorInterval.start()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  React.useEffect(() => {
    dispatch({
      payload: randomColor,
      type: '@APP/UPDATE_BACKGROUND_COLOR'
    })
  }, [randomColor])

  return (
    <Container
      color={randomColor}
      transitionDuration={BACKGROUND_TRANSITION_DURATION}
    >
      <Grain />
    </Container>
  )
}

export default React.memo(Background)
