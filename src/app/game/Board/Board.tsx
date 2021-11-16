import * as React from 'react'

import { useSettings } from '~/app/settings/store'

import { Wrapper } from './elements'

const Board: React.FC = () => {
  const { settings } = useSettings()

  React.useEffect(() => {
    console.log('Settings from Board Component!', settings)
  }, [
    settings
  ])

  return (
    <Wrapper />
  )
}

export default Board
