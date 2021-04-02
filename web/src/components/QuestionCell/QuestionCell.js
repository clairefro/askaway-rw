import Question from 'src/components/Question'

export const QUERY = gql`
  query FIND_QUESTION_BY_ID($id: String!) {
    question: question(id: $id) {
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

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Question not found</div>

export const Success = ({ question }) => {
  return <Question question={question} />
}
