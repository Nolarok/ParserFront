import {
  createField,
  isFormValid,
  showAllErrors,
  changeFieldValue,
  getFirstError,
  Form,
} from '@/helpers/form'

describe('form helper tests', () => {
  const initialValues = {
    fieldValue1: '',
    fieldValue2: 'test',
  }

  const createForm = (initialValues: { [key: string]: any }) => ({
    fieldName1: createField<string>({
      initialValue: initialValues.fieldValue1,
      showError: true,
      validator: value => [
        (!value || value.length === 0) && 'Empty value',
        value.length > 5 && 'Value is too long',
        value.length > 100 && 'Please stop typing!',
      ],
    }),
    fieldName2: createField<string>({
      initialValue: initialValues.fieldValue2,
      showError: false,
      validator: value => [(!value || value.length === 0) && 'Empty value'],
    }),
  })

  it('creates a form data with validation', () => {
    const form = createForm(initialValues)

    const expectedForm = {
      fieldName1: {
        value: '',
        showError: true,
        validate: expect.any(Function),
      },
      fieldName2: {
        value: 'test',
        showError: false,
        validate: expect.any(Function),
      },
    }

    expect(form).toMatchObject(expectedForm)
  })

  it('checks that all form fields are valid', () => {
    const form = createForm(initialValues)

    const isValid = isFormValid(form)

    expect(isValid).toEqual(false)
  })

  it('sets all fields to show error', () => {
    const form = createForm(initialValues)

    const newForm = showAllErrors(form)

    const expectedForm = {
      fieldName1: {
        value: '',
        showError: true,
        validate: expect.any(Function),
      },
      fieldName2: {
        value: 'test',
        showError: true,
        validate: expect.any(Function),
      },
    }

    expect(newForm).toMatchObject(expectedForm)
  })

  it('gets visible field errors', () => {
    const initialValues = {
      fieldValue1: '1234567',
      fieldValue2: 'test',
    }

    const form = createForm(initialValues)

    const error = getFirstError([form.fieldName1])

    expect(error).toEqual('Value is too long')
  })

  it('updates field value', () => {
    const form = createForm(initialValues)
    let updatedForm

    const updateForm = (updater: (form: Form) => Form) => {
      updatedForm = updater(form)
    }

    updateForm(changeFieldValue('fieldName1', 'topValue'))

    const expectedForm = {
      fieldName1: {
        value: 'topValue',
        showError: false,
        validate: expect.any(Function),
      },
      fieldName2: {
        value: 'test',
        showError: false,
        validate: expect.any(Function),
      },
    }

    expect(updatedForm).toMatchObject(expectedForm)
  })
})
