import * as React from 'react'

import theme from '~/theme'

import { Wrapper } from './IconElements'

type IconSize = keyof typeof theme.icons.sizes

export interface IconProps {
  Svg: React.FC<Svg>,
  className?: string;
  size: IconSize
}

const Icon: React.FC<IconProps> = (props) => {
  const { className, size, Svg } = props

  // eslint-disable-next-line security/detect-object-injection
  const sizeValue = theme.icons.sizes[size]

  return (
    <Wrapper
      className={className}
      size={sizeValue}
    >
      <Svg />
    </Wrapper>
  )
}

export default React.memo(Icon)
