import RoomCell from 'src/components/RoomCell'
import NewQuestion from 'src/components/NewQuestion'
import QuestionsCell from 'src/components/QuestionsCell'

const RoomPage = ({ id }) => {
  return (
    <div>
      <RoomCell id={id} />
      <NewQuestion roomId={id} />
      <QuestionsCell roomId={id} />
    </div>
  )
}

export default RoomPage
