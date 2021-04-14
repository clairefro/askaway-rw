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

  type Query {
    rooms: [Room!]!
    room(id: String!): Room
    getAdminToken(input: GetAdminTokenInput): GetAdminTokenReturnObj!
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

  type Mutation {
    createRoom(input: CreateRoomInput!): Room!
    updateRoom(id: String!, input: UpdateRoomInput!): Room!
    deleteRoom(id: String!): Room!
  }
`
