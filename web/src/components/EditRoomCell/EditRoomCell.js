import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import RoomForm from 'src/components/RoomForm'

export const QUERY = gql`
  query FIND_ROOM_BY_ID($id: String!) {
    room: room(id: $id) {
      id
      createdAt
      updatedAt
    }
  }
`
const UPDATE_ROOM_MUTATION = gql`
  mutation UpdateRoomMutation($id: String!, $input: UpdateRoomInput!) {
    updateRoom(id: $id, input: $input) {
      id
      createdAt
      updatedAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Success = ({ room }) => {
  const [updateRoom, { loading, error }] = useMutation(UPDATE_ROOM_MUTATION, {
    onCompleted: () => {
      toast.success('Room updated')
      navigate(routes.rooms())
    },
  })

  const onSave = (input, id) => {
    updateRoom({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">Edit Room {room.id}</h2>
      </header>
      <div className="rw-segment-main">
        <RoomForm room={room} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  )
}
