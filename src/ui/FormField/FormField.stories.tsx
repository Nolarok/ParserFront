import React, { CSSProperties } from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import { FormField, FormFieldTheme } from './FormField'
import { TextField } from '@/ui/TextField'

const stories = storiesOf('FormField', module)

stories.addDecorator(withKnobs)

const onChange = action('onChange')

const stylesWrapper: CSSProperties = {
  display: 'inline-block',
  border: 'none',
}

stories.add('default', () => {
  const label = text('label', 'label')

  return (
    <fieldset style={stylesWrapper}>
      <FormField caption={label}>
        <TextField placeholder="Label" onChange={onChange} />
      </FormField>
    </fieldset>
  )
})

stories.add('directon Column', () => {
  const label = text('label', 'label')

  return (
    <fieldset style={stylesWrapper}>
      <FormField caption={label}>
        <TextField placeholder="Label" onChange={onChange} />
      </FormField>
    </fieldset>
  )
})

stories.add('Group', () => {
  const label = text('label', 'label')

  return (
    <fieldset style={stylesWrapper}>
      <FormField caption={label}>
        <TextField placeholder="Label" onChange={onChange} />
      </FormField>
      <FormField caption="Label" theme={FormFieldTheme.SHORT}>
        <TextField placeholder="Label" onChange={onChange} />
      </FormField>
      <FormField caption="Label">
        <TextField placeholder="Label" onChange={onChange} />
      </FormField>
      <FormField caption="Label">
        <TextField placeholder="Label" onChange={onChange} />
      </FormField>
      <FormField caption="Label">
        <TextField placeholder="Label" onChange={onChange} />
      </FormField>
    </fieldset>
  )
})
