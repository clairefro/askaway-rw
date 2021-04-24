import {
  rooms,
  room,
  createRoom,
  updateRoom,
  deleteRoom,
  getAdminToken,
  validateToken,
} from './rooms'

const SECRET = 'secret'
const TITLE = 'Title'

describe('rooms', () => {
  describe('rooms()', () => {
    scenario('returns all rooms', async (scenario) => {
      const result = await rooms()

      expect(result.length).toEqual(Object.keys(scenario.room).length) // only true before "create" test
    })
  })

  describe('room()', () => {
    scenario('returns a single room without secret', async (scenario) => {
      const result = await room({ id: scenario.room.one.id })

      const roomWithoutSecret = { ...scenario.room.one }
      delete roomWithoutSecret.secret
      expect(result).toEqual(roomWithoutSecret)
      expect(result.secret).toBeUndefined() // hide secret from public view
    })
  })

  describe('getAdminToken()', () => {
    // TODO: figure out how on earth to test suny scenario
    scenario('returns false if incorrect secret passed', async (scenario) => {
      const result = await getAdminToken({
        input: { roomId: scenario.room.one.id, secret: 'foo' },
      })

      expect(result.isValid).toBe(false)
    })
  })

  describe('createRoom()', () => {
    scenario('creates a room and returns token', async () => {
      const result = await createRoom({
        input: { title: TITLE, secret: SECRET },
      })

      expect(result.id).toBeDefined()
      expect(result.title).toMatch(TITLE)
      expect(result.token).toBeDefined()
      expect(result.secret).toBeUndefined() // hide secret from public view
    })
  })

  describe('updateRoom()', () => {
    scenario('updates a room', async (scenario) => {
      const NEW_TITLE = 'New Title'

      const original = await room({ id: scenario.room.one.id })

      const result = await updateRoom({
        id: original.id,
        input: { title: NEW_TITLE },
      })

      expect(result.id).toBeDefined()
      expect(result.secret).toBeUndefined() // hide secret from public view
    })
  })

  describe('validateToken()', () => {
    scenario('returns true for valid token', async (_scenario) => {
      const room = await createRoom({
        input: { title: TITLE, secret: SECRET },
      })

      const { token } = await getAdminToken({
        input: { roomId: room.id, secret: SECRET },
      })

      const result = await validateToken({ input: { roomId: room.id, token } })

      expect(result.isValid).toBe(true)
    })

    scenario('returns false for invalid token', async (_scenario) => {
      const room = await createRoom({
        input: { title: TITLE, secret: SECRET },
      })

      const { token } = await getAdminToken({
        input: { roomId: room.id, secret: SECRET },
      })

      const result = await validateToken({
        input: { roomId: room.id, token: token + 'foo' },
      })

      expect(result.isValid).toBe(false)
    })
  })

  describe('deleteRoom()', () => {
    scenario('deletes a room', async (scenario) => {
      const original = await deleteRoom({ id: scenario.room.one.id })
      expect(original.secret).toBeUndefined()

      const result = await room({ id: original.id })
      expect(result).toEqual(null)
    })
  })
})
