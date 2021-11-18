import PropTypes from 'prop-types'
import * as React from 'react'

import { Input, Wrapper } from './NumberSliderElements'

// eslint-disable-next-line max-len
interface NumberSliderProps extends React.InputHTMLAttributes<HTMLInputElement> {
  defaultValue?: number;
  max: number;
  min: number;
  step: number;
  value?: number;
}

const NumberSlider: React.FC<NumberSliderProps> = (props) => {
  const {
    defaultValue,
    list,
    min = 1,
    max = 1,
    onChange,
    step = 1,
    value
  } = props

  const [difficulty, setDifficulty] = React.useState(value || defaultValue)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e)
    }

    setDifficulty(e.target.value as unknown as number)
  }

  const options = new Array(max).fill(undefined)

  return (
    <Wrapper>
      <Input
        {...props}
        defaultValue={defaultValue}
        max={max}
        min={min}
        onChange={handleChange}
        step={step}
        type="range"
        value={value}
      />
      <datalist
        id={list}
      >
        {options.map((_, i) => max % step === 0 && (
          <option
            key={`${list}-option-${i + min}`}
          >
            {i + 1}
          </option>
        ))}
      </datalist>

      {difficulty}
    </Wrapper>
  )
}

NumberSlider.propTypes = {
  defaultValue: PropTypes.number,
  list: PropTypes.string,
  max: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  onChange: PropTypes.func,
  step: PropTypes.number.isRequired,
  value: PropTypes.number
}

export default NumberSlider
