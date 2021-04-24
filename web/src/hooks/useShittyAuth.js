import { useCookies } from 'react-cookie'
import { useLazyQuery } from '@apollo/client' // SHADY

const GET_ADMIN_TOKEN_QUERY = gql`
  query GetAdminToken($input: GetAdminTokenInput!) {
    getAdminToken(input: $input) {
      isValid
      token
    }
  }
`

export const useShittyAuth = () => {
  const [getAdminToken, { loading, data: getAdminTokenData }] = useLazyQuery(
    GET_ADMIN_TOKEN_QUERY
  )
  const [cookies, _setCookie] = useCookies()

  const getIsAdmin = ({ roomId }) => {
    return !!cookies[roomId]
    // TODO: validate token in backend
  }

  const silentAuth = async ({ secret, roomId }) => {
    const token = getAdminToken({
      variables: { input: { roomId, secret } },
    })
    return token
  }

  // const validateToken = async ({ roomId, token }) => {
  //   const token = getAdminToken({
  //     variables: { input: { roomId, secret } },
  //   })
  //   return token
  // }

  return {
    getIsAdmin,
    silentAuth,
  }
}
