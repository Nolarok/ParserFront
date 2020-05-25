import { FormError } from '@/helpers/form'

const validationRules = {
  length: (max: number, text: string): ((value: any) => FormError) => {
    return value => value && value.length > max && text
  },
  required: (text = 'Поле не должно быть пустым'): ((value: any) => FormError) => {
    return value => (!value || value.length === 0) && text
  },
  equalTo: (compared: any, text: string): ((value: any) => FormError) => {
    return value => value && value != compared && text
  },
  letters: (text = 'Допустимы только буквы, пробел и символ "-"'): ((value: any) => FormError) => {
    return value => value && !/^[a-zA-Zа-яА-ЯёЁ\s-]+$/g.test(value) && text
  },
  startsWithLetter: (text = 'Значение должно начинаться с буквы'): ((value: any) => FormError) => {
    return value => value && !/^(?!-)/g.test(value) && text
  },
  email: (text = 'Введен некорректный email'): ((value: any) => FormError) => {
    return value =>
      value &&
      !/^[a-zA-Zа-яА-ЯёЁ_\-\d]+@[a-zA-Zа-яА-ЯёЁ_\-\d]+?\.[a-zA-Zа-яА-ЯёЁ\d]{2,3}$/g.test(
        value.trim()
      ) &&
      text
  },
  password: (
    text = 'Значение в поле должно соответствовать всем требованиям'
  ): ((value: any) => FormError) => {
    return value =>
      value &&
      !/(?=.*[0-9]{2,})(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g.test(
        value
      ) &&
      text
  },
  cyrillic: (text = 'Допустимы только кириллические символы'): ((value: any) => FormError) => {
    return value => value && !/^[а-яА-Я\s-]+$/g.test(value) && text
  },
  phone: (text = 'Введен некорректный номер'): ((value: any) => FormError) => {
    return value =>
      value &&
      !/^\+7 \( {3}\) {4}- {2}- {2}$/g.test(value) &&
      !/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/g.test(value) &&
      text
  },
}

export default validationRules

export const composeValidators = (...validators: any) => (value: any) =>
  validators.reduce((error: any, validator: any) => error || validator(value), undefined)
