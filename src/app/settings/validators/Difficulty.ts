class Difficulty {
  static min = 1
  static max = 10
  #errors: string[] = []
  #value: number

  constructor (fieldValue: FormDataEntryValue) {
    this.#value = this.#transform(fieldValue)
    this.#validate(this.#value)
  }

  #transform (fieldValue: FormDataEntryValue) {
    return Number(fieldValue)
  }

  #validate (value: number) {
    const errors: string[] = []
    if (value === undefined) {
      errors.push('settings.errors.difficulty.undefined')
    }

    if (value === null) {
      errors.push('settings.errors.difficulty.null')
    }

    if (!Number.isInteger(value)) {
      errors.push('settings.errors.difficulty.nonAnInteger')
    }

    if (value < Difficulty.min) {
      errors.push('settings.errors.difficulty.lessThanMin')
    }

    if (value > Difficulty.max) {
      errors.push('settings.errors.difficulty.greaterThanMax')
    }

    this.#errors = errors
  }

  isValid () {
    return this.#errors.length === 0
  }

  getErrors () {
    return this.#errors
  }
}

export default Difficulty
