import * as React from 'react'
import { v4 as uuidv4 } from 'uuid'

import { useGame } from '~/components/Game'
import Dot from '~/components/Game/Dot'
import { useControlledInterval } from '~/hooks'

const Dots: React.FC = () => {
  const [dots, setDots] = React.useState<string[]>([])

  const { game } = useGame()

  const handleResize = () => {
    setDots(() => [])
  }

  React.useEffect(() => {
    window.addEventListener('resize', handleResize)
  }, [])

  const dotInterval = useControlledInterval({
    callback: () => {
      const id = uuidv4()

      setDots(previous => ([
        ...previous,
        id
      ]))
    },
    delay: game.settings.interval
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
