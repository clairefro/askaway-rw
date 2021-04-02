import QuestionsLayout from 'src/layouts/QuestionsLayout'
import QuestionCell from 'src/components/QuestionCell'

const QuestionPage = ({ id }) => {
  return (
    <QuestionsLayout>
      <QuestionCell id={id} />
    </QuestionsLayout>
  )
}

export default QuestionPage
