import * as React from 'react'

import { Wrapper } from './elements'

interface LogoProps {
  children?: React.ReactElement;
}

const Logo: React.FC<LogoProps> = (props) => {
  const { children } = props

  return (
    <Wrapper>
      {children}
    </Wrapper>
  )
}

export default Logo
