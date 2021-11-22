import styled, { css } from '~/utils/styled'

interface ContainerProps {
  animationState: 'running' | 'paused';
  color: string;
  diameter: number;
  isReadonly: boolean;
}

/* eslint-disable max-len */
export const Container = styled.button<ContainerProps>`
  aspect-ratio: 1 / 1;
  background-color: ${props => props.color};
  border: 0;
  border-radius: 50%;
  box-shadow: 2px 2px 10px rgba(0,0,0,.2);
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

  ${props => props.isReadonly && css`
    cursor: auto;
  `}
`
/* eslint-enable max-len */

Container.displayName = 'Dot.Container'
