import { rooms, room, createRoom, updateRoom, deleteRoom } from './rooms'

describe('rooms', () => {
  scenario('returns all rooms', async (scenario) => {
    const result = await rooms()

    expect(result.length).toEqual(Object.keys(scenario.room).length)
  })

  scenario('returns a single room', async (scenario) => {
    const result = await room({ id: scenario.room.one.id })

    expect(result).toEqual(scenario.room.one)
  })

  scenario('creates a room', async (scenario) => {
    const result = await createRoom({
      input: { secret: 'String' },
    })

    expect(result.secret).toEqual('String')
  })

  scenario('updates a room', async (scenario) => {
    const original = await room({ id: scenario.room.one.id })
    const result = await updateRoom({
      id: original.id,
      input: { secret: 'String2' },
    })

    expect(result.secret).toEqual('String2')
  })

  scenario('deletes a room', async (scenario) => {
    const original = await deleteRoom({ id: scenario.room.one.id })
    const result = await room({ id: original.id })

    expect(result).toEqual(null)
  })
})
