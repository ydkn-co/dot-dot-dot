import styled, { css, keyframes } from '~/styled'

export interface YPositions {
  finish: number;
  start: number;
}

const makeFallingAnimation = (diameter: number) => keyframes`
  0% {
    top: -${diameter}px;
  }
  100% {
    top: calc(100% + ${diameter}px);
  }
`

interface WrapperProps {
  animationDuration: number
  animationState: 'running' | 'paused';
  diameter: number;
  xPosition: number;
}

/* eslint-disable max-len */
export const Wrapper = styled.button<WrapperProps>`
  aspect-ratio: 1 / 1;
  background-color: #fff;
  border: 0;
  border-radius: 50%;
  cursor: crosshair;
  padding: 0;
  position: absolute;
  z-index: 2;

  ${props => css`
    animation: ${makeFallingAnimation(props.diameter)} ${props.animationDuration}s linear;
    animation-play-state: ${props.animationState};
    cursor: ${props.animationState === 'running' ? 'crosshair' : 'not-allowed'};
    left: ${props.xPosition}px;
    top: -${props.diameter}px;
    width: ${props.diameter}px;
  `}
`
/* eslint-enable max-len */

Wrapper.displayName = 'Dot.Wrapper'
