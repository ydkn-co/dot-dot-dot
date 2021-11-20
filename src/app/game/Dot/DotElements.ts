import * as React from 'react'

import styled, { css } from '~/styled'

export interface YPositions {
  finish: number;
  start: number;
}

interface WrapperProps {
  animationState: 'running' | 'paused';
  diameter: number;
}

/* eslint-disable max-len */
export const Wrapper = React.memo(styled.button<WrapperProps>`
  aspect-ratio: 1 / 1;
  background-color: #fff;
  border: 0;
  border-radius: 50%;
  cursor: crosshair;
  opacity: .5;
  padding: 0;
  position: absolute;
  top: 0;
  transform: translateY(-100%);
  z-index: ${props => props.theme.zIndex.game.dot};

  ${props => css`
    cursor: ${props.animationState === 'running' ? 'crosshair' : 'not-allowed'};
    width: ${props.diameter}px;
  `}
`)
/* eslint-enable max-len */

Wrapper.displayName = 'Dot.Wrapper'
