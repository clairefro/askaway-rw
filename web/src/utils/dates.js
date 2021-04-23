import { formatDistanceToNow } from 'date-fns'

export const fromNow = (timestamp) => {
  return formatDistanceToNow(new Date(timestamp), { addSuffix: true })
}
