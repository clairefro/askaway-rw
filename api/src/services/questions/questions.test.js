import {
  questions,
  question,
  createQuestion,
  updateQuestion,
  upvoteQuestion,
  deleteQuestion,
} from './questions'

describe('questions', () => {
  scenario('returns all questions', async (scenario) => {
    const room1Id = scenario.question.r1q1.roomId
    const result = await questions({ roomId: room1Id })

    const room1Questions = Object.values(scenario.question).filter(
      (q) => q.roomId === room1Id
    )

    const first = result[0]
    const last = result[result.length - 1]

    expect(result.length).toEqual(room1Questions.length)
    expect(first.votes).toBeGreaterThanOrEqual(last.votes)
  })

  scenario('returns a single question', async (scenario) => {
    const result = await question({ id: scenario.question.r1q1.id })

    expect(result).toEqual(scenario.question.r1q1)
  })

  scenario('creates a question', async (scenario) => {
    const result = await createQuestion({
      input: {
        username: 'String',
        body: 'String',
        roomId: scenario.room.one.id,
      },
    })

    expect(result.username).toEqual('String')
    expect(result.body).toEqual('String')
    expect(result.roomId).toEqual(scenario.room.one.id)
  })

  scenario('updates a question', async (scenario) => {
    const NEW_VOTES = 10
    const original = await question({ id: scenario.question.r1q1.id })
    const result = await updateQuestion({
      id: original.id,
      input: { votes: NEW_VOTES },
    })

    expect(result.votes).toEqual(NEW_VOTES)
  })

  scenario('upvotes a question', async (scenario) => {
    const original = await question({ id: scenario.question.r1q1.id })

    const res = await upvoteQuestion({ id: original.id })

    const updated = await question({ id: scenario.question.r1q1.id })

    expect(updated.votes).toEqual(original.votes + 1)
    expect(res.id).toBeDefined()
  })

  scenario('deletes a question', async (scenario) => {
    const original = await deleteQuestion({ id: scenario.question.r1q1.id })
    const result = await question({ id: original.id })

    expect(result).toEqual(null)
  })
})
