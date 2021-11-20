import * as React from 'react'
import { v4 as uuidv4 } from 'uuid'

import { useGame } from '~/app/game'
import Background from '~/app/game/Background'
import Dot from '~/app/game/Dot'
import { useSettings } from '~/app/settings'
import { useControlledInterval } from '~/hooks'

import { Wrapper } from './DotElements'

const Dots: React.FC = () => {
  const [dots, setDots] = React.useState<string[]>([])

  const { game } = useGame()
  const { settings } = useSettings()

  const dotInterval = useControlledInterval({
    callback: () => {
      const id = uuidv4()

      setDots(previous => ([
        ...previous,
        id
      ]))
    },
    delay: settings.dot.interval
  })

  React.useEffect(
    () => {
      if (game.status === 'playing') {
        dotInterval.start()
      } else {
        dotInterval.stop()
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      game.status
    ]
  )

  const handleRemoveCallback = React.useCallback(targetId => {
    setDots(previous => previous.filter(id => id !== targetId))
  }, [])

  return (
    <Wrapper>
      <Background />
      {[...dots].map(id => (
        <Dot
          id={id}
          key={id}
          onRemoveCallback={handleRemoveCallback}
        />
      ))}
    </Wrapper>
  )
}

export default React.memo(Dots)
