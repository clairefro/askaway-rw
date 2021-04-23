import { useContext } from 'react'
import { AppContext } from 'src/context/AppContext'
import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  HiddenField,
} from '@redwoodjs/forms'
import { ButtonPrimary } from '../custom/blocks/buttons/ButtonPrimary'

const QuestionForm = (props) => {
  const { username } = useContext(AppContext)

  const onSubmit = (data) => {
    props.onSave(data, props?.question?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <HiddenField
          name="username"
          hidden
          value={username}
          defaultValue={props.question?.username}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="username" className="rw-field-error" />

        <Label
          name="body"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Body
        </Label>
        <TextField
          name="body"
          defaultValue={props.question?.body}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="body" className="rw-field-error" />

        <div className="rw-button-group">
          <ButtonPrimary type="submit" disabled={props.loading}>
            Ask!
          </ButtonPrimary>
        </div>
      </Form>
    </div>
  )
}

export default QuestionForm
