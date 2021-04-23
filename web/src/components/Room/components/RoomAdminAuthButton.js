import React, { useEffect } from 'react'
import { useLazyQuery } from '@apollo/client' // SHADY
import { useCookies } from 'react-cookie'

const GET_ADMIN_TOKEN_QUERY = gql`
  query GetAdminToken($input: GetAdminTokenInput!) {
    getAdminToken(input: $input) {
      isValid
      token
    }
  }
`

export const RoomAdminAuthButton = ({ isAdmin, roomId }) => {
  const [_cookies, setCookies] = useCookies()
  const [getAdminToken, { loading, data: getAdminTokenData }] = useLazyQuery(
    GET_ADMIN_TOKEN_QUERY
  )

  // Attempts to retrieve auth token.
  useEffect(() => {
    if (getAdminTokenData) {
      const { token, isValid } = getAdminTokenData.getAdminToken
      if (isValid && !!token) {
        setCookies(roomId, token, { path: '/' })
      } else {
        alert('No!')
      }
    }
  }, [getAdminTokenData, roomId, setCookies])

  const getToken = async () => {
    const secret = prompt("What's the secret?")

    getAdminToken({
      variables: { input: { roomId, secret } },
    })
  }

  if (loading) return <span>...</span>

  if (isAdmin) {
    return (
      <span role="img" aria-label="star" title="You are admin">
        ⭐
      </span>
    )
  }

  return (
    <button onClick={getToken}>
      <span role="img" aria-label="padlock" title="Unlock room">
        🔒
      </span>
    </button>
  )
}
