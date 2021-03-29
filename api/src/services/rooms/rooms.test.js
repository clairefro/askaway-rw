import { rooms, room, createRoom, updateRoom, deleteRoom } from './rooms'
import { clearDbTables } from '../../utils/testUtils'

// beforeAll(async () => {
//   // await clearDbTables()
//   // await db.room.deleteMany()
//   console.log('done')
// })

describe('rooms', () => {
  scenario('returns all rooms', async (scenario) => {
    const result = await rooms()

    console.log({ result })

    expect(result.length).toEqual(Object.keys(scenario.room).length) // only true before "create" test
  })

  scenario('returns a single room', async (scenario) => {
    const result = await room({ id: scenario.room.one.id })

    expect(result).toEqual(scenario.room.one)
  })

  scenario('creates a room', async (_scenario) => {
    const SECRET = 'secret'

    const result = await createRoom({
      input: { secret: SECRET },
    })

    expect(result.id).toBeDefined()
    expect(result.secret).toBeUndefined() // hide secret from public view
  })

  scenario('updates a room', async (scenario) => {
    const NEW_SECRET = 'newsecret'

    const original = await room({ id: scenario.room.one.id })
    console.log({ original })
    const result = await updateRoom({
      id: original.id,
      input: { secret: NEW_SECRET },
    })

    expect(result.id).toBeDefined()
    expect(result.secret).toBeUndefined() // hide secret from public view
  })

  scenario('deletes a room', async (scenario) => {
    const original = await deleteRoom({ id: scenario.room.one.id })
    const result = await room({ id: original.id })

    expect(result).toEqual(null)
  })
})
