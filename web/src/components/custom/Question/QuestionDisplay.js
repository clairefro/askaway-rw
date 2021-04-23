import React from 'react'
import { toast } from '@redwoodjs/web/toast'

import { useMutation } from '@redwoodjs/web'
import { UpvoteButton } from './UpvoteButton'
import { Link, routes } from '@redwoodjs/router'
import { QUERY } from '../../QuestionsCell'
import { FromNow } from '../blocks/FromNow'

const DELETE_QUESTION_MUTATION = gql`
  mutation DeleteQuestionMutation($id: String!) {
    deleteQuestion(id: $id) {
      id
    }
  }
`

export const QuestionDisplay = ({ question, isAdmin }) => {
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
    <div>
      <div className="p-4 flex justify-between">
        <div>
          <p>{question.body}</p>
          <div className="text-sm mt-2">
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
        <nav className="rw-button-group">
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
        </nav>
      )}
    </div>
  )
}
