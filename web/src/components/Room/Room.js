import { useEffect, useState } from 'react'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes, navigate } from '@redwoodjs/router'
import { WhitePadding } from 'src/components/custom/blocks/WhitePadding'
import { RoomAdminAuthButton } from './components/RoomAdminAuthButton'
import { useCookies } from 'react-cookie'

const DELETE_ROOM_MUTATION = gql`
  mutation DeleteRoomMutation($id: String!) {
    deleteRoom(id: $id) {
      id
    }
  }
`

const Room = ({ room }) => {
  const { id, title } = room
  const [cookies, _setCookies] = useCookies()
  const [isAdmin, setIsAdmin] = useState(false)

  // check room admin on mount and cookie change
  useEffect(() => {
    const token = cookies[id]
    if (!token) {
      setIsAdmin(false)
    } else {
      // TODO: check token for validity

      setIsAdmin(true)
    }
  }, [cookies, id])

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

  return (
    <>
      <WhitePadding>
        <div className="text-center">
          <h1>{title}</h1>
        </div>
      </WhitePadding>
      <nav className="rw-button-group">
        {isAdmin && (
          <>
            <Link
              to={routes.editRoom({ id })}
              className="rw-button rw-button-blue"
            >
              Edit
            </Link>
            <button
              className="rw-button rw-button-red"
              onClick={() => onDeleteClick(id)}
            >
              Delete
            </button>
          </>
        )}
        <RoomAdminAuthButton isAdmin={isAdmin} roomId={id} />
      </nav>
    </>
  )
}

export default Room
