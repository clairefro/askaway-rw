import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import RoomForm from 'src/components/RoomForm'
import { FormWrapper } from '../custom/blocks/FormWrapper'
import { useShittyAuth } from '../../hooks/useShittyAuth'

const CREATE_ROOM_MUTATION = gql`
  mutation CreateRoomMutation($input: CreateRoomInput!) {
    createRoom(input: $input) {
      id
      token
    }
  }
`

const NewRoom = () => {
  const { grantAdmin } = useShittyAuth()
  const [createRoom, { loading, error }] = useMutation(CREATE_ROOM_MUTATION, {
    onCompleted: async (e) => {
      const { id, token } = e.createRoom
      grantAdmin({ roomId: id, token }) // auth admin on room creation
      toast.success('Room created')
      navigate(routes.room({ id }))
    },
  })

  const onSave = (input) => {
    createRoom({ variables: { input } })
  }

  return (
    <FormWrapper title="Create a room">
      <RoomForm onSave={onSave} loading={loading} error={error} />
    </FormWrapper>
  )
}

export default NewRoom
