export const schema = gql`
  type Room {
    id: String!
    title: String!
    secret: String!
    createdAt: DateTime!
    updatedAt: DateTime!
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
    createRoom(input: CreateRoomInput!): Room!
    updateRoom(id: String!, input: UpdateRoomInput!): Room!
    deleteRoom(id: String!): Room!
  }
`
