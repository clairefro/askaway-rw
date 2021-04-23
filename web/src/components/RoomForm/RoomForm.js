import { ButtonPrimary } from '../custom/blocks/buttons/ButtonPrimary'
import { ButtonGroup } from '../custom/blocks/buttons/ButtonGroup'
import { Form, FormError, FieldError, Label, TextField } from '@redwoodjs/forms'

const RoomForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.room?.id)
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

        <Label
          name="title"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Title
        </Label>
        <TextField
          name="title"
          defaultValue={props.room?.title}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="title" className="rw-field-error" />

        <Label
          name="secret"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Secret
        </Label>
        <TextField
          name="secret"
          defaultValue={props.room?.secret}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="secret" className="rw-field-error" />
        <ButtonGroup>
          <ButtonPrimary type="submit" disabled={props.loading}>
            Create room
          </ButtonPrimary>
        </ButtonGroup>
      </Form>
    </div>
  )
}

export default RoomForm
