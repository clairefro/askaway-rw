import {
  rooms,
  room,
  createRoom,
  updateRoom,
  deleteRoom,
  getAdminToken,
} from './rooms'

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
    scenario('creates a room', async () => {
      const SECRET = 'secret'
      const TITLE = 'Title'

      const result = await createRoom({
        input: { title: TITLE, secret: SECRET },
      })

      expect(result.id).toBeDefined()
      expect(result.title).toMatch(TITLE)
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

  describe('deleteRoom()', () => {
    scenario('deletes a room', async (scenario) => {
      const original = await deleteRoom({ id: scenario.room.one.id })
      expect(original.secret).toBeUndefined()

      const result = await room({ id: original.id })
      expect(result).toEqual(null)
    })
  })
})
