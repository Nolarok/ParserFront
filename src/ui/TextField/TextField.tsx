import React, { useCallback } from 'react'
import InputMask from 'react-input-mask'
import cn from 'classnames'
import { block } from '@/helpers/bem'
import css from './TextField.scss'

const b = block('textField', css)

export enum TextFieldTheme {
  DEFAULT = 'default',
  MATERIAL = 'material',
  SMALL = 'small',
}

export type TextFieldProps = {
  id?: string
  name?: string
  placeholder?: string
  value?: string
  error?: boolean
  type?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
  onBlurAfterChange?: () => void
  onPaste?: () => void
  onMouseDown?: () => void
  classContainer?: string
  classInput?: string
  theme?: TextFieldTheme
  renderPostfix?: React.ReactElement
  maxLength?: number
  disabled?: boolean
  mask?: string
  maskChar?: string
}

export const TextField: React.FC<TextFieldProps> = props => {
  const [focus, setFocus] = React.useState(false)
  const [changed, setChanged] = React.useState(false)

  const {
    placeholder,
    id,
    name,
    value,
    onChange,
    onBlurAfterChange,
    classContainer,
    classInput,
    onKeyDown,
    renderPostfix,
    theme = TextFieldTheme.DEFAULT,
    onFocus,
    mask,
    maskChar,
    onBlur,
    maxLength,
    disabled,
    type,
    error,
    ...rest
  } = props

  const handleFocus = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      setFocus(true)
      onFocus && onFocus(e)
    },
    [setFocus, onFocus]
  )
  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      setFocus(false)
      onBlur && onBlur(e)
      changed && onBlurAfterChange && onBlurAfterChange()
      setChanged(false)
    },
    [onBlur, changed, onBlurAfterChange]
  )

  const handlerChange = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      setChanged(true)
      onChange && onChange(e)
    },
    [onChange]
  )

  const renderField = useCallback(() => {
    return (
      <div className={cn(b({ focus, theme, disabled, error }), classContainer)}>
        <input
          {...rest}
          className={cn(b('input'), classInput)}
          name={name}
          id={id}
          onChange={handlerChange}
          type={type || 'text'}
          value={value}
          placeholder={placeholder}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={onKeyDown}
          maxLength={maxLength}
          disabled={disabled}
        />
        {renderPostfix}
      </div>
    )
  }, [
    focus,
    theme,
    disabled,
    error,
    classContainer,
    rest,
    classInput,
    name,
    id,
    handlerChange,
    type,
    value,
    placeholder,
    handleFocus,
    handleBlur,
    onKeyDown,
    maxLength,
    renderPostfix,
  ])

  if (mask) {
    return (
      <InputMask mask={mask} value={value} onChange={onChange} maskChar={maskChar}>
        {renderField}
      </InputMask>
    )
  }

  return renderField()
}
