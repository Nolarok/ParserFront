import React, { useCallback } from 'react'
import cn from 'classnames'
import ReactSelect, { components } from 'react-select'
import { ValueType, InputActionMeta } from 'react-select/src/types'
import { OptionProps } from 'react-select/src/components/Option'
import { MenuProps } from 'react-select/src/components/Menu'
import { ControlProps } from 'react-select/src/components/Control'
import { MultiValueProps } from 'react-select/src/components/MultiValue'
import { Icon } from '@/ui/Icon'
import { block } from '@/helpers/bem'
import css from './Select.scss'
import { TextFieldTheme } from '@/ui/TextField'

const b = block('select', css)

export interface IOption {
  label: string
  value: string
}

type Props = {
  id?: string
  placeholder?: string
  value?: ValueType<IOption>
  options: IOption[]
  disabled?: boolean
  error?: boolean
  className?: string
  isMulti?: boolean
  onChange: (value: ValueType<IOption>, id?: string) => void
  onInputChange?: (newValue: string, actionMeta: InputActionMeta) => void
  inputValue?: string
  theme?: TextFieldTheme
}

export const Select: React.FC<Props> = props => {
  const {
    options,
    placeholder,
    value,
    onChange,
    disabled,
    className,
    id,
    isMulti,
    error,
    onInputChange,
    inputValue,
    theme = TextFieldTheme.DEFAULT,
    ...rest
  } = props

  const DropdownIndicator = () => <Icon icon="chevrone" className={b('chevrone')} />
  const noOptionsMessage = () => 'Нет элементов'

  const Menu = (props: MenuProps<IOption>) => <components.Menu {...props} className={b('menu')} />

  const Option = (props: OptionProps<IOption>) => (
    <components.Option {...props} className={b('option', { selected: props.isSelected })} />
  )

  const Control = (props: ControlProps<IOption>) => (
    <components.Control
      {...props}
      className={b('control', {
        error: props.selectProps.error,
        active: props.selectProps.menuIsOpen,
        theme,
      })}
    />
  )

  const MultiValue = (props: MultiValueProps<IOption>) => (
    <components.MultiValue {...props} className={b('multiValue')}>
      {props.children},
    </components.MultiValue>
  )

  const MultiValueRemove = () => null

  const handleChange = useCallback(
    (value: ValueType<IOption>) => {
      onChange(value, id)
    },
    [id, onChange]
  )

  return (
    <ReactSelect
      {...rest}
      onChange={handleChange}
      value={value}
      className={cn(b('input'), className)}
      components={{
        DropdownIndicator,
        Menu,
        IndicatorSeparator: null,
        Option,
        Control,
        MultiValue,
        MultiValueRemove,
      }}
      error={error}
      placeholder={placeholder}
      options={options}
      noOptionsMessage={noOptionsMessage}
      isDisabled={disabled}
      isMulti={isMulti}
      isClearable={false}
      hideSelectedOptions={false}
      simpleValue={false}
      onInputChange={onInputChange}
      inputValue={inputValue}
    />
  )
}
