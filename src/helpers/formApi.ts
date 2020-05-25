import { FormApi } from 'final-form'

export const resetForm = (form: FormApi<any>): void => {
  form.reset()
  form.getRegisteredFields().forEach(field => form.resetFieldState(field))
}
