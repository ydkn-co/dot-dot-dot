import * as React from 'react'

import {
  collectExpressiveColorsByWeight,
  Weight
} from '~/design-language/color'
import randomNumberBetween from '~/utils/randomNumberBetween'

import useInterval from './useInterval'

interface RandomColorIntervalProps {
  colorWeight: Weight,
  intervalDuration: number;
}

const useRandomColorInterval = (props: RandomColorIntervalProps) => {
  const colors = React.useRef(
    collectExpressiveColorsByWeight(props.colorWeight)
  )

  const [
    color,
    setColor
  ] = React.useState<string>(colors.current[0])

  const randomColor = React.useCallback(
    (colors: string[], currentColor: string) => {
      const filteredColors = colors.filter((color) => color !== currentColor)
      const randomIdx = randomNumberBetween(0, filteredColors.length - 1)

      // eslint-disable-next-line security/detect-object-injection
      return filteredColors[randomIdx]
    },
    []
  )

  const doColorChange = () => {
    setColor(randomColor(colors.current, color))
  }

  const interval = useInterval(doColorChange, props.intervalDuration)

  return {
    color,
    interval
  }
}

export default useRandomColorInterval
