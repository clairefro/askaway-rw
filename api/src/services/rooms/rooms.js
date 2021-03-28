import { db } from 'src/lib/db'
import { hash } from '../utils/encryption'

export const rooms = () => {
  return db.room.findMany()
}

export const room = ({ id }) => {
  return db.room.findUnique({
    where: { id },
  })
}

export const createRoom = async ({ input }) => {
  // encrypt the room secret
  const { secret } = input

  const hashedSecret = await hash(secret)

  const encryptedInput = { ...input, secret: hashedSecret }

  return db.room.create({
    data: encryptedInput,
  })
}

export const updateRoom = ({ id, input }) => {
  return db.room.update({
    data: input,
    where: { id },
  })
}

export const deleteRoom = ({ id }) => {
  return db.room.delete({
    where: { id },
  })
}
