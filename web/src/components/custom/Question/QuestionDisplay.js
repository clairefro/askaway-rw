import React from 'react'
import { UpvoteButton } from './UpvoteButton'

export const QuestionDisplay = ({ question }) => {
  return (
    <div className="p-4 flex justify-between">
      <div>
        <div>
          <p>{question.body}</p>
        </div>
        <div className="text-sm mt-2">
          <p>
            by <span className="font-semibold">{question.username}</span> at{' '}
            {question.createdAt}
          </p>
        </div>
      </div>
      <div>
        {question.votes}
        <UpvoteButton question={question} />
      </div>
    </div>
  )
}
