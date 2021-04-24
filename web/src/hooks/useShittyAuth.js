import { useCookies } from 'react-cookie'
import { useApolloClient } from '@apollo/client' // SHADY
import { useState, useEffect } from 'react'

const GET_ADMIN_TOKEN_QUERY = gql`
  query GetAdminToken($input: GetAdminTokenInput!) {
    getAdminToken(input: $input) {
      isValid
      token
    }
  }
`

const VALIDATE_TOKEN_QUERY = gql`
  query ValidateToken($input: ValidateTokenInput!) {
    validateToken(input: $input) {
      isValid
    }
  }
`

export const useShittyAuth = () => {
  const [isAdmin, setIsAdmin] = useState(false)
  const [_cookies, setCookie] = useCookies()
  const client = useApolloClient()

  const grantAdmin = ({ token, roomId }) => {
    setCookie(roomId, token, {
      path: '/',
      encode: (val) => decodeURIComponent(val), // was encoding value here only for some reason
    })
  }

  const verifyToken = async (input) => {
    const res = await client.query({
      query: VALIDATE_TOKEN_QUERY,
      variables: {
        input,
      },
    })
    if (res?.data?.validateToken) {
      const { isValid } = res.data.validateToken
      setIsAdmin(isValid)
    }
  }

  const getAdminToken = async (input) => {
    const res = await client.query({
      query: GET_ADMIN_TOKEN_QUERY,
      variables: {
        input,
      },
    })
    if (res?.data?.getAdminToken) {
      const { isValid, token } = res.data.getAdminToken
      setIsAdmin(isValid)
      return { isValid, token }
    }
    return { isValid: false }
  }

  return {
    verifyToken,
    grantAdmin,
    isAdmin,
    getAdminToken,
  }
}
