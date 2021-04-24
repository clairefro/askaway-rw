import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import RoomForm from 'src/components/RoomForm'
import { FormWrapper } from '../custom/blocks/FormWrapper'
import { useShittyAuth } from '../../hooks/useShittyAuth'
import { useState } from 'react'

const CREATE_ROOM_MUTATION = gql`
  mutation CreateRoomMutation($input: CreateRoomInput!) {
    createRoom(input: $input) {
      id
    }
  }
`

const NewRoom = () => {
  const { silentAuth } = useShittyAuth()
  const [secret, setSecret] = useState('')
  const [createRoom, { loading, error }] = useMutation(CREATE_ROOM_MUTATION, {
    onCompleted: async (e) => {
      const { id } = e.createRoom
      const token = await silentAuth({ roomId: id, secret })
      console.log({ token })
      toast.success('Room created')
      setSecret('')
      navigate(routes.room({ id }))
    },
  })

  const onSave = (input) => {
    createRoom({ variables: { input } })
    setSecret(input.secret)
  }

  return (
    <FormWrapper title="Create a room">
      <RoomForm onSave={onSave} loading={loading} error={error} />
    </FormWrapper>
  )
}

export default NewRoom
