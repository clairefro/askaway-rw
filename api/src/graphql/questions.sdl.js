export const schema = gql`
  type Question {
    id: String!
    username: String!
    body: String!
    votes: Int!
    room: Room!
    roomId: String!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    questions(roomId: String!): [Question!]!
    question(id: String!): Question
  }

  input CreateQuestionInput {
    username: String!
    body: String!
    votes: Int
    roomId: String!
  }

  input UpdateQuestionInput {
    username: String
    body: String
    votes: Int
    roomId: String
  }

  type Mutation {
    createQuestion(input: CreateQuestionInput!): Question!
    updateQuestion(id: String!, input: UpdateQuestionInput!): Question!
    deleteQuestion(id: String!): Question!
  }
`
