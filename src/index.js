import { ApolloServer } from 'apollo-server'

import 'module-alias/register'

import { typeDefs } from './typeDefs'
import { resolvers } from './resolvers'

import { isValidQuery } from '@services'

const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatError: (err) => {
    console.log('GRAPHQL_ERROR: ', { message: err.message, locations: err.locations, path: err.path, extensions: { code: err.extensions.code }, stacktrace: err.extensions.exception.stacktrace })

    return { message: err.message, locations: err.locations, path: err.path, extensions: { code: err.extensions.code } }
  },
  context: ({ req }) => {
    if (isValidQuery(req.body.query)) {
      console.log('##  REQUEST  ##\nquery: ', req.body.query)
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
