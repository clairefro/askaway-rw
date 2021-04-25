import { InMemoryCache } from '@apollo/client'

const cache = new InMemoryCache({
  typePolicies: {
    Mutation: {
      fields: {
        createQuestion: {
          merge(_, incoming, { cache }) {
            cache.modify({
              fields: {
                questions(existing = []) {
                  return [...existing, incoming]
                },
              },
            })
            return incoming
          },
        },
      },
    },
  },
})

export default cache
