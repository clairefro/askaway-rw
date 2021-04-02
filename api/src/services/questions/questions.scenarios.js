const ROOM_1_ID = '1470b03d-aeb9-4235-ac9a-443bfd944307'
const ROOM_2_ID = '2470b03d-aeb9-4235-ac9a-443bfd944307'

export const standard = defineScenario({
  room: {
    one: {
      id: ROOM_1_ID,
      title: 'Room 1',
      secret: 'secret',
    },
    two: {
      id: ROOM_2_ID,
      title: 'Room 1',
      secret: 'secret',
    },
  },
  question: {
    // ROOM 1
    r1q1: {
      username: 'String',
      body: 'String',
      roomId: ROOM_1_ID,
      createdAt: '2021-04-01T00:00:00Z',
    },
    r1q2: {
      username: 'String',
      body: 'String',
      votes: 5,
      roomId: ROOM_1_ID,
      createdAt: '2021-04-01T00:30:00Z',
    },
    r1q3: {
      username: 'String',
      body: 'String',
      roomId: ROOM_1_ID,
      createdAt: '2021-04-01T00:45:00Z',
    },
    // ROOM 2
    r2q1: {
      username: 'String',
      body: 'String',
      roomId: ROOM_2_ID,
    },
    r2q2: {
      username: 'String',
      body: 'String',
      roomId: ROOM_2_ID,
    },
  },
})
