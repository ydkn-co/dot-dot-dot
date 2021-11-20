import * as React from 'react'

import { Background, Grain } from './BackgroundGrainElements'

export interface BackgroundGrainProps {
  children?: React.ReactNode;
  className?: string;
  color: string;
  grainOpacity?: number;
  transitionDuration?: number;
}

const BackgroundGrain: React.FC<BackgroundGrainProps> = (props) => {
  const { children, className, color, grainOpacity, transitionDuration } = props

  return (
    <Background
      className={className}
      color={color}
      transitionDuration={transitionDuration}
    >
      <Grain
        opacity={grainOpacity}
      />
      {children}
    </Background>
  )
}

export default React.memo(BackgroundGrain)
