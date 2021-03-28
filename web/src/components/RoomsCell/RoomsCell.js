import { Link, routes } from '@redwoodjs/router'

import Rooms from 'src/components/Rooms'

export const QUERY = gql`
  query ROOMS {
    rooms {
      id
      secret
      createdAt
      updatedAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No rooms yet. '}
      <Link to={routes.home()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Success = ({ rooms }) => {
  return <Rooms rooms={rooms} />
}
