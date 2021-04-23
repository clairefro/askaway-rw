import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes, navigate } from '@redwoodjs/router'

// import { QUERY } from 'src/components/QuestionsCell'

const DELETE_QUESTION_MUTATION = gql`
  mutation DeleteQuestionMutation($id: String!) {
    deleteQuestion(id: $id) {
      id
    }
  }
`

const timeTag = (datetime) => {
  return (
    <time dateTime={datetime} title={datetime}>
      {new Date(datetime).toUTCString()}
    </time>
  )
}

const Question = ({ question }) => {
  const [deleteQuestion] = useMutation(DELETE_QUESTION_MUTATION, {
    onCompleted: () => {
      toast.success('Question deleted')
      navigate(routes.questions())
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete question ' + id + '?')) {
      deleteQuestion({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Question {question.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{question.id}</td>
            </tr>
            <tr>
              <th>Username</th>
              <td>{question.username}</td>
            </tr>
            <tr>
              <th>Body</th>
              <td>{question.body}</td>
            </tr>
            <tr>
              <th>Votes</th>
              <td>{question.votes}</td>
            </tr>
            <tr>
              <th>Room id</th>
              <td>{question.roomId}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(question.createdAt)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(question.updatedAt)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editQuestion({ id: question.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(question.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Question
