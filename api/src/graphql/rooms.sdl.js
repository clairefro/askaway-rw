export const schema = gql`
  type Room {
    id: String!
    secret: String!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    rooms: [Room!]!
    room(id: String!): Room
  }

  input CreateRoomInput {
    secret: String!
  }

  input UpdateRoomInput {
    secret: String
  }

  type Mutation {
    createRoom(input: CreateRoomInput!): Room!
    updateRoom(id: String!, input: UpdateRoomInput!): Room!
    deleteRoom(id: String!): Room!
  }
`
