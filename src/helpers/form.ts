import React from 'react'
import mapValues from 'lodash/mapValues'
import flatten from 'lodash/flatten'

type Falsy = null | void | false | 0 | ''
export type FormError = string | React.ReactElement | Falsy
export type Validator<T> = (value: T, form?: any) => FormError[]

export type Field<T> = {
  value: T
  defaultValue: any
  showError: boolean
  mustValidate: boolean
  validate: Validator<T>
  touched: boolean
}

export type Form = {
  [key: string]: Field<any>
}

type CreateFieldOptions<T> = {
  initialValue: T
  showError?: boolean
  validator?: Validator<T>
}

function createValidator<T>(validator: Validator<T>): Validator<T> {
  return (value: T, form?: any) => {
    return validator(value, form).filter(Boolean)
  }
}

function createFormUpdater<T>(fieldName: string, update: (field: Field<T>) => Field<T>) {
  return function updateForm(form: Form): Form {
    return {
      ...form,
      [fieldName]: update(form[fieldName]),
    }
  }
}

export function createField<T>(options: CreateFieldOptions<T>): Field<T> {
  return {
    value: options.initialValue,
    defaultValue: options.initialValue,
    showError: options.showError || false,
    mustValidate: !!options.validator,
    validate: options.validator ? createValidator(options.validator) : () => [],
    touched: false,
  }
}

export function getVisibleFieldErrors<T>(field: Field<T>, form?: any): FormError[] {
  if (!field.showError) {
    return []
  }
  return field.validate(field.value, form)
}

export function getFirstError(fields: Field<any>[], form?: any): FormError {
  return flatten(fields.map(f => getVisibleFieldErrors(f, form)))[0]
}

export function hasError(form: Form): boolean {
  const errorFields = Object.keys(form).filter(
    index => form[index].mustValidate && form[index].validate(form[index].value, form).length !== 0
  )

  return errorFields.length > 0
}

export function showAllErrors(form: Form): Form {
  return mapValues(form, field => ({ ...field, showError: true }))
}

export function isFormValid(form: Form): boolean {
  return Object.values(form).every((field: any) => field.validate(field.value).length === 0)
}

export function changeFieldValue<T>(fieldName: string, value: T) {
  return createFormUpdater(fieldName, field => {
    return {
      ...field,
      value,
    }
  })
}

export function resetForm(form: Form) {
  return mapValues(form, field => ({ ...field, value: field.defaultValue, touched: false }))
}
