import * as React from 'react'

import BackgroundGrain from '~/components/BackgroundGrain'
import { useControlledInterval, useRandomColor } from '~/hooks'

import { LeftLotus, RightLotus } from './BackgroundElements'

const Background: React.FC = () => {
  const [randomColor, pickRandomColor] = useRandomColor({
    weight: 700
  })

  const randomColorInterval = useControlledInterval({
    callback: pickRandomColor,
    delay: 10000
  })

  React.useEffect(() => {
    randomColorInterval.start()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <BackgroundGrain
      color={randomColor}
      grainOpacity={0.5}
      transitionDuration={10000}
    >
      <LeftLotus
        leafFill={['#fff', '#fff']}
      />
      <RightLotus
        leafFill={['#fff', '#fff']}
      />
    </BackgroundGrain>
  )
}

export default React.memo(Background)
