import { useEffect, useState } from 'react'
import { useMutation } from '@redwoodjs/web'
import { useLazyQuery } from '@apollo/client' // SHADY
import { toast } from '@redwoodjs/web/toast'
import { Link, routes, navigate } from '@redwoodjs/router'
import { WhitePadding } from 'src/components/custom/blocks/WhitePadding'
import { useCookies } from 'react-cookie'

const DELETE_ROOM_MUTATION = gql`
  mutation DeleteRoomMutation($id: String!) {
    deleteRoom(id: $id) {
      id
    }
  }
`
const GET_ADMIN_TOKEN_QUERY = gql`
  query GetAdminToken($input: GetAdminTokenInput!) {
    getAdminToken(input: $input) {
      isValid
      token
    }
  }
`

// const jsonDisplay = (obj) => {
//   return (
//     <pre>
//       <code>{JSON.stringify(obj, null, 2)}</code>
//     </pre>
//   )
// }

// const timeTag = (datetime) => {
//   return (
//     <time dateTime={datetime} title={datetime}>
//       {new Date(datetime).toUTCString()}
//     </time>
//   )
// }

// const checkboxInputTag = (checked) => {
//   return <input type="checkbox" checked={checked} disabled />
// }

const Room = ({ room }) => {
  const { id, title } = room
  const [cookies, setCookies] = useCookies()
  const [isAdmin, setIsAdmin] = useState(false)
  const [
    getAdminToken,
    { loading: getAdminTokenLoading, data: getAdminTokenData },
  ] = useLazyQuery(GET_ADMIN_TOKEN_QUERY)

  console.log({ cookies })

  // check room admin on mount and cookie change
  useEffect(() => {
    const token = cookies[id]
    if (!token) {
      setIsAdmin(false)
    } else {
      setIsAdmin(true)
    }
  }, [cookies, id])

  // Attempts to retrieve auth token.
  useEffect(() => {
    if (getAdminTokenData) {
      const { token, isValid } = getAdminTokenData.getAdminToken
      if (isValid && !!token) {
        setCookies(id, token, { path: '/' })
      }
    }
  }, [getAdminTokenData, id, setCookies])

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

  const getToken = async () => {
    const secret = prompt("What's the secret?")
    getAdminToken({
      variables: { input: { roomId: id, secret } },
    })
  }

  return (
    <>
      {isAdmin && <p className="text-5xl">YOU ARE THE ADMINNNNN</p>}
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
        {getAdminTokenLoading ? (
          '...'
        ) : (
          <button onClick={getToken}>
            <span role="img" aria-label="padlock">
              🔒
            </span>
          </button>
        )}
      </nav>
    </>
  )
}

export default Room
