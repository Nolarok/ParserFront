import React, { useCallback } from 'react'
import InputMask from 'react-input-mask'
import { ValueType } from 'react-select/src/types'
import { FormField, FormFieldTheme } from '@/ui/FormField'
import { TextField } from '@/ui/TextField'
import { Select } from '@/ui/Select'
import { IOption } from '@/types'
import { TextArea } from '@/ui/TextArea'

export type onChange<T = string> = (name: string, value: T) => void

type InputProps = {
  onChange: onChange
  value: string
  caption: string
  name: string
  classNameCaption?: string
  className?: string
  classNameInput?: string
}

export const InputText: React.FC<InputProps> = props => {
  const { onChange, caption, name, value, classNameCaption, className, classNameInput } = props
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target

      onChange(name, value)
    },
    [name, onChange]
  )

  return (
    <FormField classNameCaption={classNameCaption} className={className} caption={caption}>
      <TextField value={value} classContainer={classNameInput} onChange={handleChange} />
    </FormField>
  )
}

export const InputTelephone: React.FC<InputProps> = props => {
  const { onChange, caption, name, value, className, classNameCaption, classNameInput } = props
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target

      onChange(name, value)
    },
    [name, onChange]
  )

  const textField = useCallback(() => <TextField classContainer={classNameInput} />, [
    classNameInput,
  ])

  return (
    <FormField classNameCaption={classNameCaption} className={className} caption={caption}>
      <InputMask mask="+7 (999) 999-99-99" value={value} onChange={handleChange} maskChar=" ">
        {textField}
      </InputMask>
    </FormField>
  )
}

type SelectProps = {
  onChange: onChange<IOption>
  value: IOption
  caption: string
  options: IOption[]
  name: string
  classNameCaption?: string
  className?: string
}

export const InputSelector: React.FC<SelectProps> = props => {
  const { onChange, caption, options, name, value, classNameCaption, className } = props

  const handleChange = useCallback(
    (option: ValueType<IOption>) => {
      onChange(name, option as IOption)
    },
    [name, onChange]
  )

  return (
    <FormField classNameCaption={classNameCaption} className={className} caption={caption}>
      <Select value={value} options={options} placeholder="Выберите пол" onChange={handleChange} />
    </FormField>
  )
}

type TextAreaProps = {
  onChange: onChange
  caption: string
  rows?: number
  name: string
  value: string
  classNameCaption?: string
  className?: string
}

export const InputTextArea: React.FC<TextAreaProps> = props => {
  const { onChange, caption, rows, name, value, classNameCaption, className } = props

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const { value } = event.target

      onChange(name, value)
    },
    [name, onChange]
  )

  return (
    <FormField
      classNameCaption={classNameCaption}
      className={className}
      caption={caption}
      theme={FormFieldTheme.SHORT_TEXTAREA}
    >
      <TextArea value={value} rows={rows} onChange={handleChange} />
    </FormField>
  )
}
