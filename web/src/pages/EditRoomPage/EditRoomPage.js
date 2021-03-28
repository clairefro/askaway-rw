import RoomsLayout from 'src/layouts/RoomsLayout'
import EditRoomCell from 'src/components/EditRoomCell'

const EditRoomPage = ({ id }) => {
  return (
    <RoomsLayout>
      <EditRoomCell id={id} />
    </RoomsLayout>
  )
}

export default EditRoomPage
