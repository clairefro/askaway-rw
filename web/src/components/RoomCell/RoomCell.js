import Room from 'src/components/Room'

export const QUERY = gql`
  query FIND_ROOM_BY_ID($id: String!) {
    room: room(id: $id) {
      id
      title
      createdAt
      updatedAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Room not found</div>

export const Success = ({ room }) => {
  return <Room room={room} />
}
