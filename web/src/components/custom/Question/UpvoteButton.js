import React from 'react'
import { useMutation } from '@redwoodjs/web'
import { QUERY } from 'src/components/QuestionsCell'

const UPVOTE_QUESTION_MUTATION = gql`
  mutation UpvoteQuestionMutation($id: String!) {
    upvoteQuestion(id: $id) {
      id
    }
  }
`

export const UpvoteButton = ({ question }) => {
  const { id, roomId } = question
  const [upvoteQuestion, { loading, error }] = useMutation(
    UPVOTE_QUESTION_MUTATION,
    {
      onCompleted: () => {
        console.log(`upvoted ${id}`)
      },
      refetchQueries: [{ query: QUERY, variables: { roomId } }],
      awaitRefetchQueries: true,
    }
  )

  const handleClick = () => {
    upvoteQuestion({ variables: { id } })
  }
  return (
    <button
      className="upvote-button hover:text-green-500"
      onClick={handleClick}
    >
      ⬆
    </button>
  )
}
