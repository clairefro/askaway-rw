import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import QuestionForm from 'src/components/QuestionForm'

import { QUERY } from 'src/components/QuestionsCell'
import { FormWrapper } from '../custom/blocks/FormWrapper'

const CREATE_QUESTION_MUTATION = gql`
  mutation CreateQuestionMutation($input: CreateQuestionInput!) {
    createQuestion(input: $input) {
      id
    }
  }
`

const NewQuestion = ({ roomId }) => {
  const [createQuestion, { loading, error }] = useMutation(
    CREATE_QUESTION_MUTATION,
    {
      onCompleted: () => {
        toast.success('Thanks for your question!')
      },
      refetchQueries: [{ query: QUERY, variables: { roomId } }],
      awaitRefetchQueries: true,
    }
  )

  const onSave = (input) => {
    createQuestion({
      variables: { input: { ...input, roomId } },
      update: (cache, { data: { createQuestion } }) => {
        const data = cache.readQuery({ query: QUERY, variables: { roomId } })
        const newQuestions = [...data.questions, createQuestion]
        cache.writeQuery({ query: QUERY, variables: { roomId } }, newQuestions)
      },
    })
  }

  return (
    <FormWrapper title="Have a question?">
      <QuestionForm onSave={onSave} loading={loading} error={error} />
    </FormWrapper>
  )
}

export default NewQuestion
