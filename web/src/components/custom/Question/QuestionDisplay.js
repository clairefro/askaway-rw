import React from 'react'
import { toast } from '@redwoodjs/web/toast'
import { useMutation } from '@redwoodjs/web'
import { UpvoteButton } from './UpvoteButton'
import { Link, routes } from '@redwoodjs/router'
import { QUERY } from '../../QuestionsCell'
import { FromNow } from '../blocks/FromNow'
import { WhitePadding } from '../blocks/padding/WhitePadding'
import { useShittyAuth } from '../../../hooks/useShittyAuth'

const DELETE_QUESTION_MUTATION = gql`
  mutation DeleteQuestionMutation($id: String!) {
    deleteQuestion(id: $id) {
      id
    }
  }
`

export const QuestionDisplay = ({ question }) => {
  const { checkAdmin } = useShittyAuth()
  const isAdmin = checkAdmin({ roomId: question.roomId })

  const [deleteQuestion] = useMutation(DELETE_QUESTION_MUTATION, {
    onCompleted: () => {
      toast.success('Question deleted')
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete question ' + id + '?')) {
      deleteQuestion({ variables: { id } })
    }
  }

  return (
    <div style={{ animation: `fadeIn 0.5s` }}>
      <WhitePadding className="my-1">
        <div className="p-4 flex justify-between ">
          <div>
            <p>{question.body}</p>
            <div className="text-sm mt-2 text-pink-900">
              <p>
                by <span className="font-semibold">{question.username}</span> -{' '}
                <FromNow>{question.createdAt}</FromNow>
              </p>
            </div>
          </div>
          <div>
            {question.votes}
            <UpvoteButton question={question} />
          </div>
        </div>
        {isAdmin && (
          <div className="flex justify-end">
            <Link
              to={routes.editQuestion({ id: question.id })}
              className="rw-button rw-button-small rw-button-blue"
            >
              Edit
            </Link>
            <button
              className="rw-button rw-button-small rw-button-red"
              onClick={() => onDeleteClick(question.id)}
            >
              Delete
            </button>
          </div>
        )}
      </WhitePadding>
    </div>
  )
}
