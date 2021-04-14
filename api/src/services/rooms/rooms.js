import { db } from 'src/lib/db'
import { hash, compare } from '../../utils/encryption'
import { btoa } from '../../utils/b64'

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

export const getAdminToken = async ({ input }) => {
  const { roomId, secret: userSecret } = input
  // get room with id roomId
  const room = await db.room.findUnique({
    where: { id: roomId },
  })
  if (!room) throw new Error(`Room with id '${roomId}' not found`)

  // compare input.secret with room.secret
  const { secret } = room

  console.log({ secret })
  console.log({ userSecret })

  const isValid = await compare(userSecret, secret)
  console.log({ isValid })

  // shitty handshake will be hashed 'createdAt' time + secret
  const createdAtTime = new Date(room.createdAt).getTime()
  const tokenHash = await hash(createdAtTime + secret)

  // if valid, return token
  if (isValid) {
    const tokenObj = {
      roomId,
      token: tokenHash,
    }
    const token = btoa(JSON.stringify(tokenObj))
    return { token, isValid: true }
  }
  // else return false
  return { isValid: false }
}
