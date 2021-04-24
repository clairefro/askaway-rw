const roomFields = `
    id: String!
    title: String!
    createdAt: DateTime!
    updatedAt: DateTime!
`
export const schema = gql`
  type Room {
    ${roomFields}
  }

  type RoomWithToken {
    ${roomFields}
    token: String!
  }

  type GetAdminTokenReturnObj {
    isValid: Boolean!
    token: String
  }

  type ValidateTokenReturnObj {
    isValid: Boolean!
  }

  type Query {
    rooms: [Room!]!
    room(id: String!): Room
    getAdminToken(input: GetAdminTokenInput!): GetAdminTokenReturnObj!
    validateToken(input: ValidateTokenInput!): ValidateTokenReturnObj!
  }

  input CreateRoomInput {
    title: String!
    secret: String!
  }

  input UpdateRoomInput {
    title: String
    secret: String
  }

  input GetAdminTokenInput {
    roomId: String!
    secret: String!
  }

  input ValidateTokenInput {
    roomId: String!
    token: String!
  }

  type Mutation {
    createRoom(input: CreateRoomInput!): RoomWithToken!
    updateRoom(id: String!, input: UpdateRoomInput!): Room!
    deleteRoom(id: String!): Room!
  }
`
