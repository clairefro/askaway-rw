import bcrypt from 'bcrypt'
import { btoa } from './b64'

const SALT_ROUNDS = 10

/** Returns a hash of plain text */
export const hash = async (plainText) => {
  const hashed = await bcrypt.hash(plainText, SALT_ROUNDS)
  return hashed
}

/** Returns a boolean indicating whether the hashed string matches the plain text  */
export const compare = async (plainText, hash) => {
  const isValid = await bcrypt.compare(plainText, hash)
  return isValid
}

/** Builds a token based on passed room object */
export const buildRawB64Token = (room) => {
  if (!room.createdAt) throw new Error('Failed to build token')
  const tokenRaw = `${new Date(room.createdAt).getTime().toString()}_${
    process.env.API_TOKEN_SECRET
  }`
  return btoa(tokenRaw)
}

/** Builds a token based on passed room object */
export const buildHashedB64Token = async (room) => {
  const tokenB64 = buildRawB64Token(room)
  const tokenHash = await hash(tokenB64)
  return tokenHash
}
