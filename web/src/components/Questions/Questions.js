import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes } from '@redwoodjs/router'

import { QUERY } from 'src/components/QuestionsCell'
import { WhitePadding } from 'src/components/custom/blocks/padding/WhitePadding'
import { QuestionDisplay } from '../custom/Question/QuestionDisplay'

const DELETE_QUESTION_MUTATION = gql`
  mutation DeleteQuestionMutation($id: String!) {
    deleteQuestion(id: $id) {
      id
    }
  }
`

// const MAX_STRING_LENGTH = 150

// const truncate = (text) => {
//   let output = text
//   if (text && text.length > MAX_STRING_LENGTH) {
//     output = output.substring(0, MAX_STRING_LENGTH) + '...'
//   }
//   return output
// }

// const jsonTruncate = (obj) => {
//   return truncate(JSON.stringify(obj, null, 2))
// }

// const timeTag = (datetime) => {
//   return (
//     <time dateTime={datetime} title={datetime}>
//       {new Date(datetime).toUTCString()}
//     </time>
//   )
// }

// const checkboxInputTag = (checked) => {
//   return <input type="checkbox" checked={checked} disabled />
// }

const QuestionsList = ({ questions, isAdmin }) => {
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
    <WhitePadding>
      {questions.map((question) => (
        <div key={question.id}>
          <QuestionDisplay question={question} isAdmin={isAdmin} />

          <nav className="rw-table-actions">
            <Link
              to={routes.question({ id: question.id })}
              title={'Show question ' + question.id + ' detail'}
              className="rw-button rw-button-small"
            >
              Show
            </Link>
            <Link
              to={routes.editQuestion({ id: question.id })}
              title={'Edit question ' + question.id}
              className="rw-button rw-button-small rw-button-blue"
            >
              Edit
            </Link>
            <button
              title={'Delete question ' + question.id}
              className="rw-button rw-button-small rw-button-red"
              onClick={() => onDeleteClick(question.id)}
            >
              Delete
            </button>
          </nav>
        </div>
      ))}
    </WhitePadding>
  )
}

export default QuestionsList
