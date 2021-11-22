import * as React from 'react'

import { Container } from './IconElements'

export interface IconProps {
  Svg: React.FC<Svg>;
  className?: string;
}

const Icon: React.FC<IconProps> = (props) => {
  const { className, Svg } = props

  return (
    <Container
      className={className}
    >
      <Svg />
    </Container>
  )
}

export default React.memo(Icon)
