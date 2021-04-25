import QuestionsList from 'src/components/QuestionsList'
import { useEffect, useState } from 'react'
import { supabase } from '../../App'

export const QUERY = gql`
  query QUESTIONS($roomId: String!) {
    questions(roomId: $roomId) {
      id
      username
      body
      votes
      roomId
      createdAt
      updatedAt
    }
  }
`
// export const beforeQuery = (props) => {
//   console.log({ props })
//   return {
//     variables: props,
//     fetchPolicy: 'cache-and-network',
//     pollInterval: 1000,
//   }
// }

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="text-center my-6">
      No questions yet. Be the first to ask!
    </div>
  )
}

export const Success = ({ questions, isAdmin }) => {
  const [currQuestions, setCurrentQuestions] = useState(questions)

  // subscribe to supabase changes to Questions table
  useEffect(() => {
    const questionListener = supabase
      .from('Question')
      .on('*', (payload) => handleQuestionEvent(payload))
      .subscribe()

    return () => {
      questionListener.unsubscribe()
    }
  }, [])

  const handleQuestionEvent = (e) => {
    if (e) {
      if (e.eventType === 'INSERT') {
        // append new question
        setCurrentQuestions((prev) => [...prev, e.new])
      } else if (e.eventType === 'UPDATE') {
        // update existing question
        const updated = e.new
        console.log({ updated })
        setCurrentQuestions((prev) => {
          const index = prev.map((q) => q.id).indexOf(updated.id)
          console.log({ index })
          if (index !== -1) {
            const copy = [...prev]
            copy[index] = updated
            return copy
          }
          return prev
        })
      }
    }
  }

  return <QuestionsList questions={currQuestions} isAdmin={isAdmin} />
}
