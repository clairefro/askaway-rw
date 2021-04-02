import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import RoomForm from 'src/components/RoomForm'

import { QUERY } from 'src/components/RoomsCell'

const CREATE_ROOM_MUTATION = gql`
  mutation CreateRoomMutation($input: CreateRoomInput!) {
    createRoom(input: $input) {
      id
    }
  }
`

const NewRoom = () => {
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
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Room</h2>
      </header>
      <div className="rw-segment-main">
        <RoomForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewRoom
