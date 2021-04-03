import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes, navigate } from '@redwoodjs/router'
import NewQuestion from 'src/components/NewQuestion'
import QuestionsCell from 'src/components/QuestionsCell'
import { WhitePadding } from 'src/components/custom/blocks/WhitePadding'

import { QUERY } from 'src/components/RoomsCell'

const DELETE_ROOM_MUTATION = gql`
  mutation DeleteRoomMutation($id: String!) {
    deleteRoom(id: $id) {
      id
    }
  }
`

const jsonDisplay = (obj) => {
  return (
    <pre>
      <code>{JSON.stringify(obj, null, 2)}</code>
    </pre>
  )
}

const timeTag = (datetime) => {
  return (
    <time dateTime={datetime} title={datetime}>
      {new Date(datetime).toUTCString()}
    </time>
  )
}

// const checkboxInputTag = (checked) => {
//   return <input type="checkbox" checked={checked} disabled />
// }

const Room = ({ room }) => {
  const [deleteRoom] = useMutation(DELETE_ROOM_MUTATION, {
    onCompleted: () => {
      toast.success('Room deleted')
      navigate(routes.rooms())
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete room ' + id + '?')) {
      deleteRoom({ variables: { id } })
    }
  }

  console.log(room.createdAt)

  return (
    <>
      <WhitePadding>
        <div className="text-center">
          <h1>{room.title}</h1>
        </div>
      </WhitePadding>
      <nav className="rw-button-group">
        <Link
          to={routes.editRoom({ id: room.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(room.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Room
