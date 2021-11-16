import styled from 'styled-components'

export const Wrapper = styled.div``
Wrapper.displayName = 'NumberSlider.Wrapper'

export const Label = styled.label``
Label.displayName = 'NumberSlider.Label'

export const Input = styled.input`
  /* appearance: none; */
  background: #d3d3d3;
  border: none;
  border-radius: 2px;
  height: 10px;
  outline: none;
  transition: opacity .2s;
  width: 100%;

  &::-webkit-slider-thumb {
    appearance: none;
    background: var(--ddd-blue);
    border-radius: 50%;
    cursor: pointer;
    height: 40px;
    width: 40px;
  }
`
Input.displayName = 'NumberSlider.Input'
