import { useEffect, useState } from 'react'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { routes, navigate } from '@redwoodjs/router'
import { WhitePadding } from 'src/components/custom/blocks/WhitePadding'
import { RoomAdminAuthButton } from './components/RoomAdminAuthButton'
import { useCookies } from 'react-cookie'
import { ButtonSecondary } from '../custom/blocks/buttons/ButtonSecondary'
import { ButtonDanger } from '../custom/blocks/buttons/ButtonDanger'
import { ButtonGroup } from '../custom/blocks/buttons/ButtonGroup'

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
    if (confirm(`Are you sure you want to delete room '${room.title}'?`)) {
      deleteRoom({ variables: { id } })
    }
  }

  return (
    <>
      <WhitePadding>
        <div className="text-center">
          <h1>{title}</h1>
          <RoomAdminAuthButton isAdmin={isAdmin} roomId={id} />
        </div>
      </WhitePadding>
      {isAdmin && (
        <ButtonGroup>
          <ButtonSecondary
            onClick={() => navigate(routes.editRoom({ id }))}
            className="mr-2"
          >
            Edit
          </ButtonSecondary>
          <ButtonDanger onClick={() => onDeleteClick(id)}>Delete</ButtonDanger>
        </ButtonGroup>
      )}
    </>
  )
}

export default Room
