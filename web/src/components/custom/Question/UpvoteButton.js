import React from 'react'
import { useMutation } from '@redwoodjs/web'

const UPVOTE_QUESTION_MUTATION = gql`
  mutation UpvoteQuestionMutation($id: String!) {
    upvoteQuestion(id: $id) {
      id
    }
  }
`

export const UpvoteButton = ({ questionId }) => {
  const [upvoteQuestion, { loading, error }] = useMutation(
    UPVOTE_QUESTION_MUTATION,
    {
      onCompleted: (whatThis) => {
        // toast.success('Question updated')
        // navigate(routes.questions())
        console.log({ whatThis })
      },
    }
  )

  const handleClick = () => {
    // upvote
    upvoteQuestion({ variables: { id: questionId } })
  }
  return <button onClick={handleClick}>⬆</button>
}
