export const spaceDigits = (value: number) =>
  value.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')

export const getCountWord = (single: string, few: string, many: string) => {
  return (value: number) => {
    const unit = value % 10
    const hundredUnit = value % 100

    if (hundredUnit > 10 && hundredUnit < 20) {
      return many
    }

    if (unit === 1) {
      return single
    }

    if (unit > 1 && unit < 5) {
      return few
    }

    return many
  }
}

export const renderFractionalNumberWithComma = (num: number, symbolAfterComma = 1) =>
  num.toFixed(symbolAfterComma).replace('.', ',')
