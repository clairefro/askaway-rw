import { QuestionDisplay } from '../custom/Question/QuestionDisplay'

const QuestionsList = ({ questions, isAdmin }) => {
  return (
    <div>
      {questions.map((question) => (
        <QuestionDisplay
          key={question.id}
          question={question}
          isAdmin={isAdmin}
        />
      ))}
    </div>
  )
}

export default QuestionsList
