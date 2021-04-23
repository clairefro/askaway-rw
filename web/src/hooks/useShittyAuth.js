import { useCookies } from 'react-cookie'

export const useShittyAuth = () => {
  const [cookies, _setCookie] = useCookies()
  const checkAdmin = ({ roomId }) => {
    return !!cookies[roomId]
    // TODO: validate token in backend
  }
  return {
    checkAdmin,
  }
}
