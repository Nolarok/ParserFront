import { getCountWord, spaceDigits, renderFractionalNumberWithComma } from '@/helpers/number'

const makeWords = getCountWord('услуга', 'услуги', 'услуг')

describe('getCountWord', () => {
  it('returns correct singular form of a word if count is 1', () => {
    const word = makeWords(1)

    expect(word).toBe('услуга')
  })

  it('returns correct plural form of a word if count is between 1 and 5', () => {
    const word = makeWords(3)

    expect(word).toBe('услуги')
  })

  it('returns correct plural form of a word if count is between 5 and 10', () => {
    const word = makeWords(9)

    expect(word).toBe('услуг')
  })

  it('returns correct plural form of a word if count is between 10 and 20', () => {
    const word = makeWords(15)

    expect(word).toBe('услуг')
  })

  it('returns correct plural form of a word if count is between 110 and 120', () => {
    const word = makeWords(113)

    expect(word).toBe('услуг')
  })
})

describe('spaceDigits', () => {
  it('returns correct formatted string from integer number', () => {
    const stringValue = spaceDigits(90564)

    expect(stringValue).toBe('90 564')
  })
})

describe('renderFractionalNumberWithComma', () => {
  it('return correct formatted string with comma from number 1', () => {
    const fractionalNumberAsString = renderFractionalNumberWithComma(1)

    expect(fractionalNumberAsString).toBe('1,0')
  })
  it('return correct formatted string with comma from number -1', () => {
    const fractionalNumberAsString = renderFractionalNumberWithComma(-1)

    expect(fractionalNumberAsString).toBe('-1,0')
  })
  it('return correct formatted string without comma from number 1', () => {
    const fractionalNumberAsString = renderFractionalNumberWithComma(1, 0)

    expect(fractionalNumberAsString).toBe('1')
  })
  it('return correct formatted string without comma from number -1', () => {
    const fractionalNumberAsString = renderFractionalNumberWithComma(-1, 0)

    expect(fractionalNumberAsString).toBe('-1')
  })
  it('return correct formatted string with comma from number 12.34', () => {
    const fractionalNumberAsString = renderFractionalNumberWithComma(12.34)

    expect(fractionalNumberAsString).toBe('12,3')
  })
  it('return correct formatted string with comma from number -12.34', () => {
    const fractionalNumberAsString = renderFractionalNumberWithComma(-12.34)

    expect(fractionalNumberAsString).toBe('-12,3')
  })
  it('return correct formatted string with comma from number 12.36', () => {
    const fractionalNumberAsString = renderFractionalNumberWithComma(12.36)

    expect(fractionalNumberAsString).toBe('12,4')
  })
  it('return correct formatted string with comma from number -12.36', () => {
    const fractionalNumberAsString = renderFractionalNumberWithComma(-12.36)

    expect(fractionalNumberAsString).toBe('-12,4')
  })
  it('return correct formatted string with comma from number 12.362', () => {
    const fractionalNumberAsString = renderFractionalNumberWithComma(12.362, 2)

    expect(fractionalNumberAsString).toBe('12,36')
  })
  it('return correct formatted string with comma from number -12.362', () => {
    const fractionalNumberAsString = renderFractionalNumberWithComma(-12.36, 2)

    expect(fractionalNumberAsString).toBe('-12,36')
  })
  it('return correct formatted string with comma from number 12.366', () => {
    const fractionalNumberAsString = renderFractionalNumberWithComma(12.366, 2)

    expect(fractionalNumberAsString).toBe('12,37')
  })
  it('return correct formatted string with comma from number -12.366', () => {
    const fractionalNumberAsString = renderFractionalNumberWithComma(-12.366, 2)

    expect(fractionalNumberAsString).toBe('-12,37')
  })
})
