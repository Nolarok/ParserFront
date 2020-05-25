import _ from 'lodash'

export enum RequestsStatusCode {
  BAD_REQUEST = 400,
  SUCCESSFUL = 200,
}

export const getResponseErrors = (payload: any) => {
  const errors = _.has(payload, 'response.data.errors') && { ...payload.response.data.errors }
  const status = _.has(payload, 'response.status') && payload.response.status

  if (!errors && status != RequestsStatusCode.BAD_REQUEST) {
    return { '': ['Ошибка сервера'] }
  }

  if (!errors && status == RequestsStatusCode.BAD_REQUEST) {
    return { '': ['Запрос не был выполнен, пожалуйста, проверьте корректность данных'] }
  }

  for (const key in errors) {
    // общие ошибки формы имеют ключ - ''
    if (!key[0]) continue
    // ключи приходят в формате PascalCase вместо camelCase
    const newKey = key[0].toLowerCase() + key.slice(1)

    if (key !== newKey) {
      errors[newKey] = errors[key]
      delete errors[key]
    }
  }

  return errors
}

export function parseParamsData(param: string | string[] | undefined): string {
  if (param === undefined) {
    return ''
  }

  if (_.isArray(param)) {
    return param[0].replace(/\s/g, '+')
  }

  return param.replace(/\s/g, '+')
}

export const parseJwt = (token: string) => {
  const base64Url = token.split('.')[1]
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      })
      .join('')
  )

  return JSON.parse(jsonPayload)
}
