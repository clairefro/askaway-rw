import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import RoomForm from 'src/components/RoomForm'
import { WhitePadding } from 'src/components/custom/blocks/WhitePadding'

// import { QUERY } from 'src/components/RoomsCell'

const CREATE_ROOM_MUTATION = gql`
  mutation CreateRoomMutation($input: CreateRoomInput!) {
    createRoom(input: $input) {
      id
    }
  }
`

const NewRoom = () => {
  // TODO: set admin to true by default
  const [createRoom, { loading, error }] = useMutation(CREATE_ROOM_MUTATION, {
    onCompleted: (e) => {
      const id = e.createRoom.id
      toast.success('Room created')
      navigate(routes.room({ id }))
    },
  })

  const onSave = (input) => {
    createRoom({ variables: { input } })
  }

  return (
    <WhitePadding>
      <h2>Create a room</h2>
      <RoomForm onSave={onSave} loading={loading} error={error} />
    </WhitePadding>
  )
}

export default NewRoom
