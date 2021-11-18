import styled, { css } from 'styled-components'

export const Button = styled.button`
  align-items: center;
  border: 5px solid var(--ddd-blue);
  border-radius: 10px;
  cursor: pointer;
  display: grid;
  gap: 10px;
  grid-auto-flow: column;
  grid-template-columns: max-content 1fr;
  padding: 10px 15px;

  svg {
    width: 36px;
  }
`
export const iconStyles = css`
  display: grid;
  height: auto;
  width: 100%;

  * {
    fill: #333;
  }
`
