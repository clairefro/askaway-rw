import { db } from 'src/lib/db'
import { hash, compare, buildRawToken } from '../../utils/encryption'
import { btoa, atob } from '../../utils/b64'

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

  const isValid = await compare(userSecret, secret)

  // Generate shitty token
  // shitty handshake will be hashed {createdAt}_{API_TOKEN_SECRET}
  const encodedTokenHash = await hash(btoa(buildRawToken(room)))

  // if valid, issue hashed token object as b64 string
  if (isValid) {
    const tokenObj = {
      roomId,
      token: encodedTokenHash,
    }
    const token = btoa(JSON.stringify(tokenObj))
    return { token, isValid: true }
  }
  // else return false
  return { isValid: false }
}

export const validateToken = async ({ input }) => {
  try {
    const { token: tokenObjWeb64, roomId } = input

    const { token: tokenHashWeb } = JSON.parse(atob(tokenObjWeb64))

    // Get room (ensure exists)
    const room = await db.room.findUnique({
      where: { id: roomId },
    })
    if (!room) throw new Error(`Room with id '${roomId}' not found`)

    // reconstruct raw token from DB for comparison
    const tokenDbRaw = btoa(buildRawToken(room))

    // compare raw token with decoded web token hash
    const isValid = await compare(tokenDbRaw, tokenHashWeb)

    return { isValid }
  } catch (e) {
    console.error(e)
    return { isValid: false }
  }
}
