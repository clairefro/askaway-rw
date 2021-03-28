import RoomsLayout from 'src/layouts/RoomsLayout'
import RoomCell from 'src/components/RoomCell'

const RoomPage = ({ id }) => {
  return (
    <RoomsLayout>
      <RoomCell id={id} />
    </RoomsLayout>
  )
}

export default RoomPage
