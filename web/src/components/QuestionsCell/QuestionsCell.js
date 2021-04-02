import Questions from 'src/components/Questions'

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

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return <div className="rw-text-center">{'No questions yet. '}</div>
}

export const Success = ({ questions }) => {
  return <Questions questions={questions} />
}
