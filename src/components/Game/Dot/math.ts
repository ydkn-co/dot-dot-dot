import randomNumberBetween from '~/utils/randomNumberBetween'

export const randomDiameter = (
  minDiameter: number,
  maxDiameter: number
) => Math.max(
  1,
  randomNumberBetween(minDiameter, maxDiameter)
)

export const value = ({
  minValue,
  maxValue,
  minDiameter,
  maxDiameter,
  diameter
} : {
  diameter: number,
  maxDiameter: number,
  maxValue: number,
  minDiameter: number,
  minValue: number
}) => Math.max(
  1,
  minValue,
  Math.round((minDiameter + maxDiameter - diameter) / maxValue)
)

export const durationInMs = (height: number, difficulty: number) => Math.max(
  2,
  height / (difficulty * 10)
) * 1000
