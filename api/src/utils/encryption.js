import bcrypt from 'bcrypt'

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
export const buildRawToken = (room) => {
  if (!room.createdAt) throw new Error('Failed to build token')
  return `${new Date(room.createdAt).getTime().toString()}_${
    process.env.API_TOKEN_SECRET
  }`
}
