import * as React from 'react'

import {
  collectExpressiveColorsByWeight,
  Weight
} from '~/design-language/color'
import randomNumberBetween from '~/utils/randomNumberBetween'

const randomColor = (colors: string[], currentColor?: string) => {
  const canditates = colors.filter(color => color !== currentColor)
  const randomIdx = randomNumberBetween(0, canditates.length - 1)

  // eslint-disable-next-line security/detect-object-injection
  return canditates[randomIdx]
}

type Args = {
  weight?: Weight
}

type Return = [string, () => void];

const useRandomExpressiveColor = (args: Args = {}) : Return => {
  const { weight = 400 } = args

  const colors = React.useMemo(
    () => collectExpressiveColorsByWeight(weight),
    [
      weight
    ]
  )

  const [
    color,
    setColor
  ] = React.useState<string>(randomColor(colors))

  const pickRandomColor = () => {
    setColor(() => randomColor(colors, color))
  }

  return [color, pickRandomColor]
}

export default useRandomExpressiveColor
