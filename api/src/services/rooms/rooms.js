import { db } from 'src/lib/db'
import { hash } from '../../utils/encryption'

const publicRoom = ({ id, createdAt, updatedAt, title }) => ({
  id,
  title,
  createdAt,
  updatedAt,
})

export const rooms = () => {
  return db.room.findMany().then((res) => res.map(publicRoom))
}

export const room = ({ id }) => {
  return db.room
    .findUnique({
      where: { id },
    })
    .then((res) => (res ? publicRoom(res) : null))
}

export const createRoom = async ({ input }) => {
  // encrypt the room secret
  const { secret } = input
  const hashedSecret = await hash(secret)
  const encryptedInput = { ...input, secret: hashedSecret }

  return db.room
    .create({
      data: encryptedInput,
    })
    .then(publicRoom)
}

export const updateRoom = async ({ id, input }) => {
  let data = input

  // encrypt the room secret if changed
  const { secret } = input
  if (secret) {
    const hashedSecret = await hash(secret)
    data = { ...input, secret: hashedSecret }
  }

  return db.room
    .update({
      data,
      where: { id },
    })
    .then(publicRoom)
}

export const deleteRoom = ({ id }) => {
  return db.room
    .delete({
      where: { id },
    })
    .then(publicRoom)
}
