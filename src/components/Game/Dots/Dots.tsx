import * as React from 'react'
import { v4 as uuidv4 } from 'uuid'

import Dot from '~/components/Game/Dot'
import { useControlledInterval } from '~/hooks'
import { useAppState } from '~/store'

const Dots: React.FC = () => {
  const [dots, setDots] = React.useState<string[]>([])

  const { app } = useAppState()

  const dotInterval = useControlledInterval({
    callback: () => {
      const id = uuidv4()

      setDots(previous => ([
        ...previous,
        id
      ]))
    },
    delay: app.settings.interval
  })

  React.useEffect(
    () => {
      if (app.status === 'playing') {
        dotInterval.start()
      } else {
        dotInterval.stop()
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      app.status
    ]
  )

  const handleRemoveCallback = React.useCallback(targetId => {
    setDots(previous => previous.filter(id => id !== targetId))
  }, [])

  return (
    <>
      {dots.map(id => (
        <Dot
          id={id}
          key={id}
          onRemoveCallback={handleRemoveCallback}
        />
      ))}
    </>
  )
}

export default React.memo(Dots)
