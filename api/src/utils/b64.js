/** string to b64 */
export const btoa = (string) => {
  return Buffer.from(string).toString('base64')
}

/** b64 to string */
export const atob = (b64) => {
  return Buffer.from(b64, 'base64').toString('utf-8')
}
