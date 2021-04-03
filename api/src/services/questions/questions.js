import { db } from 'src/lib/db'

export const questions = ({ roomId }) => {
  return db.question.findMany({
    where: { roomId },
    orderBy: [
      {
        votes: 'desc',
      },
      {
        createdAt: 'asc',
      },
    ],
  })
}

export const question = ({ id }) => {
  return db.question.findUnique({
    where: { id },
  })
}

export const createQuestion = ({ input }) => {
  return db.question.create({
    data: input,
  })
}

export const updateQuestion = ({ id, input }) => {
  return db.question.update({
    data: input,
    where: { id },
  })
}

export const upvoteQuestion = async ({ id }) => {
  await db.$executeRaw(
    `update "Question" set votes = votes + 1 where id = '${id}'`
  )
  return { id }
}

export const deleteQuestion = ({ id }) => {
  return db.question.delete({
    where: { id },
  })
}

export const Question = {
  room: (_obj, { root }) =>
    db.question.findUnique({ where: { id: root.id } }).room(),
}
