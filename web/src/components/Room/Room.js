import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { routes, navigate } from '@redwoodjs/router'
import { WhitePadding } from 'src/components/custom/blocks/padding/WhitePadding'
import { RoomAdminAuthButton } from './components/RoomAdminAuthButton'
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

const Room = ({ room, isAdmin }) => {
  const { id, title } = room

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
