import bcrypt from 'bcrypt'

const SALT_ROUNDS = 10

/** Returns a hash of plain text */
export const hash = async (plainText) => {
  const hashed = await bcrypt.hash(plainText, SALT_ROUNDS)
  return hashed
}
