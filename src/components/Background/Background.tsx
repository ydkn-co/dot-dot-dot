import * as React from 'react'

import useRandomColorInterval from '~/hooks/useRandomColorInterval'

import { Grain, Lotus } from './elements'

interface BackgroundProps {
  className?: string;
}

const Background: React.FC<BackgroundProps> = (props) => {
  const { className } = props

  const backgroundFill = useRandomColorInterval({
    colorWeight: 500,
    intervalDuration: 10000
  })
  const leafFill1 = useRandomColorInterval({
    colorWeight: 100,
    intervalDuration: 10000
  })
  const leafFill2 = useRandomColorInterval({
    colorWeight: 100,
    intervalDuration: 10000
  })

  React.useLayoutEffect(
    () => {
      backgroundFill.interval.start()
      leafFill1.interval.start()
      leafFill2.interval.start()
    },
    [ // eslint-disable-line react-hooks/exhaustive-deps
      backgroundFill.interval.ref,
      leafFill1.interval.ref,
      leafFill2.interval.ref
    ]
  )

  return (
    <Grain
      className={className}
    >
      <Lotus
        backgroundFill={backgroundFill.color}
        leafFill={[leafFill1.color, leafFill2.color]}
      />
    </Grain>
  )
}

export default React.memo(Background)
