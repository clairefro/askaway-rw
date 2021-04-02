import QuestionsLayout from 'src/layouts/QuestionsLayout'
import EditQuestionCell from 'src/components/EditQuestionCell'

const EditQuestionPage = ({ id }) => {
  return (
    <QuestionsLayout>
      <EditQuestionCell id={id} />
    </QuestionsLayout>
  )
}

export default EditQuestionPage
