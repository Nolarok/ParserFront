export type TUser = {
  login: string,
}

// TODO server_auth
export const passMatch: {[key: string]: string} = {
  'admin': '123456',
  'user': 'qwerty'
}
